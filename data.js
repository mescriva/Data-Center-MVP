// ══════════════════════════════════════════════════════════
//  POWER ELECTRONICS — DATA CENTERS  |  data.js
//  ──────────────────────────────────────────────────────────
//  Estructura de cada modelo:
//    id          → identificador único
//    name        → nombre largo (cabecera sección A)
//    shortName   → nombre corto (botón sección D y badge render)
//    description → texto introductorio del modelo
//    render      → imagen base del modelo (sin equipos destacados)
//    graphData   → datos para la gráfica del modelo (12 meses)
//    graphLabel  → título de la gráfica
//    graphSubtitle → subtítulo/unidades
//    opciones[]  → lista de equipos/combos seleccionables
//      · id          → único por opción
//      · title       → nombre del equipo o combo
//      · short       → beneficio breve (visible en card)
//      · long        → descripción completa (vista detalle)
//      · render      → imagen del render con ese equipo destacado
//      · schemeImg   → imagen de esquema del equipo (detalle)
//      · graphData   → datos específicos de esa opción
//
//  IMPORTANTE SOBRE EL RENDER:
//    Cada opción tiene su propio 'render'. Al activar el switch,
//    la sección B carga ese render. No hay interpretación de
//    combinaciones: A → render A, A+B → render AB predefinido.
//
//  PARA AÑADIR ASSETS REALES:
//    · Copia el .webp en assets/renders/ y actualiza render/schemeImg
//    · Los graphData son arrays de 12 números (meses Ene-Dic)
// ══════════════════════════════════════════════════════════

