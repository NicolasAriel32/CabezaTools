/* ============================================================================
   CabezaTools · datos.js  —  ÚNICO archivo que hay que tocar para actualizar
   el sitio. Lo editás a mano o desde admin.html (botón "Descargar datos.js").

   FOTOS: van en la carpeta  fotos/  al lado de este archivo.
          Cada producto acepta varias: fotos: ["a.jpg", "b.jpg", "c.jpg"].
          La primera es la principal; las demás se ven tocando la imagen.
          Recomendado: 1200 px de lado máximo, JPG/WebP por debajo de 150 KB.
   ========================================================================== */
window.CT_DATA = {

  /* ---------------------------------------------------------------- CONFIG */
  config: {
    marca:            "CabezaTools",
    whatsapp:         "5491122463840",      // formato wa.me: 54 + 9 + área sin 0 + número sin 15
    whatsappVisible:  "+54 11 2246-3840",
    zona:             "Don Orione · Bs As · Talleres y obra",
    horarioCorto:     "8–19 h",
    horarioLargo:     "Lun a Vie de 8 a 19 h · Sábados hasta las 13 h",
    garantiaDias:     90,
    despachoHoras:    "24 H",
    corteDespacho:    "15 h",
    envioGratisDesde: 0,                    // 0 = sin envío gratis: va a cargo del comprador
    cuotas:           12,
    mayoristaDesde:   150000,
    carpetaFotos:     "fotos/",

    /* Link para pedir reseña en Google. Si lo dejás vacío, el bloque de reseña
       no se muestra (nunca un botón que no lleva a ningún lado).
       Este abre la ficha "Cabeza GARAGE"; adentro está "Escribir una reseña".
       Si algún día conseguís el Place ID (formato ChIJ...), podés cambiarlo por
       https://search.google.com/local/writereview?placeid=TU_PLACE_ID
       que abre el formulario directo, sin pasar por la ficha.                 */
    resenaLink:  "https://www.google.com/maps?cid=459305922260846953",
    resenaTitulo: "¿Compraste con nosotros?",
    resenaTexto:  "Contá cómo te fue en Google. Nos ayuda a que otros talleres nos encuentren.",
    resenaBoton:  "Dejar mi reseña en Google",

    /* Métricas del panel /admin. Mientras activo esté en false el sitio no
       manda un solo pedido a ningún lado. Cuando conectes Supabase, pegá acá
       la URL del proyecto y la clave pública (anon). Esa clave es pública a
       propósito: con ella solo se pueden escribir eventos, nunca leerlos.    */
    metricas: {
      activo: true,
      url:    "https://juetkguenbssciaxtjhq.supabase.co",
      clave:  "sb_publishable_VsskttHrr3pPr1FM264_Sw__YgNwnNE"
    },

    // Textos del hero (H1 en 3 líneas, la 3ª va en rojo)
    heroLinea1:   "Fierros que",
    heroLinea2:   "aguantan",
    heroDestaque: "el laburo.",
    heroBajada:   "Juegos de tubos, llaves y puntas elegidos uno por uno. Stock real, precio de mayorista y el pedido se cierra por WhatsApp.",
    heroMetrica:  "8",
    heroMetricaLabel: "Productos",

    // Rubros del catálogo. La clave es el nombre que se muestra y el que usan
    // los productos en su campo "categoria". El número es lo que dice la tarjeta.
    conteoRubros: {
      "Mecánica": 8
    },
    iconosRubros: {
      "Mecánica": "i-socket"
    },

    // Cartel "Hoy en el mostrador" (visible en pantalla grande). Códigos de producto.
    mostradorTitulo: "Hoy en el mostrador",
    mostrador: ["CT-9100", "CT-9130", "CT-9110", "CT-9090"],

    /* Combo del bloque rojo. "productos" son los códigos que entran al pedido
       cuando tocan "Armar combo": poné exactamente los que querés vender juntos.
       En la bajada podés usar {n} (cantidad real de ítems) y {ahorro}.         */
    combo: {
      etiqueta: "Combo arranque",
      titulo:   "Taller 360",
      bajada:   "Las {n} herramientas esenciales del catálogo, en un solo pedido. Ahorrás {ahorro}% contra comprarlas por separado.",
      ahorro:   15,
      boton:    "Armar combo",
      productos: ["CT-9100", "CT-9130", "CT-9110"]
    }
  },

  /* ------------------------------------------------------- VENTANA DE ENTRADA
     Ojo: en celular un popup inmediato baja la conversión y Google penaliza
     los "interstitials intrusivos". Por eso se dispara recién cuando el usuario
     mostró interés (scroll o segundos), nunca antes de que vea el sitio.       */
  popup: {
    activo: true,
    titulo: "Lo que más sale esta semana",
    bajada: "Tres productos con precio de mayorista. Tocá uno y ya queda en tu pedido.",
    cta: "Ver todo el catálogo",
    disparo: "scroll",     // "scroll" = cuando scrollea un poco  |  "tiempo" = a los N segundos
    segundos: 7,           // solo si disparo = "tiempo"
    productos: ["CT-9100", "CT-9130", "CT-9110"],   // ids que se muestran
    unaVezPorVisita: true
  },

  /* --------------------------------------------------------------- PROMOS  */
  /* tipo:    "porcentaje" | "monto" | "2x1"
     alcance: "todo" | "categoria" | "producto"
     objetivo: nombre de la categoría, o id del producto, o "" si es todo      */
  promos: [
    {
      id: "PROMO-1",
      nombre: "Semana del mecánico",
      texto: "15% en categoría Mecánica",
      detalle: "Hasta el domingo. Se aplica solo en el pedido por WhatsApp.",
      tipo: "porcentaje",
      valor: 15,
      alcance: "categoria",
      objetivo: "Mecánica",
      desde: "2026-08-10",
      hasta: "2026-08-17",
      cupon: "",
      activa: false,            // dada de baja el 2026-08-17
      destacar: false           // true = se muestra en la cinta de promos del home
    },
    {
      id: "PROMO-2",
      nombre: "Envío gratis AMBA",
      texto: "Envío gratis desde $100.000",
      detalle: "Andreani o Cruz del Sur, pedidos confirmados antes de las 15 h.",
      tipo: "monto",
      valor: 0,
      alcance: "todo",
      objetivo: "",
      desde: "2026-08-01",
      hasta: "2026-12-31",
      cupon: "",
      activa: false,            // dada de baja el 2026-08-17: envío a cargo del comprador
      destacar: false
    },
    {
      id: "PROMO-3",
      nombre: "Cupón taller nuevo",
      texto: "10% con el cupón TALLER10",
      detalle: "Primera compra. No acumulable con otras promos.",
      tipo: "porcentaje",
      valor: 10,
      alcance: "todo",
      objetivo: "",
      desde: "2026-08-01",
      hasta: "2026-09-30",
      cupon: "TALLER10",
      activa: false,
      destacar: false
    }
  ],

  /* ------------------------------------------------------------- PRODUCTOS */
  /* fotos: archivos dentro de fotos/. Si el array está vacío se muestra el
            ícono vectorial de respaldo sobre el fondo de tablero.
     icono: i-socket · i-tap · i-level · i-drill · i-driver · i-bits · i-pliers ·
            i-gloves · i-wrench · i-hammer · i-piston
     link:  URL de la publicación externa (Mercado Libre, Tiendanube, etc).
            Si está cargada, la tarjeta muestra el botón rojo "Comprar".
     oferta: { precio, hasta } — precio promocional con vencimiento. Mientras
            está vigente, la tarjeta muestra ese precio, el normal tachado y un
            contador en rojo. Cuando llega la hora se apaga solo y el precio
            vuelve al normal, sin que haya que tocar nada.
            "hasta" lleva la zona horaria (-03:00) para que el contador marque
            lo mismo acá que desde cualquier otro lado.

     El 2026-08-17 se retiraron los productos sin fotos propias: quedaron solo
     los seis de la sesión de fotos. Para reponer alguno está el historial de
     git de este archivo (commit 3552c5e y anteriores).                        */
  productos: [

    /* ---------------- MECÁNICA ---------------- */
    { id:"CT-9060", nombre:"Juego de tubos y puntas 108 pz",
      sub:"CR-V · 1/4\" y 1/2\" · maletín rígido",
      descripcion:"Tubos, puntas, extensiones y crique en un solo maletín con cada pieza en su lugar. Cromo vanadio: aguanta el apriete sin redondear la cabeza del bulón.",
      precio:65000, precioAnterior:89900, categoria:"Mecánica", icono:"i-socket",
      fotos:["tubos-108-abierto-1.jpg","tubos-108-abierto-2.jpg",
             "tubos-108-abierto-3.jpg","tubos-108-caja.jpg"],
      link:"", stock:true, etiqueta:"SALE", popularidad:94 },

    { id:"CT-9090", nombre:"Set de herramientas 46 pz",
      sub:"tubos + puntas · encastre 1/4\" · estuche rígido",
      descripcion:"Crique de 1/4\", tubos, veintiún puntas, extensiones y barra T en un estuche que cierra y no pierde una pieza. El kit chico que resuelve el service completo de una moto o el armado de un mueble.",
      precio:25000, precioAnterior:null, categoria:"Mecánica", icono:"i-socket",
      fotos:["set-46-abierto-1.jpg","set-46-abierto-2.jpg",
             "set-46-abierto-3.jpg","set-46-caja-1.jpg","set-46-caja-2.jpg"],
      oferta:{ precio:22500, hasta:"2026-08-20T14:00:00-03:00" },
      link:"", stock:true, etiqueta:"Nuevo", popularidad:83 },

    { id:"CT-9100", nombre:"Caja de herramientas 40 pz",
      sub:"vasos 1/4\" y 3/8\" · trinquete reversible · estuche",
      descripcion:"Mango de trinquete reversible de 3/8\", vasos en pulgadas y milímetros, adaptador y mango giratorio. Entra en la mochila y cubre el 90% de los aprietes de todos los días.",
      precio:9900, precioAnterior:null, categoria:"Mecánica", icono:"i-socket",
      fotos:["set-40-abierto-1.jpg","set-40-abierto-2.jpg",
             "set-40-abierto-3.jpg","set-40-caja-1.jpg","set-40-caja-2.jpg"],
      oferta:{ precio:8800, hasta:"2026-08-20T14:00:00-03:00" },
      link:"", stock:true, etiqueta:"Nuevo", popularidad:80 },

    { id:"CT-9110", nombre:"Criquera 1/2\" + 10 tubos + extensión",
      sub:"12 pz · CR-V · encastre 1/2\"",
      descripcion:"La criquera gruesa para el bulón que no afloja: encastre de 1/2\", diez tubos y una extensión. Cromo vanadio, la medida que hace falta cuando el juego chico se queda corto.",
      precio:21600, precioAnterior:null, categoria:"Mecánica", icono:"i-socket",
      fotos:["criquera-12-blister-1.jpg","criquera-12-blister-2.jpg",
             "criquera-12-blister-3.jpg","criquera-12-caja-1.jpg","criquera-12-caja-2.jpg"],
      link:"", stock:true, etiqueta:"Nuevo", popularidad:78 },

    { id:"CT-9120", nombre:"Juego de llaves combinadas 12 pz",
      sub:"Alpina · Cr-V · 6 a 24 mm",
      descripcion:"Doce medidas de 6 a 24 mm, boca fija de un lado y estrella del otro. Cromo vanadio con tratamiento térmico y terminación pulida: el juego que se compra una vez y queda para siempre en la caja.",
      precio:37600, precioAnterior:null, categoria:"Mecánica", icono:"i-wrench",
      fotos:["llaves-combinadas-1.jpg","llaves-combinadas-2.jpg","llaves-combinadas-3.jpg"],
      link:"", stock:true, etiqueta:"Nuevo", popularidad:84 },

    { id:"CT-9130", nombre:"Juego de llaves combinadas 8 pz",
      sub:"Alpina · Cr-V · medidas de uso diario",
      descripcion:"Las ocho medidas que salen todos los días, sin pagar por las que nunca usás. Mismo acero y misma terminación que el juego grande, en el tamaño que entra en cualquier bolso.",
      precio:15800, precioAnterior:null, categoria:"Mecánica", icono:"i-wrench",
      fotos:["llaves-combinadas-8pz-1.jpg","llaves-combinadas-8pz-2.jpg"],
      link:"", stock:true, etiqueta:"Nuevo", popularidad:75 },

    { id:"CT-9140", nombre:"Destornillador por unidad",
      sub:"punta plana o Phillips · mango engomado",
      descripcion:"El de todos los días, al precio que se puede pagar. Mango engomado con nervadura para que no patine con la mano sucia, y punta templada que no se redondea al primer apriete. Elegís plana o Phillips al hacer el pedido.",
      precio:2000, precioAnterior:null, categoria:"Mecánica", icono:"i-driver",
      fotos:["destornillador-unidad.jpg"],
      link:"", stock:true, etiqueta:"Nuevo", popularidad:70 },

    { id:"CT-9150", nombre:"Llave traba embrague 150cc",
      sub:"vaso de 4 uñas · acero fosfatado",
      descripcion:"Traba la campana del embrague para que puedas aflojar o apretar la tuerca central sin que gire todo el conjunto. Es la herramienta que separa hacer el trabajo bien de arruinar el dentado a destornillador y martillo. Se usa con crique.",
      precio:16500, precioAnterior:null, categoria:"Mecánica", icono:"i-socket",
      fotos:["llave-embrague-150-uso.jpg","llave-embrague-150-producto.jpg"],
      link:"", stock:true, etiqueta:"Nuevo", popularidad:73 }
  ]
};
