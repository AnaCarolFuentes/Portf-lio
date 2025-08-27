// SISTEMA DE ANIMAÇÕES AVANÇADO

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Sistema de animações carregado');

    // Configuração do Intersection Observer para animações on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Adicionar delay baseado no atributo data-delay
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                // Não observar mais este elemento
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos os elementos com classe animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        // Estado inicial
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease-out';
        
        // Observar elemento
        animationObserver.observe(el);
    });

    // Animação de digitação para o nome
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Piscar cursor por alguns segundos
                setTimeout(() => {
                    typingElement.style.borderRight = 'none';
                }, 2000);
            }
        };
        
        // Iniciar digitação após um pequeno delay
        setTimeout(typeWriter, 1000);
    }

    // Animação de contador para estatísticas
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat h3');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    };

    // Observer específico para estatísticas
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Animação de partículas flutuantes no hero
    const createParticles = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            hero.appendChild(particle);
        }
    };

    // Criar partículas após um delay
    setTimeout(createParticles, 2000);

    // Animação de hover melhorada para skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
            item.style.boxShadow = '0 10px 25px rgba(248, 180, 203, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = 'var(--shadow-light)';
        });
    });

    // Animação de hover para project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateY(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0deg)';
            card.style.boxShadow = 'var(--shadow-medium)';
        });
    });

    // Animação de scroll suave para navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Adicionar classe de highlight temporária
                targetSection.classList.add('section-highlight');
                setTimeout(() => {
                    targetSection.classList.remove('section-highlight');
                }, 2000);
                
                // Scroll suave
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de loading para botões
    const animateButton = (button) => {
        const originalText = button.textContent;
        const icon = button.querySelector('i');
        
        if (icon) {
            icon.classList.add('animate-spin');
        }
        
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            if (icon) {
                icon.classList.remove('animate-spin');
            }
        }, 1000);
    };

    // Aplicar animação aos botões principais
    const mainButtons = document.querySelectorAll('.btn');
    mainButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('whatsapp-link')) {
                animateButton(button);
            }
        });
    });

    // Animação de reveal para seções
    const revealSections = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.animationDelay = (index * 0.2) + 's';
            section.classList.add('animate-fade-in-up');
        });
    };

    // Animação de entrada para o header
    const animateHeader = () => {
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.8s ease-out';
            
            setTimeout(() => {
                header.style.transform = 'translateY(0)';
            }, 500);
        }
    };

    // Inicializar animações do header
    animateHeader();

    // Animação de parallax suave para o hero
    const parallaxHero = () => {
        const hero = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image');
        
        if (hero && heroImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                heroImage.style.transform = `translateY(${rate}px)`;
            });
        }
    };

    // Inicializar parallax
    parallaxHero();

    // Animação de glitch para elementos especiais (opcional)
    const addGlitchEffect = (element) => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        });
    };

    // Aplicar efeito glitch ao título principal (opcional)
    const mainTitle = document.querySelector('.hero h1');
    if (mainTitle) {
        // addGlitchEffect(mainTitle); // Descomente se quiser o efeito
    }

    // Animação de fade in sequencial para skill items
    const animateSkillsSequentially = () => {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach((category, categoryIndex) => {
            const items = category.querySelectorAll('.skill-item');
            
            items.forEach((item, itemIndex) => {
                const delay = (categoryIndex * 200) + (itemIndex * 100);
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                }, delay);
            });
        });
    };

    // Observer para skills
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillsSequentially();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    console.log('✨ Todas as animações foram inicializadas!');
});

// Adicionar classe CSS para highlight de seção
const style = document.createElement('style');
style.textContent = `
    .section-highlight {
        background: linear-gradient(45deg, rgba(248, 180, 203, 0.1), rgba(248, 180, 203, 0.05));
        animation: sectionPulse 2s ease-in-out;
    }
    
    @keyframes sectionPulse {
        0%, 100% { background: transparent; }
        50% { background: linear-gradient(45deg, rgba(248, 180, 203, 0.1), rgba(248, 180, 203, 0.05)); }
    }
    
    @keyframes glitch {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-2px); }
        40% { transform: translateX(2px); }
        60% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
    }
`;
document.head.appendChild(style);
