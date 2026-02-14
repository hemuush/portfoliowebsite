/**
 * UI renderers – each function renders one section from data.
 * Used by App after boot sequence.
 */

const Renderer = {
    quotes(quotes) {
        const display = document.getElementById("quote-display");
        if (!display || !quotes?.length) return;

        let index = 0;
        const typeQuote = () => {
            const q = quotes[index];
            display.style.opacity = "0";
            setTimeout(() => {
                display.innerHTML = `<div><span style="color:var(--text-main)">"${escapeHtml(q.text)}"</span><br><span style="font-size:0.8em;opacity:0.7;color:var(--secondary)">// ${escapeHtml(q.source)}</span></div>`;
                display.style.opacity = "1";
            }, 300);
            index = (index + 1) % quotes.length;
        };

        typeQuote();
        setInterval(typeQuote, 6000);
    },

    projects(projects) {
        const container = document.getElementById("projects-container");
        if (!container || !projects?.length) return;

        container.innerHTML = projects
            .map(
                (p) => `
            <div class="project-card">
                <div class="p-header">
                    <div class="p-title">${escapeHtml(p.title)}</div>
                    <div class="p-type">${escapeHtml(p.status)}</div>
                </div>
                <div class="p-desc">${escapeHtml(p.desc)}</div>
                <div class="p-tags">
                    ${(p.tags || []).map((t) => `<span>#${escapeHtml(t)}</span>`).join("")}
                </div>
            </div>
        `
            )
            .join("");
    },

    skills(skills) {
        const container = document.getElementById("skills-container");
        if (!container || !skills || typeof skills !== "object") return;

        container.innerHTML = Object.entries(skills)
            .map(
                ([cat, skillList]) => `
            <div>
                <div class="skill-cat-title">> ${escapeHtml(String(cat).replace(/_/g, " "))}</div>
                <div class="skill-tags">
                    ${(skillList || []).map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`).join("")}
                </div>
            </div>
        `
            )
            .join("");
    },

    experience(experience) {
        const container = document.getElementById("exp-container");
        if (!container || !experience?.length) return;

        container.innerHTML = experience
            .map(
                (e) => `
            <div class="exp-item">
                <div class="exp-role">${escapeHtml(e.role)}</div>
                <span class="exp-co">@ ${escapeHtml(e.company)} | ${escapeHtml(e.date)}</span>
                <div class="exp-desc">${escapeHtml(e.desc)}</div>
            </div>
        `
            )
            .join("");
    }
};

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
