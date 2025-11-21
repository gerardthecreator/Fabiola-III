/**
 * Teoría.js
 * Contenido educativo sobre Movimiento Vertical de Caída Libre (MVCL).
 * Se inyecta dinámicamente en la sección #seccion-teoria.
 */

window.cargarTeoria = () => {
 const contenedor = document.getElementById('contenido-teoria');
 
 // Evitar recargar si ya existe contenido
 if (contenedor.innerHTML.trim() !== "") return;
 
 let html = '';
 
 // --- INTRODUCCIÓN ---
 html += `
        <div class="problem-statement" style="margin-bottom: 20px;">
            <strong>¿Qué es el Movimiento Vertical?</strong><br>
            Es un movimiento rectilíneo uniformemente variado (MRUV) donde la aceleración es constante y conocida: 
            la <strong>Gravedad ($g$)</strong>. En estos ejercicios, despreciamos la resistencia del aire, 
            por lo que todos los cuerpos caen con la misma aceleración sin importar su masa.
        </div>
    `;
 
 // --- GRILLA DE CONCEPTOS ---
 html += `<div class="concept-grid">`;
 
 // TARJETA 1: LA GRAVEDAD
 html += `
        <div class="concept-card">
            <h3 class="concept-title">1. La Gravedad ($g$)</h3>
            <div class="concept-text">
                <p>Es la aceleración con la que la Tierra atrae a los cuerpos hacia su centro.</p>
                <br>
                <ul style="list-style-type: none; padding: 0;">
                    <li>🔹 <strong>Valor promedio:</strong> $9.8 \\, m/s^2$</li>
                    <li>🔹 <strong>Dirección:</strong> Siempre vertical hacia abajo ($\\downarrow$).</li>
                    <li>🔹 <strong>Efecto:</strong> Si el cuerpo sube, la gravedad lo frena. Si baja, lo acelera.</li>
                </ul>
            </div>
        </div>
    `;
 
 // TARJETA 2: SISTEMA DE REFERENCIA (SIGNOS)
 html += `
        <div class="concept-card">
            <h3 class="concept-title">2. Convención de Signos</h3>
            <div class="concept-text">
                <p>Para no equivocarnos, usaremos un sistema de referencia cartesiano estándar:</p>
                <br>
                <ul style="list-style-type: none; padding: 0;">
                    <li>🔼 <strong>Hacia Arriba (+):</strong> Velocidad positiva ($v > 0$).</li>
                    <li>🔽 <strong>Hacia Abajo (-):</strong> Velocidad negativa ($v < 0$).</li>
                    <li>📍 <strong>Posición ($y$):</strong> Arriba del origen es (+), abajo es (-).</li>
                    <li>⚠️ <strong>Gravedad:</strong> Como siempre apunta abajo, en nuestras fórmulas usaremos $-g$.</li>
                </ul>
            </div>
        </div>
    `;
 
 // TARJETA 3: FÓRMULAS MAESTRAS
 html += `
        <div class="concept-card">
            <h3 class="concept-title">3. Las 3 Fórmulas Clave</h3>
            <div class="concept-text">
                <p>Son las mismas del MRUV, adaptadas al eje Y:</p>
                
                <div class="formula-box" style="font-size: 1rem; padding: 10px;">
                    $$ v_f = v_0 - g \\cdot t $$
                </div>
                <small>Para calcular velocidad en cualquier instante.</small>

                <div class="formula-box" style="font-size: 1rem; padding: 10px;">
                    $$ y = y_0 + v_0 t - \\frac{1}{2} g t^2 $$
                </div>
                <small>Para calcular la posición (altura).</small>

                <div class="formula-box" style="font-size: 1rem; padding: 10px;">
                    $$ v_f^2 = v_0^2 - 2g(y - y_0) $$
                </div>
                <small>Cuando no conocemos el tiempo.</small>
            </div>
        </div>
    `;
 
 // TARJETA 4: PALABRAS CLAVE (TRUCOS)
 html += `
        <div class="concept-card">
            <h3 class="concept-title">4. Traductor de Problemas</h3>
            <div class="concept-text">
                <p>A veces los datos están escondidos en el texto:</p>
                <br>
                <ul style="list-style-type: none; padding: 0;">
                    <li>🕵️‍♀️ <strong>"Se deja caer"</strong> $\\rightarrow v_0 = 0$</li>
                    <li>🕵️‍♀️ <strong>"Alcanza su altura máxima"</strong> $\\rightarrow v_f = 0$ (en ese punto)</li>
                    <li>🕵️‍♀️ <strong>"Regresa al suelo"</strong> $\\rightarrow y = 0$ (si partió del suelo)</li>
                    <li>🕵️‍♀️ <strong>"Se lanza hacia abajo"</strong> $\\rightarrow v_0$ es negativa.</li>
                </ul>
            </div>
        </div>
    `;
 
 html += `</div>`; // Cierre de concept-grid
 
 // --- NOTA FINAL ---
 html += `
        <div class="step-card" style="margin-top: 30px;">
            <div class="step-title">Consejo para Fabiola</div>
            <div class="step-content">
                Recuerda siempre dibujar un esquema y definir dónde está tu <strong>cero ($y=0$)</strong>. 
                Generalmente, es más fácil poner el cero en el punto de lanzamiento o en el suelo. 
                ¡Si respetas los signos, las matemáticas nunca fallan!
            </div>
        </div>
    `;
 
 // Inyectar al DOM
 contenedor.innerHTML = html;
};