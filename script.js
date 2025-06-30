// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initSmoothScrolling();
    initActiveNavigation();
    initAnimationsOnScroll();
    initMobileMenu();
    showWelcomeMessage();
});

// Navegação suave entre seções
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para navegação fixa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Destaca o link ativo na navegação
function initActiveNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Animações ao rolar a página
function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.detail-card, .gift-item, .donation-message');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Menu mobile (para futuras melhorias)
function initMobileMenu() {
    // Adiciona classe para identificar dispositivos móveis
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
    }
    
    // Atualiza ao redimensionar
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }
    });
}

// Função para copiar chave PIX
function copyPixKey() {
    const pixKeyInput = document.getElementById('pixKey');
    const copyBtn = event.target.closest('.copy-btn');
    
    // Seleciona e copia o texto
    pixKeyInput.select();
    pixKeyInput.setSelectionRange(0, 99999); // Para dispositivos móveis
    
    try {
        // Tenta usar a API moderna de clipboard
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(pixKeyInput.value).then(function() {
                showCopySuccess(copyBtn, 'Chave PIX copiada!');
            }).catch(function() {
                // Fallback para método antigo
                fallbackCopyText(pixKeyInput.value, copyBtn, 'Chave PIX copiada!');
            });
        } else {
            // Fallback para método antigo
            fallbackCopyText(pixKeyInput.value, copyBtn, 'Chave PIX copiada!');
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
        showCopyError(copyBtn);
    }
}

// Função para copiar nome PIX
function copyPixName() {
    const pixNameInput = document.getElementById('pixName');
    const copyBtn = event.target.closest('.copy-btn');
    
    // Seleciona e copia o texto
    pixNameInput.select();
    pixNameInput.setSelectionRange(0, 99999); // Para dispositivos móveis
    
    try {
        // Tenta usar a API moderna de clipboard
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(pixNameInput.value).then(function() {
                showCopySuccess(copyBtn, 'Nome copiado!');
            }).catch(function() {
                // Fallback para método antigo
                fallbackCopyText(pixNameInput.value, copyBtn, 'Nome copiado!');
            });
        } else {
            // Fallback para método antigo
            fallbackCopyText(pixNameInput.value, copyBtn, 'Nome copiado!');
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
        showCopyError(copyBtn);
    }
}

// Método fallback para copiar texto (compatibilidade)
function fallbackCopyText(text, button, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button, successMessage);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        console.error('Fallback: Erro ao copiar', err);
        showCopyError(button);
    }
    
    document.body.removeChild(textArea);
}

// Mostra feedback de sucesso ao copiar
function showCopySuccess(button, message) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> ' + message;
    button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    
    // Adiciona vibração em dispositivos móveis
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    
    setTimeout(function() {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(135deg, #ff69b4, #ff1493)';
    }, 2000);
}

// Mostra feedback de erro ao copiar
function showCopyError(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erro';
    button.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
    
    setTimeout(function() {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(135deg, #ff69b4, #ff1493)';
    }, 2000);
}

// Mensagem de boas-vindas
function showWelcomeMessage() {
    // Pequeno delay para melhor experiência
    setTimeout(function() {
        console.log('🎀 Bem-vinda ao site do chá de bebê da nossa princesinha! 🎀');
    }, 1000);
}

// Função para gerar QR Code PIX (placeholder para implementação futura)
function generatePixQRCode() {
    // Esta função pode ser implementada com uma biblioteca de QR Code
    // Por exemplo: qrcode.js ou similar
    console.log('Função para gerar QR Code PIX - implementar com biblioteca externa');
}

// Adiciona efeitos especiais para dispositivos com suporte a hover
function addHoverEffects() {
    // Verifica se o dispositivo suporta hover
    if (window.matchMedia('(hover: hover)').matches) {
        // Adiciona efeitos especiais para desktop
        const cards = document.querySelectorAll('.detail-card, .gift-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Inicializa efeitos de hover após carregamento
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Função para compartilhar (para implementação futura)
function shareEvent() {
    if (navigator.share) {
        navigator.share({
            title: 'Chá de Bebê da Nossa Princesinha',
            text: 'Venha celebrar conosco a chegada da nossa pequena princesa!',
            url: window.location.href
        }).then(() => {
            console.log('Compartilhamento realizado com sucesso');
        }).catch((error) => {
            console.log('Erro ao compartilhar:', error);
        });
    } else {
        // Fallback para dispositivos que não suportam Web Share API
        const url = window.location.href;
        const text = 'Venha celebrar conosco a chegada da nossa pequena princesa! ' + url;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Link copiado para a área de transferência!');
            });
        }
    }
}

// Adiciona suporte a gestos de toque para dispositivos móveis
function initTouchGestures() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    });
    
    function handleGesture() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - pode implementar ação específica
                console.log('Swipe up detectado');
            } else {
                // Swipe down - pode implementar ação específica
                console.log('Swipe down detectado');
            }
        }
    }
}

// Inicializa gestos de toque
document.addEventListener('DOMContentLoaded', initTouchGestures);

// Função para melhorar performance em dispositivos móveis
function optimizeForMobile() {
    // Reduz animações em dispositivos com pouca bateria
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            if (battery.level < 0.2) {
                document.body.classList.add('low-battery');
                // Adiciona CSS para reduzir animações quando bateria baixa
            }
        });
    }
    
    // Otimiza imagens para dispositivos móveis
    if (window.innerWidth <= 768) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy'; // Carregamento lazy para melhor performance
        });
    }
}

// Inicializa otimizações móveis
document.addEventListener('DOMContentLoaded', optimizeForMobile);

// Adiciona suporte a modo escuro (para implementação futura)
function initDarkModeToggle() {
    // Detecta preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Usuário prefere modo escuro');
        // Implementar modo escuro se necessário
    }
}

// Função para validar dados PIX (implementação básica)
function validatePixData() {
    const pixKey = document.getElementById('pixKey').value;
    const pixName = document.getElementById('pixName').value;
    
    if (!pixKey || !pixName) {
        console.warn('Dados PIX incompletos');
        return false;
    }
    
    // Validação básica de email (se a chave for email)
    if (pixKey.includes('@')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(pixKey)) {
            console.warn('Formato de email inválido');
            return false;
        }
    }
    
    return true;
}

// Adiciona eventos de teclado para acessibilidade
document.addEventListener('keydown', function(e) {
    // Atalho para copiar PIX (Ctrl/Cmd + P)
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        copyPixKey();
    }
    
    // Navegação por teclado
    if (e.key === 'Tab') {
        // Melhora a navegação por teclado
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove classe de navegação por teclado ao usar mouse
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Inicialização final
console.log('🎀 Site do Chá de Bebê carregado com sucesso! 🎀');

