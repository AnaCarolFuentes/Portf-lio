// INTEGRAÇÃO WHATSAPP - Adicione este código ao seu script principal

// Configuração do WhatsApp
const whatsappConfig = {
    // SUBSTITUA pelo seu número (formato: 5535984380371)
    phoneNumber: '5535984380371', // Seu número: (35) 98438-0371
    
    // Mensagens personalizadas para diferentes contextos
    messages: {
        default: 'Olá! Vi seu portfólio e gostaria de conversar sobre oportunidades.',
        project: 'Olá! Vi seu portfólio e tenho interesse em discutir um projeto com você.',
        job: 'Olá! Vi seu portfólio e gostaria de conversar sobre uma oportunidade de trabalho.',
        collaboration: 'Olá! Vi seu portfólio e tenho uma proposta de colaboração interessante.',
        general: 'Olá! Vi seu portfólio e gostaria de entrar em contato.'
    }
};

// Função principal para abrir WhatsApp
function openWhatsApp(messageType = 'default') {
    const message = whatsappConfig.messages[messageType] || whatsappConfig.messages.default;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`;
    
    // Abrir em nova aba
    window.open(whatsappUrl, '_blank');
    
    // Analytics (opcional)
    console.log('WhatsApp aberto:', messageType);
}

// Função para mostrar modal de opções de contato
function showContactOptions() {
    // Remover modal existente
    const existingModal = document.querySelector('.contact-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="contact-modal-content">
            <div class="contact-modal-header">
                <h3>Como você gostaria de entrar em contato?</h3>
                <button class="contact-modal-close" onclick="closeContactModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="contact-modal-body">
                <button class="contact-option" onclick="openWhatsApp('job'); closeContactModal();">
                    <i class="fas fa-briefcase"></i>
                    <div>
                        <strong>Oportunidade de Trabalho</strong>
                        <p>Tenho uma vaga ou projeto para você</p>
                    </div>
                </button>
                
                <button class="contact-option" onclick="openWhatsApp('project'); closeContactModal();">
                    <i class="fas fa-code"></i>
                    <div>
                        <strong>Projeto Específico</strong>
                        <p>Quero discutir um projeto técnico</p>
                    </div>
                </button>
                
                <button class="contact-option" onclick="openWhatsApp('collaboration'); closeContactModal();">
                    <i class="fas fa-handshake"></i>
                    <div>
                        <strong>Colaboração</strong>
                        <p>Proposta de parceria ou colaboração</p>
                    </div>
                </button>
                
                <button class="contact-option" onclick="openWhatsApp('general'); closeContactModal();">
                    <i class="fas fa-comments"></i>
                    <div>
                        <strong>Conversa Geral</strong>
                        <p>Apenas quero bater um papo</p>
                    </div>
                </button>
            </div>
        </div>
    `;
    
    // Adicionar ao body
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Função para fechar modal
function closeContactModal() {
    const modal = document.querySelector('.contact-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Fechar modal ao clicar fora
document.addEventListener('click', (e) => {
    const modal = document.querySelector('.contact-modal');
    if (modal && e.target === modal) {
        closeContactModal();
    }
});

// Adicionar botão WhatsApp no hero (opcional)
function addWhatsAppToHero() {
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = '#';
        whatsappBtn.className = 'btn btn-whatsapp-hero';
        whatsappBtn.onclick = () => openWhatsApp('general');
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp';
        
        heroButtons.appendChild(whatsappBtn);
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Opcional: adicionar botão no hero
    // addWhatsAppToHero();
    
    console.log('✅ WhatsApp integration loaded');
});

// Função para detectar dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função alternativa para dispositivos que não suportam wa.me
function openWhatsAppAlternative() {
    const message = whatsappConfig.messages.default;
    
    if (isMobile()) {
        // Tentar abrir app do WhatsApp
        const whatsappApp = `whatsapp://send?phone=${whatsappConfig.phoneNumber}&text=${encodeURIComponent(message)}`;
        window.location.href = whatsappApp;
        
        // Fallback para web após 2 segundos
        setTimeout(() => {
            const whatsappWeb = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappWeb, '_blank');
        }, 2000);
    } else {
        // Desktop: abrir WhatsApp Web
        const whatsappWeb = `https://web.whatsapp.com/send?phone=${whatsappConfig.phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappWeb, '_blank');
    }
}

// Função para mostrar status online/offline (opcional)
function showWhatsAppStatus() {
    const statusIndicator = document.createElement('div');
    statusIndicator.className = 'whatsapp-status';
    statusIndicator.innerHTML = `
        <div class="status-dot online"></div>
        <span>Online agora</span>
    `;
    
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.appendChild(statusIndicator);
    }
}

// Exportar funções para uso global
window.openWhatsApp = openWhatsApp;
window.showContactOptions = showContactOptions;
window.closeContactModal = closeContactModal;
