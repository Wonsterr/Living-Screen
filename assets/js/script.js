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