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

const showToast = (message) => {
    let toast = document.querySelector('.site-toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'site-toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
};

const invalidMessages = ['Oxi', 'Boa Noite! Que triste.', 'oh negah💔'];
const showRandomInvalidToast = () => {
    const randomMessage = invalidMessages[Math.floor(Math.random() * invalidMessages.length)];
    showToast(randomMessage);
};

const placeholderLinks = document.querySelectorAll('a[href="#"], .membro-portfolio, a[href="Link do instagram"], a[href="Link do linkedin"], a[href="Link do zap"], a[href="Link do Facebook"], a[href="LINK_DO_GOOGLE_MAPS"]');

placeholderLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');

        if (href === '#') {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showRandomInvalidToast();
            return;
        }

        if (link.classList.contains('membro-portfolio')) {
            event.preventDefault();
            showRandomInvalidToast();
            return;
        }

        event.preventDefault();
        showRandomInvalidToast();
    });
});

const newsletterButton = document.querySelector('.novidades button');

if (newsletterButton) {
    newsletterButton.addEventListener('click', () => {
        const emailInput = document.querySelector('.novidades input');
        const emailValue = emailInput ? emailInput.value.trim() : '';

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

        if (!emailValue || !isValidEmail) {
            showRandomInvalidToast();
            emailInput?.focus();
            return;
        }

        if (emailInput) {
            emailInput.value = '';
        }

        showToast('E-mail cadastrado com sucesso!');
    });
}

const loginForm = document.querySelector('.login-form');
const loginMessage = document.querySelector('#login-message');
const loginUsuario = document.querySelector('#login-usuario');
const loginSenha = document.querySelector('#login-senha');
const passwordToggle = document.querySelector('.password-toggle');

if (passwordToggle && loginSenha) {
    const syncPasswordToggle = () => {
        const isPasswordHidden = loginSenha.type === 'password';

        passwordToggle.setAttribute('aria-label', isPasswordHidden ? 'Mostrar senha' : 'Ocultar senha');
        passwordToggle.setAttribute('aria-pressed', String(!isPasswordHidden));

        const icon = passwordToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-eye-slash', isPasswordHidden);
            icon.classList.toggle('fa-eye', !isPasswordHidden);
        }
    };

    syncPasswordToggle();

    passwordToggle.addEventListener('click', () => {
        loginSenha.type = loginSenha.type === 'password' ? 'text' : 'password';
        syncPasswordToggle();
    });
}

const typedInputs = document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="hidden"]), textarea');

typedInputs.forEach((input) => {
    const updateInputGlowState = () => {
        input.classList.toggle('has-value', input.value.trim().length > 0);
    };

    updateInputGlowState();
    input.addEventListener('input', updateInputGlowState);
    input.addEventListener('blur', updateInputGlowState);
});

const getStoredUsers = () => {
    try {
        const storedUsers = JSON.parse(localStorage.getItem('livingScreenUsers') || '[]');
        return Array.isArray(storedUsers) ? storedUsers : [];
    } catch (error) {
        return [];
    }
};

const showLoginMessage = (type, messageText, linkHtml = '') => {
    if (!loginMessage) {
        return;
    }

    loginMessage.hidden = false;
    loginMessage.classList.remove('error');
    loginMessage.classList.toggle('error', type === 'error');

    loginMessage.innerHTML = linkHtml
        ? `<strong>${messageText}</strong><span>${linkHtml}</span>`
        : `<strong>${messageText}</strong>`;
};

if (loginForm && loginUsuario && loginSenha) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const usuarioDigitado = loginUsuario.value.trim();
        const senhaDigitada = loginSenha.value.trim();

        if (!usuarioDigitado || !senhaDigitada) {
            showLoginMessage('error', 'Preencha todos os campos para entrar.');
            return;
        }

        const usuarios = getStoredUsers();
        const usuarioEncontrado = usuarios.find((usuario) => {
            const valores = [
                usuario?.nome,
                usuario?.email,
                usuario?.username,
                usuario?.usuario
            ].filter(Boolean).map((valor) => String(valor).trim().toLowerCase());

            return valores.includes(usuarioDigitado.toLowerCase());
        });

        if (!usuarioEncontrado) {
            showLoginMessage(
                'error',
                'Usuário não encontrado.',
                'Ainda não possui uma conta? <a href="./cadastro.html">Cadastre-se aqui.</a>'
            );
            return;
        }

        if (String(usuarioEncontrado.senha ?? '') !== senhaDigitada) {
            showLoginMessage('error', 'Senha incorreta. Tente novamente.');
            return;
        }

        loginMessage.hidden = true;
        loginMessage.classList.remove('error');
        window.location.href = './index.html';
    });
}

const authMenuToggle = document.querySelector('.auth-menu-toggle');
const authMenu = document.querySelector('.auth-menu');

if (authMenuToggle && authMenu) {
    let isAuthMenuOpen = false;

    const closeAuthMenu = () => {
        isAuthMenuOpen = false;
        authMenu.classList.remove('is-open');
        authMenuToggle.classList.remove('is-open');
        authMenuToggle.setAttribute('aria-expanded', 'false');
    };

    const openAuthMenu = () => {
        isAuthMenuOpen = true;
        authMenu.classList.add('is-open');
        authMenuToggle.classList.add('is-open');
        authMenuToggle.setAttribute('aria-expanded', 'true');
    };

    authMenuToggle.addEventListener('click', (event) => {
        event.stopPropagation();

        if (isAuthMenuOpen) {
            closeAuthMenu();
            return;
        }

        openAuthMenu();
    });

    document.addEventListener('click', (event) => {
        if (!authMenu.contains(event.target) && !authMenuToggle.contains(event.target)) {
            closeAuthMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAuthMenu();
        }
    });

    authMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeAuthMenu);
    });
}

const scrollTopButton = document.querySelector('.scroll-top-btn');

if (scrollTopButton) {
    const toggleScrollTopButton = () => {
        const timeSection = document.getElementById('nosso-time');
        const isAtTop = window.scrollY < 30;

        if (!timeSection) {
            scrollTopButton.classList.remove('visible');
            return;
        }

        const sectionTop = timeSection.offsetTop;
        const showButton = !isAtTop && window.scrollY >= sectionTop;

        scrollTopButton.classList.toggle('visible', showButton);
    };

    toggleScrollTopButton();
    window.addEventListener('scroll', toggleScrollTopButton, { passive: true });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

