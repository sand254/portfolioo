// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toast notification system
function showToast(title, description, duration = 3000) {
    const toast = document.getElementById('toast');
    const titleElement = toast.querySelector('.toast-title');
    const descriptionElement = toast.querySelector('.toast-description');
    
    titleElement.textContent = title;
    descriptionElement.textContent = description;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Download functions
function downloadResume() {
    showToast('Resume Download', 'Resume download started successfully!');
       window.location.href = 'https://drive.google.com/file/d/1LNvS7a08PKaZBBGIT1YLo8VSJZFgfB4V/view?usp=drive_link';
    // In a real implementation, you would trigger an actual file download
    // window.open('/path-to-your-resume.pdf', '_blank');
}

function downloadCertificate() {
    showToast('Certificate Download', 'Codecademy certificate download started!');
    window.location.href = 'https://i.ibb.co/RGBTHt2c/sandras-certiicate-profile-Codecademy.jpg';
    // In a real implementation, you would trigger an actual file download
    // window.open('/path-to-your-certificate.pdf', '_blank');
}

// Project link handler
function openProject(projectName) {
    showToast('Opening Project', `Opening ${projectName} in a new tab`);
    // In a real implementation, you would open the actual project URL
    // window.open('https://your-project-url.com', '_blank');
}

// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Simulate form submission delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            showToast('Message Sent Successfully!', 'Thank you for your message. I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        });
    }
});

// Skill bar animations
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.id === 'skills') {
                    setTimeout(animateSkillBars, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Observe cards for staggered animations
    const cards = document.querySelectorAll('.education-card, .project-card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Mobile navigation toggle
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Navbar scroll effect
function setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Active navigation link highlighting
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
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
}

// Parallax effect for hero section
function setupParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Form validation
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidationError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Validate based on field type
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearValidationError(e) {
        const field = e.target;
        field.classList.remove('error');
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

// Typing animation for hero title
function setupTypingAnimation() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const text = titleElement.innerHTML;
    titleElement.innerHTML = '';
    
    let index = 0;
    const speed = 50;
    
    function typeWriter() {
        if (index < text.length) {
            titleElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// Smooth reveal animations for elements
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.skill-item, .contact-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        revealObserver.observe(element);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();
    setupMobileNavigation();
    setupNavbarScrollEffect();
    setupActiveNavigation();
    setupFormValidation();
    setupRevealAnimations();
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS for error states and mobile menu
const additionalCSS = `
    .form-input.error,
    .form-textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .nav-link.active {
        color: #3b82f6;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    setupNavbarScrollEffect();
    setupActiveNavigation();
}, 16)); // ~60fps

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://sand254.github.io/kenyamart/',
        'https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Task+Management',
        'https://via.placeholder.com/400x200/10b981/ffffff?text=Weather+App',
        'https://via.placeholder.com/400x200/f59e0b/ffffff?text=Social+Dashboard',
        'https://via.placeholder.com/400x200/ef4444/ffffff?text=Recipe+Finder',
        'https://via.placeholder.com/400x200/6366f1/ffffff?text=Portfolio+Website'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload function
preloadImages();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Enter key on buttons triggers click
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Add focus management for accessibility
function setupAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #3b82f6;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1002;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('button, a, input, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #3b82f6';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
setupAccessibility();

// Add print styles
const printCSS = `
    @media print {
        .navbar,
        .hamburger,
        .toast,
        .project-overlay,
        .social-links {
            display: none !important;
        }
        
        .hero,
        .skills,
        .education,
        .projects,
        .contact,
        .footer {
            page-break-inside: avoid;
            padding: 1rem 0 !important;
        }
        
        .hero-title {
            font-size: 2rem !important;
        }
        
        .project-card,
        .education-card {
            break-inside: avoid;
            box-shadow: none !important;
            border: 1px solid #ccc !important;
        }
        
        body {
            background: white !important;
            color: black !important;
        }
        
        .skills {
            background: white !important;
        }
        
        .skills .section-title,
        .skill-name,
        .skill-percentage {
            color: black !important;
        }
        
        .footer {
            background: white !important;
            color: black !important;
            border-top: 1px solid #ccc !important;
        }
    }
`;

// Add print styles to the document
const printStyleSheet = document.createElement('style');
printStyleSheet.textContent = printCSS;
document.head.appendChild(printStyleSheet);

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!
📧 Contact: your.email@example.com
🔗 GitHub: https://github.com
💼 LinkedIn: https://linkedin.com

Built with HTML, CSS, and JavaScript
`);