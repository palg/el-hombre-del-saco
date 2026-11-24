# El Hombre del Saco — Web App Móvil Serverless

Una aplicación web progresiva (PWA) serverless diseñada para sustituir el libro físico y actuar como soporte digital de lectura, seguimiento y juego en mesa para el juego de rol de cartas **El Hombre del Saco** (por Pablo López).

---

## 📱 Características principales

1. **100% Serverless y Offline**:
   - Funciona directamente en cualquier navegador moderno sin requerir backend, base de datos externa ni conexión continua gracias a su Service Worker (`sw.js`).
   - Todos los datos y estados se almacenan de manera local y persistente (`localStorage`).

2. **Arquitectura modular desacoplada mediante JSON**:
   - Toda la información de los manuales y cartas está codificada en ficheros JSON independientes bajo `app/data/`, lo que permite modificar textos, añadir cartas o cambiar reglas sin tocar el código JavaScript ni el HTML.
   - Fácil mantenimiento, traducción o ampliación de niveles y campañas.

3. **Interfaz Móvil First & Temas Visuales (Lovecraft / Terror Cósmico)**:
   - Diseñada especialmente para pantallas de smartphones y tablets en mesa de juego en orientación vertical fija (sin scroll global de pantalla).
   - **Tema visual Lovecraftiano activo por defecto**: tonos de verde abisal, jade espectral, cardenillo, oropel arcano corrompido, fuentes serif góticas y resplandores ominosos.
   - **Sistema modular de temas**: fácil de cambiar o personalizar mediante variables CSS en `:root`. Incluye selector en caliente de 3 estilos:
     * 🐙 *Lovecraft / Terror Cósmico*
     * 📜 *Almería 1910 (Sepia Histórico)*
     * 🌑 *Arkham Noir (Alto Contraste)*
   - **Menú de partida (⚙️)**: botón siempre visible en la cabecera para iniciar nueva partida, reiniciar la historia con los mismos jugadores o cambiar de estilo visual en cualquier momento.

4. **Soporte completo de mecánicas de juego**:
   - **Lanzador de moneda interactivo** integrado con efectos sonoros Web Audio (sin dependencias de archivos de audio externos) y vibración háptica en móvil.
   - **Mecánica de ayuda colaborativa**: cálculo automático de doble tirada y activación de *Consecuencia 5: Amistad*.
   - **Gestor de Coraje interactivo**: de 6 a 1 con activación automática de descansos obligatorios al llegar a nivel 1.
   - **Gestor de Localizaciones**: control de cartas boca abajo/arriba, descarte automático de líneas ya utilizadas, y detección inteligente de iconos de desbloqueo (tarro 🫙, llaves 🗝️, botica 💊, tijeras ✂️, etc.).
   - **Gestor de Pistas y Consecuencias**: volteo de cartas ocultas, asignación a personajes (como Bernardo 🩸) y consulta instantánea.
   - **Buscador global rápido**: permite buscar cualquier carta por número, nombre o palabra clave para agilizar la consulta durante la partida.

---

## 📁 Estructura del Proyecto

```text
app/
├── index.html              # Estructura principal y vistas de la app
├── manifest.json           # Manifiesto PWA para instalación en móvil
├── sw.js                   # Service Worker para ejecución offline
├── icons/
│   └── icon.svg            # Icono vectorial de la app
├── css/
│   └── styles.css          # Estilos móviles, animaciones y diseño oscuro
├── js/
│   ├── sound.js            # Sintetizador Web Audio API para moneda y cartas
│   ├── state.js            # Estado reactivo y persistencia (localStorage)
│   ├── ui.js               # Renderizado de cartas, modal y desafío con moneda
│   └── app.js              # Controlador principal, buscador y flujo de juego
└── data/                   # Ficheros JSON con todo el contenido del juego
    ├── manual.json         # Reglas, preparación, variantes e iconos
    ├── narraciones.json    # Las 59 cartas de narración completas
    ├── localizaciones.json # Las 11 cartas de localización y sus condiciones
    ├── pistas.json         # Las 19 cartas de pista y diálogos de trance
    ├── consecuencias.json  # Las 15 cartas de consecuencia y sus efectos
    ├── personajes.json     # Personajes principales (1-4) y secundarios (5-10)
    └── coraje.json         # Los 6 niveles de coraje y evento de descanso
```

---

## 🛠️ Cómo modificar el contenido

El contenido narrativo y las cartas están en la carpeta `data/`:

- Puedes editar directamente los archivos `data/*.js` (que contienen la misma estructura que un JSON con `window.DATA_X = [...]`), o los archivos `data/*.json`.
- Si prefieres editar los archivos `.json`, solo haz doble clic en `sync-data.bat` para sincronizar los cambios automáticamente con la versión local ejecutable.

---

## 🚀 Cómo ejecutar la app

1. **Abrir directamente (Doble clic)**:
   Haz doble clic sobre `index.html`. Funciona de inmediato sin necesidad de instalar servidores ni comandos, compatible con cualquier navegador moderno (Edge, Chrome, Firefox, Safari).
2. **Servidor local / Móvil (para PWA)**:
   Si quieres compartirla en tu red WiFi local o instalarla como aplicación móvil:
   ```bash
   npx serve app
   ```
3. **Instalación en el móvil (PWA)**:
   Abre la IP en el navegador de tu móvil y selecciona **"Añadir a la pantalla de inicio"** para usarla a pantalla completa y sin conexión.
