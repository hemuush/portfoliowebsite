/**
 * App entry: boot sequence then dashboard render.
 * Depends on PortfolioData (data.js) and Renderer (ui.js).
 */

const App = {
    async runBootSequence() {
        const terminal = document.getElementById("terminal-output");
        const bootScreen = document.getElementById("boot-sequence");

        const logs = [
            "> INITIALIZING KERNEL...",
            "> LOADING MODULES: [AI, CLOUD, AUTOMATION]",
            "> CONNECTING TO NEURAL NET...",
            "> SYNCING WITH: MR_ROBOT_PROTOCOL",
            "> ACCESS GRANTED."
        ];

        for (const log of logs) {
            if (terminal) terminal.innerHTML += `<div>${log}</div>`;
            await new Promise((r) => setTimeout(r, 200));
        }

        setTimeout(() => {
            if (bootScreen) bootScreen.style.opacity = "0";
            setTimeout(() => {
                if (bootScreen) bootScreen.style.display = "none";
                this.renderDashboard();
            }, 500);
        }, 600);
    },

    renderDashboard() {
        if (typeof PortfolioData === "undefined") {
            console.error("PortfolioData not loaded");
            return;
        }
        if (typeof Renderer === "undefined") {
            console.error("Renderer not loaded");
            return;
        }

        Renderer.quotes(PortfolioData.quotes);
        Renderer.projects(PortfolioData.projects);
        Renderer.skills(PortfolioData.skills);
        Renderer.experience(PortfolioData.experience);

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    },

    initTheme() {
        const btn = document.getElementById("theme-toggle");
        if (!btn) return;
        btn.addEventListener("click", () => {
            const isLight = document.body.classList.contains("theme-light");
            document.body.classList.replace(isLight ? "theme-light" : "theme-dark", isLight ? "theme-dark" : "theme-light");
            localStorage.setItem("portfolio-theme", isLight ? "dark" : "light");
            var meta = document.getElementById("meta-theme-color");
            if (meta) meta.content = isLight ? "#050505" : "#e8ecf1";
            if (typeof lucide !== "undefined") lucide.createIcons();
        });
    },

    init() {
        this.initTheme();
        this.runBootSequence();
    }
};

document.addEventListener("DOMContentLoaded", () => App.init());
