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

const chatbotWidget = document.querySelector('.chatbot-widget');
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotPanel = document.querySelector('#chatbot-panel');
const chatbotClose = document.querySelector('.chatbot-close');
const chatbotForm = document.querySelector('#chatbot-form');
const chatbotInput = document.querySelector('#chatbot-input');
const chatbotMessages = document.querySelector('#chatbot-messages');
const chatbotHeader = document.querySelector('.chatbot-header');

const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

const addChatMessage = (text, sender = 'bot') => {
    if (!chatbotMessages) {
        return;
    }

    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.textContent = text;
    chatbotMessages.appendChild(message);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

const chatbotReply = (message) => {
    const text = message.toLowerCase();

    if (/(serviços|servico|site|website|landing page|suporte|desenvolvimento|sistema)/i.test(text)) {
        return pickRandom([
            'Fazemos sites, suporte técnico e soluções digitais para negócios.',
            'Temos desenvolvimento de sites e suporte para empresas e projetos online.',
            'A Living Screen trabalha com sites, suporte e soluções digitais sob medida.'
        ]);
    }

    if (/(orçamento|orcamento|orçar|orcar|preço|valor|cotação|cotacao|proposta|orçamento de site|valor do site)/i.test(text)) {
        return pickRandom([
            'Posso te ajudar com orçamento. A melhor forma é entrar em contato pelo formulário.',
            'Claro! Você pode solicitar o orçamento pela página de contato.',
            'Para orçamento, o ideal é abrir o formulário de contato e mandar os detalhes.'
        ]);
    }

    if (/(whatsapp|zap|contato|falar com|telefone|ligar|mensagem|atendimento)/i.test(text)) {
        return pickRandom([
            'Você pode falar com a Living Screen pelo WhatsApp ou pelo formulário de contato.',
            'O jeito mais rápido é pelo WhatsApp ou pelo formulário do site.',
            'Podemos te atender pelo WhatsApp ou pelo contato da página.'
        ]);
    }

    return pickRandom([
        'Posso ajudar com orçamento, contato ou serviços da Living Screen.',
        'Se quiser, posso te orientar sobre orçamento, serviços ou contato.',
        'Posso te ajudar com sites, orçamento e contato.'
    ]);
};

const chatbotActionReply = (message) => {
    const text = message.toLowerCase();

    if (/(orçamento|orcamento|orçar|orcar|preço|valor|cotação|cotacao|proposta|orçamento de site|valor do site)/i.test(text)) {
        window.location.href = './contato.html';
        return pickRandom([
            'Claro! Vou te levar para a página de contato para solicitar o orçamento.',
            'Perfeito. Vou abrir a página de contato para você mandar o pedido.',
            'Vamos para o contato para você pedir o orçamento.'
        ]);
    }

    if (/(whatsapp|zap|contato|falar com|telefone|ligar|mensagem|atendimento)/i.test(text)) {
        window.open('https://wa.me/5511999999999', '_blank', 'noopener,noreferrer');
        return pickRandom([
            'Claro! Vou abrir o WhatsApp da Living Screen.',
            'Perfeito, estou abrindo o WhatsApp para você falar com a equipe.',
            'Vou abrir o contato direto pelo WhatsApp.'
        ]);
    }

    if (/(serviços|servico|site|website|landing page|suporte|desenvolvimento|sistema)/i.test(text)) {
        return pickRandom([
            'Trabalhamos com desenvolvimento de sites, suporte técnico e soluções digitais.',
            'A Living Screen atende com sites, suporte e projetos digitais.',
            'Temos serviços de desenvolvimento web e suporte para negócios.'
        ]);
    }

    return null;
};

if (chatbotWidget && chatbotToggle && chatbotPanel && chatbotForm && chatbotInput && chatbotMessages) {
    const updateWidgetPosition = () => {
        if (!chatbotWidget.style.left && !chatbotWidget.style.top) {
            return;
        }

        const left = parseFloat(chatbotWidget.style.left) || 0;
        const top = parseFloat(chatbotWidget.style.top) || 0;

        chatbotWidget.style.left = `${clampValue(left, 12, window.innerWidth - chatbotWidget.offsetWidth - 12)}px`;
        chatbotWidget.style.top = `${clampValue(top, 12, window.innerHeight - chatbotWidget.offsetHeight - 12)}px`;
        chatbotWidget.style.right = 'auto';
        chatbotWidget.style.bottom = 'auto';
    };

    const startDrag = (event) => {
        if (!chatbotWidget || (!event.target.closest('.chatbot-toggle') && !event.target.closest('.chatbot-header'))) {
            return;
        }

        if (event.target.closest('.chatbot-close') || event.target.closest('input') || event.target.closest('button') && !event.target.closest('.chatbot-toggle') && !event.target.closest('.chatbot-header')) {
            return;
        }

        const startX = event.clientX;
        const startY = event.clientY;
        const rect = chatbotWidget.getBoundingClientRect();

        chatbotWidget.classList.add('is-dragging');

        const move = (moveEvent) => {
            const nextLeft = rect.left + (moveEvent.clientX - startX);
            const nextTop = rect.top + (moveEvent.clientY - startY);

            chatbotWidget.style.left = `${clampValue(nextLeft, 12, window.innerWidth - chatbotWidget.offsetWidth - 12)}px`;
            chatbotWidget.style.top = `${clampValue(nextTop, 12, window.innerHeight - chatbotWidget.offsetHeight - 12)}px`;
            chatbotWidget.style.right = 'auto';
            chatbotWidget.style.bottom = 'auto';
        };

        const stop = () => {
            chatbotWidget.classList.remove('is-dragging');
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', stop);
            window.removeEventListener('pointercancel', stop);
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', stop);
        window.addEventListener('pointercancel', stop);
    };

    if (chatbotHeader) {
        chatbotHeader.addEventListener('pointerdown', startDrag);
    }

    chatbotToggle.addEventListener('pointerdown', startDrag);

    chatbotToggle.addEventListener('click', () => {
        const isHidden = chatbotPanel.hasAttribute('hidden');

        if (isHidden) {
            chatbotPanel.removeAttribute('hidden');
            chatbotToggle.setAttribute('aria-expanded', 'true');
            setTimeout(() => chatbotInput.focus(), 100);
            return;
        }

        chatbotPanel.setAttribute('hidden', 'hidden');
        chatbotToggle.setAttribute('aria-expanded', 'false');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotPanel.setAttribute('hidden', 'hidden');
        chatbotToggle.setAttribute('aria-expanded', 'false');
    });

    chatbotForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const value = chatbotInput.value.trim();

        if (!value) {
            chatbotInput.focus();
            return;
        }

        addChatMessage(value, 'user');
        chatbotInput.value = '';

        setTimeout(() => {
            const actionReply = chatbotActionReply(value);
            addChatMessage(actionReply || chatbotReply(value), 'bot');
        }, 350);
    });

    window.addEventListener('resize', updateWidgetPosition);
}

