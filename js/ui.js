function renderQuotes(quotes) {
    const display = document.getElementById('quote-display');
    let index = 0;

    const typeQuote = () => {
        const q = quotes[index];
        display.style.opacity = 0;
        setTimeout(() => {
            display.innerHTML = `<div><span style="color:var(--text-main)">"${q.text}"</span> <br><span style="font-size:0.8em; opacity:0.7; color:var(--secondary)">// ${q.source}</span></div>`;
            display.style.opacity = 1;
        }, 300);
        index = (index + 1) % quotes.length;
    };

    typeQuote();
    setInterval(typeQuote, 6000); 
}

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if(!container) return;
    
    container.innerHTML = projects.map(p => `
        <div class="project-card">
            <div class="p-header">
                <div class="p-title">${p.title}</div>
                <div class="p-type">${p.status}</div>
            </div>
            <div class="p-desc">${p.desc}</div>
            <div class="p-tags">
                ${p.tags.map(t => `<span>#${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    if(!container) return;

    container.innerHTML = Object.entries(skills).map(([cat, skillList]) => `
        <div>
            <div class="skill-cat-title">> ${cat.replace(/_/g, ' ')}</div>
            <div class="skill-tags">
                ${skillList.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderExperience(experience) {
    const container = document.getElementById('exp-container');
    if(!container) return;

    container.innerHTML = experience.map(e => `
        <div class="exp-item">
            <div class="exp-role">${e.role}</div>
            <span class="exp-co">@ ${e.company} | ${e.date}</span>
            <div class="exp-desc">${e.desc}</div>
        </div>
    `).join('');
}