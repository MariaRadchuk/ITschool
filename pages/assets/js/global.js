// ==================== MATRIX RAIN ====================
const canvas = document.getElementById('matrix');
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

// ==================== ТАЙПІНГ ЕФЕКТ ====================
const typingText = "Senior-level thinker. Still loading…";
let charIndex = 0;
const typingElement = document.getElementById('typing');
const heroSection = document.getElementById('hero');
const terminal = document.querySelector('.terminal');

function typeWriter() {
  if (charIndex < typingText.length) {
    typingElement.innerHTML += typingText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 80);
  } else {
    setTimeout(() => {
      terminal.style.opacity = '0';
      heroSection.style.opacity = '1';
      document.querySelector('.tracks')?.classList.add('active');
    }, 1200);
  }
}
setTimeout(typeWriter, 1000);

// ==================== КНОПКА "ENTER THE VOID" ====================
document.getElementById('enter-btn')?.addEventListener('click', () => {
  clickSound.currentTime = 0;
  clickSound.play();
  
  document.getElementById('tracks').scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => {
    document.querySelectorAll('.track-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 350);
    });
  }, 700);
});

// === БУРГЕР-МЕНЮ ===
const burger = document.querySelector('.burger');
const nav = document.querySelector('.header-nav');

burger?.addEventListener('click', () => {
  nav.classList.toggle('active');
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

document.querySelectorAll('.track-card').forEach(card => {
  observer.observe(card);
});

// ==================== КУРСОР (дефолтний) ====================
document.body.style.cursor = 'default';
document.querySelectorAll('a, button, .burger').forEach(el => {
  el.style.cursor = 'pointer';
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

// === ВИПРАВЛЕНИЙ JS — КУРСОР + ПЛАВНА ПРОКРУТКА ===
const cursor = document.querySelector('.cursor');

// Плавний курсор (без глюків!)
document.addEventListener('mousemove', (e) => {
  requestAnimationFrame(() => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
});

// Підсвітка при ховері
document.querySelectorAll('a, button, .burger').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// КНОПКА — ПЛАВНО ДО КАРТОК (зупиняється зверху)
document.getElementById('enter-btn')?.addEventListener('click', (e) => {
  e.preventDefault();

  const tracksSection = document.querySelector('.tracks');
  const headerHeight = document.querySelector('.arcane-header').offsetHeight;

  window.scrollTo({
    top: tracksSection.offsetTop - headerHeight - 100,
    behavior: 'smooth'
  });

  setTimeout(() => {
    tracksSection.classList.add('active');
    document.querySelectorAll('.track-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 250);
    });
  }, 600);
});
