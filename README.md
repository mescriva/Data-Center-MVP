# Power Electronics — Data Centers Expo Screen

Pantalla interactiva para exposición comercial de soluciones de Data Center.  
Diseñada para una pantalla táctil de **~122 × 70 cm** (1920×1080) tumbada sobre mesa.

---

## Rama actual: `feature/position`

Esta rama implementa el rediseño completo respecto a `develop`:

| Cambio | develop | feature/position |
|---|---|---|
| Posición sección A (interactiva) | Izquierda | **Derecha** (accesible al comercial) |
| Selección de equipos | Multi-switch independiente | **Radio: una opción activa** |
| Render al activar opción | Puntos de foco overlay | **Render completo por opción** |
| Gráfica | Canvas placeholder genérico | **Canvas por modelo y por opción** |
| Reset al cambiar modelo | No | **Sí** (estado limpio por modelo) |
| Tipografía | Syne + DM Sans | **Barlow + Barlow Condensed** (corporativo) |
| Logo | SVG sintético | **Logo real Power Electronics** |
| Colores | Paleta genérica azul | **Paleta corporativa PE** |

---

## Estructura de archivos

```
/
├── index.html          ← Estructura (secciones A derecha, B+C izquierda, D barra)
├── styles.css          ← Tokens corporativos PE + layout + componentes
├── data.js             ← 6 modelos con opciones, textos reales y datos de gráficas
├── app.js              ← Lógica de interacción (sin frameworks)
├── README.md
└── assets/
    ├── logos/
    │   └── logo.jpg    ← Logo Power Electronics (provisto)
    ├── renders/        ← Imágenes .webp/png del render por modelo/opción
    │   ├── m1_labeled.png  (render con etiquetas — provisto)
    │   ├── m1_base.png     (render limpio — provisto)
    │   └── m2.webp … m6.webp  (pendiente)
    ├── graphs/         ← (opcional) Vídeos .mp4 en bucle; si no existen → Canvas
    └── schemes/        ← Imágenes .webp de esquemas de cada opción (detalle)
```

---

## Cómo ejecutar en local

```bash
# Opción A — npx (sin instalar nada):
npx serve .

# Opción B — Python:
python3 -m http.server 8080
```

Abrir en Chrome: `http://localhost:3000`

> ⚠️ No abrir `index.html` con doble clic. Los assets necesitan servidor local (CORS).

---

## Flujo de interacción

```
[D] Usuario selecciona modelo
  → setModel(): resetea opción activa + redibuja todo

[A] Usuario activa switch de una opción
  → toggleOpcion(): carga render y gráfica de esa opción
     Solo UNA opción activa a la vez (radio, no checkbox)
     Si ya estaba activa → se desactiva (vuelve al render base)

[A] Usuario pulsa flecha →
  → openDetail(): activa la opción + muestra descripción larga

[A] Usuario pulsa ← Volver
  → closeDetail(): vuelve al listado (opción sigue activa)
```

---

## Añadir assets reales

### Renders (Sección B)
- Guardar en `assets/renders/`
- Actualizar el campo `render` en cada modelo/opción de `data.js`
- Formato recomendado: `.webp`, resolución mínima 1200×800

### Gráficas (Sección C)
- Si tienes `.mp4`: añadir un `<video>` en `index.html` y gestionar en `app.js`
- Si no: editar los arrays `graphData` en `data.js` (12 valores, uno por mes)

### Esquemas de equipo (Vista detalle)
- Guardar en `assets/schemes/`
- Actualizar `schemeImg` en cada opción de `data.js`
- Ratio recomendado: 16:9

---

## Tokens de diseño

Todos los colores y espaciados están en variables CSS en `styles.css`:

```css
:root {
  --pe-navy:       #1A2B5E;  /* Azul marino corporativo */
  --pe-blue:       #2756A8;  /* Azul interactivo */
  --pe-blue-light: #4A90D9;  /* Azul acento/hover */
  --bg:            #ECEEF2;  /* Fondo general */
  --surface:       #FFFFFF;  /* Paneles */
}
```

---

## Decisiones UX justificadas

| Decisión | Motivo |
|---|---|
| Sección A a la derecha | Pantalla tumbada ~122 cm: el brazo del comercial llega más fácil al lado derecho desde el borde largo |
| Botones táctiles ≥ 44px | Tamaño mínimo recomendado por WCAG para targets táctiles |
| Tipografía Barlow ≥ 12px | Visible desde 1.5–2 m de distancia para grupos de 10-20 personas |
| Una sola opción activa | Cada render/gráfica está vinculado a una opción; el comercial muestra un pack concreto, no combina |
| Reset al cambiar modelo | Evita confusión visual al explicar modelos distintos; el estado siempre refleja el modelo activo |
| Gráfica Canvas sin librerías | Sin dependencias externas; redibuja en `resize`; fácil de editar los datos en `data.js` |

---

## Git — ramas del proyecto

```
main            → producción (no tocar)
develop         → integración de cambios
feature/position → este rediseño (A derecha, radio opciones, marca)
```

Para fusionar en develop:
```bash
git checkout develop
git merge feature/position
```
