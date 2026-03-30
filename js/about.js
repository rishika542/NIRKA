
/* ---- MOBILE MENU ---- */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
    overlay.style.display = 'none';
  } else {
    menu.classList.add('open');
    overlay.style.display = 'block';
  }
}
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', toggleMenu));

/* ---- EXPERTISE SLIDER ---- */
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('focusSlider');
  const cards = slider.querySelectorAll('.focus-card');
  const dotsContainer = document.getElementById('sliderDots');

  cards.forEach((_, idx) => {
    const dot = document.createElement('span');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => scrollToCard(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('span');

  function scrollToCard(index) {
    const cardWidth = cards[0].offsetWidth + 22;
    slider.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  slider.addEventListener('scroll', () => {
    const cardWidth = cards[0].offsetWidth + 22;
    const index = Math.round(slider.scrollLeft / cardWidth);
    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  });

  document.getElementById('sliderPrev')?.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 22;
    const index = Math.max(0, Math.round(slider.scrollLeft / cardWidth) - 1);
    scrollToCard(index);
  });

  document.getElementById('sliderNext')?.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 22;
    const index = Math.min(cards.length - 1, Math.round(slider.scrollLeft / cardWidth) + 1);
    scrollToCard(index);
  });
});

/* ---- SCROLL REVEAL ---- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(r => observer.observe(r));


// MOBILE ACCORDION
function toggleMobileAcc(trigger) {
  const body = trigger.nextElementSibling;

  if (!body) return;

  const isOpen = body.classList.contains("open");

  if (isOpen) {
    body.classList.remove("open");
    trigger.classList.remove("open");
  } else {
    body.classList.add("open");
    trigger.classList.add("open");
  }
}
// Mobile accordion — Services expand/collapse
function toggleMobileAcc(trigger) {
  const body = trigger.nextElementSibling;
  const isOpen = body.classList.toggle("open");
  trigger.classList.toggle("open", isOpen);
}
