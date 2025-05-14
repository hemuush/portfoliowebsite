// main.js

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Populate the portfolio content from the data file
    // Ensure portfolioData is loaded before calling populatePortfolio
    if (typeof portfolioData !== 'undefined') {
        populatePortfolio(portfolioData);
    } else {
        console.error("Error: portfolioData is not loaded. Make sure portfoliodata.js is included before main.js");
        // You might want to show an error message on the page or handle this case
    }


    // Initialize particles.js
    initParticles();

    // Text typing animation
    // Pass the tagline phrases from the loaded data
    if (typeof portfolioData !== 'undefined' && portfolioData.hero && portfolioData.hero.taglinePhrases) {
        initTypingAnimation(portfolioData.hero.taglinePhrases);
    } else {
         console.warn("Tagline phrases not found in portfolioData. Typing animation will not start.");
    }


    // Handle menu clicks
    initMenuHandlers();

    // Handle contact form submission
    initContactForm();

    // Initialize back to top button
    initBackToTop();

    // Initialize scroll animations for elements within sections
    // Keep this, it works with the dynamically added elements
    initScrollAnimations();

    // NOTE: The logic to hide the loading screen is in the window.load event listener below.
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


// Function to populate the portfolio content dynamically
function populatePortfolio(data) {
    // Hero Section
    const heroNameElement = document.getElementById('hero-name');
    const heroTitleElement = document.getElementById('hero-title');

    if (heroNameElement) heroNameElement.textContent = data.hero.name;
    if (heroTitleElement) heroTitleElement.textContent = data.hero.title;


    // About Section
    const aboutTextDiv = document.getElementById('about-text');
    const aboutStatsDiv = document.getElementById('about-stats'); // Assuming you added this ID

    if (aboutTextDiv) {
        aboutTextDiv.innerHTML = ''; // Clear existing content
        if (data.about.description) {
            data.about.description.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                aboutTextDiv.appendChild(p);
            });
        }
        // If you have an about photo, set the src here
        // const aboutPhoto = document.getElementById('about-photo');
        // if (aboutPhoto && data.about.imageUrl) {
        //    aboutPhoto.src = data.about.imageUrl;
        // } else if (aboutPhoto) {
        //    aboutPhoto.style.display = 'none'; // Hide if no image URL
        // }
    }

    if (aboutStatsDiv) {
         aboutStatsDiv.innerHTML = ''; // Clear existing stats
         if (data.about.stats) {
             data.about.stats.forEach(stat => {
                 const statDiv = document.createElement('div');
                 statDiv.classList.add('stat');
                 statDiv.innerHTML = `
                     <span class="stat-number">${stat.number}</span>
                     <span class="stat-label">${stat.label}</span>
                 `;
                 aboutStatsDiv.appendChild(statDiv);
             });
         }
    }


    // Skills Section
    const skillsWrapperDiv = document.getElementById('skills-wrapper');
    if (skillsWrapperDiv && data.skills) {
        skillsWrapperDiv.innerHTML = ''; // Clear existing content
        for (const category in data.skills) {
            if (data.skills.hasOwnProperty(category) && Array.isArray(data.skills[category])) {
                const skillCategoryDiv = document.createElement('div');
                skillCategoryDiv.classList.add('skill-category');

                const categoryTitle = document.createElement('h3');
                // Basic title formatting
                const formattedCategoryName = category.replace(/([A-Z])/g, ' $1').trim();
                let titleText = formattedCategoryName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                let iconClass = 'fas fa-code'; // Default icon
                if(category === 'backendFrameworks') iconClass = 'fas fa-server';
                else if(category === 'databases') iconClass = 'fas fa-database';
                else if(category === 'machineLearning') iconClass = 'fas fa-brain';
                else if(category === 'cloudDevOps') iconClass = 'fas fa-cloud';
                 // Add more icon mappings here

                categoryTitle.innerHTML = `<i class="${iconClass}"></i> ${titleText}`;


                const skillListUl = document.createElement('ul');
                skillListUl.classList.add('skill-list');

                data.skills[category].forEach(skill => {
                    const skillPillLi = document.createElement('li');
                    skillPillLi.classList.add('skill-pill');
                    skillPillLi.textContent = skill;
                    skillListUl.appendChild(skillPillLi);
                });

                skillCategoryDiv.appendChild(categoryTitle);
                skillCategoryDiv.appendChild(skillListUl);
                skillsWrapperDiv.appendChild(skillCategoryDiv);
            }
        }
    }


    // Projects Section
    const projectsGridDiv = document.getElementById('projects-grid');
     if (projectsGridDiv && data.projects) {
        projectsGridDiv.innerHTML = ''; // Clear existing content
        data.projects.forEach(project => {
            const projectCardDiv = document.createElement('div');
            projectCardDiv.classList.add('project-card');

            const projectHeaderDiv = document.createElement('div');
            projectHeaderDiv.classList.add('project-header');

            const projectTitle = document.createElement('h3');
            projectTitle.textContent = project.title;

            const projectTagsDiv = document.createElement('div');
            projectTagsDiv.classList.add('project-tags');
            if (project.tags) {
                project.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.textContent = tag;
                    projectTagsDiv.appendChild(tagSpan);
                });
            }


            projectHeaderDiv.appendChild(projectTitle);
            projectHeaderDiv.appendChild(projectTagsDiv);

            const projectDescription = document.createElement('p');
            projectDescription.textContent = project.description;

            const projectLinksDiv = document.createElement('div');
            projectLinksDiv.classList.add('project-links');
            if (project.demoLink) {
                const demoLink = document.createElement('a');
                demoLink.href = project.demoLink;
                demoLink.classList.add('project-link');
                demoLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Demo';
                if(project.demoLink !== '#') demoLink.target = "_blank";
                projectLinksDiv.appendChild(demoLink);
            }
            if (project.codeLink) {
                const codeLink = document.createElement('a');
                codeLink.href = project.codeLink;
                codeLink.classList.add('project-link');
                codeLink.innerHTML = '<i class="fab fa-github"></i> Code';
                 if(project.codeLink !== '#') codeLink.target = "_blank";
                projectLinksDiv.appendChild(codeLink);
            }

            projectCardDiv.appendChild(projectHeaderDiv);
            projectCardDiv.appendChild(projectDescription);
            projectCardDiv.appendChild(projectLinksDiv);

            projectsGridDiv.appendChild(projectCardDiv);
        });
    }


    // Experience Section
    const experienceTimelineDiv = document.getElementById('experience-timeline');
    if (experienceTimelineDiv && data.experience) {
        experienceTimelineDiv.innerHTML = ''; // Clear existing content
        data.experience.forEach(job => {
            const timelineItemDiv = document.createElement('div');
            timelineItemDiv.classList.add('timeline-item');

            const timelineMarkerDiv = document.createElement('div');
            timelineMarkerDiv.classList.add('timeline-marker');
            timelineMarkerDiv.innerHTML = '<i class="fas fa-briefcase"></i>'; // Icon for experience

            const timelineContentDiv = document.createElement('div');
            timelineContentDiv.classList.add('timeline-content');

            if (job.date) {
                const timelineDateDiv = document.createElement('div');
                timelineDateDiv.classList.add('timeline-date');
                timelineDateDiv.textContent = job.date;
                timelineContentDiv.appendChild(timelineDateDiv);
            }

            const jobTitle = document.createElement('h3');
            jobTitle.textContent = job.title;
            timelineContentDiv.appendChild(jobTitle);

            const jobCompany = document.createElement('h4');
            jobCompany.textContent = job.company;
            timelineContentDiv.appendChild(jobCompany);

            if (job.descriptionPoints && job.descriptionPoints.length > 0) {
                const experienceListUl = document.createElement('ul');
                experienceListUl.classList.add('experience-list');
                job.descriptionPoints.forEach(point => {
                    const li = document.createElement('li');
                    li.textContent = point;
                    experienceListUl.appendChild(li);
                });
                timelineContentDiv.appendChild(experienceListUl);
            } else if (job.description) { // Fallback to a single description if points not used
                 const p = document.createElement('p');
                 p.textContent = job.description;
                 timelineContentDiv.appendChild(p);
            }


            timelineItemDiv.appendChild(timelineMarkerDiv);
            timelineItemDiv.appendChild(timelineContentDiv);
            experienceTimelineDiv.appendChild(timelineItemDiv);
        });
    }


    // Education and Certifications Section (Combining into one timeline)
    const educationTimelineDiv = document.getElementById('education-timeline');
    if (educationTimelineDiv) {
        educationTimelineDiv.innerHTML = ''; // Clear existing content

        // Add Education entries first
        if (data.education) {
            data.education.forEach(edu => {
                const timelineItemDiv = document.createElement('div');
                timelineItemDiv.classList.add('timeline-item');

                const timelineMarkerDiv = document.createElement('div');
                timelineMarkerDiv.classList.add('timeline-marker');
                timelineMarkerDiv.innerHTML = '<i class="fas fa-graduation-cap"></i>'; // Icon for education

                const timelineContentDiv = document.createElement('div');
                timelineContentDiv.classList.add('timeline-content');

                if (edu.date) {
                    const timelineDateDiv = document.createElement('div');
                    timelineDateDiv.classList.add('timeline-date');
                    timelineDateDiv.textContent = edu.date;
                    timelineContentDiv.appendChild(timelineDateDiv);
                }

                const eduDegree = document.createElement('h3');
                eduDegree.textContent = edu.degree;
                timelineContentDiv.appendChild(eduDegree);

                const eduInstitution = document.createElement('h4');
                eduInstitution.textContent = edu.institution;
                timelineContentDiv.appendChild(eduInstitution);

                if (edu.description) {
                    const p = document.createElement('p');
                    p.textContent = edu.description;
                    timelineContentDiv.appendChild(p);
                }

                timelineItemDiv.appendChild(timelineMarkerDiv);
                timelineItemDiv.appendChild(timelineContentDiv);
                educationTimelineDiv.appendChild(timelineItemDiv);
            });
        }


        // Add Certification entries
        if (data.certifications) {
            data.certifications.forEach(cert => {
                const timelineItemDiv = document.createElement('div');
                timelineItemDiv.classList.add('timeline-item');

                const timelineMarkerDiv = document.createElement('div');
                timelineMarkerDiv.classList.add('timeline-marker');
                timelineMarkerDiv.innerHTML = '<i class="fas fa-certificate"></i>'; // Icon for certifications

                const timelineContentDiv = document.createElement('div');
                timelineContentDiv.classList.add('timeline-content');

                 if (cert.date) {
                    const timelineDateDiv = document.createElement('div');
                    timelineDateDiv.classList.add('timeline-date');
                    timelineDateDiv.textContent = cert.date;
                    timelineContentDiv.appendChild(timelineDateDiv);
                }

                const certTitle = document.createElement('h3');
                certTitle.textContent = cert.title;
                timelineContentDiv.appendChild(certTitle);

                if (cert.description) {
                    const p = document.createElement('p');
                    p.textContent = cert.description;
                    timelineContentDiv.appendChild(p);
                }

                timelineItemDiv.appendChild(timelineMarkerDiv);
                timelineItemDiv.appendChild(timelineContentDiv);
                educationTimelineDiv.appendChild(timelineItemDiv);
            });
        }
    }


    // Contact Section
    const contactInfoDiv = document.getElementById('contact-info');
    if (contactInfoDiv && data.contact) {
        contactInfoDiv.innerHTML = ''; // Clear existing content

        // Email
        const emailItem = document.createElement('div');
        emailItem.classList.add('contact-item');
        emailItem.innerHTML = `
            <i class="fas fa-envelope"></i>
            <div>
                <h3>Email</h3>
                <p>${data.contact.email}</p>
            </div>
        `;
        contactInfoDiv.appendChild(emailItem);

        // Phone
        const phoneItem = document.createElement('div');
        phoneItem.classList.add('contact-item');
        phoneItem.innerHTML = `
            <i class="fas fa-phone"></i>
            <div>
                <h3>Phone</h3>
                <p>${data.contact.phone}</p>
            </div>
        `;
        contactInfoDiv.appendChild(phoneItem);

        // Location
        const locationItem = document.createElement('div');
        locationItem.classList.add('contact-item');
        locationItem.innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            <div>
                <h3>Location</h3>
                <p>${data.contact.location}</p>
            </div>
        `;
        contactInfoDiv.appendChild(locationItem);

        // Social Links
        const socialLinksDiv = document.createElement('div');
        socialLinksDiv.classList.add('social-links');
        if (data.contact.socialLinks) {
            data.contact.socialLinks.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.classList.add('social-link');
                a.target = "_blank"; // Open in new tab
                a.innerHTML = `<i class="${link.iconClass}"></i>`;
                socialLinksDiv.appendChild(a);
            });
        }

        contactInfoDiv.appendChild(socialLinksDiv);
    }


    // Footer
    const footerCopyrightSpan = document.getElementById('footer-copyright');
    if (footerCopyrightSpan && data.footer) {
        footerCopyrightSpan.innerHTML = `© ${data.footer.year} ${data.footer.name}`; // Use innerHTML to allow HTML like the heart icon
    }
}

// Initialize particles.js (No changes needed here)
function initParticles() {
    if (window.particlesJS) {
        const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#00aaff';
        const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#00aaff';

        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: particleColor },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
                opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
                line_linked: { enable: true, distance: 150, color: lineColor, opacity: 0.3, width: 1 },
                move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
            },
            interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true }, modes: { grab: { distance: 140, line_linked: { opacity: 0.7 } }, push: { particles_nb: 4 } } },
            retina_detect: true
        });
    }
}

// Text typing animation (Modified to accept phrases array)
function initTypingAnimation(phrases) {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement || !phrases || phrases.length === 0) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    const pauseEnd = 1500;
    const pauseBetween = 500;

    function typeText() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
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
    setTimeout(typeText, 1000); // Initial delay
}

// Handle menu clicks and section navigation (No changes needed here)
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

// Add animation to section elements (Previous fix included)
function animateSection(section) {
    const elementsToAnimate = section.querySelectorAll(
        '.section-content h2, .section-content h3, .section-content p, .section-content ul, .project-card, .skill-category, .timeline-item'
    );

    let baseDelay = 0.05;

    elementsToAnimate.forEach((el, i) => {
        if (el.classList.contains('animated-in')) {
            el.style.opacity = '1';
            el.style.animation = 'none';
            el.style.animationDelay = '';
            return;
        }

        el.classList.remove('fade-in', 'slide-in-left', 'slide-in-right');
        el.style.opacity = '0';
        el.style.animationDelay = '';
        el.style.animation = '';

        let animationClass = 'fade-in';
        let delayIncrement = 0.07;

        if (el.classList.contains('project-card') || el.classList.contains('timeline-item')) {
            animationClass = i % 2 === 0 ? 'slide-in-left' : 'slide-in-right';
            delayIncrement = 0.15;
        } else if (el.classList.contains('skill-category')) {
            animationClass = 'fade-in';
            delayIncrement = 0.12;
        } else if (el.tagName === 'H2' || el.tagName === 'H3') {
            animationClass = 'fade-in';
            delayIncrement = 0.1;
        }

        el.style.animationDelay = `${baseDelay + i * delayIncrement}s`;
        el.classList.add(animationClass, 'animated-in');
    });

    const _ = section.offsetHeight; // Force reflow
}

// Global set to keep track of elements animated by scrolling (No changes needed here)
const animatedScrollElements = new Set();

// Initialize scroll animations for elements as they come into view (Previous fix included)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            const sectionContainer = entry.target.closest('.section-container');
            if (entry.isIntersecting && sectionContainer && sectionContainer.classList.contains('active')) {
                const el = entry.target;
                if (el.classList.contains('animated-in')) {
                     el.style.opacity = '1';
                     el.style.animation = 'none';
                    return;
                }

                if (!animatedScrollElements.has(el)) {
                     let animationClass = 'fade-in';
                      if (el.classList.contains('project-card') || el.classList.contains('timeline-item')) {
                           const siblings = Array.from(el.parentNode.children).filter(child => child.matches(el.tagName.toLowerCase() + '.' + Array.from(el.classList).find(cls => cls !== 'animated-in' && cls !== 'fade-in' && !cls.startsWith('slide-in-'))));
                           const index = siblings.indexOf(el);
                           animationClass = index % 2 === 0 ? 'slide-in-left' : 'slide-in-right';
                      }
                     el.style.animationDelay = '0s';
                     el.classList.add(animationClass, 'animated-in');
                     el.style.opacity = '1';

                     animatedScrollElements.add(el);
                     // obs.unobserve(el);
                }
            } else if (!entry.isIntersecting && animatedScrollElements.has(entry.target)) {
                 // animatedScrollElements.delete(entry.target);
                 // el.classList.remove(....); el.style.opacity = '0';
                 // obs.observe(el);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.skill-category, .project-card, .timeline-item, .section-content h2, .section-content h3, .section-content p, .section-content ul').forEach(item => {
        observer.observe(item);
    });
}


// Handle contact form submission (No changes needed here)
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
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

// Initialize back to top button (No changes needed here)
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

// Konami Code Easter Egg (No changes needed here)
function initKonamiCode() {
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function (e) {
        if (e.key.toLowerCase() === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.classList.add('konami-activated');
                const particlesEl = document.getElementById('particles-js');
                if (particlesEl && window.particlesJS) {
                    window.particlesJS('particles-js', {
                         particles: {
                            number: { value: 100, density: { enable: true, value_area: 800 }},
                            color: { value: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'] },
                            shape: { type: 'star', stroke: {width: 0, color: "#000000"}},
                            opacity: {value: 0.7, random: true},
                            size: { value: 5, random: true, anim: {enable: true, speed: 4, size_min: 0.3, sync: false}},
                            line_linked: { enable: true, distance: 100, color: '#ffffff', opacity: 0.4, width:1},
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
                konamiIndex = 0;
                setTimeout(() => {
                    document.body.classList.remove('konami-activated');
                    initParticles();
                }, 7000);
            }
        } else {
            konamiIndex = 0;
        }
    });
}
initKonamiCode();