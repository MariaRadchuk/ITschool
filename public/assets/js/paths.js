// ═══════════════════════════════════════════════════════════
// public/js/PATHS.JS — РІВЕНЬ 02: ШЛЯХИ
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // ══════════════════════════════════════
  // 1. ЕЛЕМЕНТИ СТОРІНКИ
  // ══════════════════════════════════════
  const dominions = document.querySelectorAll('.dominion-card');
  const altars = document.querySelectorAll('.altar');
  const closeButtons = document.querySelectorAll('.altar-close');
  const bladeCards = document.querySelectorAll('.blade-card');

  // Модалка курсу
  const modal = document.getElementById('course-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalStack = document.getElementById('modal-stack');
  const modalDesc = document.getElementById('modal-desc');
  const modalBadge = document.getElementById('modal-badge');
  const modalFeatures = document.getElementById('modal-features');
  const modalClose = document.getElementById('modal-close');
  const enterBtn = document.getElementById('enter-darkness'); // ← КРИТИЧНО!

  // Тост-повідомлення
  const toast = document.getElementById('darkness-toast');
  let toastTimeout;

  // ══════════════════════════════════════
  // 2. ДАНІ ПРО КУРСИ
  // ══════════════════════════════════════
  const courses = {
    'Реактивний Розлом': {
      title: 'Клинок Перший: Реактивний Розлом',
      stack: 'React 19 → Zustand → Signals → Three.js + WebGL',
      desc: 'Портфоліо, що ламає 4090. 120 FPS. 60k+ зірок.',
      duration: '12 тижнів',
      features: [
        '3D-анімації на 120 FPS',
        'WebGL + Three.js майстерність',
        'Портфоліо, що отримує Awwwards',
        'Оптимізація під 4090'
      ]
    },
    'Портал Безсмертя': {
      title: 'Клинок Другий: Портал Безсмертя',
      stack: 'Next.js 15 + RSC + Edge + GSAP + Framer',
      desc: 'Сайт-легенда. Awwwards «Site of the Year».',
      duration: '14 тижнів',
      features: [
        'RSC + Edge Rendering',
        'GSAP анімації світового рівня',
        'Framer Motion + Lottie',
        'Site of the Year рівень'
      ]
    },
    'Пекельний Язик': {
      title: 'Клинок Перший: Пекельний Язик',
      stack: 'Rust + Actix + Tokio + SQLx + WASM',
      desc: 'API: 0.4 мс. 1M rps. Без простоїв.',
      duration: '10 тижнів',
      features: [
        'Rust + Actix Web',
        'Tokio async runtime',
        '0.4 мс затримка',
        '1M RPS під навантаженням'
      ]
    },
    'Тіньовий Моноліт': {
      title: 'Клинок Другий: Тіньовий Моноліт',
      stack: 'Node 22 + Bun + Edge + Redis + Kafka',
      desc: 'SaaS: від 0 до $25k MRR за 90 днів.',
      duration: '11 тижнів',
      features: [
        'Node 22 + Bun runtime',
        'Edge functions',
        'Redis + Kafka scaling',
        '$25k MRR за 90 днів'
      ]
    },
    'Трон Турбореакт': {
      title: 'Клинок Перший: Трон Турбореакт',
      stack: 'T3 Stack + Next.js 15 + tRPC + Prisma + Tailwind',
      desc: 'Свій Vercel. Свій edge. Свій закон.',
      duration: '16 тижнів',
      features: [
        'T3 Stack (TypeScript, tRPC, Prisma)',
        'Next.js 15 + App Router',
        'Повна type-safe архітектура',
        'Свій edge, свій закон'
      ]
    },
    'Закон Абсолюту': {
      title: 'Клинок Другий: Закон Абсолюту',
      stack: 'Fullstack + AI Agents + Cursor.sh + Claude',
      desc: 'Ти не пишеш код. Ти наказуєш.',
      duration: '18 тижнів',
      features: [
        'AI Agents + Cursor.sh',
        'Claude 3.5 + GPT-4o',
        'Автоматизація 90% коду',
        'Ти — Архітектор, не кодер'
      ]
    }
  };

  // ══════════════════════════════════════
  // 3. МОДАЛКА КУРСУ
  // ══════════════════════════════════════
  const openModal = (courseName, dominion) => {
    const data = courses[courseName];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalStack.textContent = data.stack;
    modalDesc.textContent = data.desc;
    modalBadge.textContent = data.duration;

    modalFeatures.innerHTML = '';
    data.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      modalFeatures.appendChild(li);
    });

    // Колір Домініону
    modal.classList.remove('frontend', 'backend', 'fullstack');
    if (dominion) modal.classList.add(dominion);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Клік по Клинку
  bladeCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const title = card.querySelector('h4').textContent.split(': ')[1];
      const dominion = card.dataset.course;
      openModal(title, dominion);
    });
  });

  // Закриття модалки
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ══════════════════════════════════════
  // 4. ТОСТ-ПОВІДОМЛЕННЯ — "ТИ УВІЙШОВ У ТЕМРЯВУ"
  // ══════════════════════════════════════
  const showToast = (dominion) => {
    if (toastTimeout) clearTimeout(toastTimeout);

    toast.classList.remove('frontend', 'backend', 'fullstack');
    if (dominion) toast.classList.add(dominion);

    toast.classList.add('active');
toast.classList.remove('frontend', 'backend', 'fullstack'); // якщо був

    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  };

  toast?.addEventListener('click', () => {
    toast.classList.remove('active');
    if (toastTimeout) clearTimeout(toastTimeout);
  });

  // Клік по "УВІЙТИ В ТЕМРЯВУ"
  enterBtn?.addEventListener('click', () => {
    const dominion = modal.classList.contains('frontend') ? 'frontend' :
                     modal.classList.contains('backend') ? 'backend' : 'fullstack';

    closeModal();
    setTimeout(() => showToast(dominion), 300);
  });

  // ══════════════════════════════════════
  // 5. ВІВТАРІ (DOMINIONS → ALTARS)
  // ══════════════════════════════════════
  let isFromMainPage = false;
  if (document.referrer && (document.referrer.includes('/index.html') || document.referrer.includes('/'))) {
    isFromMainPage = true;
  }

  const openAltar = (dominion) => {
    const targetAltar = document.getElementById(`${dominion}-altar`);
    if (!targetAltar) return;

    altars.forEach(a => a.classList.remove('active'));
    targetAltar.classList.add('active');

    setTimeout(() => {
      targetAltar.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);

    setTimeout(() => {
      targetAltar.querySelectorAll('.blade-card').forEach((blade, i) => {
        setTimeout(() => blade.classList.add('visible'), i * 300);
      });
    }, 600);
  };

  const closeAltar = () => {
    altars.forEach(a => {
      a.classList.remove('active');
      a.querySelectorAll('.blade-card').forEach(b => b.classList.remove('visible'));
    });
  };

  dominions.forEach(card => {
    card.addEventListener('click', () => {
      const dominion = card.dataset.dominion;
      openAltar(dominion);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAltar();
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.altar') && !e.target.closest('.dominion-card')) {
      closeAltar();
    }
  });

// ══════════════════════════════════════
// 7. ХЕШ — ВІДКРИТТЯ ВІВТАРЯ ТІЛЬКИ З ГОЛОВНОЇ
// ══════════════════════════════════════
window.addEventListener('load', () => {
  // Перевіряємо, чи ми прийшли з index.html
  const cameFromHome = document.referrer && (
    document.referrer.includes('/index.html') || 
    document.referrer.includes('/') && !document.referrer.includes('/pages/')
  );

  if (!cameFromHome) return;

  const hash = window.location.hash.slice(1);
  if (hash && ['frontend', 'backend', 'fullstack'].includes(hash)) {
    // Додаємо невелику затримку, щоб DOM встиг
    setTimeout(() => openAltar(hash), 100);
  }
});

// ══════════════════════════════════════
// 6. КНОПКА "ОБЕРИ СВІЙ ШЛЯХ" — ПЕРЕХІД ДО ДОМІНІОНІВ
// ══════════════════════════════════════
const scrollBtn = document.getElementById('scroll-to-architects'); // ← НОВИЙ ID!
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

  // ══════════════════════════════════════
  // КІНЕЦЬ. ТИ — У ТЕМРЯВІ.
  // ══════════════════════════════════════
});