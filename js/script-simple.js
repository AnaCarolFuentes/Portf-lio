// VERSÃO SIMPLIFICADA - Use este se houver problemas com animações

// Verificar se a imagem de perfil carregou corretamente
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('.profile-img');
    const profileIcon = document.querySelector('.profile-pic i');
    
    if (profileImg) {
        profileImg.addEventListener('load', () => {
            if (profileIcon) {
                profileIcon.style.display = 'none';
            }
        });
        
        profileImg.addEventListener('error', () => {
            profileImg.style.display = 'none';
            if (profileIcon) {
                profileIcon.style.display = 'block';
            }
        });
        
        if (profileImg.complete && profileImg.naturalHeight !== 0) {
            if (profileIcon) {
                profileIcon.style.display = 'none';
            }
        }
    }

    // Garantir que a seção About seja sempre visível
    const aboutContent = document.querySelector('.about-content');
    const aboutStats = document.querySelector('.about-stats');
    
    if (aboutContent) {
        aboutContent.style.opacity = '1';
        aboutContent.style.transform = 'translateY(0)';
        aboutContent.classList.add('animate');
    }
    
    if (aboutStats) {
        aboutStats.style.opacity = '1';
        aboutStats.style.transform = 'translateY(0)';
        aboutStats.classList.add('animate');
    }

    console.log('✅ Seção About corrigida e visível');
});

// Navegação mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animação do hambúrguer
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
});

// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Destacar link ativo na navegação
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const headerHeight = 80;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Função para mostrar notificações
function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

console.log('🚀 Script simplificado carregado - Seção About deve estar visível!');
