document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('vlibras-widget')) return;

  const script = document.createElement('script');
  script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
  script.async = true;
  script.onload = function () {
    new window.VLibras.Widget({
      root: document.body,
      text: 'Português',
      layout: 'default',
      position: 'R',
      opacity: '0.95'
    });
  };

  document.body.appendChild(script);
});
