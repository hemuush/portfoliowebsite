// NOTE: portfolioData and render functions are loaded globally from previous scripts

const System = {
    init() {
        this.runBootSequence();
        // Check if lucide icons are loaded
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    },

    async runBootSequence() {
        const terminal = document.getElementById('terminal-output');
        const bootScreen = document.getElementById('boot-sequence');
        
        const logs = [
            "> INITIALIZING KERNEL...",
            "> LOADING MODULES: [AI, CLOUD, AUTOMATION]",
            "> CONNECTING TO NEURAL NET...",
            "> SYNCING WITH: MR_ROBOT_PROTOCOL",
            "> ACCESS GRANTED."
        ];

        for (const log of logs) {
            terminal.innerHTML += `<div>${log}</div>`;
            await new Promise(r => setTimeout(r, 200));
        }

        setTimeout(() => {
            bootScreen.style.opacity = '0';
            setTimeout(() => {
                bootScreen.style.display = 'none';
                this.renderDashboard();
            }, 500);
        }, 600);
    },

    renderDashboard() {
        // Data and functions are now available in global scope
        if (typeof portfolioData !== 'undefined') {
            renderQuotes(portfolioData.quotes);
            renderProjects(portfolioData.projects);
            renderSkills(portfolioData.skills);
            renderExperience(portfolioData.experience);
        } else {
            console.error("Portfolio Data not loaded");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => System.init());