/**
 * Animacion2.js
 * Simulación visual del Ejercicio 2: Encuentro de dos cuerpos.
 * ----------------------------------------------------------------
 * Representa un edificio de 800m, una pelota cayendo (A) y otra subiendo (B).
 * Muestra el punto exacto de intersección.
 */

window.prepararCanvas2 = () => {
 const canvas = document.getElementById('canvas2');
 const ctx = canvas.getContext('2d');
 const btnAnim = document.getElementById('btn-anim-2');
 const btnReset = document.getElementById('btn-reset-2');
 
 // --- PARÁMETROS FÍSICOS ---
 const H_edificio = 800; // m
 const v0_A = -80; // m/s (hacia abajo)
 const v0_B = 80; // m/s (hacia arriba)
 const g = 9.8; // m/s^2
 const t_cruce = 5; // s (Calculado teóricamente)
 const h_cruce = 277.5; // m (Calculado teóricamente)
 
 // --- ESTADO DE LA ANIMACIÓN ---
 let tiempo = 0;
 let animando = false;
 let escalaY = 0; // px/m
 let sueloY = 0;
 let origenX_A = 0; // Posición X de la pelota A
 let origenX_B = 0; // Posición X de la pelota B
 
 // Configuración Visual
 const radioPelota = 8;
 
 /**
  * Ajuste Responsive: Calcula la escala para que 800m quepan en el canvas
  */
 const resizeCanvas = () => {
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight || 350; // Un poco más alto para este ejercicio
  
  sueloY = canvas.height * 0.9;
  const techoY = canvas.height * 0.1; // Margen superior
  
  // Calcular escala: 800m deben caber entre el suelo y el techo
  const alturaDisponible = sueloY - techoY;
  escalaY = alturaDisponible / H_edificio;
  
  // Posiciones X (separadas ligeramente para que no se superpongan feo)
  origenX_A = canvas.width * 0.45; // Izquierda
  origenX_B = canvas.width * 0.55; // Derecha
 };
 
 /**
  * Dibuja el escenario estático (Edificio, Suelo, Marca de Cruce)
  */
 const drawBackground = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 1. Dibujar Edificio (Izquierda)
  const anchoEdificio = canvas.width * 0.25;
  const alturaEdificioPx = H_edificio * escalaY;
  const xEdificio = canvas.width * 0.1;
  const yTechoEdificio = sueloY - alturaEdificioPx;
  
  // Cuerpo del edificio
  ctx.fillStyle = 'rgba(43, 88, 118, 0.3)'; // Azul grisáceo semi-transparente
  ctx.fillRect(xEdificio, yTechoEdificio, anchoEdificio, alturaEdificioPx);
  
  // Borde edificio
  ctx.strokeStyle = '#2b5876';
  ctx.lineWidth = 2;
  ctx.strokeRect(xEdificio, yTechoEdificio, anchoEdificio, alturaEdificioPx);
  
  // Ventanas (Decorativo - Loop simple)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < alturaEdificioPx; i += 30) {
   if (i + 20 < alturaEdificioPx) {
    ctx.fillRect(xEdificio + 10, yTechoEdificio + i + 10, anchoEdificio - 20, 15);
   }
  }
  
  // 2. Suelo
  ctx.beginPath();
  ctx.moveTo(0, sueloY);
  ctx.lineTo(canvas.width, sueloY);
  ctx.strokeStyle = '#2b5876';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // 3. Línea de Encuentro (Meta)
  // Solo la dibujamos sutilmente para que el usuario vea a dónde llegarán
  const yCruce = sueloY - (h_cruce * escalaY);
  ctx.beginPath();
  ctx.setLineDash([2, 4]);
  ctx.moveTo(xEdificio + anchoEdificio, yCruce);
  ctx.lineTo(canvas.width * 0.8, yCruce);
  ctx.strokeStyle = 'rgba(41, 98, 255, 0.5)'; // Azul eléctrico suave
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Etiqueta 800m
  ctx.fillStyle = '#2b5876';
  ctx.font = '12px Oswald';
  ctx.fillText("800m", xEdificio, yTechoEdificio - 5);
 };
 
 /**
  * Dibuja las pelotas A y B
  */
 const drawBalls = (yA_metros, yB_metros) => {
  // Convertir metros a píxeles (Y crece hacia abajo)
  const posYA = sueloY - (yA_metros * escalaY);
  const posYB = sueloY - (yB_metros * escalaY);
  
  // --- PELOTA A (La que baja) ---
  ctx.beginPath();
  ctx.arc(origenX_A, posYA, radioPelota, 0, Math.PI * 2);
  ctx.fillStyle = '#ff4444'; // Rojo para diferenciar
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.stroke();
  
  // Etiqueta A
  ctx.fillStyle = '#ff4444';
  ctx.fillText("A", origenX_A - 20, posYA + 4);
  
  // --- PELOTA B (La que sube) ---
  ctx.beginPath();
  ctx.arc(origenX_B, posYB, radioPelota, 0, Math.PI * 2);
  ctx.fillStyle = '#2962ff'; // Azul eléctrico
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.stroke();
  
  // Etiqueta B
  ctx.fillStyle = '#2962ff';
  ctx.fillText("B", origenX_B + 15, posYB + 4);
  
  // --- EFECTO DE CRUCE ---
  // Si están muy cerca verticalmente, dibujar un destello
  if (Math.abs(posYA - posYB) < radioPelota * 2.5) {
   ctx.beginPath();
   ctx.arc((origenX_A + origenX_B) / 2, posYA, 20, 0, Math.PI * 2);
   ctx.fillStyle = 'rgba(255, 215, 0, 0.5)'; // Dorado brillante
   ctx.fill();
   
   ctx.fillStyle = '#2d3436';
   ctx.fillText("¡CRUCE!", (origenX_A + origenX_B) / 2 - 20, posYA - 25);
  }
 };
 
 /**
  * Panel de Información
  */
 const drawInfo = (t, yA, yB) => {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillRect(10, 10, 140, 70); // Fondo semitransparente para leer mejor
  ctx.strokeStyle = '#ccc';
  ctx.strokeRect(10, 10, 140, 70);
  
  ctx.font = '14px Oswald';
  ctx.fillStyle = '#2b5876';
  ctx.textAlign = 'left';
  
  ctx.fillText(`Tiempo: ${t.toFixed(2)} s`, 20, 30);
  ctx.fillStyle = '#ff4444';
  ctx.fillText(`Altura A: ${yA.toFixed(1)} m`, 20, 50);
  ctx.fillStyle = '#2962ff';
  ctx.fillText(`Altura B: ${yB.toFixed(1)} m`, 20, 70);
 };
 
 /**
  * Loop de Animación
  */
 const animate = () => {
  if (!animando) return;
  
  // Paso de tiempo (ligeramente lento para apreciar el cruce)
  const dt = 0.05;
  tiempo += dt;
  
  // --- FÍSICA ---
  // Pelota A (Desde 800m, v0 negativa)
  // y = y0 + v0t - 0.5gt^2
  // Nota: En la fórmula física v0 es negativa (-80), pero aquí usamos la magnitud
  // y restamos el término v0*t porque va hacia abajo.
  // yA = 800 - 80t - 4.9t^2
  let yA = H_edificio + (v0_A * tiempo) - (0.5 * g * Math.pow(tiempo, 2));
  
  // Pelota B (Desde 0m, v0 positiva)
  // yB = 0 + 80t - 4.9t^2
  let yB = (v0_B * tiempo) - (0.5 * g * Math.pow(tiempo, 2));
  
  // Límites (Suelo)
  if (yA < 0) yA = 0;
  if (yB < 0) yB = 0;
  
  // Condición de parada (Un poco después del cruce o cuando A toque suelo)
  if (tiempo > 6.5) { // El cruce es en t=5, dejamos ver un poco más
   animando = false;
   btnAnim.textContent = "Reiniciar";
  }
  
  // Dibujar
  drawBackground();
  drawBalls(yA, yB);
  drawInfo(tiempo, yA, yB);
  
  AppState.animationFrameId = requestAnimationFrame(animate);
 };
 
 // --- EVENTOS ---
 
 resizeCanvas();
 window.addEventListener('resize', () => {
  resizeCanvas();
  if (!animando) {
   drawBackground();
   // Dibujar estado inicial (t=0)
   drawBalls(H_edificio, 0);
  }
 });
 
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
 
 btnReset.onclick = () => {
  resetSimulation();
 };
 
 const resetSimulation = () => {
  animando = false;
  tiempo = 0;
  cancelAnimationFrame(AppState.animationFrameId);
  btnAnim.textContent = "Reproducir Animación";
  
  drawBackground();
  drawBalls(H_edificio, 0); // Posiciones iniciales
  drawInfo(0, H_edificio, 0);
 };
 
 // Limpieza global
 AppState.activeAnimation = () => {
  animando = false;
  cancelAnimationFrame(AppState.animationFrameId);
 };
 
 // Render inicial
 resetSimulation();
};