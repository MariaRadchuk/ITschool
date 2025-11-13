document.addEventListener('DOMContentLoaded', () => {
  const dominions = document.querySelectorAll('.dominion-card');
  const altars = document.querySelectorAll('.altar');
  const closeButtons = document.querySelectorAll('.altar-close');

  let isFromMainPage = false;

  // Перевірка: чи прийшли з головної сторінки?
  if (document.referrer && document.referrer.includes('/index.html') || document.referrer.includes('/')) {
    isFromMainPage = true;
  }

  // Відкрити вівтар
  const openAltar = (dominion) => {
    const targetAltar = document.getElementById(`${dominion}-altar`);
    if (!targetAltar) return;

    // Сховати всі
    altars.forEach(a => a.classList.remove('active'));
    // Показати потрібний
    targetAltar.classList.add('active');

    // Прокрутка
    setTimeout(() => {
      targetAltar.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);

    // Анімація Клинків
    setTimeout(() => {
      targetAltar.querySelectorAll('.blade-card').forEach((blade, i) => {
        setTimeout(() => blade.classList.add('visible'), i * 300);
      });
    }, 600);
  };

  // Закрити вівтар
  const closeAltar = () => {
    altars.forEach(a => {
      a.classList.remove('active');
      a.querySelectorAll('.blade-card').forEach(b => b.classList.remove('visible'));
    });
  };

  // Клік по Домініону
  dominions.forEach(card => {
    card.addEventListener('click', () => {
      const dominion = card.dataset.dominion;
      openAltar(dominion);
    });
  });

  // Закриття
  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAltar();
    });
  });

  // Закриття по кліку поза вівтарем
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.altar') && !e.target.closest('.dominion-card')) {
      closeAltar();
    }
  });

  // === АВТОВІДКРИТТЯ ТІЛЬКИ ПРИ ПЕРЕХОДІ З ГОЛОВНОЇ ===
  window.addEventListener('load', () => {
    if (!isFromMainPage) return; // ← Ключова перевірка

    const hash = window.location.hash.slice(1);
    if (hash && ['frontend', 'backend', 'fullstack'].includes(hash)) {
      openAltar(hash);
    }
  });
    
      // === КНОПКА "ОБЕРИ СВІЙ ШЛЯХ" → ПРОКРУТКА ДО ДОМІНІОНІВ ===
  const scrollBtn = document.getElementById('scroll-to-dominions');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const dominionsSection = document.querySelector('.dominions');
      const header = document.querySelector('.arcane-header');
      const headerHeight = header ? header.offsetHeight : 0;

      if (dominionsSection) {
        window.scrollTo({
          top: dominionsSection.offsetTop - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  }
});