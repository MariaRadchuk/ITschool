document.addEventListener('DOMContentLoaded', () => {
     // ─────────────────────── ЗВ’ЯЗУЄМО ЕЛЕМЕНТИ МОДАЛКИ ───────────────────────
  const runeModal    = document.getElementById('rune-modal');      
  const openRuneBtn  = document.getElementById('open-rune-modal'); 
  const closeBtn     = document.getElementById('close-rune-modal'); 
  const overlay      = document.getElementById('modal-overlay');   
  const scrollBtn    = document.getElementById('scroll-to-book');  

     // ───────────────────────  ВІДКРИТТЯ МОДАЛКИ З РУНОЮ ───────────────────────
  if (openRuneBtn) {
    openRuneBtn.addEventListener('click', () => {
      runeModal.classList.add('active');
    });
  }

     // ───────────────────────  ЗАКРИТТЯ МОДАЛКИ ───────────────────────
  const closeModal = () => {
    runeModal.classList.remove('active'); 
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (overlay) overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && runeModal.classList.contains('active')) {
      closeModal();
    }
  });
});
