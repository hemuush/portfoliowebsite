/**
 * Modern Portfolio - Main Controller
 * Clean, modular, performant
 */

const Portfolio = {
  init() {
    if (typeof portfolioData === 'undefined') {
      console.error('Portfolio data not found');
      return;
    }

    this.renderProjects();
    this.renderSkills();
    this.renderExperience();
    this.initAnimations();
    this.initSmoothScroll();
  },

  renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const statusMap = {
      'LIVE': 'live',
      'DEPLOYED': 'deployed',
      'PROD': 'prod',
      'V1.0': 'v1'
    };

    container.innerHTML = portfolioData.projects
      .map(project => `
        <div class="project-card">
          <div>
            <span class="project-status ${statusMap[project.status] || 'deployed'}">
              ${project.status}
            </span>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.desc}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `
              <span class="project-tag">${tag}</span>
            `).join('')}
          </div>
        </div>
      `)
      .join('');
  },

  renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = Object.entries(portfolioData.skills)
      .map(([category, skills]) => `
        <div class="skill-category">
          <h4 class="skill-category-title">${category.replace(/_/g, ' ')}</h4>
          <div class="skill-list">
            ${skills.map(skill => `
              <span class="skill-item">${skill}</span>
            `).join('')}
          </div>
        </div>
      `)
      .join('');
  },

  renderExperience() {
    const container = document.getElementById('experience-container');
    if (!container) return;

    container.innerHTML = portfolioData.experience
      .map(exp => `
        <div class="experience-item">
          <h4 class="experience-role">${exp.role}</h4>
          <div class="experience-company">${exp.company} · ${exp.date}</div>
          <p class="experience-description">${exp.desc}</p>
        </div>
      `)
      .join('');
  },

  initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .project-card, .about-card').forEach(el => {
      observer.observe(el);
    });

    // Hero stats animation
    const statsEl = document.querySelector('.hero-stats');
    if (statsEl) {
      statsEl.classList.add('stagger');
    }
  },

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const navHeight = document.querySelector('.nav').offsetHeight;
          const targetPosition = target.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Nav background on scroll
    let lastScroll = 0;
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        nav.style.boxShadow = 'none';
      }
      
      lastScroll = currentScroll;
    });
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Portfolio.init());
} else {
  Portfolio.init();
}