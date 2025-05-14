// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize particles.js
    initParticles();

    // Text typing animation
    initTypingAnimation();

    // Handle menu clicks
    initMenuHandlers();

    // Handle contact form submission
    initContactForm();

    // Initialize back to top button
    initBackToTop();

    // Initialize scroll animations
    initScrollAnimations();

    // Hide loading screen after everything's loaded
    setTimeout(function () {
        const loading = document.getElementById('loading');
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1500);
});

// Initialize particles.js with optimal configuration
function initParticles() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00aaff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00aaff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Text typing animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const phrases = [
        'Building robust backend solutions',
        'Creating AI-powered applications',
        'Developing with Python & Django',
        'Transforming ideas into code',
        'Solving complex problems with ML'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // If word is complete
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            isDeleting = true;
            typingSpeed = 1500;
        }
        // If deletion is complete
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing animation
    setTimeout(typeText, 1000);
}

// Handle menu clicks and section navigation
function initMenuHandlers() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section-container');
    const closeBtns = document.querySelectorAll('.close-btn');

    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');

            // Remove active class from all menu items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));

            // Add active class to clicked menu item
            this.classList.add('active');

            // Hide all sections first
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                // Add animation classes to elements inside the section
                animateSection(targetSection);
            }
        });
    });

    // Handle close button clicks
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Get the parent section
            const section = this.closest('.section-container');

            // Remove active class from corresponding menu item
            const sectionId = section.id;
            const menuItem = document.querySelector(`.menu-item[data-section="${sectionId}"]`);
            if (menuItem) {
                menuItem.classList.remove('active');
            }

            // Hide the section
            section.classList.remove('active');
        });
    });
}

// Add animation to section elements
function animateSection(section) {
    // Find elements to animate
    const headers = section.querySelectorAll('h2, h3');
    const paragraphs = section.querySelectorAll('p');
    const cards = section.querySelectorAll('.project-card, .skill-category, .timeline-item');
    const lists = section.querySelectorAll('ul');

    // Reset any existing animations
    const allElements = [...headers, ...paragraphs, ...cards, ...lists];
    allElements.forEach(el => {
        el.classList.remove('fade-in', 'slide-in-left', 'slide-in-right');
        el.style.opacity = '0';
    });

    // Apply animations with delays
    setTimeout(() => {
        headers.forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.animationDelay = `${i * 0.1}s`;
            el.style.opacity = '1';
        });

        setTimeout(() => {
            paragraphs.forEach((el, i) => {
                el.classList.add('fade-in');
                el.style.animationDelay = `${i * 0.1}s`;
                el.style.opacity = '1';
            });

            cards.forEach((el, i) => {
                el.classList.add(i % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
                el.style.animationDelay = `${0.2 + i * 0.1}s`;
                el.style.opacity = '1';
            });

            lists.forEach((el, i) => {
                el.classList.add('fade-in');
                el.style.animationDelay = `${0.3 + i * 0.1}s`;
                el.style.opacity = '1';
            });
        }, 200);
    }, 100);
}

// Initialize scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// Handle contact form submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Simple validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                alert('Please fill in all fields!');
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Reset form
                form.reset();
                submitBtn.textContent = 'Message Sent!';

                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
}

// Initialize back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Show button when scrolling down
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when button is clicked
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Easter egg - konami code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function (e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated
                document.body.classList.add('konami-activated');
                const particles = document.getElementById('particles-js');
                if (particles) {
                    particles.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    if (window.particlesJS) {
                        particlesJS('particles-js', {
                            particles: {
                                color: { value: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'] },
                                shape: { type: 'star' },
                                size: { value: 5, random: true },
                                line_linked: { color: '#ffffff' }
                            }
                        });
                    }
                }

                konamiIndex = 0;

                // Reset after 5 seconds
                setTimeout(() => {
                    document.body.classList.remove('konami-activated');
                    initParticles();
                }, 5000);
            }
        } else {
            konamiIndex = 0;
        }
    });
}