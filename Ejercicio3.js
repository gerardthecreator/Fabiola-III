/**
 * Ejercicio3.js
 * Lógica de resolución para el Problema del Cohete (Movimiento por Fases).
 * Tema: MRUV Acelerado + Caída Libre.
 */

window.cargarEjercicio3 = () => {
 const contenedorEnunciado = document.getElementById('enunciado-ej3');
 const contenedorSolucion = document.getElementById('solucion-ej3');
 
 // Evitar recarga innecesaria
 if (contenedorEnunciado.innerHTML.trim() !== "") return;
 
 // 1. Renderizar Enunciado
 contenedorEnunciado.innerHTML = `
        <strong>Enunciado:</strong> Un pequeño cohete despega verticalmente desde el reposo y sube con una 
        aceleración de 6,0 m/s² durante 20 segundos. Luego, el cohete apaga sus motores y continúa subiendo 
        hasta una altura máxima.<br><br>
        Calcular:<br>
        a) ¿Qué altura alcanza durante los primeros 20 segundos?<br>
        b) ¿Cuál es el vector velocidad al cabo de esos 20 segundos?<br>
        c) ¿Cuál es la máxima altura alcanzada?<br>
        d) ¿Cuánto tiempo dura el cohete en el aire (tiempo total)?
    `;
 
 // 2. Variables y Constantes
 const a_motor = 6.0; // m/s^2 (Aceleración neta subiendo)
 const t_motor = 20; // s (Tiempo con motor encendido)
 const g = 9.8; // m/s^2 (Gravedad para la fase sin motor)
 const v0 = 0; // Partiendo del reposo
 
 // 3. Cálculos por Fases
 
 // --- FASE 1: CON MOTOR (0 a 20s) ---
 // Altura 1: h = v0*t + 0.5*a*t^2
 const h1 = 0.5 * a_motor * Math.pow(t_motor, 2);
 
 // Velocidad 1 (al apagarse el motor): vf = v0 + a*t
 const v1 = a_motor * t_motor;
 
 // --- FASE 2: INERCIA (Sube sin motor hasta detenerse) ---
 // Ahora v1 es la velocidad inicial, a = -9.8, vf = 0
 // Tiempo de subida extra: vf = v0 - gt -> 0 = v1 - gt2 -> t2 = v1/g
 const t_subida_libre = v1 / g;
 
 // Altura extra: h = v1*t - 0.5*g*t^2
 const h2 = (v1 * t_subida_libre) - (0.5 * g * Math.pow(t_subida_libre, 2));
 
 // Altura Total Máxima
 const h_total = h1 + h2;
 
 // --- FASE 3: CAÍDA LIBRE (Desde h_total hasta el suelo) ---
 // y = h_total - 0.5*g*t^2 -> 0 = h_total - 4.9t^2 -> t = sqrt(h_total / 4.9)
 const t_bajada = Math.sqrt(h_total / (0.5 * g));
 
 // Tiempo Total de Vuelo
 const t_total_vuelo = t_motor + t_subida_libre + t_bajada;
 
 
 // 4. Construcción del HTML Paso a Paso
 let htmlContent = '';
 
 // --- PASO 1: ANÁLISIS DE FASES ---
 htmlContent += window.crearTarjetaPaso(
  "Análisis Preliminar: Las 3 Fases",
  `
        <div class="explicacion-texto">
            <strong>Estrategia:</strong><br>
            Este problema no se puede resolver con una sola fórmula porque la aceleración cambia. Debemos dividirlo en partes:
            <ul>
                <li><strong>Fase 1 (Motor):</strong> Acelera hacia arriba ($+6.0 m/s^2$).</li>
                <li><strong>Fase 2 (Inercia):</strong> Motor apagado, la gravedad lo frena ($-9.8 m/s^2$) hasta que se detiene arriba.</li>
                <li><strong>Fase 3 (Caída):</strong> Cae desde la altura máxima hasta el suelo.</li>
            </ul>
        </div>
        `
 );
 
 // --- PASO 2: FASE 1 (ALTURA Y VELOCIDAD) ---
 htmlContent += window.crearTarjetaPaso(
  "Parte A y B: Fase con Motor Encendido ($t=0$ a $t=20s$)",
  `
        <div class="explicacion-texto">
            <strong>Calculamos la altura ($h_1$):</strong><br>
            Usamos la fórmula de posición para movimiento acelerado partiendo del reposo ($v_0=0$).
        </div>
        
        <div class="formula-box">
            $$ h_1 = \\frac{1}{2} a t^2 $$
        </div>

        $$ h_1 = 0.5 \\cdot (6.0) \\cdot (20)^2 $$
        $$ h_1 = 3 \\cdot 400 = ${window.formatoCifras(h1, 1)} \\, m $$

        <div class="divider"></div>

        <div class="explicacion-texto">
            <strong>Calculamos la velocidad final ($v_1$):</strong><br>
            Esta velocidad es crucial porque será la velocidad inicial de la siguiente fase.
        </div>

        $$ v_1 = a \\cdot t = 6.0 \\cdot 20 = ${window.formatoCifras(v1, 1)} \\, m/s $$

        <p><strong>Respuesta B (Vector):</strong> Como va hacia arriba, el vector es:</p>
        <div class="dato-badge" style="width: fit-content; margin: 0 auto;">
            $\\vec{v} = +${window.formatoCifras(v1, 1)} \\, \\hat{j} \\, m/s$
        </div>
        `
 );
 
 // --- PASO 3: FASE 2 (SUBIDA POR INERCIA) ---
 htmlContent += window.crearTarjetaPaso(
  "Parte C (Paso 1): Subida sin Motor",
  `
        <div class="explicacion-texto">
            <strong>¿Por qué sigue subiendo?</strong><br>
            Aunque el motor se apague, el cohete lleva una velocidad de $120 m/s$. La gravedad lo irá frenando hasta detenerlo ($v_f=0$).
        </div>

        <p>Calculamos el tiempo extra ($t_2$) que tarda en detenerse:</p>
        $$ v_f = v_1 - g \\cdot t_2 \\Rightarrow 0 = 120 - 9.8 t_2 $$
        $$ t_2 = \\frac{120}{9.8} = ${window.formatoCifras(t_subida_libre, 2)} \\, s $$

        <p>Calculamos la altura extra ($h_2$) que recorre en este tiempo:</p>
        $$ h_2 = v_1 t_2 - \\frac{1}{2} g t_2^2 $$
        $$ h_2 = (120)(${window.formatoCifras(t_subida_libre, 2)}) - 4.9(${window.formatoCifras(t_subida_libre, 2)})^2 $$
        $$ h_2 \\approx ${window.formatoCifras(h2, 1)} \\, m $$
        `
 );
 
 // --- PASO 4: ALTURA MÁXIMA TOTAL ---
 htmlContent += window.crearTarjetaPaso(
  "Parte C (Paso 2): Altura Máxima Total",
  `
        <div class="explicacion-texto">
            Sumamos la altura ganada con motor ($h_1$) más la altura ganada por inercia ($h_2$).
        </div>

        <div class="formula-box">
            $$ H_{max} = h_1 + h_2 $$
        </div>

        $$ H_{max} = ${window.formatoCifras(h1, 1)} + ${window.formatoCifras(h2, 1)} $$
        $$ H_{max} = ${window.formatoCifras(h_total, 1)} \\, m $$
        `
 );
 
 // --- PASO 5: TIEMPO TOTAL ---
 htmlContent += window.crearTarjetaPaso(
  "Parte D: Tiempo Total en el Aire",
  `
        <div class="explicacion-texto">
            <strong>Falta la bajada:</strong><br>
            Ya tenemos el tiempo de subida ($t_{motor} + t_{inercia}$). Ahora calculamos cuánto tarda en caer desde $H_{max}$ ($1934.7 m$) hasta el suelo.
        </div>

        <p>En caída libre desde el reposo ($v_{top}=0$):</p>
        $$ H_{max} = \\frac{1}{2} g t_{bajada}^2 $$
        $$ t_{bajada} = \\sqrt{\\frac{2 \\cdot H_{max}}{g}} $$
        $$ t_{bajada} = \\sqrt{\\frac{2 \\cdot ${window.formatoCifras(h_total, 1)}}{9.8}} = ${window.formatoCifras(t_bajada, 2)} \\, s $$

        <div class="divider"></div>

        <p><strong>Sumatoria de Tiempos:</strong></p>
        $$ t_{total} = t_{motor} + t_{inercia} + t_{bajada} $$
        $$ t_{total} = 20 + ${window.formatoCifras(t_subida_libre, 2)} + ${window.formatoCifras(t_bajada, 2)} $$
        `
 );
 
 // --- RESULTADOS FINALES ---
 htmlContent += `
        <div class="resultado-final">
            <h3>Resultados Finales</h3>
            <div class="divider"></div>
            
            <p>a) Altura a los 20s:</p>
            <div class="resultado-valor">${window.formatoCifras(h1, 1)} m</div>
            
            <br>
            <p>b) Vector Velocidad (20s):</p>
            <div class="resultado-valor" style="font-size: 1.5rem">
                ${window.formatoCifras(v1, 1)} m/s <span style="font-size:1rem">($\\hat{j}$)</span>
            </div>

            <br>
            <p>c) Altura Máxima Total:</p>
            <div class="resultado-valor">${window.formatoCifras(h_total, 1)} m</div>

            <br>
            <p>d) Tiempo Total en el Aire:</p>
            <div class="resultado-valor">${window.formatoCifras(t_total_vuelo, 1)} s</div>
        </div>
    `;
 
 contenedorSolucion.innerHTML = htmlContent;
};