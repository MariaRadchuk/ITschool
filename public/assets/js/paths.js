// ═══════════════════════════════════════════════════════════
// public/js/PATHS.JS — РІВЕНЬ 02: ШЛЯХИ
// Навігація, вівтарі домініонів, модалки курсів, тости.
// ═══════════════════════════════════════════════════════════



// ==========================================================
// 1. ПЛАВНИЙ ПЕРЕХІД ДО СЕКЦІЙ
// ==========================================================

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// ==========================================================
// 2. ВІДКРИТТЯ ВІВТАРІВ ДОМІНІОНІВ
// ==========================================================

const dominionCards = document.querySelectorAll(".dominion-card");
const altars = document.querySelectorAll(".altar");

dominionCards.forEach(card => {
  card.addEventListener("click", () => {
    const dom = card.dataset.dominion;
    const altar = document.querySelector(`#${dom}-altar`);
    if (altar) altar.classList.add("active");
  });
});



// ==========================================================
// 3. ЗАКРИТТЯ ВІВТАРІВ
// ==========================================================

const altarCloseButtons = document.querySelectorAll(".altar-close");
altarCloseButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".altar")?.classList.remove("active");
  });
});



// ==========================================================
// 4. МОДАЛЬНЕ ВІКНО КУРСУ
// ==========================================================

const courseModal = document.getElementById("course-modal");
const modalClose = document.getElementById("modal-close");

const modalTitle = document.getElementById("modal-title");
const modalStack = document.getElementById("modal-stack");
const modalDesc = document.getElementById("modal-desc");
const modalBadge = document.getElementById("modal-badge");
const modalFeatures = document.getElementById("modal-features");


// Дані курсів можна винести в окремий файл, але поки локально.
const COURSE_DATA = {
  frontend: [
    {
      title: "Клинок Перший: Реактивний Розлом",
      stack: "React 19 → Zustand → Signals → Three.js + WebGL",
      desc: "Портфоліо, що ламає 4090. 120 FPS. 60k+ зірок.",
      badge: "12 тижнів",
      features: [
        "3D-анімації на 120 FPS",
        "Next-level оптимізація",
        "Deep React Patterns"
      ]
    },
    {
      title: "Клинок Другий: Портал Безсмертя",
      stack: "Next.js 15 + RSC + Edge + GSAP + Framer",
      desc: "Сайт-легенда. Awwwards «Site of the Year».",
      badge: "14 тижнів",
      features: [
        "Edge streaming",
        "GSAP mastery",
        "Realtime transitions"
      ]
    }
  ],

  backend: [
    {
      title: "Клинок Перший: Пекельний Язик",
      stack: "Rust + Actix + Tokio + SQLx + WASM",
      desc: "API: 0.4 мс. 1M rps. Без простоїв.",
      badge: "10 тижнів",
      features: [
        "Rust async core",
        "WASM pipelines",
        "High-load strategies"
      ]
    },
    {
      title: "Клинок Другий: Тіньовий Моноліт",
      stack: "Node 22 + Bun + Edge + Redis + Kafka",
      desc: "SaaS: від 0 до $25k MRR за 90 днів.",
      badge: "11 тижнів",
      features: [
        "Edge-ready Node",
        "Kafka streams",
        "Production scaling"
      ]
    }
  ],

  fullstack: [
    {
      title: "Клинок Перший: Трон Турбореакт",
      stack: "T3 Stack + Next.js 15 + tRPC + Prisma + Tailwind",
      desc: "Свій Vercel. Свій edge. Свій закон.",
      badge: "16 тижнів",
      features: [
        "Full T3 pipeline",
        "SSR/Edge balancing",
        "Enterprise patterns"
      ]
    },
    {
      title: "Клинок Другий: Закон Абсолюту",
      stack: "Fullstack + AI Agents + Cursor.sh + Claude",
      desc: "Ти не пишеш код. Ти наказуєш.",
      badge: "18 тижнів",
      features: [
        "AI-driven dev",
        "Agentic workflows",
        "Hybrid architectures"
      ]
    }
  ]
};



// ==========================================================
// 5. ВІДКРИТТЯ МОДАЛКИ КУРСУ (BLADE-CARD)
// ==========================================================

const bladeCards = document.querySelectorAll(".blade-card");

bladeCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    const type = card.dataset.course;

    const data = COURSE_DATA[type][index];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalStack.textContent = data.stack;
    modalDesc.textContent = data.desc;
    modalBadge.textContent = data.badge;

    modalFeatures.innerHTML = "";
    data.features.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      modalFeatures.appendChild(li);
    });

    courseModal.classList.add("active");
  });
});

modalClose.addEventListener("click", () => {
  courseModal.classList.remove("active");
});



// ==========================================================
// 6. ТОСТ «ТИ УВІЙШОВ У ТЕМРЯВУ»
// ==========================================================

const enterDarkness = document.getElementById("enter-darkness");
const darknessToast = document.getElementById("darkness-toast");

if (enterDarkness) {
  enterDarkness.addEventListener("click", () => {
    darknessToast.classList.add("active");

    setTimeout(() => {
      darknessToast.classList.remove("active");
    }, 2600);
  });
}



// ==========================================================
// 7. КНОПКА «ВГОРУ»
// ==========================================================

const scrollTopBtn = document.getElementById("scroll-to-top");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

// ==========================================================
// 8. ІНІЦІАЛІЗАЦІЯ ПРИ СТАРТІ
// ==========================================================
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
// 9. КНОПКА "ОБЕРИ СВІЙ ШЛЯХ" — ПЕРЕХІД ДО ДОМІНІОНІВ
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