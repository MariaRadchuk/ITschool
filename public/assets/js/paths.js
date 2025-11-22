let COURSE_DATA = {};

fetch('/public/data/courses.json')
  .then(res => {
    if (!res.ok) throw new Error('Не вдалося завантажити курси');
    return res.json();
  })
  .then(data => {
    COURSE_DATA = data;
    console.log('Курси Ордену Дев’яти завантажено');
  })
  .catch(err => console.error('Помилка завантаження курсів:', err));

document.addEventListener('DOMContentLoaded', () => {

  // Відкриття вівтаря
  function openAltar(dominion) {
    const altar = document.getElementById(`${dominion}-altar`);
    if (altar) {
      altar.classList.add('active');
      setTimeout(() => altar.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    }
  }
  // ─────────────────────── ОБЕРИ СВІЙ ШЛЯХ ───────────────────────
  document.getElementById('scroll-to-architects')?.addEventListener('click', () => {
    document.querySelector('.dominions').scrollIntoView({ behavior: 'smooth' });
  });

  // Клік по домініону
  document.querySelectorAll('.dominion-card').forEach(card => {
    card.addEventListener('click', () => openAltar(card.dataset.dominion));
  });

  // Закриття вівтарів
  document.querySelectorAll('.altar-close').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.altar').classList.remove('active'));
  });

  // ─────────────────────── КЛІКИ ПО ALTAR + КОЛЬОРИ ───────────────────────
  document.querySelectorAll('.altar').forEach(altar => {
    const blades = altar.querySelectorAll('.blade-card');
    const dominion = altar.dataset.dominion;

    blades.forEach((blade, index) => {
      blade.addEventListener('click', e => {
        e.stopPropagation();

        const type = blade.dataset.course;
        const data = COURSE_DATA[type]?.[index];

        if (!data) {
          console.warn('Дані курсу не знайдено:', type, index);
          return;
        }

        // Заповнення модалки
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-stack').textContent = data.stack;
        document.getElementById('modal-desc').textContent = data.desc;
        document.getElementById('modal-badge').textContent = data.badge;
        document.getElementById('modal-features').innerHTML =
          data.features.map(f => `<li>${f}</li>`).join('');

        // Кольори модалки
        const modal = document.getElementById('course-modal');
        modal.classList.remove('frontend', 'backend', 'fullstack');
        modal.classList.add(dominion);
        modal.classList.add('active');
      });
    });
  });

  // ─────────────────────── ЗАКРИТТЯ МОДАЛКИ ───────────────────────
  document.getElementById('modal-close')?.addEventListener('click', () => {
    document.getElementById('course-modal').classList.remove('active');
  });

  document.getElementById('course-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.remove('active');
    }
  });

  // ─────────────────────── УВІЙТИ В ТЕМРЯВУ мала модалка ───────────────────────
  document.getElementById('enter-darkness')?.addEventListener('click', () => {
    const toast = document.getElementById('darkness-toast');
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 2800);
  });


  // Підсвітка активного пункту меню
  document.querySelectorAll('.header-nav a, .footer-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === 'paths');
  });

  // Підтримка хешу з головної (#frontend, #backend, #fullstack)
  const hash = location.hash.slice(1);
  if (hash && ['frontend', 'backend', 'fullstack'].includes(hash)) {
    setTimeout(() => openAltar(hash), 800); 
  }
});