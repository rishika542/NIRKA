

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

/* ---- ANIMATED WHEEL ---- */
const segments = [
  { label: 'Planning\n& Analysis',   color: '#3730a3', desc: 'Define scope, goals & strategic roadmap.' },
  { label: 'Solution\nDesign',        color: '#4338ca', desc: 'Blueprint, workflows & tech specifications.' },
  { label: 'Process\nMapping',        color: '#4f46e5', desc: 'Align system features with business processes.' },
  { label: 'Development',             color: '#6d28d9', desc: 'Build, configure & integrate all components.' },
  { label: 'Testing\n& QA',           color: '#7c3aed', desc: 'Functional, performance & UAT checks.' },
  { label: 'Deployment',              color: '#8b5cf6', desc: 'Go-live with full operational support.' },
  { label: 'Support &\nOptimization', color: '#a78bfa', desc: 'Ongoing monitoring & continuous improvement.' },
];

const cx = 210, cy = 210, outerR = 198, innerR = 78;
const total = segments.length;
const angleStep = (2 * Math.PI) / total;
const startOffset = -Math.PI / 2;
const gap = 0.025; 

const svgNS = 'http://www.w3.org/2000/svg';
const segG  = document.getElementById('segmentsGroup');
const lineG = document.getElementById('linesGroup');
const lblG  = document.getElementById('labelsGroup');
const tooltip = document.getElementById('wheelTooltip');

function polarToCart(cx, cy, r, angle) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function arcPath(cx, cy, r1, r2, startA, endA) {
  const p1 = polarToCart(cx, cy, r2, startA);
  const p2 = polarToCart(cx, cy, r2, endA);
  const p3 = polarToCart(cx, cy, r1, endA);
  const p4 = polarToCart(cx, cy, r1, startA);
  const large = endA - startA > Math.PI ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${r2} ${r2} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${r1} ${r1} 0 ${large} 0 ${p4.x} ${p4.y} Z`;
}

segments.forEach((seg, i) => {
  const startA = startOffset + i * angleStep + gap / 2;
  const endA   = startOffset + (i + 1) * angleStep - gap / 2;
  const midA   = (startA + endA) / 2;
  const labelR = (outerR + innerR) / 2;
  const labelPt = polarToCart(cx, cy, labelR, midA);

  // path
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', arcPath(cx, cy, innerR + 2, outerR - 2, startA, endA));
  path.setAttribute('fill', seg.color);
  path.setAttribute('opacity', '0.9');
  path.style.cursor = 'pointer';
  path.style.transition = 'opacity 0.3s, transform 0.3s';
  path.setAttribute('transform-origin', `${cx}px ${cy}px`);

  // hover
  path.addEventListener('mouseenter', (e) => {
    path.setAttribute('opacity', '1');
    path.style.transform = 'scale(1.04)';
    document.getElementById('tooltipTitle').textContent = seg.label.replace('\n', ' ');
    document.getElementById('tooltipDesc').textContent = seg.desc;
    // position tooltip
    const rect = document.getElementById('wheelContainer').getBoundingClientRect();
    const svgRect = document.querySelector('.wheel-svg').getBoundingClientRect();
    const scaleX = svgRect.width / 420;
    const scaleY = svgRect.height / 420;
    const tx = (labelPt.x * scaleX) + (svgRect.left - rect.left) - 90;
    const ty = (labelPt.y * scaleY) + (svgRect.top  - rect.top)  - 50;
    tooltip.style.left = tx + 'px';
    tooltip.style.top  = ty + 'px';
    tooltip.classList.add('show');
  });
  path.addEventListener('mouseleave', () => {
    path.setAttribute('opacity', '0.9');
    path.style.transform = 'scale(1)';
    tooltip.classList.remove('show');
  });

  segG.appendChild(path);

  // label lines
  const lineStart = polarToCart(cx, cy, innerR + 6, midA);
  const lineEnd   = polarToCart(cx, cy, outerR - 6, midA);
  const divLine = document.createElementNS(svgNS, 'line');
  divLine.setAttribute('x1', lineStart.x); divLine.setAttribute('y1', lineStart.y);
  divLine.setAttribute('x2', lineEnd.x);   divLine.setAttribute('y2', lineEnd.y);
  divLine.setAttribute('stroke', 'rgba(255,255,255,0.12)');
  divLine.setAttribute('stroke-width', '1');
  lineG.appendChild(divLine);

  // text labels
  const lines = seg.label.split('\n');
  const textG = document.createElementNS(svgNS, 'g');

  lines.forEach((line, li) => {
    const txt = document.createElementNS(svgNS, 'text');
    const offset = (li - (lines.length - 1) / 2) * 13;
    txt.setAttribute('x', labelPt.x);
    txt.setAttribute('y', labelPt.y + offset);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('dominant-baseline', 'middle');
    txt.setAttribute('fill', '#fff');
    txt.setAttribute('font-size', '10');
    txt.setAttribute('font-weight', '600');
    txt.setAttribute('font-family', 'Poppins,sans-serif');
    txt.style.pointerEvents = 'none';
    txt.textContent = line;
    textG.appendChild(txt);
  });

  lblG.appendChild(textG);
});

/* Segment entry animation */
document.querySelectorAll('#segmentsGroup path').forEach((p, i) => {
  p.style.opacity = '0';
  p.style.transform = 'scale(0.7)';
  setTimeout(() => {
    p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    p.style.opacity = '0.9';
    p.style.transform = 'scale(1)';
  }, 100 + i * 100);
});

/* ---- SCROLL REVEAL ---- */
const reveals = document.querySelectorAll('.reveal, .tl-item');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));



/* ---- COUNTER ANIMATION ---- */
function animateCounter(el, target, suffix) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.innerHTML = Math.round(current) + '<span>' + suffix + '</span>';
  }, 25);
}

// trigger on page load 
window.addEventListener('load', () => {
  document.querySelectorAll('.stat-item .num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    setTimeout(() => animateCounter(el, target, suffix), 400);
  });
});

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