/**
 * Tokelo Shai - Digital Architecture
 * Portfolio Archive Script (projects.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Interfaces
  initNavigation();
  initCursorGlow();
  initProjectsGallery();
});

/* ==========================================
   1. NAVIGATION & MOBILE MENU
   ========================================== */
function initNavigation() {
  const burgerBtn = document.getElementById('burgerBtn');
  const closeNavBtn = document.getElementById('closeNavBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeNavBtn && mobileNav) {
    closeNavBtn.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  function closeMobileNav() {
    if (mobileNav) {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
}

/* ==========================================
   2. AMBIENT CURSOR GLOW
   ========================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  // Track cursor position smoothly
  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* ==========================================
   3. PROJECTS DATA & DYNAMIC GALLERY
   ========================================== */
const projectsData = [
  {
    id: 'halaxy-customization',
    title: 'Halaxy Clinical System Architecture',
    category: 'application',
    description: 'Custom intake form workflows, automated clinical notifications, and domain DNS setup for pediatric practice operations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    tags: ['Halaxy', 'DNS', 'Healthcare IT', 'Workflows'],
    liveUrl: 'https://crownagain.com.au',
    githubUrl: null
  },
  {
    id: 'pdf-invoice-generator',
    title: 'Automated Web Invoice Generator',
    category: 'application',
    description: 'A single-file web utility generating real-time dynamic row calculations, custom invoice PDF downloads, and direct EmailJS integration.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    tags: ['JavaScript', 'EmailJS', 'HTML5/CSS3', 'PDF Engine'],
    liveUrl: '#',
    githubUrl: 'https://github.com/shaitkv'
  },
  {
    id: 'mobile-mechanic-template',
    title: 'On-Demand Mobile Mechanic Site',
    category: 'website',
    description: 'Clean responsive web layout tailored for mobile auto service operations with direct emergency dispatch CTAs.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    tags: ['HTML5', 'CSS Grid', 'Bootstrap', 'UI/UX'],
    liveUrl: '#',
    githubUrl: 'https://github.com/shaitkv'
  },
  {
    id: 'blu-keez-artist',
    title: 'BLU KEEZ Artist Landing Page',
    category: 'website',
    description: 'Multi-page music showcase platform featuring dynamic embedded YouTube video player streams and social media hubs.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    tags: ['HTML5', 'YouTube API', 'CSS3', 'Media Layouts'],
    liveUrl: '#',
    githubUrl: 'https://github.com/shaitkv'
  },
  {
    id: 'corporate-identity-card',
    title: 'Minimalist Tech Business Card',
    category: 'business-card',
    description: 'Vector artwork and print-ready layout system designed for high-density tactile matte cardstock finishes.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    tags: ['Print Design', 'Typography', 'Branding'],
    liveUrl: '#',
    githubUrl: null
  },
  {
    id: 'event-poster-system',
    title: 'Symmetry Architectural Poster',
    category: 'poster',
    description: 'Large-format promotional artwork balancing structured grid typography and high-contrast ambient photography.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    tags: ['Poster Design', 'Vector Graphics', 'Grid System'],
    liveUrl: '#',
    githubUrl: null
  }
];

function initProjectsGallery() {
  const grid = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!grid) return;

  // Render Initial All Projects
  renderProjects(projectsData, grid);

  // Setup Filtering Event Listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active State
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      
      if (filterValue === 'all') {
        renderProjects(projectsData, grid);
      } else {
        const filtered = projectsData.filter(project => project.category === filterValue);
        renderProjects(filtered, grid);
      }
    });
  });
}

function renderProjects(items, container) {
  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state-notice">
        <p>// No projects currently listed under this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <article class="project-card" data-category="${item.category}">
      <div class="card-media-wrapper">
        <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x450/212121/FDF7F0?text=Preview+Unavailable'">
      </div>
      <div class="card-content-block">
        <span class="card-category-tag">// ${item.category.replace('-', ' ')}</span>
        <h3 class="card-project-title">${item.title}</h3>
        <p class="card-project-description">${item.description}</p>
        
        <div class="card-tech-stack">
          ${item.tags.map(tag => `<span class="tech-badge">${tag}</span>`).join('')}
        </div>

        <div class="card-footer-actions">
          ${item.liveUrl ? `<a href="${item.liveUrl}" target="_blank" rel="noopener" class="card-action-btn">Live Preview &rarr;</a>` : ''}
          ${item.githubUrl ? `<a href="${item.githubUrl}" target="_blank" rel="noopener" class="card-action-btn">Source Code &rarr;</a>` : ''}
        </div>
      </div>
    </article>
  `).join('');
}