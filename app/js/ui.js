/**
 * El Hombre del Saco - App
 * UI y Componentes Móviles (Pantalla vertical fija y sin scroll global)
 */

const UI = {
  toastContainer: null,

  init() {
    this.toastContainer = document.getElementById('toast-container');
  },

  toast(message, type = 'info', duration = 3400) {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️' };
    toast.innerHTML = `<span class="toast-icon">${icons[type] || '📢'}</span><span>${message}</span>`;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  },

  showModal(title, content, onClose) {
    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    if (!overlay) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    overlay.classList.add('open');
    this._modalOnClose = onClose;
  },

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('open');
    if (typeof this._modalOnClose === 'function') {
      this._modalOnClose();
      this._modalOnClose = null;
    }
  },

  // Actualizar indicadores del HUD superior y barra de estado
  actualizarHUD() {
    const prot = GameState.getProtagonista();
    const nombreProt = prot ? `${prot.nombre} (${prot.rol})` : '—';
    const elProt = document.getElementById('hud-protagonista-nombre');
    if (elProt) elProt.textContent = nombreProt;

    const elCoraje = document.getElementById('hud-coraje-val');
    if (elCoraje) elCoraje.textContent = GameState.partida.coraje;

    // Barra de pills de acceso rápido
    const locActual = GameState.data.localizaciones.find(l => String(l.id) === String(GameState.partida.localizacionActual));
    const elLocNombre = document.getElementById('pill-loc-nombre');
    if (elLocNombre) {
      elLocNombre.textContent = locActual ? locActual.nombre.substring(0, 16) + '…' : 'Mapa';
    }
    const elLocCount = document.getElementById('pill-loc-count');
    if (elLocCount) elLocCount.textContent = GameState.partida.localizaciones_en_juego.length;

    const elPistasCount = document.getElementById('pill-pistas-count');
    if (elPistasCount) elPistasCount.textContent = GameState.partida.pistas_en_juego.length;

    const elConsCount = document.getElementById('pill-cons-count');
    if (elConsCount) elConsCount.textContent = GameState.partida.consecuencias_en_juego.length;

    const elPersCount = document.getElementById('pill-pers-count');
    if (elPersCount) elPersCount.textContent = GameState.partida.personajes_secundarios_en_juego.length;
  },

  // Renderizar la carta activa en el escenario principal (con scroll interior único)
  renderCartaEnEscenario(narracion) {
    const container = document.getElementById('stage-card-wrapper');
    if (!container || !narracion) return;

    const prot = GameState.getProtagonista();
    const canAyudarse = GameState.puedeAyudarse();

    let scrollContentHtml = '';

    // 0. Banner de protagonista actual
    if (prot) {
      scrollContentHtml += `
        <div class="protagonist-turn-banner">
          <span class="coin-icon">🪙</span>
          <div style="flex:1;">
            <strong>Turno de ${prot.nombre}</strong>
            <span class="role-badge">${prot.rol}</span>
          </div>
        </div>
      `;
    }

    // Aviso de protagonista requerido o cambio
    if (narracion.cambio_protagonista) {
      scrollContentHtml += `
        <div class="alert-callout highlight">
          🔀 <strong>Asignación de turno:</strong> El protagonista de esta carta debe ser: <strong>${narracion.cambio_protagonista}</strong>
        </div>
      `;
    }

    // Recordatorio de consecuencias activas (flecha ↪️)
    if (narracion.consecuencia_arrow) {
      const id = narracion.consecuencia_arrow.id;
      if (GameState.getConsecuenciaEnJuego(id)) {
        scrollContentHtml += `<div class="alert-callout">↪️ Consecuencia ${id} está en juego — pulsa en Consecuencias para leerla.</div>`;
      }
    }
    if (narracion.consecuencias_arrow) {
      for (const id of narracion.consecuencias_arrow) {
        if (GameState.getConsecuenciaEnJuego(id)) {
          scrollContentHtml += `<div class="alert-callout">↪️ Consecuencia ${id} está en juego — pulsa en Consecuencias para leerla.</div>`;
        }
      }
    }

    // ==========================================
    // ORDEN OFICIAL DE JUEGO SEGÚN MANUAL
    // ==========================================

    // PASO 1: 🧠 Imagina (Lee en voz baja/silencio para ambientarte)
    if (narracion.imagina_texto) {
      scrollContentHtml += `
        <div class="content-block step-block">
          <div class="read-badge-silent">🤫 Leer en voz baja para ti</div>
          <div class="content-label"><span class="step-num">1</span> 🧠 Imagina la escena</div>
          <div class="content-text">${narracion.imagina_texto}</div>
        </div>
      `;
    }

    // PASO 2: ❓ Preguntas de la entrevista (lo que responderás)
    if (narracion.preguntas_protagonista && narracion.preguntas_protagonista.length) {
      const stepNum = narracion.imagina_texto ? '2' : '1';
      scrollContentHtml += `
        <div class="content-block step-block">
          <div class="read-badge-silent">🤔 Piensa tus respuestas antes de hablar</div>
          <div class="content-label"><span class="step-num">${stepNum}</span> ❓ Preguntas para ${prot ? prot.nombre : 'el protagonista'}</div>
          <ul class="content-questions">
            ${narracion.preguntas_protagonista.map(q => `<li>${q}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // PASO 3: 🗣️ Relato en voz alta (comienza con esta cita)
    if (narracion.narracion_inicial) {
      const stepNum = (narracion.imagina_texto && narracion.preguntas_protagonista) ? '3' : '2';
      scrollContentHtml += `
        <div class="content-block step-block highlight-speech">
          <div class="read-badge-aloud">🗣️ Leer en voz alta al resto del grupo</div>
          <div class="content-label"><span class="step-num">${stepNum}</span> 🗣️ Comienza tu relato en voz alta</div>
          <div class="narrative-quote">${narracion.narracion_inicial}</div>
        </div>
      `;
    }

    // PASO 4: 🪙 Desafío interactivo integrado
    if (narracion.desafio) {
      scrollContentHtml += this.renderDesafioBox(narracion.desafio, canAyudarse);
    }

    // PASO 5: 🧑‍🤝‍🧑 Interacción del resto de jugadores (compañeros)
    if (narracion.pregunta_interaccion_especial || narracion.pregunta_interaccion) {
      let interHtml = '';
      if (narracion.pregunta_interaccion_especial) {
        const pie = narracion.pregunta_interaccion_especial;
        if (pie.hermano) interHtml += `<li><strong>Hermano de Bernardo:</strong> ${pie.hermano}</li>`;
        if (pie.resto) interHtml += `<li><strong>Resto de amigos:</strong> ${pie.resto}</li>`;
      }
      if (narracion.pregunta_interaccion) {
        const qs = Array.isArray(narracion.pregunta_interaccion) ? narracion.pregunta_interaccion : [narracion.pregunta_interaccion];
        qs.forEach(q => { interHtml += `<li>${q}</li>`; });
      }

      scrollContentHtml += `
        <div class="content-block step-block">
          <div class="read-badge-aloud">🗣️ Compañeros: responded en voz alta</div>
          <div class="content-label">🧑‍🤝‍🧑 Interacción: Preguntas para los compañeros</div>
          <ul class="content-questions interaction">
            ${interHtml}
          </ul>
        </div>
      `;
    }

    // Diálogos o instrucciones especiales
    if (narracion.instruccion_especial) {
      scrollContentHtml += `
        <div class="alert-callout">
          🗣️ <strong>Instrucción especial:</strong> ${narracion.instruccion_especial}
        </div>
      `;
    }

    // Epílogo interactivo si es Narración 58 o 59
    if (narracion.tipo === 'epilogo') {
      scrollContentHtml += this.renderEpilogoInteractivo(narracion);
    }

    // Texto de fin o resolución
    if (narracion.fin && narracion.fin.texto && narracion.tipo !== 'epilogo') {
      scrollContentHtml += `
        <div class="alert-callout" style="background:rgba(0,0,0,0.25);">
          🏁 <strong>Resolución:</strong> ${narracion.fin.texto}
        </div>
      `;
    }

    // PIE FIJO CON ACCIONES INMEDIATAS (Nunca se pierde al final)
    const footerHtml = this.renderCardFooterActions(narracion);

    container.innerHTML = `
      <div class="stage-card">
        <!-- Cabecera fija de la carta -->
        <div class="stage-card-header">
          <span class="stage-card-badge">Carta ${narracion.id}</span>
          <span class="stage-card-title">${narracion.titulo || 'Narración'}</span>
          <span class="stage-card-number">#${narracion.id}</span>
        </div>

        <!-- CUERPO CON SCROLL INTERNO ÚNICAMENTE AQUÍ -->
        <div class="stage-card-scroll" id="card-scroll-body">
          ${scrollContentHtml}
        </div>

        <!-- Pie fijo de acciones -->
        <div class="stage-card-footer">
          ${footerHtml}
        </div>
      </div>
    `;

    // Hacer scroll arriba del texto de la carta al entrar
    const scrollBody = document.getElementById('card-scroll-body');
    if (scrollBody) scrollBody.scrollTop = 0;
  },

  // Generar botones de acción en el pie fijo de la carta
  renderCardFooterActions(narracion) {
    let html = '';

    // Epílogo especial (Narraciones 58 y 59)
    if (narracion.tipo === 'epilogo') {
      return `
        <button class="btn-action-primary" style="background:var(--color-accent-gold);color:#070c0b;font-weight:bold;padding:12px;" onclick="App.abrirModalFinPartida()">
          📜 Ver Crónica Final y Desenlace de la Partida
        </button>
      `;
    }

    // Transición dinámica Narración 7 (Casa de Bernardo): opción de N12 si se tiene el tarro 🫙
    if (narracion.id === 7) {
      const tieneTarro = GameState.tieneEfecto('🫙') || GameState.getPistaEnJuego(2);
      html += `<div class="decision-button-stack">`;
      html += `
        <button class="btn-action-primary" onclick="App.irANarracion(8)">
          ▶ Registrar la casa de Bernardo (Narración 8)
        </button>
      `;
      if (tieneTarro) {
        html += `
          <button class="btn-action-primary" style="background:#52b788;color:#070c0b;font-weight:bold;" onclick="App.irANarracion(12)">
            🫙 Examinar la cocina gracias al tarro (Narración 12)
          </button>
        `;
      }
      html += `</div>`;
      return html;
    }

    // Transición dinámica Narración 19 (Barbería por fuera): opción de N33 si se tienen tijeras ✂️
    if (narracion.id === 19) {
      const tieneTijeras = GameState.tieneEfecto('✂️') || GameState.getPistaEnJuego(4);
      html += `<div class="decision-button-stack">`;
      html += `
        <button class="btn-action-primary" onclick="App.irANarracion(20)">
          ▶ Asomarse al interior de la barbería (Narración 20)
        </button>
      `;
      if (tieneTijeras) {
        html += `
          <button class="btn-action-secondary" style="border-color:var(--color-primary);color:var(--color-primary-light);" onclick="App.irANarracion(33)">
            ✂️ Esperar al atardecer y entrar sigilosamente (Narración 33)
          </button>
        `;
      }
      html += `</div>`;
      return html;
    }

    // Decisiones de ramificación directa
    if (narracion.decisiones && narracion.decisiones.length) {
      html += `<div class="decision-button-stack">`;
      narracion.decisiones.forEach(dec => {
        html += `
          <button class="btn-decision" onclick="App.irANarracion(${dec.carta})">
            <span>${dec.opcion}</span>
            <span class="tag-badge">Narración ${dec.carta} →</span>
          </button>
        `;
      });
      html += `</div>`;
      return html;
    }

    // Decisión múltiple
    if (narracion.decision && narracion.decision.opciones) {
      html += `<div class="decision-button-stack">`;
      narracion.decision.opciones.forEach(opt => {
        html += `
          <button class="btn-decision" onclick="App.manejarDecision(${JSON.stringify(opt).replace(/"/g, '&quot;')}, ${narracion.id})">
            <span>${opt.opcion}</span>
            <span class="tag-badge">Elegir →</span>
          </button>
        `;
      });
      html += `</div>`;
      return html;
    }

    // Fin condicional de sangre
    if (narracion.fin && narracion.fin.condicional) {
      const c = narracion.fin.condicional;
      html += `
        <div class="action-grid">
          <button class="btn-action-primary" onclick="App.ejecutarAccion(${JSON.stringify(c.si_sin_sangre).replace(/"/g, '&quot;')})">
            Sin sangre → N${c.si_sin_sangre.id}
          </button>
          <button class="btn-action-secondary" style="border-color:var(--color-danger);color:#f0a0a0;" onclick="App.ejecutarAccion(${JSON.stringify(c.si_con_sangre).replace(/"/g, '&quot;')})">
            Con 🩸 → N${c.si_con_sangre.id}
          </button>
        </div>
      `;
      return html;
    }

    // Acciones estándar o múltiples de fin
    if (narracion.fin && narracion.fin.acciones) {
      const acciones = narracion.fin.acciones;

      // Desenlace especial con Agustina (Narración 52)
      const desenlace = acciones.find(a => a.tipo === 'resolver_desenlace_agustina');
      if (desenlace) {
        const tienePerdon = GameState.getConsecuenciaEnJuego(12);
        const tieneVenganza = GameState.getConsecuenciaEnJuego(13);
        const sangre = GameState.contarEfectosSangre();

        html += `<div class="decision-button-stack">`;
        if (tienePerdon) {
          if (sangre <= 1) {
            html += `
              <button class="btn-action-primary" onclick="App.irANarracion(53)">
                ✨ Agustina cura milagrosamente a Bernardo (Narración 53)
              </button>
            `;
          } else {
            html += `
              <button class="btn-action-primary" onclick="App.irANarracion(54)">
                ⚖️ Agustina pide elegir a quién salvar (Narración 54)
              </button>
            `;
          }
        } else if (tieneVenganza) {
          html += `
            <button class="btn-action-primary" style="background:var(--color-danger);color:#fff;" onclick="App.irANarracion(56)">
              🩸 Bernardo se desangra (Narración 56)
            </button>
          `;
        } else {
          // Si no fueron al risco y no tienen ni 12 ni 13
          html += `
            <button class="btn-action-primary" onclick="App.irANarracion(53)">
              ▶ Agustina interviene y cura a Bernardo (Narración 53)
            </button>
            <button class="btn-action-secondary" onclick="App.irANarracion(56)">
              ▶ Nadie ayuda y Bernardo se desangra (Narración 56)
            </button>
          `;
        }
        html += `</div>`;
        return html;
      }

      // Reemplazo de localización (7A por 7B)
      const reemplazo = acciones.find(a => a.tipo === 'reemplazar_localizacion');
      if (reemplazo) {
        App.ejecutarAccion(reemplazo);
      }

      // Renderizar botones para todas las acciones interactivas
      const interactivas = acciones.filter(a =>
        a.tipo === 'ir_narracion' || a.tipo === 'viajar' || a.tipo === 'explorar_zona' ||
        a.tipo === 'abandonar_localizacion' || a.tipo === 'fin_partida'
      );

      if (interactivas.length) {
        html += `<div class="decision-button-stack">`;
        interactivas.forEach(act => {
          if (act.tipo === 'ir_narracion') {
            html += `
              <button class="btn-action-primary" onclick="App.irANarracion(${act.id})">
                ${act.texto || `▶ Continuar a Narración ${act.id}`}
              </button>
            `;
          } else if (act.tipo === 'viajar') {
            html += `
              <button class="btn-action-primary" onclick="App.viajarALocalizacion(${act.id})">
                ${act.texto || `🗺️ Viajar a Localización ${act.id}`}
              </button>
            `;
          } else if (act.tipo === 'explorar_zona') {
            html += `
              <button class="btn-decision" onclick="App.irANarracion(${act.id})">
                <span>${act.texto || `▶ Explorar Zona (${act.id})`}</span>
                <span class="tag-badge">Entrar →</span>
              </button>
            `;
          } else if (act.tipo === 'abandonar_localizacion') {
            html += `
              <button class="btn-action-primary" onclick="App.abandonarLocalizacionYViajar(${act.id})">
                🗺️ Abandonar sitio y elegir nuevo destino
              </button>
            `;
          } else if (act.tipo === 'fin_partida') {
            html += `
              <button class="btn-action-primary" style="background:var(--color-success);" onclick="App.abrirModalFinPartida()">
                🏁 Final de la Historia
              </button>
            `;
          }
        });
        html += `</div>`;
      }
    }

    return html;
  },

  // Cuadro de desafío con moneda interactiva y atajos de cartas
  renderDesafioBox(desafio, canAyudarse) {
    const id = `desafio-${Date.now()}`;

    // Detección de atajos por cartas en juego (reglas oficiales de manual)
    let atajosHtml = '';
    const textoDesafio = (desafio.texto || '') + (desafio.icono || '');

    // 1. Llave Dorada (Pista 5) supera desafíos con icono 🔒
    if (textoDesafio.includes('🔒') && GameState.getPistaEnJuego(5)) {
      atajosHtml += `
        <button class="btn-action-primary" style="background:#d4af37;color:#000;font-size:0.8rem;padding:8px 12px;margin-bottom:8px;width:100%;" 
                onclick="App.usarAtajoDesafio('${id}', ${JSON.stringify(desafio).replace(/"/g, '&quot;')}, 'llave_dorada')">
          🔑 Superar automáticamente con Llave Dorada 🔒
        </button>
      `;
    }

    // 2. Valentía (Consecuencia 1) supera desafíos con icono 👻
    if (textoDesafio.includes('👻') && GameState.getConsecuenciaEnJuego(1)) {
      atajosHtml += `
        <button class="btn-action-primary" style="font-size:0.8rem;padding:8px 12px;margin-bottom:8px;width:100%;" 
                onclick="App.usarAtajoDesafio('${id}', ${JSON.stringify(desafio).replace(/"/g, '&quot;')}, 'valentia')">
          ✨ Superar automáticamente con Valentía 👻
        </button>
      `;
    }

    // 3. Escopeta cargada (Consecuencia 11) supera cualquier desafío
    if (GameState.getConsecuenciaEnJuego(11)) {
      atajosHtml += `
        <button class="btn-action-primary" style="background:var(--color-danger);color:#fff;font-size:0.8rem;padding:8px 12px;margin-bottom:8px;width:100%;" 
                onclick="App.usarAtajoDesafio('${id}', ${JSON.stringify(desafio).replace(/"/g, '&quot;')}, 'escopeta')">
          💥 Superar automáticamente con Escopeta Cargada
        </button>
      `;
    }

    return `
      <div class="challenge-card-box">
        <div class="content-label" style="color:var(--color-primary-light);">🪙 Desafío en curso</div>
        <div class="challenge-desc">${desafio.texto || 'Lanza la moneda para resolver la situación.'}</div>
        
        ${atajosHtml}

        <div class="coin-stage">
          <div class="coin-button" id="coin-btn-${id}" onclick="UI.tirarMonedaDesafio('${id}', ${JSON.stringify(desafio).replace(/"/g, '&quot;')}, ${canAyudarse})">
            🪙
          </div>
          <div id="coin-res-label-${id}" class="coin-result-badge">Toca la moneda</div>
        </div>

        <div id="coin-resolucion-box-${id}" style="width:100%;display:none;margin-top:6px;"></div>
      </div>
    `;
  },

  // Tirar la moneda dentro del desafío
  tirarMonedaDesafio(id, desafio, canAyudarse) {
    const btn = document.getElementById(`coin-btn-${id}`);
    const label = document.getElementById(`coin-res-label-${id}`);
    const resolucionBox = document.getElementById(`coin-resolucion-box-${id}`);
    if (!btn || btn.dataset.flipped) return;

    if (window.SoundEffects) SoundEffects.playCoinFlip();
    btn.classList.add('flipping');
    btn.dataset.flipped = 'true';
    label.textContent = 'Girando en el aire…';

    setTimeout(() => {
      const resultado = GameState.tirarMoneda();
      btn.classList.remove('flipping');

      if (resultado === 'cara') {
        if (window.SoundEffects) SoundEffects.playCoinResult(true);
        btn.innerHTML = '☀️';
        label.textContent = '✓ CARA — Favorable';
        label.className = 'coin-result-badge favorable';
        resolucionBox.style.display = 'block';

        let html = '';
        if (desafio.favorable) {
          html += `<div class="alert-callout">👍 ${desafio.favorable.descripcion || desafio.favorable.texto || 'Resultado favorable.'}</div>`;
        }
        resolucionBox.innerHTML = html;
        if (desafio.favorable && desafio.favorable.tipo) {
          App.ejecutarAccion(desafio.favorable);
        }
      } else {
        if (window.SoundEffects) SoundEffects.playCoinResult(false);
        btn.innerHTML = '✖️';
        if (canAyudarse) {
          label.textContent = '✗ CRUZ — Se permite ayuda';
          label.className = 'coin-result-badge desfavorable';
          resolucionBox.style.display = 'block';
          resolucionBox.innerHTML = `
            <div class="alert-callout" style="margin-bottom:8px;">
              🧑‍🤝‍🧑 El siguiente jugador en sentido horario narra cómo ayuda. (Activa Consecuencia 5: Amistad).
            </div>
            <button class="btn-action-primary" style="padding:8px 12px;font-size:0.8rem;width:100%;" 
                    onclick="UI.tirarSegundaMonedaDesafio('${id}', ${JSON.stringify(desafio).replace(/"/g, '&quot;')})">
              🪙 Lanzar tirada de ayuda
            </button>
          `;
          App.ejecutarAccion({ tipo: 'obtener_consecuencia', id: 5 });
        } else {
          label.textContent = '✗ CRUZ — Desfavorable';
          label.className = 'coin-result-badge desfavorable';
          resolucionBox.style.display = 'block';

          let html = '';
          if (desafio.desfavorable) {
            html += `<div class="alert-callout" style="border-color:var(--color-danger);color:#f0a0a0;">
              👎 ${desafio.desfavorable.descripcion || desafio.desfavorable.texto || 'Resultado desfavorable.'}
            </div>`;
          }
          resolucionBox.innerHTML = html;
          
          // Procesar fallos automáticos de Coraje y Consecuencias 5 y 9
          this.procesarFalloDesafio(desafio);

          if (desafio.desfavorable && desafio.desfavorable.tipo) {
            App.ejecutarAccion(desafio.desfavorable);
          }
        }
      }
    }, 650);
  },

  tirarSegundaMonedaDesafio(id, desafio) {
    const resolucionBox = document.getElementById(`coin-resolucion-box-${id}`);
    const label = document.getElementById(`coin-res-label-${id}`);
    if (window.SoundEffects) SoundEffects.playCoinFlip();
    label.textContent = 'Tirada de ayuda…';

    setTimeout(() => {
      const res = GameState.tirarMoneda();
      if (res === 'cara') {
        if (window.SoundEffects) SoundEffects.playCoinResult(true);
        label.textContent = '✓ CARA — ¡Ayuda exitosa!';
        label.className = 'coin-result-badge favorable';
        resolucionBox.innerHTML = `<div class="alert-callout">👍 ¡Superasteis el desafío gracias a la ayuda!</div>`;
      } else {
        if (window.SoundEffects) SoundEffects.playCoinResult(false);
        label.textContent = '✗ CRUZ — Falló la ayuda';
        label.className = 'coin-result-badge desfavorable';
        resolucionBox.innerHTML = `
          <div class="alert-callout" style="border-color:var(--color-danger);color:#f0a0a0;">
            👎 ${desafio.desfavorable ? (desafio.desfavorable.descripcion || 'Consecuencia desfavorable aplicada.') : 'Resultado desfavorable.'}
          </div>
        `;
        
        // Procesar fallos automáticos de Coraje y Consecuencias 5 y 9
        this.procesarFalloDesafio(desafio);

        if (desafio.desfavorable && desafio.desfavorable.tipo) {
          App.ejecutarAccion(desafio.desfavorable);
        }
      }
    }, 600);
  },

  // Automatizaciones oficiales al fallar un desafío
  procesarFalloDesafio(desafio) {
    // 1. Si es prueba de coraje, reducir coraje automáticamente
    const esPruebaCoraje = (desafio.texto || '').toLowerCase().includes('coraje');
    if (esPruebaCoraje) {
      const nuevoCoraje = GameState.reducirCoraje();
      this.toast(`💔 Prueba de Coraje fallida: El Coraje baja a ${nuevoCoraje}`, 'warning', 4000);
      this.actualizarHUD();
    }

    // 2. Si Consecuencia 5 (Amistad) está en juego, se devuelve al mazo (amistad rota)
    if (GameState.getConsecuenciaEnJuego(5)) {
      GameState.devolverConsecuencia(5);
      this.toast('💔 Se devuelve la Consecuencia 5 (Amistad) al mazo tras el fallo.', 'warning', 3500);
      this.actualizarHUD();
    }

    // 3. Si Consecuencia 9 (Herido) está en juego, se obtiene Consecuencia 10 (Habladurías)
    if (GameState.getConsecuenciaEnJuego(9) && !GameState.getConsecuenciaEnJuego(10)) {
      GameState.añadirConsecuencia(10);
      this.toast('🩸 Herida expuesta: Las habladurías se extienden (Obtenéis Consecuencia 10).', 'warning', 4000);
      this.actualizarHUD();
    }
  },

  // Epílogo interactivo para el desenlace final a turnos
  renderEpilogoInteractivo(narracion) {
    const jugadores = GameState.partida.jugadores;
    const preguntas = narracion.preguntas_epilogo || [];
    let tabsHtml = '';
    jugadores.forEach((j, idx) => {
      tabsHtml += `
        <div class="epilogue-player-tab ${idx === 0 ? 'active' : ''}" 
             id="epilogo-tab-${idx}" 
             onclick="UI.seleccionarJugadorEpilogo(${idx})">
          ${j.nombre}
        </div>
      `;
    });

    let panelsHtml = '';
    jugadores.forEach((j, idx) => {
      panelsHtml += `
        <div id="epilogo-panel-${idx}" style="display: ${idx === 0 ? 'flex' : 'none'}; flex-direction:column; gap:8px;">
          <div class="content-label" style="color:var(--color-accent-gold);">
            🎙️ Epílogo de ${j.nombre} (${j.rol}) — 1970:
          </div>
          <ul class="content-questions">
            ${preguntas.map(q => `<li>${q}</li>`).join('')}
          </ul>
        </div>
      `;
    });

    return `
      <div class="epilogue-box">
        <div class="narrative-quote">${narracion.texto || ''}</div>
        <div class="content-label" style="margin-top:6px;">🎙️ En turnos, cada superviviente relata su vida:</div>
        <div class="epilogue-tabs">
          ${tabsHtml}
        </div>
        <div id="epilogue-panels-container">
          ${panelsHtml}
        </div>
      </div>
    `;
  },

  seleccionarJugadorEpilogo(idx) {
    document.querySelectorAll('.epilogue-player-tab').forEach((tab, i) => {
      tab.classList.toggle('active', i === idx);
    });
    const total = GameState.partida.jugadores.length;
    for (let i = 0; i < total; i++) {
      const panel = document.getElementById(`epilogo-panel-${i}`);
      if (panel) panel.style.display = i === idx ? 'flex' : 'none';
    }
  }
};
