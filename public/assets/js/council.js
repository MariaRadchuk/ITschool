document.addEventListener('DOMContentLoaded', () => {
   // ─────────────────────── ГОЛОГРАФІЧНІ АВАТАРИ ───────────────────────
  const avatars = document.querySelectorAll('.hologram-avatar');

  avatars.forEach((avatar, index) => {
    const card = avatar.closest('.architect-card');           
    const isFounder = card.classList.contains('founder');     
    const dominion = card.dataset.dominion || 'founder';    

    let baseHue = 280; 
    if (dominion === 'backend')    baseHue = 0;   
    if (dominion === 'fullstack')  baseHue = 40;   

    const ctx = avatar.getContext('2d');
    const centerX = avatar.width / 2;
    const centerY = avatar.height / 2;
    const radius = isFounder ? 90 : 75;                    
    const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗ'.split(''); 
    let rotation = 0;                                      
    let time = index * 15;                               

    const drawHologram = () => {
      ctx.clearRect(0, 0, avatar.width, avatar.height);     

      ctx.font = isFounder 
        ? 'bold 28px "Uncial Antiqua"' 
        : 'bold 24px "Uncial Antiqua"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < 9; i++) {
        const angle = rotation + (i / 9) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const hue = (baseHue + time + i * 35) % 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 65%, 0.92)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = isFounder ? 35 : 22;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2); 
        ctx.fillText(runes[Math.floor(Math.random() * runes.length)], 0, 0);
        ctx.restore();
      }

      rotation += 0.015;
      time += 1.2;
      requestAnimationFrame(drawHologram);
    };

    drawHologram(); 
  });

   // ─────────────────────── ПЛАВНА ПОЯВА КАРТОК МЕНТОРІВ ПРИ СКРОЛІ ───────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); 
      }
    });
  }, { threshold: 0.15 }); 

  document.querySelectorAll('.architect-card').forEach(card => {
    observer.observe(card);
  });

   // ─────────────────────── МИГАННЯ РУНИ "ТИ ТУТ" НА ТАЙМЛАЙНІ ───────────────────────
  const currentRune = document.querySelector('.point.current .rune-blink');
  if (currentRune) {
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