// ══════════════════════════════════════════════════════════
//  POWER ELECTRONICS — DATA CENTERS  |  app.js
//  ──────────────────────────────────────────────────────────
//  Flujo de interacción:
//
//  1. SECCIÓN D → el usuario elige un modelo
//     → setModel(id): resetea opción activa, redibuja todo
//
//  2. SECCIÓN A → el usuario activa el switch de una opción
//     → selectOpcion(id): carga render + gráfica de esa opción
//     Solo UNA opción puede estar activa a la vez.
//     Activar una opción desactiva la anterior.
//
//  3. SECCIÓN A → el usuario pulsa la flecha "→" de una opción
//     → openDetail(id): muestra descripción larga + imagen de esquema
//     La opción se activa automáticamente al entrar en detalle.
//
//  4. SECCIÓN A → "← Volver"
//     → closeDetail(): vuelve al listado de opciones
//
//  Decisiones de diseño:
//  · Al cambiar de modelo se resetea la opción activa.
//    Motivo: cada modelo es una propuesta diferente; mezclar
//    opciones entre modelos no tiene sentido comercialmente.
//  · Solo una opción activa por modelo (radio, no checkbox).
//    Motivo: cada render y gráfica está asociado a una opción
//    predefinida. No se generan combinaciones dinámicas.
//  · Re-render completo en cada acción: con 4-6 opciones por
//    modelo es más claro y fácil de depurar que actualizaciones
//    parciales del DOM.
// ══════════════════════════════════════════════════════════


// ── ESTADO ────────────────────────────────────────────────
const state = {
  modeloId:    MODELS[0].id,  // modelo activo al arrancar
  opcionId:    null,          // opción activa (null = ninguna)
  detailId:    null           // si ≠ null → sección A muestra detalle
};


// ── REFERENCIAS DOM ───────────────────────────────────────
// Guardamos las referencias una vez al inicio para no buscarlas
// en cada render.
const dom = {
  aModelTag:    document.getElementById("aModelTag"),
  aTitle:       document.getElementById("aTitle"),
  aDesc:        document.getElementById("aDesc"),
  aBody:        document.getElementById("aBody"),
  renderImg:    document.getElementById("renderImg"),
  renderBadge:  document.getElementById("renderBadge"),
  graphCanvas:  document.getElementById("graphCanvas"),
  graphTitle:   document.getElementById("graphTitle"),
  graphSubtitle:document.getElementById("graphSubtitle"),
  modelNav:     document.getElementById("modelNav")
};


// ── HELPERS ───────────────────────────────────────────────

// Devuelve el objeto modelo activo
function getModel() {
  return MODELS.find(m => m.id === state.modeloId);
}

// Devuelve la opción activa, o null si no hay ninguna
function getOpcionActiva() {
  const model = getModel();
  if (!state.opcionId) return null;
  return model.opciones.find(o => o.id === state.opcionId) || null;
}


// ── SECCIÓN D — Navbar de modelos ────────────────────────
function renderNavModelos() {
  dom.modelNav.innerHTML = MODELS.map(m => {
    const sel = m.id === state.modeloId ? "selected" : "";
    return `<button class="model-btn ${sel}"
                    data-action="setModel"
                    data-id="${m.id}">
              ${m.shortName}
            </button>`;
  }).join("");
}


// ── SECCIÓN B — Render ────────────────────────────────────
// Carga la imagen correcta según el estado actual.
// Si hay opción activa → render de la opción.
// Si no → render base del modelo.
function renderSectionB() {
  const model  = getModel();
  const opcion = getOpcionActiva();
  const src    = opcion ? opcion.render : model.render;

  dom.renderBadge.textContent = model.shortName;

  // Fade suave al cambiar imagen
  dom.renderImg.classList.add("is-loading");
  setTimeout(() => {
    dom.renderImg.src = src;
    dom.renderImg.onload = () => dom.renderImg.classList.remove("is-loading");
    dom.renderImg.onerror = () => dom.renderImg.classList.remove("is-loading");
  }, 150);
}


