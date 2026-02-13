/**
 * PORTFOLIO SYSTEM CONTROLLER
 * Fixed for Mobile Responsiveness & Flow
 */

const App = {
    init() {
        // Safe check for data
        if(typeof portfolioData === 'undefined') {
            console.error("SYS: Data module not loaded.");
            return;
        }

        Terminal.init();
        Renderer.renderAll();
        Navigation.init();
        
        Terminal.log("System kernel loaded.", "SYS");
        Terminal.log("Mobile interface ready.", "SYS");
        Terminal.logQuote('boot');
    }
};

const Terminal = {
    dom: {
        logs: document.getElementById('term-logs'),
        input: document.getElementById('cmd-input')
    },
    
    init() {
        if(!this.dom.input) return;
        this.dom.input.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') this.handleCommand(e.target.value);
        });
    },

    log(msg, type="INFO") {
        if(!this.dom.logs) return;
        const time = new Date().toLocaleTimeString('en-US', {hour12:false});
        const div = document.createElement('div');
        div.className = 'log-line';
        div.innerHTML = `<span class="log-time">[${time}]</span> <span class="log-sys">${type}</span>: ${msg}`;
        this.dom.logs.prepend(div);
    },

    logQuote(key) {
        if(!this.dom.logs) return;
        const q = portfolioData.quotes[key];
        if(q) {
            const div = document.createElement('div');
            div.className = 'log-line';
            div.innerHTML = `<div class="log-quote">"${q.text}" <span style="opacity:0.7; font-size:0.8em">-- ${q.source}</span></div>`;
            this.dom.logs.prepend(div);
        }
    },

    handleCommand(cmd) {
        const val = cmd.toLowerCase().trim();
        this.dom.input.value = '';
        this.log(`> ${val}`, "USER");

        const commands = {
            'help': () => this.log("Available commands: core, projects, skills, logs, contact, clear"),
            'clear': () => this.dom.logs.innerHTML = '',
            // Map commands to navigation
            'core': () => Navigation.scrollTo('hero'),
            'projects': () => Navigation.scrollTo('projects'),
            'skills': () => Navigation.scrollTo('skills'),
            'logs': () => Navigation.scrollTo('experience'),
            'contact': () => Navigation.scrollTo('contact')
        };

        if(commands[val]) commands[val]();
        else if (document.getElementById(val)) Navigation.scrollTo(val);
        else this.log(`Command not found: ${val}`, "ERR");
    }
};

const Renderer = {
    renderAll() {
        this.renderProjects();
        this.renderSkills();
        this.renderExperience();
    },

    renderProjects() {
        const container = document.getElementById('projects-container');
        if(!container) return;
        
        container.innerHTML = portfolioData.projects.map(p => {
            const statusColor = p.status === 'PROD' ? '#22c55e' : (p.status === 'DEPLOYED' ? '#3b82f6' : '#eab308');
            return `
            <div class="project-card">
                <h3>${p.title} <span style="font-size:0.6rem; border:1px solid ${statusColor}; padding:2px 6px; border-radius:4px; color:${statusColor}">${p.status}</span></h3>
                <p class="project-desc">${p.desc}</p>
                <div style="display:flex; flex-wrap:wrap; gap:5px;">
                    ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>`;
        }).join('');
    },

    renderSkills() {
        const container = document.getElementById('skills-container');
        if(!container) return;

        for (const [cat, items] of Object.entries(portfolioData.skills)) {
            container.innerHTML += `
                <div class="skill-box">
                    <h4>${cat.replace('_', ' ')}</h4>
                    <div class="skill-list">
                        ${items.map(i => `<span>${i}</span>`).join('')}
                    </div>
                </div>
            `;
        }
    },

    renderExperience() {
        const container = document.getElementById('experience-container');
        if(!container) return;

        container.innerHTML = portfolioData.experience.map(e => `
            <div class="log-item">
                <div class="log-role">${e.role}</div>
                <span class="log-company">${e.company} // ${e.date}</span>
                <p style="color:#888; font-size:0.9rem">${e.desc}</p>
            </div>
        `).join('');
    }
};

const Navigation = {
    init() {
        this.setupObserver();
        this.setupDesktopNav();
        this.setupMobileMenu();
    },

    scrollTo(id) {
        const el = document.getElementById(id);
        if(el) {
            el.scrollIntoView({ behavior: 'smooth' });
            // Log interaction if sidebar is visible
            if(window.innerWidth > 900) {
                Terminal.log(`Navigating to: ${id.toUpperCase()}`, "NAV");
            }
        }
    },

    setupDesktopNav() {
        const navContainer = document.querySelector('.system-modules');
        if(navContainer) {
            navContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.mod-btn');
                if(btn) this.scrollTo(btn.dataset.target);
            });
        }
    },

    setupMobileMenu() {
        const btn = document.getElementById('mobile-menu-toggle');
        const menu = document.getElementById('mobile-menu');
        
        if(btn && menu) {
            // Toggle Menu
            btn.addEventListener('click', () => {
                menu.classList.toggle('show');
            });

            // Handle Links (Close menu + Smooth Scroll)
            menu.querySelectorAll('.m-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault(); // Stop default anchor jump
                    const targetId = link.getAttribute('href').substring(1);
                    this.scrollTo(targetId);
                    menu.classList.remove('show'); // Close menu
                });
            });
        }
    },

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Update Desktop UI
                    document.querySelectorAll('.status-indicator').forEach(el => el.classList.remove('active'));
                    document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
                    
                    const activeBtn = document.querySelector(`.mod-btn[data-target="${entry.target.id}"]`);
                    if(activeBtn) {
                        activeBtn.classList.add('active');
                        const indicator = activeBtn.querySelector('.status-indicator');
                        if(indicator) indicator.classList.add('active');
                    }
                    
                    // Trigger Animation
                    entry.target.classList.add('active');
                    
                    // Only log if not already logged recently (debounce could be added here)
                    if(window.innerWidth > 900 && !entry.target.dataset.logged) {
                        Terminal.logQuote(entry.target.id);
                        entry.target.dataset.logged = "true"; // Simple debounce
                    }
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.data-section').forEach(section => observer.observe(section));
    }
};

// Start System
document.addEventListener('DOMContentLoaded', () => App.init());