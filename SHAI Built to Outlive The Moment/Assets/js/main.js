document.addEventListener('DOMContentLoaded', () => {
  /* 1. Mobile Drawer Navigation Controller */
  const burgerBtn = document.getElementById('burger-btn');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-close-btn');
  const navItemCloseLinks = document.querySelectorAll('.nav-item-close');

  burgerBtn.addEventListener('click', () => {
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    resizeMenuCanvas();
  });

  function closeMobileNav() {
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeMobileNav);
  navItemCloseLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  /* 2. Kinetic Cursor Glow Track */
  const glow = document.getElementById('cursor-glow');
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  /* 3. Particle System Engine */
  class Particle {
    constructor(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
    }

    update(width, height) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#76C7ED';
      ctx.fill();
    }
  }

  function createParticleNetwork(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return () => {};
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 35; i++) {
      particles.push(new Particle(width, height));
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(width, height);
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(118, 199, 237, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();

    return resize;
  }

  const resizeHeroCanvas = createParticleNetwork('hero-canvas');
  const resizeMenuCanvas = createParticleNetwork('menu-canvas');

  /* 4. Interactive 3D Card Tilt */
  const tiltCard = document.getElementById('tilt-card');
  if (tiltCard) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      tiltCard.style.transform = `rotateX(${-y / 14}deg) rotateY(${x / 14}deg)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  }
});