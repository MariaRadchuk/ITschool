document.addEventListener('DOMContentLoaded', () => {

   // ─────────────────────── MATRIX RAIN ───────────────────────
  const canvas = document.getElementById('matrix');

  if (canvas) {
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟᚾᛉᛊᛏᚠᚢᚦᚨ'.split('');
    const fontSize = 18;

    let columns = Math.floor(canvas.width / fontSize);

    const drops = Array(columns).fill(1);

    const drawMatrix = () => {
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
          ctx.fillStyle = '#8b00ff';
          ctx.shadowColor = '#8b00ff';
          ctx.shadowBlur = 25;
          ctx.fillText(rune, x, y);
          ctx.shadowBlur = 0;
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    setInterval(drawMatrix, 50);
  }

   // ─────────────────────── HERO & TRACKS ───────────────────────
  const hero = document.getElementById('hero');
  if (hero) hero.style.opacity = '1';

  const tracks = document.querySelector('.tracks');
  if (tracks) {
    tracks.classList.add('active');

    document.querySelectorAll('.track-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 250);
    });
  }

  // ─────────────────────── УВІЙТИ В ТЕМРЯВУ ───────────────────────
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
    }
  });

  // ─────────────────────── БУРГЕР-МЕНЮ ───────────────────────
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header-nav');

  burger?.addEventListener('click', () => {
    nav?.classList.toggle('active');
    burger.classList.toggle('active');
  });

    // ─────────────────────── всі посилання на сторінці виду <a href="#something"> працюють плавно smooth───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─────────────────────── АВТО-ПОЯВА КАРТОК ПРИ СКРОЛІ ───────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.track-card, .dominion-card').forEach(card => {
    observer.observe(card);
  });

  // ─────────────────────── КАРТКИ ШЛЯХІВ — клікабельні, ведуть на інші сторінки ───────────────────────
  document.querySelectorAll('.track-card[data-path]').forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      const path = card.dataset.path;
      window.location.href = path;
    });

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.03)';
      card.style.boxShadow = '0 20px 40px rgba(139, 0, 255, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
});

  // ─────────────────────── ПОЗНАЧЕННЯ АКТИВНОЇ СТОРІНКИ В МЕНЮ ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const currentPage =
    document.body.dataset.page ||
    document.querySelector('[data-page]')?.dataset.page ||
    location.pathname.split('/').pop().replace('.html', '') ||
    'home';

  document.querySelectorAll('.header-nav a').forEach(link => {
    link.classList.remove('active');

    if (
      link.dataset.page === currentPage ||
      (currentPage === 'home' && link.href.includes('index.html'))
    ) {
      link.classList.add('active');
    }
  });
});

  // ─────────────────────── КНОПКА «НАВЕРХ» ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scroll-to-top');

  if (!scrollBtn) return;

  const toggleButton = () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleButton);

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  toggleButton();
});

// Кнопка «УВІЙТИ В ТЕМРЯВУ» внизу — скрол до Домініонів
const enterBtnBottom = document.getElementById('enter-btn-bottom');
if (enterBtnBottom) {
  enterBtnBottom.addEventListener('click', () => {
    document.querySelector('.tracks').scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });
}
