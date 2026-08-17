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
    envioGratisDesde: 0,          // 0 = no hay envío gratis, va a cargo del comprador
    cuotas:           12,
    mayoristaDesde:   150000,
    carpetaFotos:     "fotos/",

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
    heroBajada:   "Más de 50 herramientas de mano, medición y potencia, elegidas una por una. Stock real, precio de mayorista y el pedido se cierra por WhatsApp.",
    heroMetrica:  "+50",
    heroMetricaLabel: "Productos",

    // Rubros del catálogo. La clave es el nombre que se muestra y el que usan
    // los productos en su campo "categoria". El número es lo que dice la tarjeta.
    conteoRubros: {
      "Mecánica": 12, "Medición": 1, "Potencia": 4,
      "Pinzas y alicates": 2, "Obra": 1, "Seguridad": 1
    },
    iconosRubros: {
      "Mecánica": "i-socket", "Medición": "i-level", "Potencia": "i-drill",
      "Pinzas y alicates": "i-pliers", "Obra": "i-hammer", "Seguridad": "i-gloves"
    },

    // Cartel "Hoy en el mostrador" (visible en pantalla grande). Códigos de producto.
    mostradorTitulo: "Hoy en el mostrador",
    mostrador: ["CT-9010", "CT-1042", "CT-9060", "CT-9040"],

    /* Combo del bloque rojo. "productos" son los códigos que entran al pedido
       cuando tocan "Armar combo": poné exactamente los que querés vender juntos.
       En la bajada podés usar {n} (cantidad real de ítems) y {ahorro}.         */
    combo: {
      etiqueta: "Combo arranque",
      titulo:   "Taller 360",
      bajada:   "Las {n} herramientas esenciales del catálogo, en un solo pedido. Ahorrás {ahorro}% contra comprarlas por separado.",
      ahorro:   31,
      boton:    "Armar combo",
      productos: ["CT-9010", "CT-9060", "CT-9040", "CT-9070",
                  "CT-9080", "CT-3388", "CT-5120", "CT-8802"]
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
    productos: ["CT-9010", "CT-9060", "CT-9040"],   // ids que se muestran
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
            Si está cargada, la tarjeta muestra el botón rojo "Comprar ↗".      */
  productos: [

    /* ---------------- POTENCIA ---------------- */
    { id:"CT-9010", nombre:"Taladro atornillador inalámbrico 18V",
      sub:"batería de litio · 2 velocidades · maletín",
      descripcion:"El caballito de batalla del taller: perfora madera, chapa y plástico, y atornilla sin pasarse gracias al embrague de 15 posiciones. Viene con batería, cargador y maletín.",
      precio:185000, precioAnterior:229000, categoria:"Potencia", icono:"i-drill",
      fotos:["taladro-atornillador-18v.jpg","taladro-20v-uso-1.jpg","taladro-20v-uso-2.jpg"],
      link:"", stock:true, etiqueta:"Top", popularidad:98 },

    { id:"CT-9020", nombre:"Atornillador de impacto 18V",
      sub:"encastre 1/4\" hex · 1.500 rpm",
      descripcion:"Cuando el tornillo no cede, el impacto lo resuelve sin castigarte la muñeca. Ideal para tirafondos largos, terrazas y armado de estructuras.",
      precio:162000, precioAnterior:null, categoria:"Potencia", icono:"i-drill",
      fotos:["atornillador-impacto-18v.jpg"],
      link:"", stock:true, etiqueta:"Nuevo", popularidad:79 },

    { id:"CT-9030", nombre:"Taladro percutor 1/2\" 18V",
      sub:"mandril sin llave · función percusión",
      descripcion:"Con percusión entra en pared de ladrillo y hormigón liviano sin sufrir. El mandril sin llave te deja cambiar de mecha con una mano arriba del andamio.",
      precio:248000, precioAnterior:null, categoria:"Potencia", icono:"i-drill",
      fotos:["taladro-percutor-18v.jpg"],
      link:"", stock:true, etiqueta:"", popularidad:74 },

    /* ---------------- MECÁNICA ---------------- */
    { id:"CT-1042", nombre:'Torquímetro Zafe 1/4" Pro',
      sub:"2,9 – 21 kg · con estuche",
      descripcion:"Ajusta al par exacto que pide el fabricante, ni un kilo de más. Trinquete reversible y estuche rígido para que no se descalibre dando vueltas en la caja.",
      precio:47000, precioAnterior:58900, categoria:"Mecánica", icono:"i-socket",
      fotos:[], link:"", stock:true, etiqueta:"Top", popularidad:99 },

    { id:"CT-9060", nombre:"Juego de tubos y puntas 108 pz",
      sub:"CR-V · 1/4\" y 1/2\" · maletín rígido",
      descripcion:"Tubos, puntas, extensiones y crique en un solo maletín con cada pieza en su lugar. Cromo vanadio: aguanta el apriete sin redondear la cabeza del bulón.",
      precio:65000, precioAnterior:89900, categoria:"Mecánica", icono:"i-socket",
      fotos:["tubos-108-abierto-1.jpg","tubos-108-abierto-2.jpg",
             "tubos-108-abierto-3.jpg","tubos-108-caja.jpg"],
      link:"", stock:true, etiqueta:"Top", popularidad:94 },

    { id:"CT-9090", nombre:"Set de herramientas 46 pz",
      sub:"tubos + puntas · encastre 1/4\" · estuche rígido",
      descripcion:"Crique de 1/4\", tubos, veintiún puntas, extensiones y barra T en un estuche que cierra y no pierde una pieza. El kit chico que resuelve el service completo de una moto o el armado de un mueble.",
      precio:25000, precioAnterior:null, categoria:"Mecánica", icono:"i-socket",
      fotos:["set-46-abierto-1.jpg","set-46-abierto-2.jpg",
             "set-46-abierto-3.jpg","set-46-caja-1.jpg","set-46-caja-2.jpg"],
      link:"", stock:true, etiqueta:"Nuevo", popularidad:83 },

    { id:"CT-9100", nombre:"Caja de herramientas 40 pz",
      sub:"vasos 1/4\" y 3/8\" · trinquete reversible · estuche",
      descripcion:"Mango de trinquete reversible de 3/8\", vasos en pulgadas y milímetros, adaptador y mango giratorio. Entra en la mochila y cubre el 90% de los aprietes de todos los días.",
      precio:9900, precioAnterior:null, categoria:"Mecánica", icono:"i-socket",
      fotos:["set-40-abierto-1.jpg","set-40-abierto-2.jpg",
             "set-40-abierto-3.jpg","set-40-caja-1.jpg","set-40-caja-2.jpg"],
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

    { id:"CT-9040", nombre:"Llave ajustable 200 mm",
      sub:"cromo vanadio · boca hasta 24 mm",
      descripcion:"Una sola llave para todas las medidas que aparecen sin avisar. Boca calibrada, mordaza pareja y mango con nervadura para que no se te escape con la mano engrasada.",
      precio:12500, precioAnterior:null, categoria:"Mecánica", icono:"i-wrench",
      fotos:["llave-ajustable-200.jpg","llave-ajustable-200-detalle.jpg","llave-ajustable-200-mano.jpg"],
      link:"", stock:true, etiqueta:"", popularidad:86 },

    { id:"CT-9050", nombre:"Juego 2 llaves ajustables 9\"",
      sub:"pico loro + francesa · acero forjado",
      descripcion:"El dúo clásico de plomería y mecánica pesada: una para sostener, otra para girar. Acero forjado en una sola pieza, sin juego en el tornillo sinfín.",
      precio:23900, precioAnterior:null, categoria:"Mecánica", icono:"i-wrench",
      fotos:["juego-llaves-ajustables.jpg"],
      link:"", stock:true, etiqueta:"", popularidad:71 },

    { id:"CT-2210", nombre:"Kit machos y terrajas 12 pz",
      sub:"acero inoxidable · M3–M12",
      descripcion:"Para rehacer una rosca comida sin tener que cambiar la pieza entera. Doce medidas métricas con portamachos y manija en estuche plástico.",
      precio:20300, precioAnterior:null, categoria:"Mecánica", icono:"i-tap",
      fotos:[], link:"", stock:true, etiqueta:"", popularidad:81 },

    { id:"CT-5120", nombre:"Kit desarmadores 115 en 1",
      sub:"precisión · premium",
      descripcion:"Ciento quince puntas magnéticas para abrir desde un celular hasta un tablero de auto. Base antideslizante y mango giratorio para trabajo fino.",
      precio:14999, precioAnterior:null, categoria:"Mecánica", icono:"i-driver",
      fotos:[], link:"", stock:true, etiqueta:"", popularidad:85 },

    { id:"CT-6077", nombre:"Juego puntas Torx / Allen 40 pz",
      sub:"multiestría · caja rígida",
      descripcion:"Torx, allen y multiestría en las medidas que siempre faltan. Puntas de una pulgada con retención magnética, van directo al atornillador.",
      precio:18700, precioAnterior:null, categoria:"Mecánica", icono:"i-bits",
      fotos:[], link:"", stock:true, etiqueta:"", popularidad:76 },

    /* ---------------- PINZAS Y ALICATES ---------------- */
    { id:"CT-9070", nombre:"Set de pinzas y alicates 6 pz",
      sub:"universal · pico largo · corte · pinza pico loro",
      descripcion:"Las seis que se usan todos los días, con mango aislado y filo templado. El juego que resuelve el 80% del trabajo eléctrico y de armado.",
      precio:54000, precioAnterior:67000, categoria:"Pinzas y alicates", icono:"i-pliers",
      fotos:["set-pinzas-alicates.jpg","set-pinzas-alicates-2.jpg"],
      link:"", stock:true, etiqueta:"Oferta", popularidad:88 },

    { id:"CT-7315", nombre:"Set mini pinzas artesano 5 pz",
      sub:"alicates universales",
      descripcion:"Cinco pinzas chicas para electrónica, bijouterie y modelismo. Punta de precisión y resorte de apertura para trabajar horas sin cansar la mano.",
      precio:20000, precioAnterior:null, categoria:"Pinzas y alicates", icono:"i-pliers",
      fotos:[], link:"", stock:true, etiqueta:"", popularidad:64 },

    /* ---------------- OBRA ---------------- */
    { id:"CT-9080", nombre:"Martillo carpintero uña 500 g",
      sub:"cabeza forjada · mango antideslizante",
      descripcion:"Cabeza forjada y templada, uña bien afilada para sacar el clavo torcido de una. El mango con grip absorbe el rebote en las jornadas largas.",
      precio:14800, precioAnterior:null, categoria:"Obra", icono:"i-hammer",
      fotos:["martillo-carpintero.jpg"],
      link:"", stock:true, etiqueta:"", popularidad:77 },

    /* ---------------- MEDICIÓN ---------------- */
    { id:"CT-3388", nombre:"Nivel de mano 50 cm",
      sub:"aluminio · 3 gotas",
      descripcion:"Perfil de aluminio reforzado con tres gotas: horizontal, vertical y 45°. Base fresada, apoya parejo sobre revoque y sobre chapa.",
      precio:8999, precioAnterior:11500, categoria:"Medición", icono:"i-level",
      fotos:[], link:"", stock:true, etiqueta:"Oferta", popularidad:88 },

    /* ---------------- POTENCIA · accesorios ---------------- */
    { id:"CT-4501", nombre:"Extensor flexible p/ taladro",
      sub:"set 10 puntas · 1/4\" hex",
      descripcion:"Llega al tornillo que está detrás del motor o abajo de la bacha. Alma flexible de 300 mm más diez puntas de uso corriente.",
      precio:10200, precioAnterior:null, categoria:"Potencia", icono:"i-drill",
      fotos:[], link:"", stock:true, etiqueta:"Nuevo", popularidad:72 },

    /* ---------------- SEGURIDAD ---------------- */
    { id:"CT-8802", nombre:"Guantes antideslizantes",
      sub:"trabajo · talles M a XL",
      descripcion:"Palma con recubrimiento de látex rugoso: agarrás la herramienta aunque esté con aceite. Dorso de punto para que la mano transpire menos.",
      precio:5000, precioAnterior:null, categoria:"Seguridad", icono:"i-gloves",
      fotos:[], link:"", stock:true, etiqueta:"Top", popularidad:95 }
  ]
};
