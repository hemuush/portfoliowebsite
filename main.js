/**
 * SYSTEM CONTROLLER
 * Modular, Fast, and Interactive
 */

const App = {
    init() {
        if(typeof portfolioData === 'undefined') {
            console.error("SYS: Data unavailable.");
            return;
        }
        
        Renderer.renderAll();
        Terminal.boot();
        Navigation.init();
    }
};

const Terminal = {
    dom: {
        logs: document.getElementById('term-logs'),
        input: document.getElementById('cmd-input')
    },
    
    async boot() {
        if(!this.dom.logs) return;
        
        // Typing effect simulation
        await this.typeLine("Initializing system kernel...");
        await this.delay(300);
        await this.typeLine("Loading neural interface v2.0...");
        await this.delay(300);
        this.log("System Ready.", "OK");
        this.logQuote('boot');

        // Input listener
        if(this.dom.input) {
            this.dom.input.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') this.handleCommand(e.target.value);
            });
        }
    },

    // Utilities
    delay(ms) { return new Promise(r => setTimeout(r, ms)); },
    
    async typeLine(text) {
        const line = document.createElement('div');
        line.className = 'log-line';
        line.style.color = '#555';
        this.dom.logs.prepend(line);
        line.textContent = text; // Instant for now, or use loop for character typing
    },

    log(msg, type="INFO") {
        if(!this.dom.logs) return;
        const time = new Date().toLocaleTimeString('en-US', {hour12:false});
        const div = document.createElement('div');
        div.className = 'log-line';
        div.innerHTML = `<span style="color:#444; font-size:0.75em; margin-right:8px">[${time}]</span> <span class="log-sys">${type}</span>: ${msg}`;
        this.dom.logs.prepend(div);
    },

    logQuote(key) {
        const q = portfolioData.quotes[key];
        if(q) {
            const div = document.createElement('div');
            div.className = 'log-line';
            div.innerHTML = `<div style="border-left:2px solid #eab308; padding-left:10px; margin:5px 0; font-style:italic; color:#e4e4e7">"${q.text}" <span style="opacity:0.5; font-size:0.8em"> // ${q.source}</span></div>`;
            this.dom.logs.prepend(div);
        }
    },

    handleCommand(cmd) {
        const val = cmd.toLowerCase().trim();
        this.dom.input.value = '';
        this.log(`> ${val}`, "USER");

        const navMap = {
            'core': 'hero',
            'projects': 'projects',
            'skills': 'skills',
            'logs': 'experience',
            'contact': 'contact'
        };

        if(val === 'help') {
            this.log("Available commands: core, projects, skills, logs, contact, clear");
        } else if(val === 'clear') {
            this.dom.logs.innerHTML = '';
        } else if(navMap[val]) {
            Navigation.scrollTo(navMap[val]);
        } else {
            this.log(`Command not found: ${val}`, "ERR");
        }
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
            let color = '#3b82f6';
            if(p.status === 'PROD') color = '#22c55e';
            if(p.status === 'BETA') color = '#eab308';
            
            return `
            <div class="project-card" style="border-top: 2px solid ${color}">
                <div>
                    <h3>${p.title} <span class="status-badge" style="color:${color}; border-color:${color}">${p.status}</span></h3>
                    <p class="project-desc">${p.desc}</p>
                </div>
                <div class="tech-row">
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
                    <h4>// ${cat.replace('_', ' ')}</h4>
                    <div class="skill-list">
                        ${items.map(i => `<span class="skill-pill">${i}</span>`).join('')}
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
                <p style="color:#a1a1aa; font-size:0.9rem; line-height:1.5">${e.desc}</p>
            </div>
        `).join('');
    }
};

const Navigation = {
    init() {
        this.setupObserver();
        this.setupMobile();
        this.setupSidebar();
    },

    scrollTo(id) {
        const el = document.getElementById(id);
        if(el) {
            el.scrollIntoView({ behavior: 'smooth' });
            if(window.innerWidth > 900) Terminal.log(`Navigating: ${id.toUpperCase()}`, "NAV");
        }
    },

    setupSidebar() {
        const nav = document.querySelector('.system-modules');
        if(!nav) return;
        nav.addEventListener('click', (e) => {
            const btn = e.target.closest('.mod-btn');
            if(btn) this.scrollTo(btn.dataset.target);
        });
    },

    setupMobile() {
        const btn = document.getElementById('mobile-menu-toggle');
        const menu = document.getElementById('mobile-menu');
        
        if(btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('show');
                btn.innerHTML = menu.classList.contains('show') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
            
            menu.querySelectorAll('.m-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const id = link.getAttribute('href').substring(1);
                    this.scrollTo(id);
                    menu.classList.remove('show');
                    btn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    },

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Update Sidebar
                    document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
                    const btn = document.querySelector(`.mod-btn[data-target="${entry.target.id}"]`);
                    if(btn) btn.classList.add('active');
                    
                    // Animate Section
                    entry.target.classList.add('active');
                    
                    // Log Context (Debounced)
                    if(!entry.target.dataset.logged) {
                        Terminal.logQuote(entry.target.id);
                        entry.target.dataset.logged = "true";
                    }
                }
            });
        }, { threshold: 0.25, rootMargin: "-10% 0px -10% 0px" });

        document.querySelectorAll('.data-section').forEach(s => observer.observe(s));
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());