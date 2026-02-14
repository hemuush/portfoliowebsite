import { portfolioData } from './data.js';
import { renderQuotes, renderProjects, renderSkills, renderExperience } from './ui.js';

const System = {
    init() {
        this.runBootSequence();
        lucide.createIcons();
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
        renderQuotes(portfolioData.quotes);
        renderProjects(portfolioData.projects);
        renderSkills(portfolioData.skills);
        renderExperience(portfolioData.experience);
    }
};

document.addEventListener('DOMContentLoaded', () => System.init());