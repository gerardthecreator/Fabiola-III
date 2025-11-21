/**
 * Script.js - Orquestador Principal (CORREGIDO PARA EJERCICIO 2)
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

const AppState = {
    currentTab: 'seccion-teoria',
    animationFrameId: null,
    activeAnimation: null,
    isRendering: false
};

const initApp = () => {
    setupNavigation();
    setupGlobalMathJax();
    setTimeout(() => loadInitialContent(), 100);
};

const setupNavigation = () => {
    const navButtons = document.querySelectorAll('.neu-btn');
    const sections = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            navButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const targetId = e.target.getAttribute('data-target');
            if (AppState.currentTab === targetId) return;

            sections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none'; 
            });

            const targetSection = document.getElementById(targetId);
            targetSection.style.display = 'block';
            void targetSection.offsetWidth; 
            targetSection.classList.add('active');

            handleTabChange(targetId, targetSection);
        });
    });
};

const handleTabChange = (targetId, targetElement) => {
    AppState.currentTab = targetId;
    stopCurrentAnimation();

    // CORRECCIÓN IMPORTANTE:
    // Verificamos si la SOLUCIÓN tiene contenido, no solo el enunciado.
    // Esto arregla el bug del Ejercicio 2 si se cargó a medias.
    const solucionContainer = targetElement.querySelector('.step-by-step-solution');
    const yaCargado = solucionContainer && solucionContainer.innerHTML.trim().length > 50; // Más de 50 caracteres asegura que hay contenido real

    if (yaCargado) {
        iniciarCanvas(targetId);
        return; 
    }

    mostrarLoader(targetElement);

    setTimeout(async () => {
        try {
            switch (targetId) {
                case 'seccion-teoria':
                    if (typeof cargarTeoria === 'function') cargarTeoria();
                    break;
                case 'seccion-ejercicio1':
                    if (typeof cargarEjercicio1 === 'function') cargarEjercicio1();
                    break;
                case 'seccion-ejercicio2':
                    if (typeof cargarEjercicio2 === 'function') cargarEjercicio2();
                    break;
                case 'seccion-ejercicio3':
                    if (typeof cargarEjercicio3 === 'function') cargarEjercicio3();
                    break;
            }

            ocultarLoader(targetElement);
            iniciarCanvas(targetId);
            await refreshMathJax(targetElement);

        } catch (error) {
            console.error("Error cargando ejercicio:", error);
            // Si falla, limpiamos el loader para que no se quede girando
            ocultarLoader(targetElement);
        }
    }, 50);
};

const iniciarCanvas = (targetId) => {
    // Pequeño delay para asegurar que el contenedor tenga dimensiones
    setTimeout(() => {
        if (targetId === 'seccion-ejercicio1' && typeof prepararCanvas1 === 'function') prepararCanvas1();
        if (targetId === 'seccion-ejercicio2' && typeof prepararCanvas2 === 'function') prepararCanvas2();
        if (targetId === 'seccion-ejercicio3' && typeof prepararCanvas3 === 'function') prepararCanvas3();
    }, 10);
};

const mostrarLoader = (element) => {
    const solucionArea = element.querySelector('.step-by-step-solution');
    if (solucionArea) {
        solucionArea.innerHTML = `
            <div class="loader-container">
                <div class="spinner"></div>
                <div class="loading-text">Calculando física...</div>
            </div>
        `;
    }
};

const ocultarLoader = (element) => {
    // No es estrictamente necesario si sobrescribimos el HTML, 
    // pero es buena práctica por si acaso.
};

const loadInitialContent = () => {
    const firstSection = document.getElementById('seccion-teoria');
    if(firstSection) {
        firstSection.style.display = 'block';
        if (typeof cargarTeoria === 'function') {
            cargarTeoria();
            refreshMathJax(firstSection);
        }
    }
};

const stopCurrentAnimation = () => {
    if (AppState.animationFrameId) {
        cancelAnimationFrame(AppState.animationFrameId);
        AppState.animationFrameId = null;
    }
    if (typeof AppState.activeAnimation === 'function') {
        AppState.activeAnimation();
        AppState.activeAnimation = null;
    }
};

const refreshMathJax = async (element) => {
    if (window.MathJax && window.MathJax.typesetPromise) {
        if (AppState.isRendering) return;
        AppState.isRendering = true;
        try {
            const nodes = element ? [element] : null;
            if (window.MathJax.typesetClear) window.MathJax.typesetClear(nodes);
            await window.MathJax.typesetPromise(nodes);
        } catch (err) {
            console.warn('MathJax render warning:', err);
        } finally {
            AppState.isRendering = false;
        }
    }
};

const setupGlobalMathJax = () => {
    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']]
        },
        svg: { fontCache: 'global', scale: 0.9 },
        startup: {
            pageReady: () => MathJax.startup.defaultPageReady()
        }
    };
};

window.crearTarjetaPaso = (titulo, contenidoHtml) => {
    return `<div class="step-card"><div class="step-title">${titulo}</div><div class="step-content">${contenidoHtml}</div></div>`;
};

window.formatoCifras = (num, decimales = 2) => {
    return num.toFixed(decimales);
};