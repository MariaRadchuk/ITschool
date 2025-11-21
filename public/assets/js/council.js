document.addEventListener('DOMContentLoaded', () => {
   // ─────────────────────── ГОЛОГРАФІЧНІ АВАТАРИ ───────────────────────
  const avatars = document.querySelectorAll('.hologram-avatar');

  avatars.forEach((avatar, index) => {
    const card = avatar.closest('.architect-card');           // картка ментора
    const isFounder = card.classList.contains('founder');     // чи це засновник?
    const dominion = card.dataset.dominion || 'founder';      // frontend / backend / fullstack

    // Визначаємо основний колір залежно від Шляху
    let baseHue = 280; // фіолетовий — стандарт для frontend і засновників
    if (dominion === 'backend')    baseHue = 0;    // червоний
    if (dominion === 'fullstack')  baseHue = 40;   // золотий

    const ctx = avatar.getContext('2d');
    const centerX = avatar.width / 2;
    const centerY = avatar.height / 2;
    const radius = isFounder ? 90 : 75;                     // засновники — більші аватари
    const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗ'.split(''); // руни Ордену
    let rotation = 0;                                       // кут обертання кола
    let time = index * 15;                                  // зсув анімації — щоб не синхронно

    const drawHologram = () => {
      ctx.clearRect(0, 0, avatar.width, avatar.height);     // очищаємо попередній кадр

      // Налаштування шрифту рун
      ctx.font = isFounder 
        ? 'bold 28px "Uncial Antiqua"' 
        : 'bold 24px "Uncial Antiqua"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Малюємо 9 рун по колу 
      for (let i = 0; i < 9; i++) {
        const angle = rotation + (i / 9) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Пульсуючий колір — магія оживає
        const hue = (baseHue + time + i * 35) % 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 65%, 0.92)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = isFounder ? 35 : 22;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2); // руна дивиться назовні
        ctx.fillText(runes[Math.floor(Math.random() * runes.length)], 0, 0);
        ctx.restore();
      }

      // Анімація: повільне обертання + пульсація кольору
      rotation += 0.015;
      time += 1.2;
      requestAnimationFrame(drawHologram);
    };

    drawHologram(); // запускаємо голограму
  });

   // ─────────────────────── ПЛАВНА ПОЯВА КАРТОК МЕНТОРІВ ПРИ СКРОЛІ ───────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // додаємо анімацію появи
      }
    });
  }, { threshold: 0.15 }); // спрацьовує, коли 15% картки видно

  document.querySelectorAll('.architect-card').forEach(card => {
    observer.observe(card);
  });

   // ─────────────────────── МИГАННЯ РУНИ "ТИ ТУТ" НА ТАЙМЛАЙНІ ───────────────────────
  const currentRune = document.querySelector('.point.current .rune-blink');
  if (currentRune) {
    // Руна блимає — це знак, що адепт вже в Ордені
    currentRune.style.animation = 'blink 1.2s infinite';
  }

   // ─────────────────────── КНОПКА "ОБЕРИ СВОГО МЕНТОРА" ───────────────────────
  const chooseMentorBtn = document.getElementById('scroll-to-architects');
  if (chooseMentorBtn) {
    chooseMentorBtn.addEventListener('click', () => {
      document.querySelector('.council-architects').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
});