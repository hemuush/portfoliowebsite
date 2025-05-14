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

    // Initialize scroll animations for elements within sections
    // Keep this, but ensure it doesn't conflict with initial popup animation
    initScrollAnimations();

    // NOTE: The logic to hide the loading screen has been moved
    // to the window.load event listener below to ensure all assets are loaded.
});

// Hide loading screen after ALL resources (images, etc.) have loaded
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    if (loading) {
        // A small delay here can prevent flicker on very fast connections
        // where the load event fires almost instantly.
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500); // Matches CSS transition time for opacity
        }, 100); // Small delay (e.g., 100ms) after load
    }
});


// Initialize particles.js with optimal configuration
function initParticles() {
    if (window.particlesJS) {
        // Particle colors are currently hardcoded.
        // If your CSS --primary-color changes, you might want to update this too.
        // For the dark theme, '#00aaff' matches the current --primary-color.
        const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#00aaff';
        const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#00aaff';


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
                    value: particleColor // Using CSS variable
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000' // Stroke color if any (theme dependent)
                    }
                },
                opacity: {
                    value: 0.4, // Slightly reduced from 0.5 for dark theme
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
                    color: lineColor, // Using CSS variable
                    opacity: 0.3, // Slightly reduced
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
                            opacity: 0.7 // Increased grab opacity
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

// Text typing animation (remains largely the same)
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

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
    let typingSpeed = 100; // Base typing speed
    const pauseEnd = 1500; // Pause at end of phrase
    const pauseBetween = 500; // Pause before typing new phrase

    function typeText() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deletion
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = pauseEnd;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = pauseBetween;
        }
        setTimeout(typeText, typingSpeed);
    }
    setTimeout(typeText, 1000); // Initial delay before starting
}

// Handle menu clicks and section navigation
function initMenuHandlers() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section-container');
    const closeBtns = document.querySelectorAll('.close-btn');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);

            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            this.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active');
            });

            if (targetSection) {
                targetSection.classList.add('active');
                // Call animateSection immediately when the section becomes active
                animateSection(targetSection);
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const section = this.closest('.section-container');
            if (section) {
                const sectionId = section.id;
                const menuItem = document.querySelector(`.menu-item[data-section="${sectionId}"]`);
                if (menuItem) {
                    menuItem.classList.remove('active');
                }
                section.classList.remove('active');
            }
        });
    });
}

// Add animation to section elements when section becomes active
// Modified to only animate elements the first time the section is opened
function animateSection(section) {
    const elementsToAnimate = section.querySelectorAll(
        '.section-content h2, .section-content h3, .section-content p, .section-content ul, .project-card, .skill-category, .timeline-item'
    );

    let baseDelay = 0.05; // Start animations almost immediately

    elementsToAnimate.forEach((el, i) => {
        // If the element has already been animated (by scroll or previous open),
        // ensure it's immediately visible and skip re-applying animations.
        if (el.classList.contains('animated-in')) {
            el.style.opacity = '1';
            el.style.animation = 'none'; // Remove any lingering animation style
            el.style.animationDelay = '';
            return; // Skip animation for this element
        }

        // For elements not yet animated, set initial state and prepare for animation
        el.classList.remove('fade-in', 'slide-in-left', 'slide-in-right');
        // Ensure initial state is hidden. CSS sets opacity: 0, but explicitly
        // setting it here *before* adding animation classes can help timing.
        el.style.opacity = '0';
        el.style.animationDelay = ''; // Reset animation delay
        el.style.animation = ''; // Reset animation style

        // Determine animation class and delay
        let animationClass = 'fade-in';
        let delayIncrement = 0.07; // Default delay increment for paragraphs/lists

        if (el.classList.contains('project-card') || el.classList.contains('timeline-item')) {
             // Using loop index `i` for consistent staggering across all animatable items
            animationClass = i % 2 === 0 ? 'slide-in-left' : 'slide-in-right';
            delayIncrement = 0.15; // Larger stagger for cards/timeline items
        } else if (el.classList.contains('skill-category')) {
            animationClass = 'fade-in';
            delayIncrement = 0.12; // Stagger for skill categories
        } else if (el.tagName === 'H2' || el.tagName === 'H3') {
            animationClass = 'fade-in';
            delayIncrement = 0.1; // Stagger for headings
        }
         // For p and ul, default delayIncrement of 0.07 is used

        // Apply animation class and calculated delay
        el.style.animationDelay = `${baseDelay + i * delayIncrement}s`; // Apply delay directly
        el.classList.add(animationClass, 'animated-in');
        // Do NOT set opacity to '1' here. Let the CSS animation handle the transition from opacity 0 to 1.
    });

    // Force a reflow. This ensures the browser applies the initial styles (like opacity: 0
    // and the animation-delay) *before* the animation starts when the section becomes visible.
    // This is a common technique to fix the "flash of final state" issue.
    // Accessing an element's offset property forces the browser to synchronously calculate layout.
    const _ = section.offsetHeight;
}

