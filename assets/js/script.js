import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js';

const canvases = document.querySelectorAll('#liquid-canvas, .liquid-canvas');

canvases.forEach((canvas) => {

    const app = LiquidBackground(canvas);

    app.loadImage('./assets/img/img2-fundo-site.png');

    app.liquidPlane.material.metalness = 0.45;
    app.liquidPlane.material.roughness = 0.3;

    app.liquidPlane.uniforms.displacementScale.value = 2.5;

    app.setRain(false);

});

const typingWord = document.querySelector('.typing-word');

if (typingWord) {
    const fullText = 'Informação';
    let currentIndex = 0;
    let isDeleting = false;

    const updateWord = () => {
        typingWord.textContent = fullText.slice(0, currentIndex);

        if (!isDeleting && currentIndex < fullText.length) {
            const pauseAt = [3, 7, 11, 15];
            const delay = pauseAt.includes(currentIndex) ? 220 : 150;
            currentIndex += 1;
            setTimeout(updateWord, delay);
            return;
        }

        if (!isDeleting && currentIndex === fullText.length) {
            setTimeout(() => {
                isDeleting = true;
                updateWord();
            }, 1100);
            return;
        }

        if (isDeleting && currentIndex > 0) {
            const delay = currentIndex > 1 ? 120 : 180;
            currentIndex -= 1;
            setTimeout(updateWord, delay);
            return;
        }

        if (isDeleting && currentIndex === 0) {
            isDeleting = false;
            setTimeout(updateWord, 260);
        }
    };

    typingWord.textContent = '';
    updateWord();
}

const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorRing);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

window.addEventListener('pointermove', (event) => {
    cursorRing.style.left = `${event.clientX}px`;
    cursorRing.style.top = `${event.clientY}px`;
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
});

const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, summary, .hero-btn, .menu a, .auth-buttons a, .portfolio-card, .membro-card, .service-item, .sobre-bottom a, .navegacao a, .swiper-slide, .swiper-pagination-bullet, [role="button"]');

interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    element.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
    element.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));
});

