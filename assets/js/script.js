import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js';

const canvas = document.getElementById('liquid-canvas');

const app = LiquidBackground(canvas);

app.loadImage('./assets/img/img-fundo-do-site.png');

app.liquidPlane.material.metalness = 0.45;
app.liquidPlane.material.roughness = 0.3;

app.liquidPlane.uniforms.displacementScale.value = 2.5;

app.setRain(false);