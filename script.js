// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        if (question) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                const content = item.querySelector('p, .benefits-list, .departments-list');
                if (content.style.display === 'none' || !content.style.display) {
                    content.style.display = 'block';
                    question.style.color = 'var(--primary-blue)';
                } else {
                    content.style.display = 'none';
                    question.style.color = 'var(--text-dark)';
                }
            });
        }
    });

    // Add loading animation for buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                }, 2000);
            }
        });
    });

    // Intersection Observer for animations
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

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card, .review-card, .pricing-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Mobile menu toggle (if needed)
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Add animation to stats on scroll
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const finalNumber = entry.target.textContent;
                animateNumber(entry.target, finalNumber);
                statsObserver.unobserve(entry.target);
            }
        });
    });

    statsNumbers.forEach(stat => statsObserver.observe(stat));

    function animateNumber(element, finalNumber) {
        const isPercentage = finalNumber.includes('%');
        const isLarge = finalNumber.includes(',');
        
        let start = 0;
        let end;
        
        if (isLarge) {
            end = parseInt(finalNumber.replace(/,/g, ''));
        } else {
            end = parseInt(finalNumber);
        }
        
        const duration = 2000;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            
            if (isLarge) {
                element.textContent = current.toLocaleString();
            } else {
                element.textContent = current + (isPercentage ? '%' : '');
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = finalNumber;
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    // Contact form handling (if form is added)
    const contactButtons = document.querySelectorAll('button');
    contactButtons.forEach(button => {
        if (button.textContent.includes('GET STARTED') || button.textContent.includes('START YOUR FREE TRIAL')) {
            button.addEventListener('click', function() {
                // Simulate form opening or redirect
                alert('Redirecting to signup page...\n\nDemo purposes: This would normally redirect to a registration form.');
            });
        }
    });

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 168, 230, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.boxShadow = 'var(--shadow)';
            }
        });
    });

    // Video placeholder click handler
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            alert('Demo video would play here!\n\nThis is a demonstration of the Genie Diagnostics platform.');
        });
    }

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Add ripple effect to all buttons
    const allButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    allButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect and loading states
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }

    .btn-primary.loading, .btn-secondary.loading {
        opacity: 0.7;
        cursor: not-allowed;
        pointer-events: none;
    }

    .header {
        transition: transform 0.3s ease;
    }

    /* Enhanced mobile styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: var(--shadow);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }

        .nav-menu.active {
            transform: translateY(0);
        }

        .mobile-menu-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
