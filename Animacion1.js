/**
 * Animacion1.js
 * Simulación visual del Ejercicio 1: Lanzamiento Vertical (Bateo).
 * ----------------------------------------------------------------
 * Muestra una pelota de béisbol subiendo y bajando, dibujando vectores
 * de velocidad y marcadores de altura en tiempo real.
 */

window.prepararCanvas1 = () => {
 const canvas = document.getElementById('canvas1');
 const ctx = canvas.getContext('2d');
 const btnAnim = document.getElementById('btn-anim-1');
 const btnReset = document.getElementById('btn-reset-1');
 
 // --- PARÁMETROS FÍSICOS DEL PROBLEMA ---
 const g = 9.8; // Gravedad (m/s^2)
 const t_subida = 3; // Tiempo de subida (s)
 const v0 = g * t_subida; // Velocidad inicial calculada (29.4 m/s)
 const h_max = 44.1; // Altura máxima calculada (m)
 
 // --- VARIABLES DE ESTADO DE LA ANIMACIÓN ---
 let tiempo = 0; // Tiempo actual de la simulación
 let animando = false; // Estado de reproducción
 let escalaY = 0; // Píxeles por metro (se calcula dinámicamente)
 let sueloY = 0; // Posición Y del suelo en el canvas
 
 // Configuración visual
 const radioPelota = 10;
 
 /**
  * Ajusta el tamaño del canvas al contenedor (Responsive)
  * y recalcula la escala para que la altura máxima quepa en la pantalla.
  */
 const resizeCanvas = () => {
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight || 300; // Altura base si no está definida
  
  // Definimos el suelo al 90% de la altura del canvas
  sueloY = canvas.height * 0.9;
  
  // Calculamos la escala: Queremos que h_max ocupe el 80% del espacio disponible hacia arriba
  // Espacio disponible = sueloY - (margen superior)
  const espacioUtil = sueloY - 40;
  escalaY = espacioUtil / h_max;
 };
 
 /**
  * Dibuja el fondo, suelo y reglas de medición
  */
 const drawBackground = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 1. Dibujar Suelo (Estilo Neuromórfico)
  ctx.beginPath();
  ctx.moveTo(0, sueloY);
  ctx.lineTo(canvas.width, sueloY);
  ctx.strokeStyle = '#2b5876'; // Azul Rey
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Sombra del suelo
  ctx.fillStyle = 'rgba(43, 88, 118, 0.1)';
  ctx.fillRect(0, sueloY, canvas.width, canvas.height - sueloY);
  
  // 2. Línea de Altura Máxima (Meta)
  const yMax = sueloY - (h_max * escalaY);
  ctx.beginPath();
  ctx.setLineDash([5, 5]); // Línea punteada
  ctx.moveTo(canvas.width * 0.3, yMax);
  ctx.lineTo(canvas.width * 0.7, yMax);
  ctx.strokeStyle = '#4e4376'; // Azul Clarito
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]); // Resetear
  
  // Texto de Altura Máxima
  ctx.font = '12px Oswald';
  ctx.fillStyle = '#4e4376';
  ctx.fillText(`H. Máx: ${h_max.toFixed(1)}m`, canvas.width * 0.72, yMax + 4);
 };
 
 /**
  * Dibuja la pelota de béisbol con detalles
  */
 const drawBall = (x, y) => {
  ctx.save();
  ctx.translate(x, y);
  
  // Sombra de la pelota (si está cerca del suelo)
  if (y < sueloY - radioPelota) {
   const distanciaSuelo = sueloY - y;
   const opacidad = Math.max(0, 1 - distanciaSuelo / 200);
   const radioSombra = radioPelota + (distanciaSuelo * 0.1);
   
   ctx.save();
   ctx.translate(0, distanciaSuelo); // Mover al suelo
   ctx.scale(1, 0.3); // Aplastar sombra
   ctx.beginPath();
   ctx.arc(0, 0, radioSombra, 0, Math.PI * 2);
   ctx.fillStyle = `rgba(0,0,0,${opacidad * 0.2})`;
   ctx.fill();
   ctx.restore();
  }
  
  // Cuerpo de la pelota
  ctx.beginPath();
  ctx.arc(0, 0, radioPelota, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#ccc';
  ctx.stroke();
  
  // Costuras rojas (Detalle visual)
  ctx.beginPath();
  ctx.arc(-5, 0, radioPelota - 2, -0.5, 0.5);
  ctx.strokeStyle = '#ff4444';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(5, 0, radioPelota - 2, Math.PI - 0.5, Math.PI + 0.5);
  ctx.stroke();
  
  ctx.restore();
 };
 
 /**
  * Dibuja el vector de velocidad y etiquetas de datos
  */
 const drawInfo = (x, y, velActual, alturaActual) => {
  // 1. Vector Velocidad (Flecha)
  // La longitud depende de la magnitud de la velocidad
  const longitudFlecha = velActual * 2; // Factor visual arbitrario
  
  if (Math.abs(longitudFlecha) > 1) {
   ctx.beginPath();
   ctx.moveTo(x, y);
   ctx.lineTo(x, y - longitudFlecha); // Menos porque Y crece hacia abajo
   ctx.strokeStyle = '#2962ff'; // Azul eléctrico
   ctx.lineWidth = 2;
   ctx.stroke();
   
   // Punta de flecha
   const headLen = 5;
   const angle = Math.atan2(-longitudFlecha, 0);
   ctx.beginPath();
   ctx.moveTo(x, y - longitudFlecha);
   ctx.lineTo(x - headLen * Math.cos(angle - Math.PI / 6), (y - longitudFlecha) - headLen * Math.sin(angle - Math.PI / 6));
   ctx.lineTo(x + headLen * Math.cos(angle + Math.PI / 6), (y - longitudFlecha) - headLen * Math.sin(angle + Math.PI / 6));
   ctx.fillStyle = '#2962ff';
   ctx.fill();
  }
  
  // 2. HUD (Heads Up Display) - Datos en tiempo real
  ctx.font = '14px Oswald';
  ctx.fillStyle = '#2b5876';
  ctx.textAlign = 'left';
  
  // Caja de información flotante
  const infoX = 10;
  const infoY = 20;
  
  ctx.fillText(`Tiempo: ${tiempo.toFixed(2)} s`, infoX, infoY);
  ctx.fillText(`Altura: ${alturaActual.toFixed(1)} m`, infoX, infoY + 20);
  ctx.fillText(`Velocidad: ${Math.abs(velActual).toFixed(1)} m/s`, infoX, infoY + 40);
 };
 
 /**
  * Bucle principal de animación
  */
 const animate = () => {
  if (!animando) return;
  
  // 1. Actualizar Física
  // Incremento de tiempo (dt). Usamos un paso pequeño para suavidad.
  const dt = 0.04;
  tiempo += dt;
  
  // Ecuaciones de Movimiento Vertical
  // y = v0*t - 0.5*g*t^2
  let alturaReal = (v0 * tiempo) - (0.5 * g * Math.pow(tiempo, 2));
  
  // v = v0 - g*t
  let velocidadReal = v0 - (g * tiempo);
  
  // Condición de parada: Si vuelve al suelo (y < 0)
  if (alturaReal < 0 && tiempo > 0.5) {
   alturaReal = 0;
   velocidadReal = 0;
   tiempo = t_subida * 2; // Tiempo total de vuelo aprox
   animando = false;
   btnAnim.textContent = "Reiniciar";
  }
  
  // 2. Mapeo a Coordenadas Canvas
  // Y en canvas crece hacia abajo, por eso restamos desde sueloY
  const xPos = canvas.width / 2;
  const yPos = sueloY - (alturaReal * escalaY);
  
  // 3. Dibujar Frame
  drawBackground();
  drawBall(xPos, yPos);
  drawInfo(xPos, yPos, velocidadReal, alturaReal);
  
  // 4. Solicitar siguiente frame
  AppState.animationFrameId = requestAnimationFrame(animate);
 };
 
 // --- CONTROLADORES DE EVENTOS ---
 
 // Inicializar
 resizeCanvas();
 window.addEventListener('resize', () => {
  resizeCanvas();
  // Redibujar estático si está pausado
  if (!animando) {
   drawBackground();
   drawBall(canvas.width / 2, sueloY);
  }
 });
 
 // Botón Reproducir / Pausar
 btnAnim.onclick = () => {
  if (btnAnim.textContent === "Reiniciar") {
   resetSimulation();
   animando = true;
   btnAnim.textContent = "Pausar";
   animate();
  } else if (animando) {
   animando = false;
   btnAnim.textContent = "Continuar";
   cancelAnimationFrame(AppState.animationFrameId);
  } else {
   animando = true;
   btnAnim.textContent = "Pausar";
   animate();
  }
 };
 
 // Botón Reiniciar
 btnReset.onclick = () => {
  resetSimulation();
 };
 
 const resetSimulation = () => {
  animando = false;
  tiempo = 0;
  cancelAnimationFrame(AppState.animationFrameId);
  btnAnim.textContent = "Reproducir Animación";
  
  // Dibujar estado inicial
  drawBackground();
  drawBall(canvas.width / 2, sueloY);
 };
 
 // Función de limpieza (llamada desde Script.js al cambiar de tab)
 AppState.activeAnimation = () => {
  animando = false;
  cancelAnimationFrame(AppState.animationFrameId);
 };
 
 // Dibujo inicial
 resetSimulation();
};