// ── SECCIÓN C — Gráfica ───────────────────────────────────
// Dibuja la gráfica usando Canvas API.
// Usa los datos del modelo o de la opción activa.
function renderSectionC() {
  const model  = getModel();
  const opcion = getOpcionActiva();

  const data     = opcion ? opcion.graphData   : model.graphData;
  const title    = opcion
    ? `${model.shortName} — ${opcion.title.split("—")[0].trim()}`
    : model.graphLabel;
  const subtitle = model.graphSubtitle;

  dom.graphTitle.textContent    = title;
  dom.graphSubtitle.textContent = subtitle;

  // Dibujar en el siguiente frame para tener dimensiones correctas
  requestAnimationFrame(() => drawChart(dom.graphCanvas, data));
}

// Dibuja una gráfica de área con Canvas
function drawChart(canvas, values) {
  const rect = canvas.getBoundingClientRect();
  const dpr  = window.devicePixelRatio || 1;

  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const W   = rect.width;
  const H   = rect.height;
  const pad = { top: 18, right: 12, bottom: 24, left: 44 };
  const cW  = W - pad.left - pad.right;
  const cH  = H - pad.top  - pad.bottom;

  const maxV = Math.max(...values) * 1.1;
  const minV = Math.min(...values) * 0.9;
  const range = maxV - minV;

  // Función para convertir valor a coordenadas
  function px(i, v) {
    return {
      x: pad.left + (i / (values.length - 1)) * cW,
      y: pad.top  + cH * (1 - (v - minV) / range)
    };
  }

  const pts = values.map((v, i) => px(i, v));

  ctx.clearRect(0, 0, W, H);

  // Grid horizontal (3 líneas)
  ctx.strokeStyle = "#D6DAE4";
  ctx.lineWidth   = 1;
  [0.33, 0.66, 1].forEach(t => {
    const y = pad.top + cH * (1 - t);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + cW, y);
    ctx.stroke();

    // Etiqueta eje Y
    const val = Math.round(minV + range * t);
    ctx.fillStyle   = "#7C8AA0";
    ctx.font        = `10px Barlow, sans-serif`;
    ctx.textAlign   = "right";
    ctx.fillText(val, pad.left - 6, y + 4);
  });

  // Área rellena bajo la curva
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cpx, pts[i-1].y, cpx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.lineTo(pts[pts.length-1].x, pad.top + cH);
  ctx.lineTo(pts[0].x, pad.top + cH);
  ctx.closePath();
  // Color de relleno: azul corporativo muy suave
  ctx.fillStyle = "rgba(42, 86, 168, 0.08)";
  ctx.fill();

  // Línea de la curva
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cpx, pts[i-1].y, cpx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = "#2756A8";
  ctx.lineWidth   = 2;
  ctx.stroke();

  // Puntos en la curva
  pts.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#2756A8";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Eje X: meses abreviados
  const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  ctx.fillStyle  = "#7C8AA0";
  ctx.font       = "10px Barlow, sans-serif";
  ctx.textAlign  = "center";
  pts.forEach((p, i) => {
    ctx.fillText(meses[i], p.x, pad.top + cH + 16);
  });
}


// ── SECCIÓN A — Listado de opciones ──────────────────────
function renderSectionAList() {
  const model = getModel();

  dom.aModelTag.textContent = "Data Centers";
  dom.aTitle.textContent    = model.name;
  dom.aDesc.textContent     = model.description;

  dom.aBody.innerHTML = model.opciones.map((op, i) => {
    const isActive   = op.id === state.opcionId;
    const cardClass  = isActive ? "card card--active" : "card";
    const switchClass = isActive ? "switch on" : "switch";
    const delay      = i * 0.05;

    return `
      <article class="${cardClass} anim-fade"
               data-equip="${op.id}"
               style="animation-delay:${delay}s">

        <div class="card-info">
          <div class="card-title">${op.title}</div>
          <div class="card-desc">${op.short}</div>
        </div>

        <button class="${switchClass}"
                data-action="toggle"
                aria-label="${isActive ? "Desactivar" : "Activar"} ${op.title}"
                aria-pressed="${isActive}">
        </button>

        <button class="btn-detail"
                data-action="detail"
                aria-label="Ver detalle de ${op.title}">
          <svg viewBox="0 0 16 16" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </button>

      </article>
    `;
  }).join("");
}


