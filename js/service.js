/*  SCROLL FADE ANIMATION*/

const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

},{ threshold:0.2 });

fadeElements.forEach(el => observer.observe(el));


/*  BUTTON ACTIVE STATE*/

const allButtons = document.querySelectorAll(".service-buttons button");

allButtons.forEach(btn => {

btn.addEventListener("click", ()=>{

let parent = btn.parentElement;

parent.querySelectorAll("button").forEach(b=>{
b.classList.remove("active");
});

btn.classList.add("active");

});

});
/* POWER PLATFORM - UPGRADED ANIMATIONS */

window.addEventListener("load", () => {

const heroCards = document.querySelectorAll(".service-card");
const heroContent = document.querySelector(".hero-content");

if (heroContent) {
heroContent.style.opacity = "0";
heroContent.style.transform = "translateY(30px)";
heroContent.style.transition = "opacity 0.8s ease, transform 0.8s ease";

setTimeout(() => {
heroContent.style.opacity = "1";
heroContent.style.transform = "translateY(0)";
}, 200);
}

heroCards.forEach((card, i) => {

card.style.opacity = "0";
card.style.transform = "translateY(40px)";
card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

setTimeout(() => {
card.style.opacity = "1";
card.style.transform = "translateY(0)";
}, 500 + i * 150);

});

});

/* 1. MOBILE MENU TOGGLE */
function toggleMenu() {
  const menu    = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");
  if (!menu) return;
  const isOpen = menu.classList.toggle("open");
  overlay.classList.toggle("open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
}

/* 2. HERO CONTENT FADE-IN ON LOAD*/
function initHeroAnimation(heroContentSelector, cardSelector) {
  const heroContent = document.querySelector(heroContentSelector);

  if (heroContent) {
    heroContent.style.opacity    = "0";
    heroContent.style.transform  = "translateY(30px)";
    heroContent.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    setTimeout(() => {
      heroContent.style.opacity   = "1";
      heroContent.style.transform = "translateY(0)";
    }, 200);
  }

  const cards = document.querySelectorAll(cardSelector);
  cards.forEach((card, i) => {
    card.style.opacity   = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    setTimeout(() => {
      card.style.opacity   = "1";
      card.style.transform = "translateY(0)";
    }, 500 + i * 150);
  });
}

/*3. UNIVERSAL TEXT SWITCHER */
function switchSvcText(titleId, descId, containerSelector, titles, descs, index) {
  const title = document.getElementById(titleId);
  const desc  = document.getElementById(descId);
  if (!title || !desc) return;

  // Fade out
  title.style.opacity   = "0";
  title.style.transform = "translateY(-8px)";
  title.style.transition = "opacity 0.25s ease, transform 0.25s ease";
  desc.style.opacity    = "0";
  desc.style.transition = "opacity 0.25s ease";

  setTimeout(() => {
    title.textContent = titles[index];
    desc.textContent  = descs[index];

    // Fade in
    title.style.opacity   = "1";
    title.style.transform = "translateY(0)";
    desc.style.opacity    = "1";
  }, 220);

  // Highlight active button
  setSvcActiveBtn(containerSelector, index);
}

/* 4. SET ACTIVE BUTTON*/
function setSvcActiveBtn(containerSelector, activeIndex) {
  const btns = document.querySelectorAll(containerSelector + " button");
  btns.forEach((btn, i) => {
    btn.classList.toggle("active", i === activeIndex);
  });
}

/* 5. COUNTER ANIMATION */
function animateSvcCounter(el, delayMs = 0) {
  const target    = parseFloat(el.getAttribute("data-target"));
  const isDecimal = target % 1 !== 0;
  const steps     = 70;
  const increment = target / steps;
  let current = 0;
  let step    = 0;

  setTimeout(() => {
    const update = () => {
      step++;
      current += increment;
      if (step < steps) {
        el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = isDecimal ? target.toFixed(1) : target;
        // Pulse scale effect
        el.style.transform  = "scale(1.15)";
        el.style.transition = "transform 0.3s ease";
        setTimeout(() => { el.style.transform = "scale(1)"; }, 300);
      }
    };
    update();
  }, delayMs);
}

/* 6. CHART BARS ANIMATION*/
function animateSvcBars(barSelector, containerHeightPx) {
  const bars = document.querySelectorAll(barSelector);
  bars.forEach((bar, i) => {
    setTimeout(() => {
      const val = parseInt(bar.getAttribute("data-h")) || 0;
      if (containerHeightPx) {
        // px mode — for phone/small charts
        bar.style.height = val + "px";
      } else {
        // % mode — for full-size sales charts
        const px = Math.round((val / 100) * 160); // 160px = standard chart height
        bar.style.height = px + "px";
      }
    }, i * 150);
  });
}

/* 7. SCROLL REVEAL */
function svcReveal(selector, options = {}) {
  const threshold = options.threshold || 0.25;
  const elements  = document.querySelectorAll(selector);

  elements.forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold });
    obs.observe(el);
  });
}

/*  8. OBSERVE ONCE */
function observeOnce(selector, callback, threshold = 0.3) {
  const el = document.querySelector(selector);
  if (!el) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(el);
        obs.unobserve(el);
      }
    });
  }, { threshold });
  obs.observe(el);
}

/*  9. STAGGER REVEAL */
function staggerReveal(selector, baseDelay = 0) {
  document.querySelectorAll(selector).forEach(el => {
    const delay = parseInt(el.getAttribute("data-delay")) || 0;
    setTimeout(() => el.classList.add("show"), baseDelay + delay);
  });
}

/*10. FLOW STEPS  */
function animateFlowSteps(stepSelector, connectorSelector) {
  const steps = document.querySelectorAll(stepSelector);
  const conns = document.querySelectorAll(connectorSelector);

  steps.forEach((step, i) => {
    const delay = parseInt(step.getAttribute("data-delay")) || i * 400;
    setTimeout(() => step.classList.add("show"), delay);
    if (conns[i]) {
      setTimeout(() => conns[i].classList.add("show"), delay + 200);
    }
  });
}

/* 11. FADE-UP  */
function initFadeUp(selectors) {
  const elements = document.querySelectorAll(selectors);
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-up-show");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => {
    el.classList.add("fade-up-init");
    obs.observe(el);
  });
}

/* 12. POPUP FORM */
(function initPopup() {
  const popup   = document.getElementById("demoFormPopup");
  const closeBtn = document.querySelector(".close-btn");
  const form    = document.getElementById("demoForm");
  const msg     = document.getElementById("demoFormMsg");

  if (!popup) return;

  // Open via any .open-demo-btn
  document.querySelectorAll(".open-demo-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      popup.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close
  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }
  popup.addEventListener("click", e => {
    if (e.target === popup) closePopup();
  });

  function closePopup() {
    popup.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Form submit 
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (msg) {
        msg.textContent = " Message sent! We'll get back to you shortly.";
      }
      setTimeout(closePopup, 2200);
    });
  }
})();

/*  13. SMOOTH SCROLL  */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* 14. BUTTON HOVER PADDING EFFECT */
function initBtnHover(selector) {
  document.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.paddingLeft = "20px";
      btn.style.transition  = "all 0.25s ease";
    });
    btn.addEventListener("mouseleave", () => {
      if (!btn.classList.contains("active")) {
        btn.style.paddingLeft = "12px";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});