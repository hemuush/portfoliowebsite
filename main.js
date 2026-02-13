document.addEventListener('DOMContentLoaded', () => {
    if (typeof portfolioData === 'undefined') return;
    System.boot();
});

const System = {
    boot: function() {
        this.log("Kernel initializing...", "sys");
        setTimeout(() => this.log("Loading modules: [AI, Backend, Agents]...", "sys"), 400);
        setTimeout(() => this.log(`"${this.getRandomQuote()}"`, "quote"), 1000);
        
        this.render();
        this.observe();
        this.typewrite();
        this.chat();
    },

    // UTILS
    getRandomQuote: function() {
        const quotes = portfolioData.system_protocols;
        return quotes[Math.floor(Math.random() * quotes.length)].text;
    },

    log: function(msg, type="info") {
        const console = document.getElementById('agent-logs');
        const line = document.createElement('div');
        line.className = `log-entry ${type}`;
        
        const timestamp = new Date().toLocaleTimeString('en-GB'); // 24h format
        
        if(type === 'quote') {
            line.innerHTML = `<span style="opacity:0.5">${timestamp}</span> <span style="color:#ff0055">root@sys:</span> "${msg}"`;
        } else {
            line.innerHTML = `<span style="opacity:0.5">${timestamp}</span> ${msg}`;
        }
        
        console.prepend(line);
    },

    render: function() {
        // About
        document.getElementById('about-content').innerHTML = portfolioData.about.description.map(p => `<p style="margin-bottom:15px; color:#ccc; line-height:1.6">${p}</p>`).join('');
        
        // Stats
        document.getElementById('about-stats').innerHTML = portfolioData.about.stats.map(s => `
            <div class="tech-card" style="display:flex; justify-content:space-between; padding:12px">
                <span style="color:#666">${s.label}</span>
                <span style="color:#00ff41">${s.number}</span>
            </div>
        `).join('');

        // Skills
        const skillsContainer = document.getElementById('skills-grid');
        let skillHTML = '';
        for (const [cat, list] of Object.entries(portfolioData.skills)) {
            skillHTML += `
                <div class="tech-card">
                    <h4 style="color:#00ff41; margin-bottom:10px; font-size:0.8rem">${cat}</h4>
                    <div>${list.map(i => `<span style="color:#fff; font-size:0.8rem; margin-right:8px">// ${i}</span>`).join('')}</div>
                </div>`;
        }
        skillsContainer.innerHTML = skillHTML;

        // Projects
        document.getElementById('projects-grid').innerHTML = portfolioData.projects.map(p => `
            <div class="tech-card">
                <h3 style="color:#fff; font-size:1.2rem; margin-bottom:5px">${p.title}</h3>
                <div style="font-size:0.7rem; color:#666; margin-bottom:10px">${p.type}</div>
                <p style="font-size:0.85rem; color:#aaa; margin-bottom:15px">${p.description}</p>
                <div style="border-top:1px solid #222; padding-top:10px; font-size:0.75rem; color:#00ff41">
                    ${p.tags.join('  •  ')}
                </div>
            </div>
        `).join('');
    },

    observe: function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    const tool = entry.target.dataset.tool;
                    this.log(`Executing process: ${tool}...`, "sys");
                    
                    // 10% chance to drop a quote
                    if(Math.random() > 0.8) {
                        setTimeout(() => this.log(this.getRandomQuote(), "quote"), 500);
                    }
                }
            });
        }, { threshold: 0.2 });
        
        document.querySelectorAll('.notebook-cell').forEach(el => observer.observe(el));
    },

    typewrite: function() {
        const el = document.getElementById('typing-text');
        const phrases = portfolioData.hero.taglinePhrases;
        let pIdx = 0, cIdx = 0, deleting = false;
        
        const tick = () => {
            const current = phrases[pIdx];
            el.textContent = "> " + current.substring(0, cIdx) + (deleting ? "" : "█");
            
            if(!deleting && cIdx < current.length) { cIdx++; setTimeout(tick, 50 + Math.random()*50); }
            else if(deleting && cIdx > 0) { cIdx--; setTimeout(tick, 30); }
            else {
                deleting = !deleting;
                if(!deleting) pIdx = (pIdx+1) % phrases.length;
                setTimeout(tick, deleting ? 1000 : 500);
            }
        };
        tick();
    },

    chat: function() {
        const form = document.getElementById('contactForm');
        const win = document.getElementById('chat-window');
        const inp = document.getElementById('userMsg');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = inp.value;
            if(!val) return;
            
            win.innerHTML += `<div class="msg usr-msg">${val}</div>`;
            inp.value = '';
            this.log(`Packet received: ${val.length} bytes`);
            
            setTimeout(() => {
                const replies = ["Packet acknowledged.", "Message queued for priority review.", "Connection stable. Message sent."];
                const reply = replies[Math.floor(Math.random() * replies.length)];
                win.innerHTML += `<div class="msg sys-msg">> ${reply}</div>`;
                win.scrollTop = win.scrollHeight;
            }, 800);
        });
    }
};