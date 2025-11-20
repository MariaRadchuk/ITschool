// public/js/paths.js — ФІНАЛЬНА ВЕРСІЯ (всі 6 клинків працюють!)

document.addEventListener('DOMContentLoaded', () => {
  const COURSE_DATA = {
    frontend: [
      { title: "Клинок Перший: Реактивний Розлом", stack: "React 19 → Zustand → Signals → Three.js + WebGL", desc: "Портфоліо, що ламає 4090. 120 FPS. 60k+ зірок.", badge: "12 тижнів", features: ["3D-анімації на 120 FPS","Next-level оптимізація","Deep React Patterns"] },
      { title: "Клинок Другий: Портал Безсмертя", stack: "Next.js 15 + RSC + Edge + GSAP + Framer", desc: "Сайт-легенда. Awwwards «Site of the Year».", badge: "14 тижнів", features: ["Edge streaming","GSAP mastery","Realtime transitions"] }
    ],
    backend: [
      { title: "Клинок Перший: Пекельний Язик", stack: "Rust + Actix + Tokio + SQLx + WASM", desc: "API: 0.4 мс. 1M rps. Без простоїв.", badge: "10 тижнів", features: ["Rust async core","WASM pipelines","High-load strategies"] },
      { title: "Клинок Другий: Тіньовий Моноліт", stack: "Node 22 + Bun + Edge + Redis + Kafka", desc: "SaaS: від 0 до $25k MRR за 90 днів.", badge: "11 тижнів", features: ["Edge-ready Node","Kafka streams","Production scaling"] }
    ],
    fullstack: [
      { title: "Клинок Перший: Трон Турбореакт", stack: "T3 Stack + Next.js 15 + tRPC + Prisma + Tailwind", desc: "Свій Vercel. Свій edge. Свій закон.", badge: "16 тижнів", features: ["Full T3 pipeline","SSR/Edge balancing","Enterprise patterns"] },
      { title: "Клинок Другий: Закон Абсолюту", stack: "Fullstack + AI Agents + Cursor.sh + Claude", desc: "Ти не пишеш код. Ти наказуєш.", badge: "18 тижнів", features: ["AI-driven dev","Agentic workflows","Hybrid architectures"] }
    ]
  };

  // Відкриття вівтаря
function openAltar(dominion) {
    const altar = document.getElementById(`${dominion}-altar`);
    if (altar) {
      altar.classList.add('active');
      setTimeout(() => altar.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    }
  }

  // Клік по домініону
  document.querySelectorAll('.dominion-card').forEach(card => {
    card.addEventListener('click', () => openAltar(card.dataset.dominion));
  });

  // Закриття вівтарів
  document.querySelectorAll('.altar-close').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.altar').classList.remove('active'));
  });

  // ─────────────────────── ГОЛОВНЕ ВИПРАВЛЕННЯ КОЛЬОРУ ───────────────────────
  document.querySelectorAll('.altar').forEach(altar => {
    const blades = altar.querySelectorAll('.blade-card');
    const dominion = altar.dataset.dominion;               // ← беремо назву домініону

    blades.forEach((blade, index) => {
      blade.addEventListener('click', e => {
        e.stopPropagation();

        const type = blade.dataset.course;
        const data = COURSE_DATA[type][index];
        if (!data) return;

        // Заповнюємо модалку
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-stack').textContent = data.stack;
        document.getElementById('modal-desc').textContent  = data.desc;
        document.getElementById('modal-badge').textContent = data.badge;
        document.getElementById('modal-features').innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

const modal = document.getElementById('course-modal');

// Очищаємо старі класи домініонів
modal.classList.remove('frontend', 'backend', 'fullstack');

// Додаємо актуальний клас
modal.classList.add(dominion);

// Додаємо active
modal.classList.add('active');
      });
    });
  });
  // ─────────────────────────────────────────────────────────────────────

  // Закриття модалки
  document.getElementById('modal-close')?.addEventListener('click', () => {
    document.getElementById('course-modal').classList.remove('active');
  });
  document.getElementById('course-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
  });

  // Тост, кнопки, підсвітка меню, хеш — все як раніше
  document.getElementById('enter-darkness')?.addEventListener('click', () => {
    const toast = document.getElementById('darkness-toast');
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 2800);
  });

  document.getElementById('scroll-to-architects')?.addEventListener('click', () => {
    document.querySelector('.dominions').scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelectorAll('.header-nav a, .footer-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === 'paths');
  });

  const hash = location.hash.slice(1);
  if (hash && ['frontend','backend','fullstack'].includes(hash)) {
    setTimeout(() => openAltar(hash), 500);
  }
});