/**
 * Animacion3.js
 * Simulación visual del Ejercicio 3: El Cohete.
 * ----------------------------------------------------------------
 * Representa un cohete con propulsión (fuego), inercia y caída libre.
 * Maneja cambio de fases y sistema de partículas simple.
 */

window.prepararCanvas3 = () => {
    const canvas = document.getElementById('canvas3');
    const ctx = canvas.getContext('2d');
    const btnAnim = document.getElementById('btn-anim-3');
    const btnReset = document.getElementById('btn-reset-3');

    // --- PARÁMETROS FÍSICOS ---
    const a_motor = 6.0;    // m/s^2
    const t_motor = 20;     // s
    const g = 9.8;          // m/s^2
    
    // Valores pre-calculados para transiciones suaves
    const h_corte = 0.5 * a_motor * Math.pow(t_motor, 2); // 1200 m
    const v_corte = a_motor * t_motor; // 120 m/s
    const h_max_total = 1934.7; // m (aprox)

    // --- ESTADO DE LA ANIMACIÓN ---
    let tiempo = 0;
    let animando = false;
    let escalaY = 0;        // px/m
    let sueloY = 0;
    let fase = 'MOTOR';     // 'MOTOR', 'INERCIA', 'CAIDA', 'SUELO'
    
    // Factor de velocidad de reproducción (5x más rápido que tiempo real)
    const timeMultiplier = 5; 

    // Sistema de partículas para el fuego
    let particulas = [];

    /**
     * Ajuste Responsive: Escala para ~2000 metros de altura
     */
    const resizeCanvas = () => {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight || 400; // Más alto para este ejercicio

        sueloY = canvas.height * 0.9;
        const techoY = canvas.height * 0.1;
        
        // Calcular escala: 2000m deben caber en la pantalla
        const alturaDisponible = sueloY - techoY;
        escalaY = alturaDisponible / (h_max_total * 1.1); // 10% de margen extra
    };

    /**
     * Dibuja el Cohete
     */
    const drawRocket = (x, y, motorEncendido) => {
        ctx.save();
        ctx.translate(x, y);

        // 1. Dibujar Fuego (Si el motor está encendido)
        if (motorEncendido) {
            // Generar nuevas partículas
            for(let i=0; i<5; i++) {
                particulas.push({
                    x: (Math.random() - 0.5) * 10, // Dispersión horizontal
                    y: 15, // Empiezan en la base
                    vida: 1.0, // Opacidad
                    radio: Math.random() * 3 + 2
                });
            }
        }

        // Renderizar partículas existentes
        particulas.forEach((p, index) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
            // Color degradado de amarillo a rojo
            ctx.fillStyle = `rgba(255, ${Math.floor(p.vida * 255)}, 0, ${p.vida})`;
            ctx.fill();

            // Actualizar partícula
            p.y += 2 + Math.random() * 2; // Bajan
            p.vida -= 0.1; // Se apagan
            p.radio *= 0.9; // Se achican

            // Eliminar muertas
            if (p.vida <= 0) particulas.splice(index, 1);
        });

        // 2. Cuerpo del Cohete
        // Fuselaje
        ctx.fillStyle = '#e0e5ec'; // Silver light
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#2b5876';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Punta
        ctx.beginPath();
        ctx.moveTo(-6, -15);
        ctx.lineTo(0, -30);
        ctx.lineTo(6, -15);
        ctx.fillStyle = '#ff4444'; // Rojo
        ctx.fill();
        ctx.stroke();

        // Aletas
        ctx.beginPath();
        ctx.moveTo(-8, 10);
        ctx.lineTo(-15, 25);
        ctx.lineTo(-5, 18);
        ctx.fillStyle = '#2962ff'; // Azul
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(8, 10);
        ctx.lineTo(15, 25);
        ctx.lineTo(5, 18);
        ctx.fillStyle = '#2962ff';
        ctx.fill();
        ctx.stroke();

        // Ventana
        ctx.beginPath();
        ctx.arc(0, -5, 4, 0, Math.PI*2);
        ctx.fillStyle = '#2962ff';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    };

    /**
     * Dibuja el entorno y HUD
     */
    const drawScene = (altura, velocidad) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Cielo (Gradiente)
        // A medida que sube, el cielo se oscurece un poco (efecto visual)
        const factorAltura = Math.min(1, altura / h_max_total);
        const colorCielo1 = '#e0e5ec'; // Base
        const colorCielo2 = `rgba(135, 206, 235, ${0.3 - (factorAltura * 0.2)})`; // Azul cielo desvaneciéndose
        
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, colorCielo2);
        grad.addColorStop(1, colorCielo1);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Suelo
        ctx.beginPath();
        ctx.moveTo(0, sueloY);
        ctx.lineTo(canvas.width, sueloY);
        ctx.strokeStyle = '#2b5876';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Marcador de Altura Máxima (Meta)
        const yMax = sueloY - (h_max_total * escalaY);
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(canvas.width * 0.3, yMax);
        ctx.lineTo(canvas.width * 0.7, yMax);
        ctx.strokeStyle = 'rgba(41, 98, 255, 0.4)';
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#2962ff';
        ctx.font = '10px Oswald';
        ctx.fillText(`H. Máx: ${h_max_total.toFixed(0)}m`, canvas.width * 0.72, yMax + 4);

        // HUD (Panel de Datos)
        const hudX = 15;
        const hudY = 20;
        
        // Caja HUD
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.roundRect(hudX - 5, hudY - 15, 130, 95, 10);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.stroke();

        ctx.font = '14px Oswald';
        ctx.textAlign = 'left';
        
        ctx.fillStyle = '#2b5876';
        ctx.fillText(`Tiempo: ${tiempo.toFixed(1)} s`, hudX, hudY);
        ctx.fillText(`Altura: ${altura.toFixed(1)} m`, hudX, hudY + 20);
        ctx.fillText(`Velocidad: ${velocidad.toFixed(1)} m/s`, hudX, hudY + 40);

        // Indicador de Fase
        let colorFase = '#2b5876';
        let textoFase = '';
        if (fase === 'MOTOR') { textoFase = 'MOTOR ON 🔥'; colorFase = '#ff4444'; }
        else if (fase === 'INERCIA') { textoFase = 'INERCIA ⬆'; colorFase = '#2962ff'; }
        else if (fase === 'CAIDA') { textoFase = 'CAÍDA LIBRE ⬇'; colorFase = '#4e4376'; }
        else { textoFase = 'ATERRIZAJE'; }

        ctx.font = 'bold 14px Oswald';
        ctx.fillStyle = colorFase;
        ctx.fillText(textoFase, hudX, hudY + 65);
    };

    /**
     * Loop Principal
     */
    const animate = () => {
        if (!animando) return;

        // Paso de tiempo (acelerado)
        const dt = 0.016 * timeMultiplier; 
        tiempo += dt;

        let altura = 0;
        let velocidad = 0;

        // --- LÓGICA DE FASES ---
        
        if (tiempo <= t_motor) {
            // FASE 1: MOTOR ENCENDIDO
            fase = 'MOTOR';
            // h = 0.5 * a * t^2
            altura = 0.5 * a_motor * Math.pow(tiempo, 2);
            // v = a * t
            velocidad = a_motor * tiempo;

        } else {
            // Tiempo transcurrido desde que se apagó el motor
            const t_libre = tiempo - t_motor;
            
            // h = h_inicial + v_inicial*t - 0.5*g*t^2
            altura = h_corte + (v_corte * t_libre) - (0.5 * g * Math.pow(t_libre, 2));
            
            // v = v_inicial - g*t
            velocidad = v_corte - (g * t_libre);

            if (velocidad >= 0) {
                fase = 'INERCIA';
            } else {
                fase = 'CAIDA';
            }
        }

        // Condición de parada (Suelo)
        if (altura < 0 && tiempo > 1) {
            altura = 0;
            velocidad = 0;
            fase = 'SUELO';
            animando = false;
            btnAnim.textContent = "Reiniciar";
        }

        // Dibujar
        const yPos = sueloY - (altura * escalaY);
        const xPos = canvas.width / 2;

        drawScene(altura, velocidad);
        drawRocket(xPos, yPos, fase === 'MOTOR');

        AppState.animationFrameId = requestAnimationFrame(animate);
    };

    // --- EVENTOS ---

    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        if (!animando) {
            drawScene(0, 0);
            drawRocket(canvas.width / 2, sueloY, false);
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
        fase = 'MOTOR';
        particulas = []; // Limpiar fuego
        cancelAnimationFrame(AppState.animationFrameId);
        btnAnim.textContent = "Reproducir Animación (x5)";
        
        drawScene(0, 0);
        drawRocket(canvas.width / 2, sueloY, false);
    };

    // Limpieza global
    AppState.activeAnimation = () => {
        animando = false;
        cancelAnimationFrame(AppState.animationFrameId);
    };

    // Render inicial
    resetSimulation();
};