/**
 * El Hombre del Saco - App
 * Controlador principal y gestión de modales interactivos
 */

const App = {
  vistaActual: 'juego',

  async init() {
    // 1. Cargar datos desde window (modo local con doble clic file://) o fetch
    if (window.DATA_MANUAL && window.DATA_NARRACIONES) {
      GameState.data = {
        manual: window.DATA_MANUAL,
        narraciones: window.DATA_NARRACIONES,
        localizaciones: window.DATA_LOCALIZACIONES,
        pistas: window.DATA_PISTAS,
        consecuencias: window.DATA_CONSECUENCIAS,
        personajes: window.DATA_PERSONAJES,
        coraje: window.DATA_CORAJE,
      };
    } else {
      try {
        const [manual, narraciones, localizaciones, pistas, consecuencias, personajes, coraje] = await Promise.all([
          fetch('data/manual.json').then(r => r.json()),
          fetch('data/narraciones.json').then(r => r.json()),
          fetch('data/localizaciones.json').then(r => r.json()),
          fetch('data/pistas.json').then(r => r.json()),
          fetch('data/consecuencias.json').then(r => r.json()),
          fetch('data/personajes.json').then(r => r.json()),
          fetch('data/coraje.json').then(r => r.json()),
        ]);
        GameState.data = { manual, narraciones, localizaciones, pistas, consecuencias, personajes, coraje };
      } catch(e) {
        console.error('Error cargando datos:', e);
        document.getElementById('loading-screen').innerHTML =
          '<div style="color:#d08080;padding:24px;text-align:center;">Error cargando datos. Asegúrate de tener la carpeta <code>data/</code>.</div>';
        return;
      }
    }

    // Restaurar tema visual guardado (Arkham Noir por defecto)
    const temaGuardado = localStorage.getItem('hds_tema') || 'noir';
    document.documentElement.setAttribute('data-theme', temaGuardado);

    // Inicializar UI y Sonido
    UI.init();

    // Cargar partida guardada si existe
    GameState.cargarDesdeStorage();

    // Navegar a la pantalla adecuada detrás del splash
    if (GameState.partida.activa) {
      this.navegarA('juego');
    } else {
      this.navegarA('home');
    }
  },

  // Transición suave al cerrar la pantalla Splash Screen
  cerrarSplashScreen() {
    if (window.SoundEffects) SoundEffects.init();
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 600);
    }
  },

  navegarA(vista) {
    if (!GameState.partida.activa && vista === 'juego') {
      vista = 'home';
    }

    this.vistaActual = vista;

    // Cambiar vistas
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const viewEl = document.getElementById(`view-${vista}`);
    if (viewEl) viewEl.classList.add('active');

    // Actualizar tabs inferiores
    document.querySelectorAll('.bottom-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === vista);
    });

    // Controlar visibilidad de la barra de estado superior
    const statusBar = document.getElementById('status-bar');
    if (statusBar) {
      statusBar.style.display = (GameState.partida.activa && vista === 'juego') ? 'flex' : 'none';
    }

    // Renderizar
    if (vista === 'home') this.renderHome();
    if (vista === 'setup') this.renderSetup();
    if (vista === 'juego') this.renderJuego();
    if (vista === 'manual') this.renderManual();
  },

  // === RENDER HOME ===
  renderHome() {
    const manual = GameState.data.manual;
    if (!manual) return;
    document.getElementById('home-description').textContent = manual.descripcion;
    document.getElementById('home-jugadores').textContent = `${manual.jugadores_min}–${manual.jugadores_max} jugadores`;
    document.getElementById('home-duracion').textContent = `${manual.duracion_min}–${manual.duracion_max}h`;
    document.getElementById('home-nota').textContent = manual.nota_contenido;

    const btnContinuar = document.getElementById('btn-continuar');
    if (btnContinuar) btnContinuar.style.display = GameState.partida.activa ? 'block' : 'none';

    const btnAbandonar = document.getElementById('btn-abandonar');
    if (btnAbandonar) btnAbandonar.style.display = GameState.partida.activa ? 'block' : 'none';
  },

  // === RENDER SETUP ===
  renderSetup() {
    this.actualizarSlotsJugadores(3);
  },

  actualizarSlotsJugadores(n) {
    const container = document.getElementById('player-slots');
    if (!container) return;
    const roles = ['Hermano de Bernardo', 'Amigo', 'Amigo', 'Amigo'];
    container.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const slot = document.createElement('div');
      slot.className = 'player-input-row';
      slot.innerHTML = `
        <span style="font-size:1.1rem;cursor:pointer;" onclick="App.setProtagonistaSetup(${i})" id="setup-coin-${i}">
          ${i === 0 ? '🪙' : '⚪'}
        </span>
        <div style="flex:1;">
          <input type="text" placeholder="Nombre jugador ${i+1}" id="setup-player-name-${i}" maxlength="18" />
          <div style="font-size:0.68rem;color:var(--color-primary-light);">${roles[i]}</div>
        </div>
      `;
      container.appendChild(slot);
    }

    document.querySelectorAll('.count-btn').forEach(btn => {
      btn.classList.toggle('selected', parseInt(btn.dataset.count) === n);
    });

    this._protagonistaSetup = 0;
  },

  setProtagonistaSetup(idx) {
    this._protagonistaSetup = idx;
    document.querySelectorAll('[id^="setup-coin-"]').forEach((el, i) => {
      el.textContent = i === idx ? '🪙' : '⚪';
    });
  },

  iniciarPartida() {
    const inputs = document.querySelectorAll('[id^="setup-player-name-"]');
    const jugadores = [];
    const roles = ['Hermano de Bernardo', 'Amigo', 'Amigo', 'Amigo'];
    const protIdx = this._protagonistaSetup || 0;

    inputs.forEach((input, i) => {
      const nombre = input.value.trim() || `Jugador ${i + 1}`;
      jugadores.push({
        id: i,
        nombre,
        rol: roles[i] || 'Amigo',
        esProtagonista: i === protIdx
      });
    });

    if (!jugadores.length) return;

    GameState.iniciarPartida(jugadores);
    GameState.partida.protagonistaIdx = protIdx;

    this.navegarA('juego');
    UI.toast('¡Partida iniciada!', 'success');

    // Iniciar prólogo guiado paso a paso para presentar personajes
    setTimeout(() => this.iniciarPrologoInteractivo(0), 250);
  },

  // Prólogo guiado e interactivo paso a paso
  iniciarPrologoInteractivo(paso = 0) {
    const jugadores = GameState.partida.jugadores;
    const numJugadores = jugadores.length;
    // Pasos:
    // 0: Entrevista del periodista en 1970 (Tarjeta de inicio Cara A)
    // 1 .. numJugadores: Presentación de cada jugador y personaje
    // numJugadores + 1: Conocer a Bernardo (Personaje 5)
    // numJugadores + 2: Domingo de fiesta en 1910 (Tarjeta de inicio Cara B)
    const totalPasos = numJugadores + 3;

    let dotsHtml = '';
    for (let i = 0; i < totalPasos; i++) {
      dotsHtml += `<div class="prologue-step-dot ${i === paso ? 'active' : ''}"></div>`;
    }

    let bodyHtml = `
      <div class="prologue-wizard">
        <div class="prologue-step-indicator">${dotsHtml}</div>
    `;

    if (paso === 0) {
      // Paso 0: El Periodista (1970)
      bodyHtml += `
        <div class="content-block">
          <div class="read-badge-silent">🤫 Leer en voz baja para ti antes de hablar</div>
          <div class="content-label" style="color:var(--color-accent-gold);">🎙️ 1970 — La entrevista del periodista</div>
          
          <div class="read-badge-aloud">🗣️ El protagonista lee en voz alta al grupo:</div>
          <div class="narrative-quote">
            “Año 1970. Almería.<br><br>
            Una periodista nos ha reunido, a un grupo de antiguos amigos, para hacernos una entrevista sobre unos hechos que nos ocurrieron hace exactamente 60 años, en 1910, cuando éramos tan solo unos niños de entre 8 y 12 años.<br><br>
            Nunca nos hemos atrevido a hablar abiertamente sobre aquello que ocurrió. Pero parece que después de tantos años estamos preparados para volver a rememorar aquel episodio y contar a todo el mundo lo que realmente ocurrió, con todo detalle.<br><br>
            Estamos sentados alrededor de una mesa junto a ella.<br><br>
            La periodista coloca una grabadora en el centro, inserta una cinta y pulsa el botón de grabar.”
          </div>

          <div class="content-text" style="font-size:0.86rem;color:var(--color-text-dim);margin-top:6px;line-height:1.45;">
            Coged vuestras cartas de personaje. En sentido horario, cada jugador irá siguiendo los pasos para presentarse y describir cómo era de niño cuando la historia ocurrió.
          </div>

          <div style="margin-top:14px;">
            <button class="btn-action-primary" style="width:100%;" onclick="App.iniciarPrologoInteractivo(1)">
              Presentar a los protagonistas →
            </button>
          </div>
        </div>
      `;
    } else if (paso >= 1 && paso <= numJugadores) {
      // Pasos 1..N: Presentación del jugador
      const jIdx = paso - 1;
      const jugador = jugadores[jIdx];
      const pData = (GameState.data.personajes?.principales || [])[jIdx] || {
        preguntas_protagonista: ['¿Puedes presentarte?', '¿Cómo eras de niño/a?', '¿A qué te dedicabas?', '¿Qué te gustaba hacer en tu tiempo libre?'],
        pregunta_interaccion: '¿Puedes contarnos algo de tu relación con este personaje?'
      };

      bodyHtml += `
        <div class="content-block">
          <div class="read-badge-silent">🤫 Ronda de presentación de personajes (${paso} de ${numJugadores})</div>
          <div class="content-label" style="color:var(--color-primary-light);">
            👤 Presentación de: <strong>${jugador.nombre}</strong> (${jugador.rol})
          </div>

          <div class="read-badge-aloud">🗣️ Lee en voz alta tu presentación:</div>
          <div class="narrative-quote">
            “Mi nombre es <strong>${jugador.nombre}</strong>. Bernardo era mi ${jugador.rol.toLowerCase().includes('hermano') ? 'hermano' : 'amigo'}. Por aquel entonces yo tenía… años…”
          </div>

          <div class="read-badge-aloud" style="margin-top:8px;">🗣️ Responde en voz alta a las preguntas para que el grupo te conozca:</div>
          <ul class="content-questions">
            ${(pData.preguntas_protagonista || []).map(q => `<li>${q}</li>`).join('')}
          </ul>

          <div class="read-badge-aloud" style="margin-top:8px;">🗣️ Los compañeros responden en voz alta:</div>
          <ul class="content-questions interaction">
            <li>${pData.pregunta_interaccion || '¿Puedes contarnos algo de tu relación con este personaje?'}</li>
          </ul>

          <div style="margin-top:14px;">
            <button class="btn-action-primary" style="width:100%;" onclick="App.iniciarPrologoInteractivo(${paso + 1})">
              ${paso < numJugadores ? `Siguiente jugador (${jugadores[paso].nombre}) →` : 'Presentar a Bernardo (Personaje 5) →'}
            </button>
          </div>
        </div>
      `;
    } else if (paso === numJugadores + 1) {
      // Paso N+1: Conocer a Bernardo (Personaje 5)
      const bernardo = GameState.data.personajes?.secundarios?.find(s => s.id === 5) || {
        nombre: 'Bernardo',
        edad: 7,
        cita: '“Bernardo era un niño tranquilo y amable. Siempre que se le presentaba la oportunidad le gustaba estar con nosotros. Aunque era el más pequeño, se adaptaba bien a nuestro ritmo…”',
        preguntas_protagonista: ['¿Cómo era Bernardo?', '¿Qué le gustaba hacer en su tiempo libre?', '¿Recuerdas alguna anécdota con Bernardo?']
      };

      bodyHtml += `
        <div class="content-block">
          <div class="read-badge-silent">🤫 Carta de Personaje 5 en la mesa</div>
          <div class="content-label" style="color:var(--color-accent-gold);">
            👦 Conoce a Bernardo (7 años) — Personaje 5
          </div>

          <div class="read-badge-aloud">🗣️ Leed en voz alta el recuerdo de Bernardo:</div>
          <div class="narrative-quote">
            ${bernardo.cita}
          </div>

          <div class="read-badge-aloud" style="margin-top:8px;">🗣️ Preguntas para que el grupo responda en voz alta:</div>
          <ul class="content-questions">
            ${(bernardo.preguntas_protagonista || []).slice(0, 3).map(q => `<li>${q}</li>`).join('')}
          </ul>

          <div class="content-text" style="font-size:0.86rem;color:var(--color-text-dim);margin-top:8px;line-height:1.45;">
            Al terminar, el jugador protagonista cede su puesto al siguiente en sentido horario para rememorar el día de la festividad de 1910.
          </div>

          <div style="margin-top:14px;">
            <button class="btn-action-primary" style="width:100%;" onclick="App.iniciarPrologoInteractivo(${paso + 1})">
              El domingo de fiesta en Rioja →
            </button>
          </div>
        </div>
      `;
    } else {
      // Paso final: Domingo de fiesta en Rioja (Tarjeta de inicio Cara B)
      bodyHtml += `
        <div class="content-block">
          <div class="read-badge-silent">🤫 El siguiente jugador toma la palabra</div>
          <div class="content-label" style="color:var(--color-primary-light);">
            🔔 Domingo por la mañana — Festividad de la Virgen del Rosario (Rioja, 1910)
          </div>

          <div class="read-badge-aloud">🗣️ El nuevo protagonista lee en voz alta al grupo:</div>
          <div class="narrative-quote">
            “Cuando cierro los ojos, a veces aun a día de hoy, mi mente se transporta a mil novecientos diez, a aquel pequeño pueblo de Rioja, en Almería. Era por la mañana, un domingo. La luz del sol acariciaba las calles empedradas y las casas blancas, mientras una brisa fresca traía consigo el aroma de la tierra y el eco distante de la naturaleza. Las campanas de la iglesia resonaban suavemente, marcando el ritmo de un día especial: la festividad de la Virgen del Rosario, patrona de Rioja.<br><br>
            Caminábamos por las calles del pueblo. El ambiente era una mezcla de calma y devoción. Familias charlando animadamente mientras afinaban los últimos detalles de los preparativos.<br><br>
            Pero nosotros seguimos con nuestro recorrido. Dejamos atrás las calles empedradas y nos dirigimos hacia las afueras del pueblo. Los campos se extendían ante nosotros, verdes y vastos, bajo un cielo azul que parecía infinito.<br><br>
            Y allí estábamos nosotros, un grupo de niños corriendo, saltando y jugando en el campo, con nuestras risas resonando como campanillas en la brisa matutina. Niños obligados a vivir vidas de adultos, pero que por fin aquel día, podríamos disfrutar de un merecido descanso.”
          </div>

          <div style="margin-top:16px;">
            <button class="btn-action-primary" style="width:100%;padding:14px;font-size:1rem;font-weight:bold;" onclick="App.empezarNarracionInicial(); UI.closeModal();">
              ▶ Coger la carta de Narración 1
            </button>
          </div>
        </div>
      `;
    }

    bodyHtml += `</div>`;
    UI.showModal('🃏 Prólogo: El Verano de 1910', bodyHtml);
  },

  empezarNarracionInicial() {
    GameState.añadirPersonajeSecundario(5); // Bernardo siempre en juego al inicio
    this.irANarracion(1, false); // Comenzar sin rotar el protagonista del setup
  },

  // === RENDER JUEGO (ESCENARIO FIJO) ===
  renderJuego() {
    if (!GameState.partida.activa) return;

    UI.actualizarHUD();

    const narracionId = GameState.partida.narracionActual;
    if (narracionId) {
      this.mostrarNarracion(narracionId);
    } else {
      // Si no hay narración activa, mostrar el selector de localización en el escenario
      const container = document.getElementById('stage-card-wrapper');
      if (container) {
        container.innerHTML = `
          <div class="stage-card">
            <div class="stage-card-header">
              <span class="stage-card-badge">Exploración</span>
              <span class="stage-card-title">Seleccionad destino</span>
            </div>
            <div class="stage-card-scroll">
              <div class="content-block">
                <div class="content-label">🗺️ Localizaciones disponibles</div>
                <div class="content-text">Elige una localización en el mapa para continuar la historia:</div>
                <div class="grid-cards-list" style="margin-top:8px;">
                  ${this._renderListaLocalizacionesHtml()}
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
  },

  mostrarNarracion(id) {
    const narracion = GameState.data.narraciones.find(n => n.id === id);
    if (!narracion) return;

    // Aplicar consecuencias, pistas o personajes automáticos
    this._aplicarEfectosAutomaticos(narracion);

    // Renderizar la carta en pantalla fija
    UI.renderCartaEnEscenario(narracion);

    // Actualizar HUD
    UI.actualizarHUD();
  },

  _aplicarEfectosAutomaticos(narracion) {
    if (narracion.pistas && narracion.pistas.length) {
      narracion.pistas.forEach(pId => {
        if (!GameState.getPistaEnJuego(pId)) {
          GameState.añadirPista(pId);
          const p = GameState.getPista(pId);
          if (p) UI.toast(`🔍 Pista descubierta: ${p.nombre}`, 'success');
        }
      });
    }
    if (narracion.consecuencias_fijas && narracion.consecuencias_fijas.length) {
      narracion.consecuencias_fijas.forEach(cId => {
        if (!GameState.getConsecuenciaEnJuego(cId)) {
          GameState.añadirConsecuencia(cId);
          const c = GameState.getConsecuencia(cId);
          if (c) UI.toast(`📋 Consecuencia: ${c.nombre}`, 'warning');
        }
      });
    }
    if (narracion.personajes_secundarios && narracion.personajes_secundarios.length) {
      narracion.personajes_secundarios.forEach(pId => {
        if (!GameState.partida.personajes_secundarios_en_juego.includes(pId)) {
          GameState.añadirPersonajeSecundario(pId);
          const p = GameState.data.personajes.secundarios.find(s => s.id === pId);
          if (p) UI.toast(`👤 Personaje: ${p.nombre}`, 'info');
        }
      });
    }
    if (narracion.localizaciones_nuevas && narracion.localizaciones_nuevas.length) {
      narracion.localizaciones_nuevas.forEach(lId => {
        GameState.ponerLocalizacionEnJuego(lId);
      });
    }
  },

  irANarracion(id, rotarTurno = true) {
    if (window.SoundEffects) SoundEffects.playCardDraw();

    // Rotación de turno automática entre jugadores al avanzar de carta
    if (rotarTurno && GameState.partida.activa && GameState.partida.narracionActual !== null) {
      const proximaNarracion = GameState.data.narraciones.find(n => n.id === id);
      
      if (proximaNarracion && proximaNarracion.cambio_protagonista) {
        const target = proximaNarracion.cambio_protagonista.toLowerCase();
        let nuevoIdx = -1;

        if (target.includes('hermano')) {
          nuevoIdx = GameState.partida.jugadores.findIndex(j => (j.rol || '').toLowerCase().includes('hermano'));
        } else if (target.includes('amigo')) {
          // Asignar al siguiente amigo disponible
          const total = GameState.partida.jugadores.length;
          for (let step = 1; step <= total; step++) {
            const checkIdx = (GameState.partida.protagonistaIdx + step) % total;
            if ((GameState.partida.jugadores[checkIdx].rol || '').toLowerCase().includes('amigo')) {
              nuevoIdx = checkIdx;
              break;
            }
          }
        } else if (target.includes('herido')) {
          // Si algún jugador tiene la consecuencia 9 (Herido)
          nuevoIdx = GameState.partida.protagonistaIdx;
        }

        if (nuevoIdx !== -1) {
          GameState.partida.protagonistaIdx = nuevoIdx;
          GameState.guardarEnStorage();
        } else {
          GameState.pasarProtagonista();
        }
      } else {
        // Rotación normal en el sentido de las agujas del reloj
        GameState.pasarProtagonista();
      }

      const nuevoProt = GameState.getProtagonista();
      if (nuevoProt) {
        UI.toast(`🪙 Turno de ${nuevoProt.nombre} (${nuevoProt.rol})`, 'info', 2500);
      }
    }

    const narracion = GameState.irANarracion(id);
    if (narracion) {
      this.mostrarNarracion(id);
    }
  },

  ejecutarAccion(accion) {
    if (!accion || !accion.tipo) return;

    switch (accion.tipo) {
      case 'ir_narracion':
        this.irANarracion(accion.id);
        break;
      case 'viajar':
        this.viajarALocalizacion(accion.id);
        break;
      case 'poner_localizacion':
        GameState.ponerLocalizacionEnJuego(accion.id);
        UI.actualizarHUD();
        UI.toast(`🗺️ Localización ${accion.id} desbloqueada`, 'info');
        break;
      case 'obtener_consecuencia':
        if (!GameState.getConsecuenciaEnJuego(accion.id)) {
          GameState.añadirConsecuencia(accion.id);
          const c = GameState.getConsecuencia(accion.id);
          if (c) UI.toast(`📋 Consecuencia: ${c.nombre}`, 'warning');
          UI.actualizarHUD();
        }
        break;
      case 'devolver_consecuencia':
        GameState.devolverConsecuencia(accion.id);
        UI.toast(`↩️ Consecuencia ${accion.id} devuelta al mazo`, 'info');
        UI.actualizarHUD();
        break;
      case 'descartar_todas_localizaciones':
        GameState.descartarTodasLocalizaciones();
        UI.toast('🗺️ Localizaciones anteriores descartadas', 'info');
        UI.actualizarHUD();
        break;
      case 'reemplazar_localizacion':
        // Reemplazar 7A por 7B
        GameState.partida.localizaciones_en_juego = GameState.partida.localizaciones_en_juego.filter(l => String(l.id) !== String(accion.origen));
        GameState.ponerLocalizacionEnJuego(accion.destino);
        if (String(GameState.partida.localizacionActual) === String(accion.origen)) {
          GameState.partida.localizacionActual = accion.destino;
        }
        GameState.guardarEnStorage();
        UI.actualizarHUD();
        UI.toast(`🗺️ Cortijo transformado a ${accion.destino}`, 'info');
        break;
      case 'abandonar_localizacion':
        this.abandonarLocalizacionYViajar(accion.id);
        break;
      case 'fin_partida':
        this.abrirModalFinPartida();
        break;
    }
  },

  manejarDecision(opcion, narracionId) {
    if (opcion.carta) {
      this.irANarracion(opcion.carta);
    } else if (opcion.accion) {
      this.ejecutarAccion(opcion.accion);
    } else if (opcion.acciones) {
      opcion.acciones.forEach(a => this.ejecutarAccion(a));
    }
  },

  // Atajos para superar desafíos según reglas oficiales
  usarAtajoDesafio(id, desafio, tipo) {
    const btn = document.getElementById(`coin-btn-${id}`);
    const label = document.getElementById(`coin-res-label-${id}`);
    const resolucionBox = document.getElementById(`coin-resolucion-box-${id}`);

    if (window.SoundEffects) SoundEffects.playCoinResult(true);

    if (tipo === 'llave_dorada') {
      GameState.partida.pistas_en_juego = GameState.partida.pistas_en_juego.filter(p => p.id !== 5);
      GameState.guardarEnStorage();
      UI.toast('🔑 Llave dorada utilizada y devuelta al mazo', 'success');
      label.textContent = '✓ Superado con Llave Dorada 🔒';
    } else if (tipo === 'valentia') {
      GameState.devolverConsecuencia(1);
      UI.toast('✨ Valentía utilizada y devuelta al mazo', 'success');
      label.textContent = '✓ Superado con Valentía 👻';
    } else if (tipo === 'escopeta') {
      GameState.devolverConsecuencia(11);
      UI.toast('💥 Escopeta utilizada y devuelta al mazo', 'success');
      label.textContent = '✓ Superado con Escopeta Cargada';
    }

    if (btn) btn.innerHTML = '☀️';
    label.className = 'coin-result-badge favorable';
    resolucionBox.style.display = 'block';

    let html = '';
    if (desafio.favorable) {
      html += `<div class="alert-callout">👍 ${desafio.favorable.descripcion || desafio.favorable.texto || 'Resultado favorable.'}</div>`;
      if (desafio.favorable.tipo) this.ejecutarAccion(desafio.favorable);
    } else {
      html += `<div class="alert-callout">👍 Desafío superado automáticamente sin sufrir consecuencias.</div>`;
    }
    resolucionBox.innerHTML = html;
    UI.actualizarHUD();
  },

  abandonarLocalizacionYViajar(locId) {
    GameState.abandonarLocalizacion(locId);
    UI.toast('Habéis abandonado la localización', 'info');
    UI.actualizarHUD();
    GameState.partida.narracionActual = null;
    GameState.guardarEnStorage();
    this.abrirModalLocalizaciones(true);
  },

  // === LOCALIZACIONES & VIAJES ===
  viajarALocalizacion(id) {
    const res = GameState.viajarALocalizacion(id);
    if (!res) {
      UI.toast(`Localización ${id} no encontrada`, 'warning');
      return;
    }

    const { locData, locEstado } = res;
    UI.closeModal();

    // Determinar qué narración activa según las reglas
    let narracionId = null;
    let lineaKey = null;

    if (!locEstado.lineas_usadas.includes('primera_visita') && locData.primera_visita) {
      narracionId = locData.primera_visita.carta;
      lineaKey = 'primera_visita';
    } else {
      // Visitas siguientes: comprobar condiciones
      let match = false;
      if (locData.condiciones) {
        for (const cond of locData.condiciones) {
          if (locEstado.lineas_usadas.includes(cond.icono)) continue;
          if (GameState.tieneEfecto(cond.icono)) {
            narracionId = cond.carta;
            lineaKey = cond.icono;
            match = true;
            break;
          }
        }
      }
      if (!match && locData.sin_coincidencia && !locEstado.lineas_usadas.includes('sin_coincidencia')) {
        narracionId = locData.sin_coincidencia.carta;
        lineaKey = 'sin_coincidencia';
      }
    }

    if (lineaKey) {
      GameState.marcarLineaLocalizacionUsada(id, lineaKey);
    }

    if (narracionId) {
      UI.toast(`🗺️ Has viajado a: ${locData.nombre}`, 'info');

      // Si es primera visita y tiene cita, mostrarla para leer en voz alta
      if (lineaKey === 'primera_visita' && locData.cita) {
        const content = `
          <div class="content-block">
            <div class="read-badge-aloud">🗣️ Leer en voz alta al llegar al lugar</div>
            <div class="content-label">🗣️ Recuerdo del lugar:</div>
            <div class="narrative-quote">${locData.cita}</div>
            <button class="btn-action-primary" style="margin-top:14px;" onclick="UI.closeModal(); App.irANarracion(${narracionId});">
              ▶ Entrar y explorar
            </button>
          </div>
        `;
        UI.showModal(`📍 ${locData.nombre}`, content);
      } else {
        this.irANarracion(narracionId);
      }
    } else {
      // Sin hallazgos adicionales (lugar ya explorado):
      // Mostrar pantalla explicativa clara y botones para elegir otra localización
      this.mostrarLugarExplorado(locData);
    }
  },

  // Pantalla cuando se viaja a una localización sin eventos nuevos disponibles
  mostrarLugarExplorado(locData) {
    GameState.partida.narracionActual = null;
    GameState.guardarEnStorage();
    UI.actualizarHUD();

    const container = document.getElementById('stage-card-wrapper');
    if (!container) return;

    // Obtener otras localizaciones desbloqueadas para viajar
    const otrasLocs = GameState.partida.localizaciones_en_juego
      .filter(l => String(l.id) !== String(locData.id))
      .map(l => ({
        locEstado: l,
        locData: GameState.data.localizaciones.find(x => String(x.id) === String(l.id))
      }))
      .filter(x => x.locData);

    let botonesViajeHtml = '';
    if (otrasLocs.length) {
      botonesViajeHtml = otrasLocs.map(o => `
        <button class="btn-action-primary" onclick="App.viajarALocalizacion('${o.locData.id}')">
          🗺️ Viajar a: ${o.locData.nombre}
        </button>
      `).join('');
    } else {
      botonesViajeHtml = `
        <div class="alert-callout">No hay otras localizaciones disponibles en este momento.</div>
      `;
    }

    container.innerHTML = `
      <div class="stage-card">
        <div class="stage-card-header">
          <span class="stage-card-badge">Lugar explorado</span>
          <span class="stage-card-title">${locData.nombre}</span>
          <span class="stage-card-number">📍</span>
        </div>
        <div class="stage-card-scroll">
          <div class="content-block">
            <div class="content-label" style="color:var(--color-accent-gold);">🔍 Inspección completa del lugar</div>
            <div class="alert-callout" style="border-color:var(--color-primary);font-size:0.92rem;line-height:1.55;">
              Habéis registrado a fondo <strong>${locData.nombre}</strong>. En este momento no encontráis nada nuevo ni ninguna pista adicional que os ayude a dar con Bernardo.
            </div>
            <div class="content-text" style="margin-top:12px;">
              Debéis elegir otra localización en el mapa para continuar la búsqueda:
            </div>
            <div class="decision-button-stack" style="margin-top:12px;">
              ${botonesViajeHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _renderListaLocalizacionesHtml(puedeViajar = false) {
    const locsEnJuego = GameState.partida.localizaciones_en_juego;
    if (!locsEnJuego.length) {
      return '<div class="empty-state-box">No hay localizaciones en juego todavía.</div>';
    }

    return locsEnJuego.map(loc => {
      const lData = GameState.data.localizaciones.find(l => String(l.id) === String(loc.id));
      const esActual = String(GameState.partida.localizacionActual) === String(loc.id);

      let badgeHtml = '';
      if (esActual) {
        badgeHtml = '<span class="tag-badge" style="background:var(--color-primary);color:#070c0b;font-weight:bold;">Actual</span>';
      } else if (loc.visitada) {
        badgeHtml = '<span class="tag-badge">Visitada</span>';
      } else {
        badgeHtml = '<span class="tag-badge" style="border-color:var(--color-accent-gold);color:var(--color-accent-gold);">Por explorar</span>';
      }

      let clickAttr = '';
      let actionTag = '';
      if (puedeViajar && !esActual) {
        clickAttr = `onclick="App.viajarALocalizacion('${loc.id}')" style="cursor:pointer;"`;
        actionTag = '<span style="color:var(--color-primary-light);font-size:0.8rem;font-weight:bold;margin-left:auto;">Viajar →</span>';
      } else {
        clickAttr = 'style="cursor:default;"';
      }

      return `
        <div class="drawer-item-card" ${clickAttr}>
          <div class="drawer-item-icon">📍</div>
          <div class="drawer-item-content">
            <div class="drawer-item-title">
              <span>${lData ? lData.nombre : `Loc ${loc.id}`}</span>
              ${badgeHtml}
            </div>
            ${lData && lData.cita ? `<div class="drawer-item-desc">${lData.cita.substring(0, 95)}…</div>` : ''}
            ${actionTag}
          </div>
        </div>
      `;
    }).join('');
  },

  // === MODALES DE ICONOS SUPERIORES ===
  abrirModalLocalizaciones(forzarViaje = false) {
    const puedeViajar = forzarViaje || (GameState.partida.narracionActual === null);
    const content = `
      <div class="content-block">
        <div class="content-label">🗺️ Localizaciones en Juego</div>
        ${!puedeViajar ? `
          <div class="alert-callout" style="border-color:var(--color-primary);margin-bottom:8px;">
            🔒 <strong>Escena en curso:</strong> Estáis resolviendo la Carta #${GameState.partida.narracionActual}. 
            El mapa es solo de consulta; únicamente podréis viajar cuando la historia lo indique al terminar la escena.
          </div>
        ` : `
          <div class="alert-callout" style="margin-bottom:8px;">
            🗺️ Seleccionad una localización en el mapa para viajar e investigar.
          </div>
        `}
        <div class="grid-cards-list">
          ${this._renderListaLocalizacionesHtml(puedeViajar)}
        </div>
      </div>
    `;
    UI.showModal('🗺️ Localizaciones', content);
  },

  abrirModalPistas() {
    const pistas = GameState.partida.pistas_en_juego;
    let html = '';
    if (!pistas.length) {
      html = '<div class="empty-state-box">Aún no habéis descubierto ninguna pista.</div>';
    } else {
      html = `
        <div class="grid-cards-list">
          ${pistas.map(p => {
            const pData = GameState.getPista(p.id);
            if (!pData) return '';
            return `
              <div class="drawer-item-card" onclick="App.verDetallePista(${p.id})">
                <div class="drawer-item-icon">${pData.icono_efecto || '🔍'}</div>
                <div class="drawer-item-content">
                  <div class="drawer-item-title">
                    <span>${pData.nombre}</span>
                    <span class="tag-badge">#${pData.id}</span>
                  </div>
                  <div class="drawer-item-desc">${(pData.descripcion || '').substring(0, 80)}…</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
    UI.showModal(`🔍 Pistas en juego (${pistas.length})`, html);
  },

  verDetallePista(id) {
    const pData = GameState.getPista(id);
    if (!pData) return;
    const content = `
      <div class="content-block">
        <div class="content-label">${pData.nombre} (Pista #${pData.id})</div>
        <div class="content-text" style="white-space:pre-line;">${pData.descripcion || ''}</div>
        ${pData.dialogo ? `
          <div style="margin-top:10px;display:flex;flex-direction:column;gap:6px;">
            ${pData.dialogo.map(d => `<div class="alert-callout"><strong>${d.voz}:</strong> "${d.texto}"</div>`).join('')}
          </div>
        ` : ''}
        ${pData.icono_efecto ? `<div class="tag-badge" style="margin-top:8px;">Efecto en juego: ${pData.icono_efecto}</div>` : ''}
      </div>
    `;
    UI.showModal(`🔍 Pista #${pData.id}`, content);
  },

  abrirModalConsecuencias() {
    const cons = GameState.partida.consecuencias_en_juego;
    let html = '';
    if (!cons.length) {
      html = '<div class="empty-state-box">No hay consecuencias activas.</div>';
    } else {
      html = `
        <div class="grid-cards-list">
          ${cons.map(c => {
            const cData = GameState.getConsecuencia(c.id);
            if (!cData) return '';
            return `
              <div class="drawer-item-card" onclick="App.verDetalleConsecuencia(${c.id})">
                <div class="drawer-item-icon">📋</div>
                <div class="drawer-item-content">
                  <div class="drawer-item-title">
                    <span>${cData.nombre}</span>
                    <span class="tag-badge">${c.boca_arriba ? '👁️ Activa' : '🃏 Oculta'}</span>
                  </div>
                  <div class="drawer-item-desc">${c.boca_arriba ? (cData.descripcion_frente || '').substring(0, 80) : cData.descripcion_trasera}…</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
    UI.showModal(`📋 Consecuencias (${cons.length})`, html);
  },

  verDetalleConsecuencia(id) {
    const cData = GameState.getConsecuencia(id);
    const enJuego = GameState.getConsecuenciaEnJuego(id);
    if (!cData) return;
    const bocaArriba = enJuego ? enJuego.boca_arriba : cData.cara_visible;
    const content = `
      <div class="content-block">
        <div class="content-label">${cData.nombre} (Consecuencia #${cData.id})</div>
        <div class="narrative-quote" style="white-space:pre-line;">
          ${bocaArriba ? (cData.descripcion_frente || '') : cData.descripcion_trasera}
        </div>
        ${cData.icono_efecto ? `<div class="tag-badge" style="margin-top:8px;">Efecto: ${cData.icono_efecto}</div>` : ''}
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button class="btn-action-secondary" onclick="App.voltearConsecuencia(${id})">🔄 Voltear carta</button>
          <button class="btn-action-secondary" style="border-color:var(--color-danger);color:#f0a0a0;" onclick="App.devolverConsecuencia(${id})">Devolver al mazo</button>
        </div>
      </div>
    `;
    UI.showModal(`📋 Consecuencia #${cData.id}`, content);
  },

  voltearConsecuencia(id) {
    GameState.voltearConsecuencia(id);
    UI.closeModal();
    UI.actualizarHUD();
    UI.toast(`Consecuencia ${id} volteada`, 'info');
  },

  devolverConsecuencia(id) {
    GameState.devolverConsecuencia(id);
    UI.closeModal();
    UI.actualizarHUD();
    UI.toast(`Consecuencia ${id} devuelta`, 'info');
  },

  abrirModalPersonajes() {
    const pers = GameState.partida.personajes_secundarios_en_juego;
    let html = '';
    if (!pers.length) {
      html = '<div class="empty-state-box">No habéis interactuado con ningún personaje secundario.</div>';
    } else {
      html = `
        <div class="grid-cards-list">
          ${pers.map(id => {
            const p = GameState.data.personajes.secundarios.find(s => s.id === id);
            if (!p) return '';
            return `
              <div class="drawer-item-card" onclick="App.verDetallePersonaje(${id})">
                <div class="drawer-item-icon">👤</div>
                <div class="drawer-item-content">
                  <div class="drawer-item-title">
                    <span>${p.nombre}</span>
                    <span class="tag-badge">${p.edad ? `${p.edad} años` : ''}</span>
                  </div>
                  <div class="drawer-item-desc">${(p.descripcion || p.cita || '').substring(0, 80)}…</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
    UI.showModal(`👤 Personajes Conocidos (${pers.length})`, html);
  },

  verDetallePersonaje(id) {
    const p = GameState.data.personajes.secundarios.find(s => s.id === id);
    if (!p) return;
    const content = `
      <div class="content-block">
        <div class="content-label">${p.nombre} ${p.edad ? `(${p.edad} años)` : ''}</div>
        ${p.cita ? `<div class="narrative-quote">${p.cita}</div>` : ''}
        ${p.descripcion ? `<div class="content-text" style="margin-top:8px;">${p.descripcion}</div>` : ''}
        ${p.preguntas_protagonista ? `
          <div class="content-label" style="margin-top:10px;">Preguntas:</div>
          <ul class="content-questions">
            ${p.preguntas_protagonista.map(q => `<li>${q}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `;
    UI.showModal(`👤 Personaje #${p.id}`, content);
  },

  abrirModalJugadores() {
    const jugs = GameState.partida.jugadores;
    const prot = GameState.getProtagonista();
    const content = `
      <div class="content-block">
        <div class="content-label">Turno de los jugadores (toca para ceder la moneda 🪙)</div>
        <div class="grid-cards-list">
          ${jugs.map((j, i) => `
            <div class="drawer-item-card" onclick="App.setProtagonista(${i}); UI.closeModal();">
              <div class="drawer-item-icon">${j.id === (prot?.id ?? -1) ? '🪙' : '⚪'}</div>
              <div class="drawer-item-content">
                <div class="drawer-item-title">
                  <span>${j.nombre}</span>
                  <span class="tag-badge">${j.rol}</span>
                </div>
                <div class="drawer-item-desc">${j.id === (prot?.id ?? -1) ? 'Jugador protagonista actual' : 'Toca para pasarle el turno'}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    UI.showModal('👥 Turnos de Juego', content);
  },

  setProtagonista(idx) {
    GameState.partida.protagonistaIdx = idx;
    GameState.guardarEnStorage();
    UI.actualizarHUD();
    const prot = GameState.getProtagonista();
    UI.toast(`🪙 Turno cedido a ${prot.nombre}`, 'info');
    // Volver a renderizar la carta con el nuevo protagonista
    if (GameState.partida.narracionActual) {
      this.mostrarNarracion(GameState.partida.narracionActual);
    }
  },

  pasarTurno() {
    GameState.pasarProtagonista();
    UI.actualizarHUD();
    const prot = GameState.getProtagonista();
    UI.toast(`🪙 Turno de: ${prot.nombre}`, 'info');
    if (GameState.partida.narracionActual) {
      this.mostrarNarracion(GameState.partida.narracionActual);
    }
  },

  abrirModalCoraje() {
    const val = GameState.partida.coraje;
    const carta = GameState.data.coraje.find(c => c.nivel === val);
    const content = `
      <div class="challenge-card-box">
        <div style="font-family:var(--font-serif);font-size:3rem;color:var(--color-primary);font-weight:bold;line-height:1;">
          ${val}
        </div>
        <div class="content-label">${carta ? carta.texto : ''}</div>
        <div class="challenge-desc">${carta ? carta.descripcion : ''}</div>
        <div style="display:flex;gap:10px;width:100%;margin-top:10px;">
          <button class="btn-action-secondary" style="flex:1;" onclick="App.reducirCoraje()">▼ Reducir Coraje</button>
          <button class="btn-action-primary" style="flex:1;" onclick="App.aumentarCoraje()">▲ Aumentar Coraje</button>
        </div>
      </div>
    `;
    UI.showModal('💛 Coraje del Grupo', content);
  },

  reducirCoraje() {
    const nuevo = GameState.reducirCoraje();
    UI.actualizarHUD();
    UI.closeModal();
    UI.toast(`💔 Coraje reducido a ${nuevo}`, 'warning');
    if (nuevo === 1) {
      const c = GameState.data.coraje.find(k => k.nivel === 1);
      if (c && c.descanso) {
        UI.showModal('💔 Coraje 1 — Descanso Obligatorio', `
          <div class="content-block">
            <div class="narrative-quote">Apenas os quedan fuerzas. Realizad este descanso al cambiar de localización.</div>
            <div class="content-label" style="margin-top:10px;">🧠 Imagina:</div>
            <div class="content-text">${c.descanso.imagina}</div>
            <div class="content-label" style="margin-top:10px;">❓ Preguntas:</div>
            <ul class="content-questions">
              ${c.descanso.preguntas.map(q => `<li>${q}</li>`).join('')}
            </ul>
            <button class="btn-action-primary" style="margin-top:12px;" onclick="GameState.restaurarCoraje(3); UI.closeModal(); UI.actualizarHUD(); UI.toast('Coraje restaurado a 3', 'success');">
              Restaurar Coraje a 3
            </button>
          </div>
        `);
      }
    }
  },

  aumentarCoraje() {
    if (GameState.partida.coraje < 6) {
      GameState.partida.coraje++;
      GameState.guardarEnStorage();
      UI.actualizarHUD();
      UI.closeModal();
      UI.toast(`💛 Coraje subido a ${GameState.partida.coraje}`, 'success');
    }
  },

  abrirModalMonedaRapida() {
    const content = `
      <div class="challenge-card-box">
        <div class="content-label">Lanzamiento Rápido de Moneda</div>
        <div class="challenge-desc">Toca la moneda para cualquier resolución o prueba de coraje:</div>
        <div class="coin-stage" style="margin:16px 0;">
          <div class="coin-button" id="coin-quick-btn" onclick="App.tirarMonedaRapida()">🪙</div>
          <div id="coin-quick-res" class="coin-result-badge">Toca para lanzar</div>
        </div>
      </div>
    `;
    UI.showModal('🪙 Tirar Moneda', content);
  },

  tirarMonedaRapida() {
    const btn = document.getElementById('coin-quick-btn');
    const res = document.getElementById('coin-quick-res');
    if (!btn || btn.dataset.flipped) return;

    if (window.SoundEffects) SoundEffects.playCoinFlip();
    btn.classList.add('flipping');
    btn.dataset.flipped = 'true';
    res.textContent = 'Girando en el aire…';

    setTimeout(() => {
      const resultado = GameState.tirarMoneda();
      btn.classList.remove('flipping');
      btn.dataset.flipped = '';
      if (resultado === 'cara') {
        if (window.SoundEffects) SoundEffects.playCoinResult(true);
        btn.innerHTML = '☀️';
        res.textContent = '✓ CARA — Favorable';
        res.className = 'coin-result-badge favorable';
      } else {
        if (window.SoundEffects) SoundEffects.playCoinResult(false);
        btn.innerHTML = '✖️';
        res.textContent = '✗ CRUZ — Desfavorable';
        res.className = 'coin-result-badge desfavorable';
      }
    }, 650);
  },

  abrirModalMesa() {
    const locsCount = GameState.partida.localizaciones_en_juego.length;
    const pistasCount = GameState.partida.pistas_en_juego.length;
    const consCount = GameState.partida.consecuencias_en_juego.length;
    const persCount = GameState.partida.personajes_secundarios_en_juego.length;

    const content = `
      <div class="content-block">
        <div class="content-label">Estado de la Mesa (Toca un icono para ver el detalle)</div>
        <div class="grid-cards-list">
          <div class="drawer-item-card" onclick="UI.closeModal(); App.abrirModalLocalizaciones();">
            <div class="drawer-item-icon">🗺️</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Localizaciones</span><span class="tag-badge">${locsCount} disponibles</span></div>
              <div class="drawer-item-desc">Ver mapa y destinos para viajar.</div>
            </div>
          </div>

          <div class="drawer-item-card" onclick="UI.closeModal(); App.abrirModalPistas();">
            <div class="drawer-item-icon">🔍</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Pistas</span><span class="tag-badge">${pistasCount} obtenidas</span></div>
              <div class="drawer-item-desc">Tarro, retazo, notas, llaves doradas, etc.</div>
            </div>
          </div>

          <div class="drawer-item-card" onclick="UI.closeModal(); App.abrirModalConsecuencias();">
            <div class="drawer-item-icon">📋</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Consecuencias</span><span class="tag-badge">${consCount} en juego</span></div>
              <div class="drawer-item-desc">Valentía, amistad, heridas, mala fama.</div>
            </div>
          </div>

          <div class="drawer-item-card" onclick="UI.closeModal(); App.abrirModalPersonajes();">
            <div class="drawer-item-icon">👤</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Personajes</span><span class="tag-badge">${persCount} descubiertos</span></div>
              <div class="drawer-item-desc">Bernardo, Julio el loco, Leona, Agustina.</div>
            </div>
          </div>

          <div class="drawer-item-card" onclick="UI.closeModal(); App.abrirModalCoraje();">
            <div class="drawer-item-icon">💛</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Coraje</span><span class="tag-badge">Nivel ${GameState.partida.coraje}</span></div>
              <div class="drawer-item-desc">Gestionar ánimo y pruebas de coraje.</div>
            </div>
          </div>
        </div>
      </div>
    `;
    UI.showModal('📋 Mesa de Juego', content);
  },

  abrirBuscador() {
    const content = `
      <div style="margin-bottom:10px;">
        <input type="text" id="buscador-input" placeholder="Buscar por número o palabra (ej: botica, 14, tarro, escopeta)" 
               style="width:100%;padding:10px 12px;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-sm);color:var(--color-text);font-size:0.9rem;outline:none;"
               oninput="App.filtrarBusqueda(this.value)" autofocus />
      </div>
      <div id="buscador-resultados" class="grid-cards-list" style="max-height:50vh;overflow-y:auto;">
        <div class="empty-state-box">Escribe un término para buscar entre todas las cartas y manuales.</div>
      </div>
    `;
    UI.showModal('🔍 Buscar Carta o Regla', content);
    setTimeout(() => {
      const input = document.getElementById('buscador-input');
      if (input) input.focus();
    }, 150);
  },

  filtrarBusqueda(query) {
    const resEl = document.getElementById('buscador-resultados');
    if (!resEl) return;
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      resEl.innerHTML = '<div class="empty-state-box">Escribe un término para buscar.</div>';
      return;
    }

    const items = [];

    // Reglas e Iconos
    if (GameState.data.manual?.iconos) {
      Object.entries(GameState.data.manual.iconos).forEach(([icono, texto]) => {
        if (icono.includes(q) || texto.toLowerCase().includes(q)) {
          items.push({
            badge: 'Regla / Icono',
            titulo: `${icono} ${texto.split(':')[0]}`,
            desc: texto.split(':')[1] || texto,
            accion: () => {
              UI.closeModal();
              App.navegarA('manual');
            }
          });
        }
      });
    }

    // Pistas
    (GameState.data.pistas || []).forEach(p => {
      if (String(p.id) === q || (p.nombre || '').toLowerCase().includes(q) || (p.descripcion || '').toLowerCase().includes(q)) {
        items.push({
          badge: 'Pista',
          titulo: `Pista ${p.id}: ${p.nombre}`,
          desc: (p.descripcion || '').substring(0, 80) + '…',
          accion: () => {
            UI.closeModal();
            App.verDetallePista(p.id);
          }
        });
      }
    });

    // Consecuencias
    (GameState.data.consecuencias || []).forEach(c => {
      if (String(c.id) === q || (c.nombre || '').toLowerCase().includes(q) || (c.descripcion_frente || '').toLowerCase().includes(q)) {
        items.push({
          badge: 'Consecuencia',
          titulo: `Consecuencia ${c.id}: ${c.nombre}`,
          desc: (c.descripcion_frente || c.descripcion_trasera || '').substring(0, 80) + '…',
          accion: () => {
            UI.closeModal();
            App.verDetalleConsecuencia(c.id);
          }
        });
      }
    });

    if (!items.length) {
      resEl.innerHTML = `<div class="empty-state-box">No se encontraron resultados para "${query}"</div>`;
      return;
    }

    resEl.innerHTML = items.slice(0, 15).map((it, idx) => `
      <div class="drawer-item-card" onclick="App._ejecutarItemBusqueda(${idx})">
        <div class="drawer-item-content">
          <div class="drawer-item-title">
            <span>${it.titulo}</span>
            <span class="tag-badge">${it.badge}</span>
          </div>
          <div class="drawer-item-desc">${it.desc}</div>
        </div>
      </div>
    `).join('');

    this._busquedaEnCurso = items;
  },

  _ejecutarItemBusqueda(idx) {
    if (this._busquedaEnCurso && this._busquedaEnCurso[idx]) {
      this._busquedaEnCurso[idx].accion();
    }
  },

  renderManual() {
    const iconosEl = document.getElementById('iconos-manual');
    if (iconosEl && GameState.data.manual?.iconos) {
      iconosEl.innerHTML = Object.entries(GameState.data.manual.iconos).map(([k, v]) => {
        let titulo = k;
        let descripcion = v;
        if (v && v.includes(':')) {
          const parts = v.split(':');
          titulo = parts[0].trim();
          descripcion = parts.slice(1).join(':').trim();
        }
        return `
          <div class="drawer-item-card" style="cursor:default;">
            <div class="drawer-item-icon">${k}</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>${titulo}</span></div>
              <div class="drawer-item-desc">${descripcion}</div>
            </div>
          </div>
        `;
      }).join('');
    }
  },

  abrirModalFinPartida() {
    const bernardoSobrevivio = GameState.partida.historial.some(h => [53, 55, 57, 58].includes(h.id)) || GameState.partida.narracionActual === 58;
    const coraje = GameState.partida.coraje;
    const pistas = GameState.partida.pistas_en_juego.map(p => GameState.getPista(p.id)).filter(Boolean);
    const consecuencias = GameState.partida.consecuencias_en_juego.map(c => GameState.getConsecuencia(c.id)).filter(Boolean);
    const locs = GameState.partida.localizaciones_en_juego.map(l => GameState.data.localizaciones?.find(x => String(x.id) === String(l.id))).filter(Boolean);

    const content = `
      <div class="challenge-card-box" style="text-align:left;">
        <div style="text-align:center;margin-bottom:8px;">
          <div style="font-size:2.8rem;">${bernardoSobrevivio ? '🕊️' : '🕯️'}</div>
          <div class="stage-card-title" style="font-size:1.2rem;color:var(--color-accent-gold);">
            ${bernardoSobrevivio ? 'Bernardo sobrevivió al verano de 1910' : 'El trágico final de Bernardo'}
          </div>
          <div style="font-size:0.75rem;color:var(--color-text-dim);margin-top:2px;">
            Crónica periodística — Rioja (Almería) 1970
          </div>
        </div>

        <div class="alert-callout" style="font-size:0.86rem;line-height:1.5;margin-bottom:12px;">
          ${bernardoSobrevivio 
            ? '“Aunque los sucesos de aquel caluroso julio marcaron vuestras vidas para siempre, Bernardo pudo crecer junto a vosotros y vivir una vida plena y feliz.”' 
            : '“La sombra del Hombre del Saco y la pérdida de Bernardo pesaron como una losa sobre vuestra memoria durante los siguientes sesenta años.”'}
        </div>

        <div class="content-block" style="gap:8px;">
          <div class="content-label" style="color:var(--color-primary-light);">📊 Balance de la Investigación</div>
          
          <div class="drawer-item-card" style="cursor:default;">
            <div class="drawer-item-icon">💛</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Coraje final del grupo</span><span class="tag-badge">Nivel ${coraje} / 6</span></div>
              <div class="drawer-item-desc">${coraje >= 4 ? 'Mantuvisteis la entereza y la unión.' : 'El terror y la desesperación hicieron mella.'}</div>
            </div>
          </div>

          <div class="drawer-item-card" style="cursor:default;">
            <div class="drawer-item-icon">🔍</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Pistas descubiertas (${pistas.length})</span></div>
              <div class="drawer-item-desc">${pistas.length ? pistas.map(p => p.nombre).join(', ') : 'Ninguna pista encontrada.'}</div>
            </div>
          </div>

          <div class="drawer-item-card" style="cursor:default;">
            <div class="drawer-item-icon">📋</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Consecuencias sufridas (${consecuencias.length})</span></div>
              <div class="drawer-item-desc">${consecuencias.length ? consecuencias.map(c => c.nombre).join(', ') : 'Salisteis indemnes.'}</div>
            </div>
          </div>

          <div class="drawer-item-card" style="cursor:default;">
            <div class="drawer-item-icon">🗺️</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Localizaciones exploradas (${locs.length})</span></div>
              <div class="drawer-item-desc">${locs.length ? locs.map(l => l.nombre).join(', ') : '—'}</div>
            </div>
          </div>
        </div>

        <div style="display:flex;gap:8px;margin-top:14px;">
          <button class="btn-action-primary" style="flex:1;" onclick="App.confirmarResetear()">
            Iniciar nueva aventura
          </button>
          <button class="btn-action-secondary" style="flex:0 0 auto;" onclick="UI.closeModal();">
            Cerrar
          </button>
        </div>
      </div>
    `;
    UI.showModal('📜 Crónica Final de la Historia', content);
  },

  // Menú de partida y opciones (disponible en todo momento con ⚙️)
  abrirMenuPartida() {
    const temaActual = document.documentElement.getAttribute('data-theme') || 'lovecraft';
    const content = `
      <div class="content-block">
        <div class="content-label">Gestión de Partida</div>
        <div class="grid-cards-list">
          <div class="drawer-item-card" onclick="App.nuevaPartidaDesdeMenu()">
            <div class="drawer-item-icon">▶</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Iniciar Nueva Partida</span><span class="tag-badge">Nuevo grupo</span></div>
              <div class="drawer-item-desc">Configurar jugadores y empezar una aventura desde cero.</div>
            </div>
          </div>

          <div class="drawer-item-card" onclick="App.reiniciarPartidaActual()">
            <div class="drawer-item-icon">↺</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Reiniciar Historia</span><span class="tag-badge">Mismos jugadores</span></div>
              <div class="drawer-item-desc">Volver al inicio de la historia conservando los personajes actuales.</div>
            </div>
          </div>

          <div class="drawer-item-card" onclick="UI.closeModal(); App.navegarA('home');">
            <div class="drawer-item-icon">🏠</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title"><span>Ir a Portada</span></div>
              <div class="drawer-item-desc">Ver la pantalla de bienvenida sin borrar la partida.</div>
            </div>
          </div>
        </div>

        <div class="content-label" style="margin-top:14px;">🎨 Estilo Visual de la App</div>
        <div class="grid-cards-list">
          <div class="drawer-item-card ${temaActual === 'lovecraft' ? 'highlight' : ''}" onclick="App.cambiarTema('lovecraft')">
            <div class="drawer-item-icon">🐙</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title">
                <span>Lovecraft / Terror Cósmico</span>
                ${temaActual === 'lovecraft' ? '<span class="tag-badge">Activo</span>' : ''}
              </div>
              <div class="drawer-item-desc">Verde abisal, jade espectral, cardenillo y oropel arcano.</div>
            </div>
          </div>

          <div class="drawer-item-card ${temaActual === 'sepia' ? 'highlight' : ''}" onclick="App.cambiarTema('sepia')">
            <div class="drawer-item-icon">📜</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title">
                <span>Almería 1910 (Sepia Histórico)</span>
                ${temaActual === 'sepia' ? '<span class="tag-badge">Activo</span>' : ''}
              </div>
              <div class="drawer-item-desc">Tierra seca, sol andaluz y pergamino envejecido.</div>
            </div>
          </div>

          <div class="drawer-item-card ${temaActual === 'noir' ? 'highlight' : ''}" onclick="App.cambiarTema('noir')">
            <div class="drawer-item-icon">🌑</div>
            <div class="drawer-item-content">
              <div class="drawer-item-title">
                <span>Arkham Noir</span>
                ${temaActual === 'noir' ? '<span class="tag-badge">Activo</span>' : ''}
              </div>
              <div class="drawer-item-desc">Alto contraste, blanco y negro dramático.</div>
            </div>
          </div>
        </div>
      </div>
    `;
    UI.showModal('⚙️ Menú de Partida y Estilos', content);
  },

  nuevaPartidaDesdeMenu() {
    if (GameState.partida.activa) {
      if (!confirm('¿Deseas iniciar una nueva partida? Se descartará la partida en curso.')) {
        return;
      }
    }
    GameState.resetearPartida();
    UI.closeModal();
    this.navegarA('setup');
  },

  reiniciarPartidaActual() {
    if (!GameState.partida.activa) return;
    if (!confirm('¿Deseas reiniciar la historia desde el principio con los mismos jugadores?')) return;

    const jugadores = GameState.partida.jugadores;
    const protIdx = GameState.partida.protagonistaIdx;
    GameState.iniciarPartida(jugadores);
    GameState.partida.protagonistaIdx = protIdx;
    UI.closeModal();
    UI.toast('Historia reiniciada al inicio', 'info');
    this.mostrarTarjetaInicio();
  },

  cambiarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('hds_tema', tema);
    UI.toast(`Estilo cambiado a: ${tema}`, 'success');
    this.abrirMenuPartida(); // Refrescar modal
  },

  confirmarResetear() {
    if (confirm('¿Deseas reiniciar o abandonar la partida actual?')) {
      GameState.resetearPartida();
      UI.closeModal();
      this.navegarA('home');
      UI.toast('Partida reiniciada', 'info');
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
