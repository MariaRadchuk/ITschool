document.addEventListener('DOMContentLoaded', () => {
  // ══════════════════════════════════════
  // 1. ЗВ’ЯЗУЄМО ЕЛЕМЕНТИ МОДАЛКИ
  // ══════════════════════════════════════
  const runeModal    = document.getElementById('rune-modal');      // сам контейнер модалки
  const openRuneBtn  = document.getElementById('open-rune-modal'); // кнопка "Отримати свою руну"
  const closeBtn     = document.getElementById('close-rune-modal'); // хрестик для закриття
  const overlay      = document.getElementById('modal-overlay');   // затемнений фон під модалкою
  const scrollBtn    = document.getElementById('scroll-to-book');  // кнопка для прокрутки до книги

  // ══════════════════════════════════════
  // 2. ВІДКРИТТЯ МОДАЛКИ З РУНОЮ
  // ══════════════════════════════════════
  if (openRuneBtn) {
    openRuneBtn.addEventListener('click', () => {
      // додаємо клас "active" → модалка стає видимою
      runeModal.classList.add('active');
    });
  }

  // ══════════════════════════════════════
  // 3. ЗАКРИТТЯ МОДАЛКИ
  // ══════════════════════════════════════
  // функція закриття, щоб уникати дублювання коду
  const closeModal = () => {
    runeModal.classList.remove('active'); // видаляємо клас "active" → модалка ховається
  };

  // закриття по хрестику
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // закриття по кліку на overlay (темний фон)
  if (overlay) overlay.addEventListener('click', closeModal);

  // закриття по натисненню клавіші Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && runeModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ══════════════════════════════════════
  // 4. ПЛАВНИЙ СКРОЛ ДО СЕКЦІЇ "КНИГА ТЕМРЯВИ"
  // ══════════════════════════════════════
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      // прокручування до елементу з id="book-section"
      document.getElementById('book-section').scrollIntoView({ behavior: 'smooth' });
    });
  }
});
