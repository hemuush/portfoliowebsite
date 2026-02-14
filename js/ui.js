/**
 * UI renderers – each function renders one section from data.
 * Used by App after boot sequence. All content comes from data.js.
 */

const Renderer = {
    pageTitle(title) {
        if (typeof document !== "undefined" && document.title !== undefined && title) {
            document.title = title;
        }
    },

    sections(sections) {
        if (!sections || typeof sections !== "object") return;
        const map = {
            logs: "section-logs",
            trajectory: "section-trajectory",
            metrics: "section-metrics",
            skills: "section-skills",
            projects: "section-projects"
        };
        Object.entries(map).forEach(([key, id]) => {
            const el = document.getElementById(id);
            if (el && sections[key]) el.textContent = sections[key];
        });
    },

    hero(hero) {
        if (!hero) return;
        const set = (id, value) => {
            const el = document.getElementById(id);
            if (el && value != null) {
                if (el.tagName === "IMG") {
                    el.src = value;
                    if (hero.imageAlt != null) el.alt = hero.imageAlt;
                } else {
                    el.textContent = value;
                }
            }
        };
        set("hero-badge", hero.badgeStatus);
        set("hero-image", hero.imageUrl);
        if (document.getElementById("hero-image") && hero.imageAlt != null) {
            document.getElementById("hero-image").alt = hero.imageAlt;
        }
        set("hero-name", hero.name);
        set("hero-role", hero.role);
        const bioEl = document.getElementById("hero-bio");
        if (bioEl) {
            if (Array.isArray(hero.bio)) {
                bioEl.innerHTML = hero.bio.map((line) => escapeHtml(line)).join("<br>");
            } else if (hero.bio != null) {
                bioEl.textContent = hero.bio;
            }
        }
    },

    stats(stats) {
        const container = document.getElementById("stats-container");
        if (!container || !stats?.length) return;

        container.innerHTML = stats
            .map(
                (s) => `
            <div class="stat-item">
                <i data-lucide="${escapeHtml(s.icon || "circle")}"></i>
                <span class="stat-val">${escapeHtml(s.value)}</span>
                <span class="stat-label">${escapeHtml(s.label)}</span>
            </div>
        `
            )
            .join("");
    },

    contact(contact) {
        if (!contact) return;

        const linksEl = document.getElementById("contact-links");
        if (linksEl && contact.links?.length) {
            linksEl.innerHTML = contact.links
                .map(
                    (l) => `
                <a href="${escapeHtml(l.url)}" ${l.type !== "mail" ? 'target="_blank" rel="noopener"' : ""} class="social-btn ${escapeHtml(l.type)}"><i data-lucide="${escapeHtml(l.icon || l.type)}"></i></a>
            `
                )
                .join("");
        }

        const locationEl = document.getElementById("contact-location");
        if (locationEl && contact.location != null) {
            locationEl.innerHTML = `<i data-lucide="map-pin"></i> ${escapeHtml(contact.location)}`;
        }
    },

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

        const PREVIEW_LEN = 90;
        const truncate = (text) => {
            if (!text || text.length <= PREVIEW_LEN) return text;
            return text.slice(0, PREVIEW_LEN).trim() + ".....";
        };

        container.innerHTML = projects
            .map(
                (p) => {
                    const tagsStr = (p.tags || []).join(",");
                    return `
            <div class="project-card project-card-clickable" role="button" tabindex="0"
                 data-title="${escapeHtml(p.title)}"
                 data-status="${escapeHtml(p.status)}"
                 data-desc="${escapeHtml(p.desc)}"
                 data-tags="${escapeHtml(tagsStr)}">
                <div class="p-header">
                    <div class="p-title">${escapeHtml(p.title)}</div>
                    <div class="p-type">${escapeHtml(p.status)}</div>
                </div>
                <div class="p-desc">${escapeHtml(truncate(p.desc))}</div>
                <div class="p-tags">
                    ${(p.tags || []).map((t) => `<span>#${escapeHtml(t)}</span>`).join("")}
                </div>
            </div>
        `;
                }
            )
            .join("");

        const modal = document.getElementById("project-modal");
        const openModal = (title, status, desc, tagsStr) => {
            if (!modal) return;
            const set = (id, text) => {
                const el = document.getElementById(id);
                if (!el) return;
                if (id === "project-modal-tags") {
                    const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];
                    el.innerHTML = tags.map((t) => `<span>#${escapeHtml(t)}</span>`).join("");
                } else {
                    el.textContent = text;
                }
            };
            set("project-modal-title", title);
            set("project-modal-status", status);
            set("project-modal-desc", desc);
            set("project-modal-tags", tagsStr);
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
        };
        const closeModal = () => {
            if (!modal) return;
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
        };

        container.addEventListener("click", (ev) => {
            const card = ev.target.closest(".project-card-clickable");
            if (!card) return;
            openModal(
                card.dataset.title || "",
                card.dataset.status || "",
                card.dataset.desc || "",
                card.dataset.tags || ""
            );
        });
        container.addEventListener("keydown", (ev) => {
            if (ev.key !== "Enter" && ev.key !== " ") return;
            const card = ev.target.closest(".project-card-clickable");
            if (!card) return;
            ev.preventDefault();
            openModal(
                card.dataset.title || "",
                card.dataset.status || "",
                card.dataset.desc || "",
                card.dataset.tags || ""
            );
        });

        if (modal) {
            modal.querySelector(".project-modal-close")?.addEventListener("click", closeModal);
            modal.querySelector(".project-modal-backdrop")?.addEventListener("click", closeModal);
        }
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

        const PREVIEW_LEN = 90;
        const truncate = (text) => {
            if (!text || text.length <= PREVIEW_LEN) return text;
            return text.slice(0, PREVIEW_LEN).trim() + ".....";
        };

        container.innerHTML = experience
            .map(
                (e) => `
            <div class="exp-item exp-item-clickable" role="button" tabindex="0"
                 data-role="${escapeHtml(e.role)}"
                 data-company="${escapeHtml(e.company)}"
                 data-date="${escapeHtml(e.date)}"
                 data-desc="${escapeHtml(e.desc)}">
                <div class="exp-role">${escapeHtml(e.role)}</div>
                <span class="exp-co">@ ${escapeHtml(e.company)} | ${escapeHtml(e.date)}</span>
                <div class="exp-desc">${escapeHtml(truncate(e.desc))}</div>
            </div>
        `
            )
            .join("");

        const modal = document.getElementById("exp-modal");
        const openModal = (role, company, date, desc) => {
            if (!modal) return;
            const set = (id, text) => {
                const el = document.getElementById(id);
                if (el) el.textContent = text;
            };
            set("exp-modal-role", role);
            set("exp-modal-co", `@ ${company} | ${date}`);
            set("exp-modal-desc", desc);
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
        };
        const closeModal = () => {
            if (!modal) return;
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
        };

        container.addEventListener("click", (ev) => {
            const item = ev.target.closest(".exp-item-clickable");
            if (!item) return;
            openModal(
                item.dataset.role || "",
                item.dataset.company || "",
                item.dataset.date || "",
                item.dataset.desc || ""
            );
        });
        container.addEventListener("keydown", (ev) => {
            if (ev.key !== "Enter" && ev.key !== " ") return;
            const item = ev.target.closest(".exp-item-clickable");
            if (!item) return;
            ev.preventDefault();
            openModal(
                item.dataset.role || "",
                item.dataset.company || "",
                item.dataset.date || "",
                item.dataset.desc || ""
            );
        });

        if (modal) {
            modal.querySelector(".exp-modal-close")?.addEventListener("click", closeModal);
            modal.querySelector(".exp-modal-backdrop")?.addEventListener("click", closeModal);
        }
    }
};

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