// Global set to keep track of elements animated by scrolling
const animatedScrollElements = new Set();

// Initialize scroll animations for elements as they come into view
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            // Check if the element is in an active section and is intersecting
            const sectionContainer = entry.target.closest('.section-container');
            // Only animate if intersecting, in an active section, AND NOT already animated by `animateSection`
            if (entry.isIntersecting && sectionContainer && sectionContainer.classList.contains('active')) {
                const el = entry.target;
                 // If element is already animated by animateSection, do nothing
                if (el.classList.contains('animated-in')) {
                    // Ensure it's visible if scroll observer somehow triggered before animation finished
                     el.style.opacity = '1';
                     el.style.animation = 'none'; // Prevent scroll animation if already animated by popup open
                    return;
                }

                // If it's intersecting in an active section AND not yet animated,
                // apply animation similar to animateSection but maybe without individual delays relative to other elements
                // or manage delays based on their position in the viewport/section.
                // For simplicity, let's apply a basic fade-in if the element scrolled into view
                // within an active section and wasn't animated by the initial popup opening.
                if (!animatedScrollElements.has(el)) { // Check if scroll observer already handled it
                     let animationClass = 'fade-in'; // Default for scroll
                      if (el.classList.contains('project-card') || el.classList.contains('timeline-item')) {
                           // Optional: Apply slide-in on scroll as well
                           const siblings = Array.from(el.parentNode.children).filter(child => child.matches(el.tagName.toLowerCase() + '.' + Array.from(el.classList).find(cls => cls !== 'animated-in' && cls !== 'fade-in' && !cls.startsWith('slide-in-'))));
                           const index = siblings.indexOf(el);
                           animationClass = index % 2 === 0 ? 'slide-in-left' : 'slide-in-right';
                      }
                     el.style.animationDelay = '0s'; // No delay on scroll animation start relative to intersection
                     el.classList.add(animationClass, 'animated-in'); // Mark as animated
                     el.style.opacity = '1'; // Make visible

                     animatedScrollElements.add(el); // Mark as animated by scroll observer
                     // obs.unobserve(el); // Optional: Stop observing after animating
                }
            } else if (!entry.isIntersecting && animatedScrollElements.has(entry.target)) {
                 // Optional: If you want elements to re-animate if they scroll out and back in
                 // animatedScrollElements.delete(entry.target);
                 // el.classList.remove(....); el.style.opacity = '0';
                 // obs.observe(el); // Re-observe
            }
        });
    }, { threshold: 0.15 }); // Trigger when 15% of element is visible

    // Observe relevant elements across all sections initially
    // The observer callback will check if the section is active
    document.querySelectorAll('.skill-category, .project-card, .timeline-item, .section-content h2, .section-content h3, .section-content p, .section-content ul').forEach(item => {
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

            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                // Consider a more subtle notification system than alert()
                alert('Please fill in all fields!');
                return;
            }

            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                form.reset();
                submitBtn.textContent = 'Message Sent!';
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
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Konami Code Easter Egg (remains the same)
function initKonamiCode() { // Wrapped in a function for clarity
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function (e) {
        if (e.key.toLowerCase() === konamiCode[konamiIndex]) { // make key check case-insensitive for 'b' and 'a'
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.classList.add('konami-activated');
                const particlesEl = document.getElementById('particles-js');
                if (particlesEl && window.particlesJS) {
                    // particlesEl.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Let particles.js handle it
                    // Re-init particles with Konami colors
                    window.particlesJS('particles-js', {
                        // (Copied from your original, ensure values are appropriate)
                         particles: {
                            number: { value: 100, density: { enable: true, value_area: 800 }},
                            color: { value: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'] },
                            shape: { type: 'star', stroke: {width: 0, color: "#000000"}},
                            opacity: {value: 0.7, random: true},
                            size: { value: 5, random: true, anim: {enable: true, speed: 4, size_min: 0.3, sync: false}},
                            line_linked: { enable: true, distance: 100, color: '#ffffff', opacity: 0.4, width:1}, // White lines for contrast
                            move: {enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode:"out", bounce: false}
                        },
                        interactivity: {
                            detect_on: 'canvas',
                            events: { onhover:{enable:true, mode: "repulse"}, onclick:{enable:true, mode:"push"}, resize: true},
                            modes: { repulse: {distance:100, duration:0.4}, push:{particles_nb:4}}
                        },
                        retina_detect: true
                    });
                }
                konamiIndex = 0; // Reset for next time
                setTimeout(() => {
                    document.body.classList.remove('konami-activated');
                    initParticles(); // Restore original particles
                }, 7000); // Konami effect duration
            }
        } else {
            konamiIndex = 0; // Wrong key, reset
        }
    });
}
initKonamiCode(); // Initialize Konami listener