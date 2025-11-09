document.addEventListener('DOMContentLoaded', () => {
  // ==================== MATRIX RAIN ====================
  const canvas = document.getElementById('matrix');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟᚾᛉᛊᛏᚠᚢᚦᚨ'.split('');
    const fontSize = 18;
    let columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
      ctx.fillStyle = 'rgba(128, 128, 128, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'Uncial Antiqua', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const rune = runes[Math.floor(Math.random() * runes.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = '#000000';
        ctx.shadowColor = 'transparent';
        ctx.fillText(rune, x, y);

        if (i % 12 === 0 && Math.random() > 0.97) {
          ctx.fillStyle = '#D4AF37';
          ctx.shadowColor = '#D4AF37';
          ctx.shadowBlur = 25;
          ctx.fillText(rune, x, y);
          ctx.fillStyle = '#000000';
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 50);
  }

  // ==================== ТАЙПІНГ ЕФЕКТ ====================
const heroSection = document.getElementById('hero');
if (heroSection) heroSection.style.opacity = '1';
document.querySelector('.tracks')?.classList.add('active');
document.querySelectorAll('.track-card').forEach((card, i) => {
  setTimeout(() => card.classList.add('visible'), i * 250);
});


  // ==================== КНОПКА "ENTER THE VOID" ====================
  const enterBtn = document.getElementById('enter-btn');
  enterBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const tracksSection = document.querySelector('.tracks');
    const header = document.querySelector('.arcane-header');
    const headerHeight = header ? header.offsetHeight : 0;

    if (tracksSection) {
      window.scrollTo({
        top: tracksSection.offsetTop - headerHeight - 10,
        behavior: 'smooth'
      });

      setTimeout(() => {
        tracksSection.classList.add('active');
        document.querySelectorAll('.track-card').forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 250);
        });
      }, 600);
    }
  });

  // === БУРГЕР-МЕНЮ ===
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header-nav');
  burger?.addEventListener('click', () => {
    nav?.classList.toggle('active');
    burger.classList.toggle('active');
  });

  // ==================== ПОЯВА КАРТОК ПРИ СКРОЛІ ====================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.track-card').forEach(card => observer.observe(card));

  // ==================== КУРСОР ====================
  let cursor = document.querySelector('.cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
  }

  document.body.style.cursor = 'default';
  document.querySelectorAll('a, button, .burger').forEach(el => {
    el.style.cursor = 'pointer';
  });

  document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
      if (cursor) cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  });

  document.querySelectorAll('a, button, .burger').forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('active'));
  });

  // ==================== ПЛАВНИЙ СКРОЛ ====================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
