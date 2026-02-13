document.addEventListener('DOMContentLoaded', () => {
    if (typeof portfolioData === 'undefined') {
        console.error("Data missing.");
        return;
    }
    App.init();
});

const App = {
    init: function() {
        UI.init();
        UI.initTheme();
    }
};

const UI = {
    init: function() {
        this.renderProjects();
        this.renderExperience();
        this.renderSkills();
        this.renderContact();
        this.renderFooter();
    },

    initTheme: function() {
        const toggleBtn = document.getElementById('theme-toggle');
        const icon = toggleBtn.querySelector('i');
        const html = document.documentElement;

        // Check local storage
        const currentTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', currentTheme);
        this.updateIcon(icon, currentTheme);

        toggleBtn.addEventListener('click', () => {
            const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateIcon(icon, newTheme);
        });
    },

    updateIcon: function(icon, theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    },

    renderProjects: function() {
        const { projects } = portfolioData;
        const container = document.getElementById('projects-list');
        if (!container) return;

        container.innerHTML = projects.map(p => `
            <a href="${p.demoLink || '#'}" target="_blank" class="project-card">
                <div class="p-title">${p.title}</div>
                <div class="p-desc">${p.description.substring(0, 100)}...</div>
                <div class="p-tags">
                    ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </a>
        `).join('');
    },

    renderExperience: function() {
        const { experience } = portfolioData;
        const container = document.getElementById('experience-list');
        if (!container) return;

        container.innerHTML = experience.map(job => `
            <div class="exp-item">
                <div class="exp-role">${job.title}</div>
                <span class="exp-meta">${job.company} | ${job.date}</span>
                <p style="color:var(--text-dim); font-size:0.95rem;">
                    ${job.descriptionPoints ? job.descriptionPoints[0] : ''}
                </p>
            </div>
        `).join('');
    },

    renderSkills: function() {
        const { skills } = portfolioData;
        const container = document.getElementById('skills-grid');
        if (!container) return;

        // Flatten all skills into one list for the cloud effect
        const allSkills = [
            ...skills.programmingLanguages,
            ...skills.backendFrameworks,
            ...skills.cloudDevOps
        ];

        container.innerHTML = allSkills.map(skill => `
            <span class="skill-pill">${skill}</span>
        `).join('');
    },

    renderContact: function() {
        const { contact } = portfolioData;
        const container = document.getElementById('contact-info');
        if (!container) return;

        container.innerHTML = `
            <a href="mailto:${contact.email}" class="contact-btn"><i class="fas fa-envelope"></i></a>
            ${contact.socialLinks.map(link => `
                <a href="${link.url}" target="_blank" class="contact-btn">
                    <i class="${link.iconClass}"></i>
                </a>
            `).join('')}
        `;
    },

    renderFooter: function() {
        const el = document.getElementById('footer-copyright');
        if(el) el.innerHTML = `&copy; ${portfolioData.footer.year} ${portfolioData.footer.name} | Made with ☕ & Code`;
    }
};