const MODELS = [

  // ══════════════════════════════════════════════════════
  // MODELO 1 — LINE INTERACTIVE
  // Basado en el render isométrico con SD750FR, XMV670K,
  // XMV670, GPU Racks, DC/DC, Batteries, Air Condensers,
  // Chiller, AIPCS, PCSM
  // ══════════════════════════════════════════════════════
  {
    id: "m1",
    name: "Data Center Line Interactive",
    shortName: "Line Interactive",
    description: "Solución todo-en-uno para infraestructuras de datos que requieren alta disponibilidad y capacidad de cómputo intensivo. Integra conversión de potencia, refrigeración mixta aire/agua, almacenamiento BESS y conexión a red pública, con control centralizado mediante AIPCS.",
    render: "./assets/renders/m1_labeled.png",
    graphLabel: "Line Interactive — Potencia activa",
    graphSubtitle: "Carga IT vs. potencia red · kW",
    graphData: [320, 345, 380, 420, 465, 510, 540, 525, 490, 455, 410, 360],
    opciones: [
      {
        id: "m1-opt-a",
        title: "Opción A — SD750FR + XMV670K",
        short: "Conversión frontal AC/DC de alta eficiencia con inversor modular 670 kVA.",
        long: "El SD750FR proporciona rectificación con acceso 100% frontal (sin pasillo trasero), eficiencia del 96,5% y FP 0,99. El XMV670K complementa con arquitectura modular N+1 para mantenimiento en caliente sin interrupciones. Juntos cubren la conversión primaria del data center con THDi < 3% en todo el rango de carga.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/opt_a.webp",
        graphData: [310, 330, 365, 400, 445, 490, 520, 505, 475, 440, 395, 345]
      },
      {
        id: "m1-opt-b",
        title: "Opción B — Chiller + Air Condensers",
        short: "Refrigeración mixta líquida y aire para alta densidad térmica.",
        long: "El sistema Chiller gestiona la refrigeración líquida de racks con densidad > 15 kW. Los Air Condensers actúan como primera barrera de disipación, operable a temperatura ambiente de hasta 45 °C. La combinación permite free-cooling nocturno, reduciendo el consumo de refrigeración hasta un 35% en clima mediterráneo.",
        render: "./assets/renders/m1_base.png",
        schemeImg: "./assets/schemes/opt_b.webp",
        graphData: [85, 90, 105, 125, 150, 170, 185, 175, 145, 120, 95, 80]
      },
      {
        id: "m1-opt-c",
        title: "Opción C — Batteries + DC/DC",
        short: "Almacenamiento BESS y bus CC 800 V para respaldo y distribución eficiente.",
        long: "Las baterías LFP del sistema BESS proporcionan autonomía de hasta 2h ante cortes de red, con más de 6.000 ciclos y BMS integrado. El convertidor DC/DC a 800 V reduce las pérdidas de distribución en un 60% respecto a esquemas AC convencionales, siendo especialmente ventajoso con alta penetración de BESS.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/opt_c.webp",
        graphData: [210, 225, 240, 260, 280, 300, 315, 308, 290, 268, 245, 220]
      },
      {
        id: "m1-opt-ab",
        title: "Opción A+B — Conversión + Refrigeración",
        short: "Pack completo: conversión SD750FR/XMV670K y refrigeración Chiller/Aire.",
        long: "La combinación de la opción A (conversión primaria) y la opción B (refrigeración mixta) cubre las dos necesidades críticas del data center en un único contrato. Permite dimensionar exactamente la potencia de frío en función de la densidad de cómputo, con garantía de rendimiento conjunto validado por Power Electronics.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/opt_ab.webp",
        graphData: [380, 405, 445, 495, 565, 625, 670, 650, 590, 535, 465, 400]
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // MODELO 2 — LOAD SMOOTHING CAPABILITIES
  // ══════════════════════════════════════════════════════
  {
    id: "m2",
    name: "Load Smoothing Capabilities",
    shortName: "Load Smoothing",
    description: "Arquitectura orientada a suavizar los picos de demanda y reducir el coste de la potencia contratada. Combina almacenamiento BESS de gran escala con convertidores bidireccionales para inyectar o absorber potencia en función de la tarifa y la carga IT en tiempo real.",
    render: "./assets/renders/m1_base.png",
    graphLabel: "Load Smoothing — Demanda vs. Red",
    graphSubtitle: "Picos suavizados · kW",
    graphData: [580, 560, 590, 610, 640, 680, 700, 695, 660, 625, 595, 570],
    opciones: [
      {
        id: "m2-opt-a",
        title: "Opción A — XMV670 + BESS",
        short: "Inversor central XMV670 con almacenamiento BESS para corte de picos.",
        long: "El XMV670 en modo bidireccional carga el BESS en horas valle y cede la energía almacenada durante los picos de demanda IT. El resultado es una curva de consumo de red plana que reduce la potencia contratada hasta un 30% y elimina los excesos de potencia facturados. Ideal para data centers con tarificación horaria dinámica.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m2_opt_a.webp",
        graphData: [480, 475, 490, 500, 520, 535, 545, 540, 525, 510, 495, 482]
      },
      {
        id: "m2-opt-b",
        title: "Opción B — HEM + Solar",
        short: "Módulo híbrido de energía con integración fotovoltaica directa en bus CC.",
        long: "El HEM (Hybrid Energy Module) integra el inversor solar directamente en el bus CC del sistema, evitando una etapa extra de conversión. La generación FV se usa primero para la carga IT y el excedente carga el BESS. Cuando el solar no cubre la demanda, el HEM gestiona automáticamente el aporte de red, minimizando el coste energético total.",
        render: "./assets/renders/m1_base.png",
        schemeImg: "./assets/schemes/m2_opt_b.webp",
        graphData: [320, 300, 270, 250, 230, 210, 205, 215, 240, 270, 305, 325]
      },
      {
        id: "m2-opt-c",
        title: "Opción C — AIPCS Control",
        short: "Control predictivo con IA para optimización de flujos de potencia.",
        long: "El AIPCS (AI Power Control System) predice la demanda IT y los precios de mercado con 48h de antelación. Coordina la carga/descarga del BESS, el uso del solar y la importación de red para minimizar el coste energético diario. Reduce el OpEx energético entre un 18% y un 25% en instalaciones con tarificación horaria.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m2_opt_c.webp",
        graphData: [400, 390, 395, 410, 430, 450, 460, 455, 435, 415, 400, 390]
      },
      {
        id: "m2-opt-abc",
        title: "Opción Completa — XMV670 + HEM + AIPCS",
        short: "Solución integral de gestión energética para máxima reducción de costes.",
        long: "La solución completa de Load Smoothing combina la potencia del XMV670 bidireccional, el HEM con integración solar y el control predictivo AIPCS. Es la configuración de referencia para data centers que quieren maximizar el autoconsumo, minimizar la potencia contratada y cumplir con objetivos de huella de carbono. Retorno de inversión típico en 4-6 años.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m2_opt_abc.webp",
        graphData: [280, 265, 250, 245, 240, 238, 240, 242, 250, 260, 272, 280]
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // MODELO 3 — DOUBLE GENERATOR
  // ══════════════════════════════════════════════════════
  {
    id: "m3",
    name: "Double Generator Setup",
    shortName: "Double Generator",
    description: "Configuración de alta resiliencia para data centers en zonas con suministro de red poco fiable o requisitos Tier III/IV. Dos grupos electrógenos en paralelo, con transferencia automática en menos de 10 segundos, garantizan la continuidad total del servicio ante fallos de red prolongados.",
    render: "./assets/renders/m1_base.png",
    graphLabel: "Double Generator — Disponibilidad",
    graphSubtitle: "Horas de generación propia · h/mes",
    graphData: [18, 12, 8, 5, 3, 2, 2, 3, 6, 10, 15, 20],
    opciones: [
      {
        id: "m3-opt-a",
        title: "Opción A — Generador Principal HVO",
        short: "Grupo electrógeno primario con combustible HVO de bajas emisiones.",
        long: "El generador principal opera con HVO (Aceite Vegetal Hidrotratado), reduciendo las emisiones de CO₂ hasta un 90% respecto al diésel convencional. Arranque automático en < 10 segundos, capacidades de 500 kVA a 3 MVA. Cumple con la normativa de emisiones Stage V para operación en entornos urbanos o con restricciones medioambientales.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m3_opt_a.webp",
        graphData: [15, 10, 7, 4, 2, 1, 1, 2, 5, 8, 12, 16]
      },
      {
        id: "m3-opt-b",
        title: "Opción B — Generador Redundante N+1",
        short: "Segundo generador en espera caliente para redundancia total.",
        long: "La configuración N+1 mantiene un segundo generador en precalentamiento continuo, listo para tomar la carga en menos de 3 segundos si el principal falla. El sistema de control sincroniza ambos generadores automáticamente para operación en paralelo durante pruebas de mantenimiento, sin interrupción del suministro al data center.",
        render: "./assets/renders/m1_base.png",
        schemeImg: "./assets/schemes/m3_opt_b.webp",
        graphData: [3, 2, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4]
      },
      {
        id: "m3-opt-ab",
        title: "Opción A+B — Doble Generador Completo",
        short: "Configuración completa Tier III con doble generador HVO en paralelo.",
        long: "La configuración completa combina el generador primario HVO con el redundante N+1, permitiendo mantenimiento de cualquiera de los dos sin interrumpir el servicio. El sistema de gestión energética optimiza el reparto de carga entre ambos generadores para maximizar la eficiencia de combustible. Disponibilidad garantizada del 99,999% en black-out total.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m3_opt_ab.webp",
        graphData: [18, 12, 8, 5, 3, 2, 2, 3, 6, 10, 15, 20]
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // MODELO 4 — LOAD BANKING
  // ══════════════════════════════════════════════════════
  {
    id: "m4",
    name: "Load Banking Solution",
    shortName: "Load Banking",
    description: "Solución para data centers que operan como activos flexibles en el mercado eléctrico. Mediante el control inteligente de la carga IT y el BESS, el data center puede ofrecer servicios de balance de red (frequency response, FCR/FFR) a los operadores de sistema, generando ingresos adicionales.",
    render: "./assets/renders/m1_base.png",
    graphLabel: "Load Banking — Respuesta de frecuencia",
    graphSubtitle: "Potencia ofertada al mercado · kW",
    graphData: [200, 210, 225, 240, 255, 270, 265, 260, 245, 230, 215, 205],
    opciones: [
      {
        id: "m4-opt-a",
        title: "Opción A — FCR / FFR Primary Reserve",
        short: "Reserva primaria de frecuencia: respuesta en < 2 segundos.",
        long: "La reserva primaria de frecuencia (FCR) permite al data center responder a desviaciones de frecuencia de la red en menos de 2 segundos, modulando la carga IT o descargando el BESS. Prequalificado para los mercados de balance de REE (España) y ENTSO-E. Ingresos típicos de 15.000-40.000 €/MW/año según mercado y disponibilidad.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m4_opt_a.webp",
        graphData: [180, 190, 205, 220, 235, 248, 244, 238, 225, 212, 198, 185]
      },
      {
        id: "m4-opt-b",
        title: "Opción B — Demand Response Activo",
        short: "Modulación de carga IT programable según señal del operador.",
        long: "El sistema de Demand Response activo conecta el EMS del data center con las señales del operador de sistema o el agregador. Cuando se recibe una señal de reducción, el sistema reduce automáticamente la carga no crítica (cooling, charging) hasta el umbral programado, liberando potencia para la red sin afectar la continuidad del servicio IT.",
        render: "./assets/renders/m1_base.png",
        schemeImg: "./assets/schemes/m4_opt_b.webp",
        graphData: [120, 115, 110, 115, 125, 140, 145, 140, 125, 118, 112, 118]
      },
      {
        id: "m4-opt-ab",
        title: "Opción A+B — Flexibilidad Completa",
        short: "Combinación FCR + Demand Response para máximo aprovechamiento del mercado.",
        long: "La combinación FCR y Demand Response posiciona al data center como un activo de máxima flexibilidad en el mercado eléctrico. Mientras el FCR usa el BESS para respuesta ultrarrápida, el Demand Response gestiona la carga IT en horizontes de minutos a horas. Ingresos combinados potenciales de 50.000-100.000 €/año en instalaciones de 1 MW.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m4_opt_ab.webp",
        graphData: [290, 295, 310, 345, 370, 398, 392, 385, 358, 335, 308, 295]
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // MODELO 5 — UPS 5 MIN TO 60 MIN
  // ══════════════════════════════════════════════════════
  {
    id: "m5",
    name: "UPS 5 min to 60 min Backup",
    shortName: "UPS 5–60 min",
    description: "Gama modular de UPS con autonomía configurable desde 5 hasta 60 minutos, adaptable a cualquier nivel de criticidad del data center. La arquitectura modular permite ampliar la autonomía añadiendo strings de baterías sin parada, y la tecnología doble conversión online garantiza 0 ms de tiempo de transferencia.",
    render: "./assets/renders/m1_base.png",
    graphLabel: "UPS — Tiempo de autonomía",
    graphSubtitle: "Autonomía disponible según carga · min",
    graphData: [60, 58, 55, 50, 45, 40, 38, 40, 44, 50, 56, 60],
    opciones: [
      {
        id: "m5-opt-5",
        title: "Opción 5 min — UPS Módulo Básico",
        short: "Autonomía de 5 minutos para bridging hasta arranque del grupo.",
        long: "El módulo básico de 5 minutos cubre el tiempo necesario para el arranque del generador de respaldo (< 10 s) más el tiempo de sincronización y transferencia. Es la solución más compacta y económica para data centers con grupo electrógeno propio, donde la batería actúa exclusivamente como puente ante micro-cortes y arranque del generador.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m5_opt_5.webp",
        graphData: [8, 7, 7, 6, 6, 5, 5, 5, 6, 7, 8, 8]
      },
      {
        id: "m5-opt-15",
        title: "Opción 15 min — UPS Extendido",
        short: "15 minutos de autonomía para graceful shutdown o failover.",
        long: "La autonomía de 15 minutos permite ejecutar procedimientos de apagado ordenado (graceful shutdown) de las cargas no críticas y completar el failover a un site secundario en data centers con configuración activo-pasivo. También cubre cortes de red de hasta 15 minutos sin necesidad de arrancar el generador, lo que reduce el consumo de combustible y el desgaste del motor.",
        render: "./assets/renders/m1_base.png",
        schemeImg: "./assets/schemes/m5_opt_15.webp",
        graphData: [18, 17, 17, 16, 15, 15, 15, 15, 16, 16, 17, 18]
      },
      {
        id: "m5-opt-60",
        title: "Opción 60 min — BESS Extendido",
        short: "60 minutos de autonomía completa sin generador externo.",
        long: "La configuración de 60 minutos con BESS extendido permite operar el data center durante 1 hora completa a plena carga sin suministro de red. Diseñado para sites en zonas remotas con suministro de red poco confiable o para data centers que quieren eliminar el generador diésel de su infraestructura, reduciendo emisiones y costes de mantenimiento.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m5_opt_60.webp",
        graphData: [62, 61, 60, 59, 57, 56, 55, 56, 58, 60, 61, 62]
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // MODELO 6 — TOTAL SMART RECOVERY
  // ══════════════════════════════════════════════════════
  {
    id: "m6",
    name: "Total Smart Recovery",
    shortName: "Total Smart Recovery",
    description: "Solución avanzada de recuperación inteligente para data centers con múltiples fuentes de energía. Integra la gestión coordinada de red pública, generación renovable, almacenamiento y grupos electrógenos para garantizar la recuperación automática ante cualquier escenario de fallo, minimizando el tiempo de interrupción y el impacto en la operación.",
    render: "./assets/renders/m1_base.png",
    graphLabel: "Smart Recovery — Tiempo de recuperación",
    graphSubtitle: "MTTR medio por tipo de fallo · min",
    graphData: [4.2, 3.8, 3.5, 3.2, 3.0, 2.8, 2.7, 2.8, 3.0, 3.2, 3.6, 4.0],
    opciones: [
      {
        id: "m6-opt-a",
        title: "Opción A — Automatic Transfer Switch",
        short: "Transferencia automática entre fuentes en < 20 ms.",
        long: "El ATS (Automatic Transfer Switch) de estado sólido realiza la transferencia entre red principal, red de respaldo y generador en menos de 20 ms, por debajo del umbral de sensibilidad de los equipos IT. Incluye lógica de prioridad configurable (red > solar > BESS > generador) y monitorización continua de la calidad de cada fuente.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m6_opt_a.webp",
        graphData: [1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5]
      },
      {
        id: "m6-opt-b",
        title: "Opción B — PCSM Multi-Source EMS",
        short: "Sistema de gestión energética multi-fuente con control centralizado.",
        long: "El PCSM (Power Control Station Multi-source) centraliza el control de todos los activos energéticos del data center: red, BESS, solar, generador y cargas críticas. Ante un fallo, el algoritmo de recuperación evalúa el estado de cada fuente y ejecuta el plan de recuperación óptimo en segundos, con registro de cada evento para auditorías de disponibilidad.",
        render: "./assets/renders/m1_base.png",
        schemeImg: "./assets/schemes/m6_opt_b.webp",
        graphData: [2.0, 1.8, 1.7, 1.5, 1.4, 1.3, 1.2, 1.3, 1.4, 1.6, 1.8, 2.0]
      },
      {
        id: "m6-opt-c",
        title: "Opción C — Predictive Maintenance AI",
        short: "Mantenimiento predictivo mediante IA para evitar fallos antes de que ocurran.",
        long: "El módulo de mantenimiento predictivo analiza en tiempo real más de 200 parámetros de cada equipo crítico (temperatura, vibración, eficiencia, historial de alarmas) y genera alertas de mantenimiento con 2-4 semanas de antelación. Reduce las paradas no planificadas en un 78% y extiende el ciclo de vida de los activos un 25% de media.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m6_opt_c.webp",
        graphData: [0.8, 0.7, 0.6, 0.5, 0.4, 0.4, 0.4, 0.4, 0.5, 0.6, 0.7, 0.8]
      },
      {
        id: "m6-opt-abc",
        title: "Opción Completa — Smart Recovery Total",
        short: "ATS + PCSM + IA Predictiva: resiliencia máxima del data center.",
        long: "La solución Total Smart Recovery combina las tres capas de protección: transferencia instantánea (ATS), gestión inteligente de fuentes (PCSM) y mantenimiento predictivo (IA). El resultado es un data center que se recupera automáticamente de cualquier tipo de fallo en menos de 30 segundos, con disponibilidad comprobada del 99,9999% (six nines). Es la solución de referencia para operadores de misión crítica.",
        render: "./assets/renders/m1_labeled.png",
        schemeImg: "./assets/schemes/m6_opt_abc.webp",
        graphData: [0.5, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.4, 0.4, 0.5]
      }
    ]
  }

]; // fin MODELS
