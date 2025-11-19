// ═══════════════════════════════════════════════════════════
// public/js/COUNCIL.JS — РІВЕНЬ 03: РАДА
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // ══════════════════════════════════════
  // 1. ГОЛОГРАФІЧНІ АВАТАРИ З КОЛЬОРАМИ ШЛЯХІВ
  // ══════════════════════════════════════
  // Вибираємо всі canvas-елементи, які відображають аватари
  const avatars = document.querySelectorAll('.hologram-avatar');

  avatars.forEach((avatar, index) => {
    // Отримуємо батьківську картку архітектора
    const card = avatar.closest('.architect-card');
    const dominion = card?.dataset.dominion || 'founder'; // founders без домініону

    // Визначаємо базовий колір залежно від домініону
    let baseColor = '#8b00ff'; // стандартний фіолетовий
    if (dominion === 'backend') baseColor = '#ff0044'; // червоний
    if (dominion === 'fullstack') baseColor = '#d4af37'; // золотий
    if (card.classList.contains('founder')) baseColor = '#d4af37'; // засновники — золотий

    const ctx = avatar.getContext('2d');
    const centerX = avatar.width / 2;
    const centerY = avatar.height / 2;
    const radius = card.classList.contains('founder') ? 90 : 75;
    const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗ'.split('');

    let rotation = 0; // початковий кут обертання рун
    let time = index * 10; // зсув для унікальності анімації

    const drawAvatar = () => {
      // Очищуємо canvas
      ctx.clearRect(0, 0, avatar.width, avatar.height);

      // Налаштовуємо шрифт для рун
      ctx.font = card.classList.contains('founder') ? 'bold 28px "Uncial Antiqua"' : 'bold 24px "Uncial Antiqua"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Малюємо 9 рун навколо центру
      for (let i = 0; i < 9; i++) {
        const angle = (rotation + (i / 9) * Math.PI * 2) % (Math.PI * 2);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const rune = runes[Math.floor(Math.random() * runes.length)];

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Колір руни з пульсацією
        const hue = (time * 2 + i * 40) % 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, 0.9)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = card.classList.contains('founder') ? 30 : 20;
        ctx.fillText(rune, 0, 0);
        ctx.restore();
      }

      rotation += 0.02; // обертання аватару
      time += 1;
      requestAnimationFrame(drawAvatar); // рекурсивно анімувати
    };

    drawAvatar(); // запускаємо анімацію
  });

  // ══════════════════════════════════════
  // 2. АНІМАЦІЯ ПОЯВИ КАРТОК ПРИ СКРОЛІ
  // ══════════════════════════════════════
  // IntersectionObserver додає клас .visible при вході картки в viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.architect-card').forEach(card => observer.observe(card));

  // ══════════════════════════════════════
  // 3. ТАЙМЛАЙН — МИГАННЯ ПОТОЧНОГО ПУНКТУ
  // ══════════════════════════════════════
  const currentPoint = document.querySelector('.point.current .rune-blink');
  if (currentPoint) {
    currentPoint.style.animation = 'blink 1s infinite'; // CSS-анімація блимання
  }
});

// ══════════════════════════════════════
// ДОПОМОЖНА ФУНКЦІЯ: HEX → RGB
// ══════════════════════════════════════
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// ══════════════════════════════════════
// КНОПКА "ОБЕРИ СВІЙ ШЛЯХ" — ПЕРЕХІД ДО МЕНТОРІВ
// ══════════════════════════════════════
const scrollBtn = document.getElementById('scroll-to-architects');
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    const architectsSection = document.querySelector('.council-architects');
    const header = document.querySelector('.arcane-header');
    const headerHeight = header ? header.offsetHeight : 0;

    if (architectsSection) {
      window.scrollTo({
        top: architectsSection.offsetTop - headerHeight - 20, // відступ для хедера
        behavior: 'smooth'
      });
    }
  });
}