// Garante que exista um controle de tema em todas as páginas.
// Quando o botão do menu principal não existir, cria um switch flutuante compatível.
const ensureThemeToggle = () => {
    const existingToggles = document.querySelectorAll('.theme-toggle');

    if (existingToggles.length > 0) {
        return existingToggles;
    }

    const floatingToggle = document.createElement('button');
    floatingToggle.type = 'button';
    floatingToggle.className = 'theme-toggle floating-theme-toggle';
    floatingToggle.setAttribute('aria-label', 'Alternar modo noturno');
    floatingToggle.setAttribute('aria-pressed', 'false');
    floatingToggle.title = 'Modo noturno';
    floatingToggle.dataset.theme = 'light';
    floatingToggle.innerHTML = `
        <span class="theme-toggle-track" aria-hidden="true">
            <span class="theme-toggle-thumb">
                <i class="theme-toggle-thumb-icon fa-solid fa-sun"></i>
            </span>
        </span>
        <span class="theme-toggle-icons" aria-hidden="true">
            <i class="fa-solid fa-sun"></i>
            <i class="fa-solid fa-moon"></i>
        </span>
    `;

    document.body.appendChild(floatingToggle);

    return document.querySelectorAll('.theme-toggle');
};

const themeToggles = ensureThemeToggle();

// Mantém o estado do tema visível e persistente em localStorage.
// Também permite alternar por clique ou arraste do thumb do switch.
themeToggles.forEach((themeToggle) => {
    const setTheme = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        themeToggle.dataset.theme = isDark ? 'dark' : 'light';
        themeToggle.setAttribute('aria-pressed', String(isDark));

        const thumbIcon = themeToggle.querySelector('.theme-toggle-thumb-icon');
        if (thumbIcon) {
            thumbIcon.classList.toggle('fa-sun', !isDark);
            thumbIcon.classList.toggle('fa-moon', isDark);
        }

        localStorage.setItem('livingScreenTheme', isDark ? 'dark' : 'light');
    };

    let dragStarted = false;
    let pointerMoved = false;

    const syncFromPointer = (event) => {
        const track = themeToggle.querySelector('.theme-toggle-track');
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const threshold = rect.left + rect.width / 2;
        const shouldBeDark = event.clientX >= threshold;

        if (document.body.classList.contains('dark-mode') !== shouldBeDark) {
            setTheme(shouldBeDark);
        }
    };

    themeToggle.addEventListener('pointerdown', (event) => {
        dragStarted = true;
        pointerMoved = false;
        themeToggle.setPointerCapture?.(event.pointerId);
    });

    themeToggle.addEventListener('pointermove', (event) => {
        if (!dragStarted) return;
        pointerMoved = true;
        syncFromPointer(event);
    });

    themeToggle.addEventListener('pointerup', () => {
        dragStarted = false;
    });

    themeToggle.addEventListener('pointerleave', () => {
        dragStarted = false;
    });

    themeToggle.addEventListener('click', (event) => {
        if (pointerMoved) {
            pointerMoved = false;
            event.preventDefault();
            return;
        }

        setTheme(!document.body.classList.contains('dark-mode'));
    });

    const savedTheme = localStorage.getItem('livingScreenTheme');
    setTheme(savedTheme ? savedTheme === 'dark' : false);
});

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

