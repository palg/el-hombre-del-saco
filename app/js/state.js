/**
 * El Hombre del Saco - App
 * Estado del juego y gestión de datos
 */

const GameState = {
  // Datos cargados desde JSON
  data: {
    manual: null,
    narraciones: null,
    localizaciones: null,
    pistas: null,
    consecuencias: null,
    personajes: null,
    coraje: null,
  },

  // Estado de la partida en curso
  partida: {
    activa: false,
    jugadores: [],         // { id, nombre, rol, esProtagonista }
    protagonistaIdx: 0,    // índice del protagonista actual
    narracionActual: null, // número de narración activa
    localizacionActual: null, // id de la localización activa
    coraje: 6,             // valor actual de coraje
    // Colecciones en juego
    localizaciones_en_juego: [], // { id, visitada, boca_arriba, lineas_usadas: [] }
    pistas_en_juego: [],         // ids de pistas obtenidas
    consecuencias_en_juego: [],  // { id, boca_arriba }
    personajes_secundarios_en_juego: [], // ids de personajes secundarios
    // Estado de la moneda y resoluciones
    ultimo_resultado_moneda: null, // 'cara' | 'cruz'
    // Historial para referencia
    historial: [],
  },

  // Inicializar estado desde localStorage si existe
  cargarDesdeStorage() {
    const guardado = localStorage.getItem('hds_partida');
    if (guardado) {
      try {
        this.partida = JSON.parse(guardado);
      } catch(e) {
        console.warn('Error cargando partida guardada:', e);
      }
    }
  },

  // Guardar estado en localStorage
  guardarEnStorage() {
    localStorage.setItem('hds_partida', JSON.stringify(this.partida));
  },

  // Iniciar nueva partida
  iniciarPartida(jugadores) {
    this.partida = {
      activa: true,
      jugadores,
      protagonistaIdx: 0,
      narracionActual: 1,
      localizacionActual: null,
      coraje: 6,
      localizaciones_en_juego: [],
      pistas_en_juego: [],
      consecuencias_en_juego: [],
      personajes_secundarios_en_juego: [],
      ultimo_resultado_moneda: null,
      historial: [],
    };
    this.guardarEnStorage();
  },

  // Obtener protagonista actual
  getProtagonista() {
    if (!this.partida.jugadores.length) return null;
    return this.partida.jugadores[this.partida.protagonistaIdx];
  },

  // Pasar protagonista al siguiente jugador
  pasarProtagonista() {
    const n = this.partida.jugadores.length;
    this.partida.protagonistaIdx = (this.partida.protagonistaIdx + 1) % n;
    this.guardarEnStorage();
  },

  // Ir a una narración concreta
  irANarracion(id) {
    const narracion = this.data.narraciones.find(n => n.id === id);
    if (!narracion) {
      console.error(`Narración ${id} no encontrada`);
      return null;
    }
    this.partida.historial.push({ tipo: 'narracion', id, timestamp: Date.now() });
    this.partida.narracionActual = id;
    this.guardarEnStorage();
    return narracion;
  },

  // Viajar a una localización
  viajarALocalizacion(id) {
    const locData = this.data.localizaciones.find(l => String(l.id) === String(id));
    if (!locData) return null;

    let locEstado = this.partida.localizaciones_en_juego.find(l => String(l.id) === String(id));
    if (!locEstado) {
      locEstado = { id, visitada: false, boca_arriba: false, lineas_usadas: [] };
      this.partida.localizaciones_en_juego.push(locEstado);
    }

    // Dar la vuelta (boca arriba) si no estaba
    locEstado.boca_arriba = true;
    this.partida.localizacionActual = id;

    this.guardarEnStorage();
    return { locData, locEstado };
  },

  // Abandonar localización (boca abajo)
  abandonarLocalizacion(id) {
    const idStr = String(id !== undefined ? id : this.partida.localizacionActual);
    const locEstado = this.partida.localizaciones_en_juego.find(l => String(l.id) === idStr);
    if (locEstado) {
      locEstado.boca_arriba = false;
      locEstado.visitada = true;
    }
    if (String(this.partida.localizacionActual) === idStr) {
      this.partida.localizacionActual = null;
    }
    this.guardarEnStorage();
  },

  // Poner localización en juego
  ponerLocalizacionEnJuego(id) {
    const existe = this.partida.localizaciones_en_juego.find(l => String(l.id) === String(id));
    if (!existe) {
      this.partida.localizaciones_en_juego.push({ id, visitada: false, boca_arriba: false, lineas_usadas: [] });
      this.guardarEnStorage();
    }
  },

  // Descartar todas las localizaciones
  descartarTodasLocalizaciones() {
    this.partida.localizaciones_en_juego = [];
    this.partida.localizacionActual = null;
    this.guardarEnStorage();
  },

  // Marcar línea de localización como usada
  marcarLineaLocalizacionUsada(locId, lineaKey) {
    const loc = this.partida.localizaciones_en_juego.find(l => String(l.id) === String(locId));
    if (loc && !loc.lineas_usadas.includes(lineaKey)) {
      loc.lineas_usadas.push(lineaKey);
      this.guardarEnStorage();
    }
  },

  // Obtener pista por ID
  getPista(id) {
    return this.data.pistas.find(p => p.id === id);
  },

  // Obtener pista en juego
  getPistaEnJuego(id) {
    return this.partida.pistas_en_juego.find(p => p.id === id);
  },

  // Añadir pista al juego
  añadirPista(id) {
    // Regla especial de manual: Pista 19 reemplaza a Pista 18
    if (id === 19) {
      this.partida.pistas_en_juego = this.partida.pistas_en_juego.filter(p => p.id !== 18);
    }
    if (!this.partida.pistas_en_juego.find(p => p.id === id)) {
      this.partida.pistas_en_juego.push({ id });
      this.guardarEnStorage();
    }
  },

  // Obtener consecuencia por ID
  getConsecuencia(id) {
    return this.data.consecuencias.find(c => c.id === id);
  },

  // Obtener consecuencia en juego
  getConsecuenciaEnJuego(id) {
    return this.partida.consecuencias_en_juego.find(c => c.id === id);
  },

  // Obtener/añadir consecuencia al juego
  añadirConsecuencia(id) {
    if (!this.partida.consecuencias_en_juego.find(c => c.id === id)) {
      const consData = this.getConsecuencia(id);
      this.partida.consecuencias_en_juego.push({
        id,
        boca_arriba: consData ? consData.cara_visible : false
      });
      this.guardarEnStorage();
    }
  },

  // Voltear consecuencia
  voltearConsecuencia(id) {
    const cons = this.partida.consecuencias_en_juego.find(c => c.id === id);
    if (cons) {
      cons.boca_arriba = !cons.boca_arriba;
      this.guardarEnStorage();
    }
  },

  // Devolver consecuencia al mazo
  devolverConsecuencia(id) {
    this.partida.consecuencias_en_juego = this.partida.consecuencias_en_juego.filter(c => c.id !== id);
    this.guardarEnStorage();
  },

  // Añadir personaje secundario en juego
  añadirPersonajeSecundario(id) {
    if (!this.partida.personajes_secundarios_en_juego.includes(id)) {
      this.partida.personajes_secundarios_en_juego.push(id);
      this.guardarEnStorage();
    }
  },

  // Reducir coraje
  reducirCoraje() {
    if (this.partida.coraje > 1) {
      this.partida.coraje--;
      this.guardarEnStorage();
      return this.partida.coraje;
    }
    return 1;
  },

  // Restaurar coraje
  restaurarCoraje(valor) {
    this.partida.coraje = Math.min(6, Math.max(1, valor || 6));
    this.guardarEnStorage();
  },

  // Comprobar si se puede ayudar en un desafío (reglas oficiales de Coraje y Consecuencias)
  puedeAyudarse() {
    // 1. Nivel de coraje (coraje 1, 2 y 3 impiden la ayuda)
    const cartaCoraje = this.data.coraje.find(c => c.nivel === this.partida.coraje);
    if (cartaCoraje && !cartaCoraje.puede_ayudarse) return false;

    // 2. Consecuencia 5 (Amistad): mientras esté en juego no se puede ayudar
    if (this.getConsecuenciaEnJuego(5)) return false;

    // 3. Consecuencia 3 (Miedo): desafíos se resuelven sin ayuda de compañeros
    if (this.getConsecuenciaEnJuego(3)) return false;

    // 4. Consecuencia 9 (Herido): desafíos se resuelven con un solo lanzamiento
    if (this.getConsecuenciaEnJuego(9)) return false;

    return true;
  },

  // Tirar moneda (simulado)
  tirarMoneda() {
    const resultado = Math.random() < 0.5 ? 'cara' : 'cruz';
    this.partida.ultimo_resultado_moneda = resultado;
    this.guardarEnStorage();
    return resultado;
  },

  // Comprobar si una consecuencia/pista con un icono está en juego
  tieneEfecto(icono) {
    // Comprobar en consecuencias
    for (const cEnJuego of this.partida.consecuencias_en_juego) {
      if (!cEnJuego.boca_arriba) continue;
      const cData = this.getConsecuencia(cEnJuego.id);
      if (cData && cData.icono_efecto === icono) return true;
    }
    // Comprobar en pistas
    for (const pEnJuego of this.partida.pistas_en_juego) {
      const pData = this.getPista(pEnJuego.id);
      if (pData && pData.icono_efecto === icono) return true;
    }
    return false;
  },

  // Contar efectos de sangre
  contarEfectosSangre() {
    let count = 0;
    for (const cEnJuego of this.partida.consecuencias_en_juego) {
      if (!cEnJuego.boca_arriba) continue;
      const cData = this.getConsecuencia(cEnJuego.id);
      if (cData && cData.icono_efecto === '🩸') count++;
    }
    return count;
  },

  // Resetear partida
  resetearPartida() {
    this.partida = {
      activa: false,
      jugadores: [],
      protagonistaIdx: 0,
      narracionActual: null,
      localizacionActual: null,
      coraje: 6,
      localizaciones_en_juego: [],
      pistas_en_juego: [],
      consecuencias_en_juego: [],
      personajes_secundarios_en_juego: [],
      ultimo_resultado_moneda: null,
      historial: [],
    };
    localStorage.removeItem('hds_partida');
  }
};
