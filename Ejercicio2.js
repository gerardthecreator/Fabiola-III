/**
 * Ejercicio2.js - Optimizado
 */

window.cargarEjercicio2 = () => {
    const contenedorEnunciado = document.getElementById('enunciado-ej2');
    const contenedorSolucion = document.getElementById('solucion-ej2');
    
    // Renderizar Enunciado
    contenedorEnunciado.innerHTML = `
        <strong>Enunciado:</strong> Desde el borde de un edificio de 800 m se lanza hacia abajo una pelota (A) 
        con una velocidad de 80,0 m/s. Simultáneamente, desde el suelo se lanza hacia arriba otra pelota (B) 
        con velocidad de 80,0 m/s. <br><br>
        Calcular: a) Tiempo de cruce, b) Altura del cruce, c) Velocidades finales.
    `;
    
    // Variables
    const H_edificio = 800;
    const v0_A = -80.0;
    const v0_B = 80.0;
    const g = 9.8;
    
    // Cálculos
    const t_encuentro = H_edificio / (Math.abs(v0_A) + v0_B); // 800 / 160 = 5
    const h_encuentro = (v0_B * t_encuentro) - (0.5 * g * Math.pow(t_encuentro, 2));
    const vf_A = v0_A - (g * t_encuentro);
    const vf_B = v0_B - (g * t_encuentro);
    
    let htmlContent = '';
    
    // PASO 1
    htmlContent += window.crearTarjetaPaso(
        "Paso 1: Sistema de Referencia",
        `
        <div class="explicacion-texto">
            Definimos el suelo como $y=0$.<br>
            Pelota A (baja): $y_0 = 800m$, $v_0 = -80 m/s$.<br>
            Pelota B (sube): $y_0 = 0m$, $v_0 = +80 m/s$.
        </div>
        <div class="datos-container">
            <div class="dato-badge"><span>y_{0A}</span> = 800</div>
            <div class="dato-badge"><span>v_{0A}</span> = -80</div>
            <div class="dato-badge"><span>v_{0B}</span> = +80</div>
        </div>
        `
    );
    
    // PASO 2
    htmlContent += window.crearTarjetaPaso(
        "Paso 2: Ecuaciones de Posición",
        `
        <p>Planteamos $y = y_0 + v_0 t - 4.9 t^2$ para cada una:</p>
        $$ y_A = 800 - 80t - 4.9t^2 $$
        $$ y_B = 0 + 80t - 4.9t^2 $$
        `
    );
    
    // PASO 3
    htmlContent += window.crearTarjetaPaso(
        "Paso 3: Calcular Tiempo ($y_A = y_B$)",
        `
        <p>Igualamos las ecuaciones. Nota que $-4.9t^2$ se cancela en ambos lados:</p>
        $$ 800 - 80t = 80t $$
        $$ 800 = 160t $$
        $$ t = \\frac{800}{160} = ${window.formatoCifras(t_encuentro, 1)} \\, s $$
        `
    );
    
    // PASO 4
    htmlContent += window.crearTarjetaPaso(
        "Paso 4: Calcular Altura",
        `
        <p>Sustituimos $t=5$ en la ecuación de B:</p>
        $$ y_B = 80(5) - 4.9(5)^2 $$
        $$ y_B = 400 - 122.5 = ${window.formatoCifras(h_encuentro, 1)} \\, m $$
        `
    );
    
    // PASO 5
    htmlContent += window.crearTarjetaPaso(
        "Paso 5: Velocidades Finales",
        `
        <p>Usando $v_f = v_0 - 9.8t$:</p>
        $$ v_A = -80 - 49 = ${window.formatoCifras(vf_A, 1)} \\, m/s $$
        $$ v_B = 80 - 49 = ${window.formatoCifras(vf_B, 1)} \\, m/s $$
        `
    );
    
    // RESULTADOS
    htmlContent += `
        <div class="resultado-final">
            <h3>Resultados</h3>
            <div class="divider"></div>
            <p>Tiempo: <strong>${window.formatoCifras(t_encuentro, 1)} s</strong></p>
            <p>Altura: <strong>${window.formatoCifras(h_encuentro, 1)} m</strong></p>
            <p>Velocidades: <strong>${window.formatoCifras(vf_A, 1)} / ${window.formatoCifras(vf_B, 1)} m/s</strong></p>
        </div>
    `;
    
    contenedorSolucion.innerHTML = htmlContent;
};