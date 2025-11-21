/**
 * Ejercicio1.js
 * Lógica de resolución y explicación detallada para el Ejercicio 1.
 * Tema: Lanzamiento Vertical hacia Arriba.
 */

// Función principal llamada desde Script.js cuando se activa la pestaña
window.cargarEjercicio1 = () => {
 const contenedorEnunciado = document.getElementById('enunciado-ej1');
 const contenedorSolucion = document.getElementById('solucion-ej1');
 
 // Evitar recargar si ya está contenido (optimización)
 if (contenedorEnunciado.innerHTML.trim() !== "") return;
 
 // 1. Renderizar Enunciado
 contenedorEnunciado.innerHTML = `
        <strong>Enunciado:</strong> Un bate batea una pelota y sube durante 3 segundos. 
        Calcula la velocidad inicial y la altura máxima.
    `;
 
 // 2. Definición de Variables y Constantes
 const t = 3; // Tiempo de subida en segundos
 const g = 9.8; // Gravedad en m/s^2
 const vf = 0; // Velocidad final en altura máxima
 
 // 3. Cálculos (Lógica Matemática)
 // a) Velocidad Inicial: v0 = g * t (despejado de vf = v0 - gt, donde vf=0)
 const v0 = g * t;
 
 // b) Altura Máxima: h = v0*t - 0.5*g*t^2
 const h_max = (v0 * t) - (0.5 * g * Math.pow(t, 2));
 
 // 4. Construcción del HTML Paso a Paso
 let htmlContent = '';
 
 // --- PASO 1: DATOS ---
 htmlContent += window.crearTarjetaPaso(
  "Paso 1: Identificación de Datos",
  `
        <div class="explicacion-texto">
            <strong>¿Por qué hacemos esto?</strong><br>
            Antes de calcular, debemos traducir el texto a variables físicas. 
            Un dato clave implícito es que, en el punto más alto, la pelota se detiene momentáneamente, 
            por lo que su velocidad final ($v_f$) es cero.
        </div>
        <div class="datos-container">
            <div class="dato-badge"><span>t</span> = ${t} s (Tiempo subida)</div>
            <div class="dato-badge"><span>g</span> = ${g} m/s² (Gravedad)</div>
            <div class="dato-badge"><span>v_f</span> = 0 m/s (En altura máx)</div>
            <div class="dato-badge" style="border: 1px dashed var(--azul-electrico)"><span>v_0</span> = ?</div>
            <div class="dato-badge" style="border: 1px dashed var(--azul-electrico)"><span>h_{max}</span> = ?</div>
        </div>
        `
 );
 
 // --- PASO 2: VELOCIDAD INICIAL ---
 htmlContent += window.crearTarjetaPaso(
  "Paso 2: Calcular la Velocidad Inicial ($v_0$)",
  `
        <div class="explicacion-texto">
            <strong>Análisis Físico:</strong>
            Sabemos que la gravedad va frenando la pelota hasta detenerla. Usamos la ecuación de velocidad 
            en función del tiempo.
        </div>

        <div class="formula-box">
            $$ v_f = v_0 - g \\cdot t $$
        </div>

        <p>Como en la altura máxima la velocidad final es cero ($v_f = 0$), despejamos la velocidad inicial ($v_0$):</p>
        
        $$ 0 = v_0 - g \\cdot t \\Rightarrow v_0 = g \\cdot t $$

        <p>Sustituimos los valores:</p>
        $$ v_0 = (${g} \\, m/s^2) \\cdot (${t} \\, s) $$
        
        <p><strong>Resultado parcial:</strong></p>
        $$ v_0 = ${window.formatoCifras(v0, 1)} \\, m/s $$
        `
 );
 
 // --- PASO 3: ALTURA MÁXIMA ---
 htmlContent += window.crearTarjetaPaso(
  "Paso 3: Calcular la Altura Máxima ($h_{max}$)",
  `
        <div class="explicacion-texto">
            <strong>¿Para qué sirve esto?</strong><br>
            Ahora que sabemos con qué velocidad salió disparada la pelota ($v_0$), podemos determinar 
            cuánta distancia recorrió verticalmente antes de detenerse.
        </div>

        <p>Usamos la ecuación de posición:</p>
        <div class="formula-box">
            $$ h = v_0 \\cdot t - \\frac{1}{2} g \\cdot t^2 $$
        </div>

        <p>Sustituimos los datos obtenidos:</p>
        $$ h_{max} = (${window.formatoCifras(v0, 1)})(${t}) - \\frac{1}{2}(${g})(${t})^2 $$

        <p>Resolvemos paso a paso:</p>
        $$ h_{max} = ${window.formatoCifras(v0 * t, 1)} - (4.9 \\cdot 9) $$
        $$ h_{max} = ${window.formatoCifras(v0 * t, 1)} - ${window.formatoCifras(0.5 * g * 9, 1)} $$
        
        <p><strong>Resultado del cálculo:</strong></p>
        $$ h_{max} = ${window.formatoCifras(h_max, 1)} \\, m $$
        `
 );
 
 // --- RESULTADOS FINALES ---
 htmlContent += `
        <div class="resultado-final">
            <h3>Resultados Finales</h3>
            <div class="divider"></div>
            <p>Velocidad Inicial:</p>
            <div class="resultado-valor">${window.formatoCifras(v0, 1)} m/s</div>
            <br>
            <p>Altura Máxima:</p>
            <div class="resultado-valor">${window.formatoCifras(h_max, 1)} m</div>
        </div>
    `;
 
 // 5. Inyectar contenido en el DOM
 contenedorSolucion.innerHTML = htmlContent;
};