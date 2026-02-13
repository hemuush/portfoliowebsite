document.addEventListener('DOMContentLoaded', () => {
    if(typeof portfolioData === 'undefined') return;
    System.init();
});

const System = {
    init: function() {
        this.renderProjects();
        this.renderSkills();
        this.renderExperience();
        this.log("System kernel loaded.", "SYS");
        this.log("Neural interface active.", "SYS");
        this.logQuote('boot');
        
        // Setup Scroll Observer
        this.setupObserver();
        
        // Command Input
        document.getElementById('cmd-input').addEventListener('keypress', (e) => {
            if(e.key === 'Enter') this.handleCommand(e.target.value);
        });
    },

    // --- NAVIGATION ---
    navigate: function(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    },

    // --- LOGIC ---
    log: function(msg, type="INFO") {
        const term = document.getElementById('term-logs');
        const time = new Date().toLocaleTimeString('en-US', {hour12:false});
        const line = document.createElement('div');
        line.className = 'log-line';
        line.innerHTML = `<span class="log-time">[${time}]</span> <span class="log-sys">${type}</span>: ${msg}`;
        term.prepend(line); // Add to top
    },

    logQuote: function(key) {
        const q = portfolioData.quotes[key];
        if(q) {
            const term = document.getElementById('term-logs');
            const line = document.createElement('div');
            line.className = 'log-line';
            line.innerHTML = `<div class="log-quote">"${q.text}" <span style="font-size:0.7em; opacity:0.7">-- ${q.source}</span></div>`;
            term.prepend(line);
        }
    },

    handleCommand: function(cmd) {
        const val = cmd.toLowerCase().trim();
        document.getElementById('cmd-input').value = '';
        this.log(`> ${val}`, "USER");
        
        if(val === 'help') {
            this.log("Available commands: projects, skills, contact, clear");
        } else if(val === 'clear') {
            document.getElementById('term-logs').innerHTML = '';
        } else if(document.getElementById(val)) {
            this.navigate(val);
        } else {
            this.log(`Command not found: ${val}`, "ERR");
        }
    },

    // --- RENDERERS ---
    renderProjects: function() {
        const container = document.getElementById('projects-container');
        container.innerHTML = portfolioData.projects.map(p => `
            <div class="project-card">
                <h3>${p.title} <span style="font-size:0.6rem; border:1px solid #333; padding:2px 6px; border-radius:4px; color:${p.status==='PROD'?'#22c55e':'#3b82f6'}">${p.status}</span></h3>
                <p class="project-desc">${p.desc}</p>
                <div style="display:flex; flex-wrap:wrap; gap:5px;">
                    ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
        `).join('');
    },

    renderSkills: function() {
        const container = document.getElementById('skills-container');
        for (const [cat, items] of Object.entries(portfolioData.skills)) {
            container.innerHTML += `
                <div class="skill-box">
                    <h4>${cat.replace('_', ' ')}</h4>
                    <div class="skill-list">
                        ${items.map(i => `<span>> ${i}</span>`).join('')}
                    </div>
                </div>
            `;
        }
    },

    renderExperience: function() {
        const container = document.getElementById('experience-container');
        container.innerHTML = portfolioData.experience.map(e => `
            <div class="log-item">
                <div class="log-role">${e.role}</div>
                <span class="log-company">${e.company} // ${e.date}</span>
                <p style="color:#888; font-size:0.9rem">${e.desc}</p>
            </div>
        `).join('');
    },

    // --- SCROLL SPY ---
    setupObserver: function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Update Terminal UI
                    document.querySelectorAll('.status-indicator').forEach(el => el.classList.remove('active'));
                    const btn = document.querySelector(`button[onclick="System.navigate('${entry.target.id}')"] .status-indicator`);
                    if(btn) btn.classList.add('active');
                    
                    // Log Context Switch
                    this.log(`Accessing module: ${entry.target.id.toUpperCase()}`, "NAV");
                    this.logQuote(entry.target.id);
                    
                    // Highlight Section
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.data-section').forEach(section => observer.observe(section));
    }
};