// ── SECCIÓN A — Vista detalle ─────────────────────────────
function renderSectionADetail() {
  const model  = getModel();
  const opcion = model.opciones.find(o => o.id === state.detailId);
  if (!opcion) return;

  dom.aModelTag.textContent = model.shortName;
  dom.aTitle.textContent    = opcion.title.split("—").slice(1).join("—").trim() || opcion.title;
  dom.aDesc.textContent     = "";

  const imgHtml = opcion.schemeImg
    ? `<img class="detail-img"
            src="${opcion.schemeImg}"
            alt="Esquema de ${opcion.title}"
            onerror="this.outerHTML='${placeholderHtml(opcion.title)}'" />`
    : placeholderHtml(opcion.title);

  const isActive    = opcion.id === state.opcionId;
  const switchClass = isActive ? "switch on" : "switch";

  dom.aBody.innerHTML = `
    <div class="detail-wrap anim-fade">

      <button class="btn-back" data-action="back">
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 7H3M7 3L3 7l4 4"/>
        </svg>
        Volver
      </button>

      ${imgHtml}

      <p class="detail-text">${opcion.long}</p>

      <div class="detail-toggle-row">
        <span class="detail-toggle-label">Activar en el data center</span>
        <button class="${switchClass}"
                data-action="toggle"
                data-equip="${opcion.id}"
                aria-label="Activar ${opcion.title}"
                aria-pressed="${isActive}">
        </button>
      </div>

    </div>
  `;
}

// HTML del placeholder de imagen (escapado para uso en onerror)
function placeholderHtml(title) {
  return `<div class="detail-img-placeholder">
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="5" width="24" height="18" rx="3"/>
      <circle cx="9" cy="14" r="2.5"/>
      <path d="M15 11h6M15 14h5M15 17h6"/>
    </svg>
    <span>${title}</span>
  </div>`;
}


// ── RENDER GLOBAL ─────────────────────────────────────────
// Punto único de actualización de la UI.
function render() {
  renderNavModelos();
  renderSectionB();
  renderSectionC();

  if (state.detailId) {
    renderSectionADetail();
  } else {
    renderSectionAList();
  }
}


// ── ACCIONES ──────────────────────────────────────────────

// Cambia el modelo activo.
// Resetea la opción y el detalle: cada modelo es independiente.
function setModel(id) {
  state.modeloId = id;
  state.opcionId = null;   // resetear opción al cambiar modelo
  state.detailId = null;
  render();
}

// Activa o desactiva una opción (radio: solo una activa).
// Si la opción ya está activa, la desactiva (vuelve al estado base).
function toggleOpcion(id) {
  if (state.opcionId === id) {
    // Desactivar
    state.opcionId = null;
  } else {
    // Activar (desactiva la anterior automáticamente)
    state.opcionId = id;
  }
  render();
}

// Abre el detalle de una opción.
// La activa automáticamente para que el render se actualice.
function openDetail(id) {
  state.opcionId = id;   // activar al entrar en detalle
  state.detailId = id;
  render();
}

// Cierra el detalle y vuelve al listado.
function closeDetail() {
  state.detailId = null;
  render();
}


// ── DELEGACIÓN DE EVENTOS ─────────────────────────────────
// Un único listener para toda la interacción.
document.addEventListener("click", (e) => {

  // Buscar el botón con data-action más cercano al click
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;

  // ① Cambiar modelo (sección D)
  if (action === "setModel") {
    setModel(btn.dataset.id);
    return;
  }

  // ② Activar/desactivar opción (switch)
  if (action === "toggle") {
    // El id puede estar en el botón o en la card padre
    const card = btn.closest("[data-equip]");
    const id   = btn.dataset.equip || card?.dataset.equip;
    if (id) toggleOpcion(id);
    return;
  }

  // ③ Abrir detalle (flecha →)
  if (action === "detail") {
    const card = btn.closest("[data-equip]");
    const id   = card?.dataset.equip;
    if (id) openDetail(id);
    return;
  }

  // ④ Volver al listado (← Volver)
  if (action === "back") {
    closeDetail();
    return;
  }
});

// Redibujar la gráfica si la ventana cambia de tamaño
window.addEventListener("resize", () => {
  renderSectionC();
});


// ── ARRANQUE ──────────────────────────────────────────────
render();
