/**
 * Modular Portfolio Engine
 * Separates data fetching, UI rendering, and Event handling.
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof portfolioData === 'undefined') {
        console.error("Critical: portfolioData not found.");
        return;
    }
    
    // 1. Initialize System
    App.init();
});

const App = {
    init: function() {
        // Render all sections
        UI.renderHero();
        UI.renderAbout();
        UI.renderSkills();
        UI.renderProjects();
        UI.renderExperience();
        UI.renderEducation();
        UI.renderContact();
        UI.renderFooter();

        // Initialize Effects
        Effects.initParticles();
        Effects.initTyping();
        
        // Setup Interactions
        Interactions.setupMenu();
        Interactions.setupContactForm();
        Interactions.removeLoadingScreen();
    }
};

/**
 * UI Component Renderer
 * Responsible for generating HTML based on data
 */
const UI = {
    renderHero: () => {
        const { hero } = portfolioData;
        document.getElementById('hero-name').textContent = hero.name;
        document.getElementById('hero-title').textContent = hero.title;
    },

    renderAbout: () => {
        const { about } = portfolioData;
        
        // Render Description
        const textContainer = document.getElementById('about-text');
        if (textContainer) {
            textContainer.innerHTML = about.description
                .map(para => `<p>${para}</p>`)
                .join('');
        }

        // Render Stats
        const statsContainer = document.getElementById('about-stats');
        if (statsContainer && about.stats) {
            statsContainer.innerHTML = about.stats.map(stat => `
                <div class="stat card-glass">
                    <span class="stat-number" style="display:block; font-size:2rem; color:var(--primary-color)">${stat.number}</span>
                    <span class="stat-label" style="font-size:0.8rem; color:var(--text-muted)">${stat.label}</span>
                </div>
            `).join('');
        }
    },

    renderSkills: () => {
        const { skills } = portfolioData;
        const container = document.getElementById('skills-wrapper');
        if (!container) return;

        container.innerHTML = Object.keys(skills).map(categoryKey => {
            const categoryName = categoryKey.replace(/([A-Z])/g, ' $1').trim(); // camelCase to Regular Text
            const items = skills[categoryKey];
            
            return `
                <div class="skill-category card-glass">
                    <h3 style="text-transform: capitalize;">${categoryName}</h3>
                    <div class="skill-list">
                        ${items.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
        }).join('');
    },

    renderProjects: () => {
        const { projects } = portfolioData;
        const container = document.getElementById('projects-grid');
        if (!container) return;

        container.innerHTML = projects.map(project => `
            <div class="project-card card-glass">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>#${tag}</span>`).join('')}
                    </div>
                </div>
                <p>${project.description}</p>
                <div class="project-links">
                    ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="project-link"><i class="fas fa-eye"></i> Demo</a>` : ''}
                    ${project.codeLink ? `<a href="${project.codeLink}" target="_blank" class="project-link"><i class="fab fa-github"></i> Code</a>` : ''}
                </div>
            </div>
        `).join('');
    },

    renderExperience: () => {
        const { experience } = portfolioData;
        const container = document.getElementById('experience-timeline');
        if (!container) return;

        container.innerHTML = experience.map(job => `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content card-glass">
                    <div class="timeline-date">${job.date}</div>
                    <h3>${job.title}</h3>
                    <h4>${job.company}</h4>
                    ${job.descriptionPoints 
                        ? `<ul class="experience-list">${job.descriptionPoints.map(pt => `<li>${pt}</li>`).join('')}</ul>` 
                        : `<p>${job.description}</p>`
                    }
                </div>
            </div>
        `).join('');
    },
    
    renderEducation: () => {
        // Combined render for Education and Certifications for cleaner code
        const container = document.getElementById('education-timeline');
        if (!container) return;
        
        let html = '';
        
        // Education
        if (portfolioData.education) {
            html += portfolioData.education.map(edu => `
                <div class="timeline-item">
                    <div class="timeline-marker" style="border-color: var(--secondary-color)"></div>
                    <div class="timeline-content card-glass">
                        <div class="timeline-date">${edu.date || 'Education'}</div>
                        <h3>${edu.degree}</h3>
                        <h4>${edu.institution}</h4>
                    </div>
                </div>
            `).join('');
        }

        // Certs
        if (portfolioData.certifications) {
            html += portfolioData.certifications.map(cert => `
                <div class="timeline-item">
                    <div class="timeline-marker" style="border-color: #fff"></div>
                    <div class="timeline-content card-glass">
                        <div class="timeline-date">Certification</div>
                        <h3>${cert.title}</h3>
                        <p>${cert.date || ''}</p>
                    </div>
                </div>
            `).join('');
        }
        
        container.innerHTML = html;
    },

    renderContact: () => {
        const { contact } = portfolioData;
        const container = document.getElementById('contact-info');
        if (!container) return;

        container.innerHTML = `
            <div class="card-glass" style="padding: 2rem;">
                <div class="contact-item mb-4">
                    <i class="fas fa-envelope fa-2x" style="color:var(--primary-color)"></i>
                    <div>
                        <h3>Email</h3>
                        <p>${contact.email}</p>
                    </div>
                </div>
                <div class="contact-item mb-4">
                    <i class="fas fa-map-marker-alt fa-2x" style="color:var(--primary-color)"></i>
                    <div>
                        <h3>Location</h3>
                        <p>${contact.location}</p>
                    </div>
                </div>
                <div class="social-links" style="margin-top:2rem">
                    ${contact.socialLinks.map(link => `
                        <a href="${link.url}" target="_blank" class="social-link" style="font-size: 1.5rem; margin-right: 1rem;">
                            <i class="${link.iconClass}"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    renderFooter: () => {
         const el = document.getElementById('footer-copyright');
         if(el) el.innerHTML = `&copy; ${portfolioData.footer.year} ${portfolioData.footer.name} | Built with <i class="fas fa-heart" style="color:red"></i>`;
    }
};

/**
 * Visual Effects Manager
 */
const Effects = {
    initParticles: () => {
        if (window.particlesJS) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 60 },
                    color: { value: '#00d2ff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    move: { enable: true, speed: 2 }
                },
                interactivity: {
                    events: { onhover: { enable: true, mode: 'repulse' } }
                }
            });
        }
    },

    initTyping: () => {
        const { taglinePhrases } = portfolioData.hero;
        if (!taglinePhrases) return;
        
        const el = document.getElementById('typing-text');
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        const type = () => {
            const current = taglinePhrases[phraseIdx];
            el.textContent = current.substring(0, charIdx);
            
            if (!isDeleting && charIdx < current.length) {
                charIdx++;
                setTimeout(type, 100);
            } else if (isDeleting && charIdx > 0) {
                charIdx--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) phraseIdx = (phraseIdx + 1) % taglinePhrases.length;
                setTimeout(type, isDeleting ? 2000 : 500);
            }
        };
        type();
    }
};

/**
 * User Interaction Manager
 */
const Interactions = {
    setupMenu: () => {
        const menuItems = document.querySelectorAll('.menu-item');
        const sections = document.querySelectorAll('.section-container');
        const closeBtns = document.querySelectorAll('.close-btn');

        // Open Section
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const targetId = this.dataset.section;
                
                // Update Menu UI
                menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Show Section
                sections.forEach(sec => sec.classList.remove('active'));
                document.getElementById(targetId).classList.add('active');
            });
        });

        // Close Section
        closeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.section-container').classList.remove('active');
                menuItems.forEach(i => i.classList.remove('active'));
            });
        });
    },

    setupContactForm: () => {
        const form = document.getElementById('contactForm');
        if(!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                form.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 2000);
            }, 1500);
        });
    },

    removeLoadingScreen: () => {
        window.addEventListener('load', () => {
            const loader = document.getElementById('loading');
            if(loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }
        });
    }
};