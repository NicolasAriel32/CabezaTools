-- ============================================================================
-- CabezaTools · base de métricas
--
-- Qué resuelve: guardar de forma anónima las visitas al sitio y los clics en
-- productos, para que el panel /admin muestre cuánta gente entró, cuánto tiempo
-- se quedó y qué producto se mira más.
--
-- Cómo está protegido:
--   · el visitante (rol anon) SOLO puede insertar eventos. No puede leer,
--     ni modificar, ni borrar nada. Aunque alguien saque la clave pública del
--     HTML, no puede ver una sola métrica.
--   · leer las métricas requiere estar logueado Y figurar en la tabla admins.
--     Sin eso, aunque alguien se cree una cuenta, ve cero.
--
-- No se guarda ningún dato personal: ni nombre, ni mail, ni IP, ni cookies.
-- Solo un identificador de sesión al azar que se borra al cerrar la pestaña.
-- ============================================================================

-- ---------------------------------------------------------------- EVENTOS ---
create table if not exists public.eventos (
  id          uuid primary key default gen_random_uuid(),
  creado_en   timestamptz not null default now(),
  sesion      uuid        not null,
  tipo        text        not null,
  producto    text,                      -- código del producto (CT-9010) si aplica
  segundos    integer,                   -- solo en el evento 'salida'
  ref         text,                      -- de dónde vino (google, instagram, directo)
  dispositivo text
);

comment on table public.eventos is
  'Eventos anónimos del sitio público. El visitante solo escribe; leer es exclusivo del admin.';

create index if not exists eventos_creado_en_idx on public.eventos (creado_en desc);
create index if not exists eventos_tipo_idx      on public.eventos (tipo, creado_en desc);
create index if not exists eventos_producto_idx  on public.eventos (producto) where producto is not null;

-- ----------------------------------------------------------------- ADMINS ---
-- Quién puede ver las métricas. Estar logueado no alcanza: hay que estar acá.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  alta    timestamptz not null default now()
);
alter table public.admins enable row level security;   -- sin políticas: nadie la toca desde la API

-- -------------------------------------------------------------- PERMISOS ----
alter table public.eventos enable row level security;

revoke all on public.eventos from anon, authenticated;
grant insert on public.eventos to anon, authenticated;
grant select on public.eventos to authenticated;

drop policy if exists "el visitante solo escribe" on public.eventos;
create policy "el visitante solo escribe"
  on public.eventos for insert to anon, authenticated
  with check (
    tipo in ('visita','salida','producto','combo','whatsapp','busqueda')
    and coalesce(segundos, 0) between 0 and 14400          -- máximo 4 h, corta valores absurdos
    and coalesce(length(producto), 0) <= 24
    and coalesce(length(ref), 0) <= 200
    and coalesce(dispositivo, 'movil') in ('movil','escritorio')
  );

drop policy if exists "solo el admin lee" on public.eventos;
create policy "solo el admin lee"
  on public.eventos for select to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- Sin políticas de update ni delete: los eventos no se editan ni se borran
-- desde la API. La limpieza se hace con la función de abajo.

-- -------------------------------------------------------------- MÉTRICAS ----
-- Devuelve todo el tablero en una sola llamada, así el panel hace un solo pedido.
create or replace function public.metricas(dias integer default 30)
returns json
language sql
stable
security invoker
set search_path = public
as $$
  with v as (
    select * from public.eventos
    where creado_en > now() - (greatest(least(dias, 365), 1) || ' days')::interval
  )
  select json_build_object(
    'dias',      greatest(least(dias, 365), 1),
    'visitas',   (select count(*) from v where tipo = 'visita'),
    'personas',  (select count(distinct sesion) from v where tipo = 'visita'),
    -- promedio de permanencia: descartamos rebotes de menos de 3 s y sesiones
    -- olvidadas abiertas más de una hora, que ensucian el promedio
    'segundos_medio', (select coalesce(round(avg(segundos)), 0)
                       from v where tipo = 'salida' and segundos between 3 and 3600),
    'pedidos_wsp', (select count(*) from v where tipo = 'whatsapp'),
    'combos',      (select count(*) from v where tipo = 'combo'),
    'movil_pct',   (select coalesce(round(100.0 * count(*) filter (where dispositivo = 'movil')
                                          / nullif(count(*), 0)), 0)
                    from v where tipo = 'visita'),
    'top', (select coalesce(json_agg(t), '[]'::json) from (
              select producto, count(*) as clicks
              from v where tipo = 'producto' and producto is not null
              group by producto order by clicks desc, producto limit 10) t),
    'origen', (select coalesce(json_agg(o), '[]'::json) from (
              select coalesce(nullif(ref, ''), 'directo') as ref, count(*) as visitas
              from v where tipo = 'visita'
              group by 1 order by visitas desc limit 6) o),
    'por_dia', (select coalesce(json_agg(d order by d.dia), '[]'::json) from (
              select date_trunc('day', creado_en)::date as dia, count(*) as visitas
              from v where tipo = 'visita' group by 1) d)
  );
$$;

revoke execute on function public.metricas(integer) from anon, public;
grant  execute on function public.metricas(integer) to authenticated;

-- ---------------------------------------------------------------- LIMPIEZA --
-- El plan gratis tiene 500 MB. Un evento pesa ~120 bytes, así que hay lugar de
-- sobra, pero conviene no acumular para siempre. Corré esto cada tanto, o
-- programalo con pg_cron si algún día lo necesitás.
create or replace function public.limpiar_eventos(meses integer default 12)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare borrados integer;
begin
  if not exists (select 1 from public.admins a where a.user_id = auth.uid()) then
    raise exception 'solo un admin puede limpiar eventos';
  end if;
  delete from public.eventos
  where creado_en < now() - (greatest(meses, 1) || ' months')::interval;
  get diagnostics borrados = row_count;
  return borrados;
end;
$$;

revoke execute on function public.limpiar_eventos(integer) from anon, public;
grant  execute on function public.limpiar_eventos(integer) to authenticated;

-- ============================================================================
-- DESPUÉS DE CORRER ESTO, DOS PASOS A MANO EN EL PANEL DE SUPABASE:
--
-- 1) Authentication → Users → "Add user": creás tu usuario con tu mail y la
--    contraseña que quieras. Esa contraseña la elegís vos y no queda en ningún
--    archivo de este proyecto.
--
-- 2) Authentication → Providers → Email: apagá "Enable sign ups".
--    Si queda prendido, cualquiera puede crearse una cuenta. (Igual no vería
--    nada, porque no estaría en la tabla admins, pero mejor cerrar la puerta.)
--
-- 3) Copiás el id del usuario que creaste y lo habilitás:
--       insert into public.admins (user_id) values ('PEGA-ACA-EL-UUID');
-- ============================================================================
