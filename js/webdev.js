// ===== ACTIVE BUTTON HELPER =====
function setActiveBtn(containerSelector, activeIndex) {

  const btns = document.querySelectorAll(containerSelector + " button");

  btns.forEach((btn, i) => {
    if (i === activeIndex) {
      btn.style.borderColor = "#302b63";
      btn.style.background = "#0e52b31a";
      btn.style.fontWeight = "700";
    } else {
      btn.style.borderColor = "#334155";
      btn.style.background = "transparent";
      btn.style.fontWeight = "400";
    }
  });

}


// ===== GENERIC TEXT SWITCHER =====
function switchText(titleId, descId, containerSelector, titles, descs, index) {

  const title = document.getElementById(titleId);
  const desc  = document.getElementById(descId);

  title.style.opacity = "0";
  title.style.transform = "translateY(-8px)";
  desc.style.opacity = "0";

  setTimeout(() => {

    title.innerText = titles[index];
    desc.innerText  = descs[index];

    title.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    desc.style.transition  = "opacity 0.4s ease";

    title.style.opacity = "1";
    title.style.transform = "translateY(0)";
    desc.style.opacity  = "1";

  }, 200);

  setActiveBtn(containerSelector, index);
}

// TEXT CONTENT DATA
const webData = [
  { title: "Responsive Web Design",   desc: "We design and develop websites that look stunning on every device — from desktop to mobile — with modern UI/UX, fast load times, and SEO-ready structure built in from day one." },
  { title: "SEO & Performance",       desc: "Every website we build is optimized for search engines and speed — clean code, fast load times, proper meta structure, and Core Web Vitals compliance out of the box." },
  { title: "CMS & Easy Editing",      desc: "We integrate powerful CMS platforms so your team can easily update content, add blog posts, and manage pages — without touching a single line of code." },
  { title: "Microsoft Integration",   desc: "Your website talks directly to Dynamics 365 — customer forms sync to CRM, product data pulls from Business Central, and everything stays live and accurate." }
];
const appData = [
  { title: "iOS & Android Apps",              desc: "We build cross-platform mobile applications that give your team and customers access to real-time business data — anytime, anywhere, on any device." },
  { title: "Dynamics 365 Mobile",             desc: "Your mobile app connects directly to Dynamics 365 — sales reps can check CRM leads, update orders, and view Business Central inventory all from their phone." },
  { title: "Push Notifications & Alerts",     desc: "Keep your team informed in real time — automated push notifications for new leads, order updates, approvals, and critical business alerts directly on their devices." },
  { title: "Offline Mode Support",            desc: "Our apps work even without internet — data syncs automatically when the connection is restored, so your field teams are never blocked by poor connectivity." }
];
const ecomData = [
  { title: "BC-Integrated Online Store",   desc: "Your e-commerce store syncs in real time with Business Central — so inventory, orders, invoices, and customer data are always accurate across every channel automatically." },
  { title: "Real-Time Inventory Sync",     desc: "Stock levels update automatically across your website and Business Central — no manual entry, no overselling, no customer disappointment. Always accurate, always live." },
  { title: "Automated Order & Billing",    desc: "Every online order automatically creates a sales order and invoice in Business Central — saving your team hours of manual data entry and eliminating billing errors." },
  { title: "Multi-Channel Selling",        desc: "Sell across your website, WhatsApp, and marketplaces — all orders flow into one unified Business Central dashboard for complete control and reporting." }
];
const intData = [
  { title: "Seamless Dynamics 365 Connect", desc: "We build custom APIs and connectors that link your website or app directly to Dynamics 365 — so data flows automatically between your digital touchpoints and your ERP/CRM." },
  { title: "Custom API Development",        desc: "Our developers build robust REST APIs that connect any third-party system, website, or mobile app to your Microsoft Dynamics 365 environment securely and efficiently." },
  { title: "Power Platform Extensions",     desc: "We extend Power Apps, Power Automate, and Power BI with custom connectors — bringing your external web and app data directly into your Power Platform workflows." },
  { title: "Real-Time Data Sync",           desc: "Changes in your website or app reflect instantly in Dynamics 365 — new customers, updated orders, support tickets, and form submissions all sync in real time." }
];

// BUTTON SWITCHER 
function switchText(titleId, descId, sectionSelector, data, index, clickedBtn) {

  const title = document.getElementById(titleId);
  const desc  = document.getElementById(descId);
  const btns  = document.querySelectorAll(`${sectionSelector} .wd-btn`);

  // fade out
  title.style.opacity = "0";
  desc.style.opacity  = "0";

  setTimeout(() => {

    // change text
    title.textContent = data[index].title;
    desc.textContent  = data[index].desc;

    // fade in
    title.style.opacity = "1";
    desc.style.opacity  = "1";

  }, 220);

  // ACTIVE BUTTON STYLE
  btns.forEach((btn,i) => {

    if(i === index){
      btn.style.borderColor = "#302b63";
      btn.style.background  = "linear-gradient(135deg, #1a1a0009, #4a5c0015, #0076a813, #00cae011)";
      btn.style.fontWeight  = "700";
    }
    else{
      btn.style.borderColor = "#334155";
      btn.style.background  = "transparent";
      btn.style.fontWeight  = "400";
    }

  });

}

function switchWebBtn(btn, i)  { switchText("webTitle","webDesc","#wd-web",webData,i,btn); }

function switchAppBtn(btn, i)  { switchText("appTitle","appDesc","#wd-app",appData,i,btn); }

function switchEcomBtn(btn, i) { switchText("ecomTitle","ecomDesc","#wd-ecom",ecomData,i,btn); }

function switchIntBtn(btn, i)  { switchText("intTitle","intDesc","#wd-integration",intData,i,btn); }

// COUNTER ANIMATION

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"));
  const delay  = parseInt(el.closest("[data-delay]")?.getAttribute("data-delay")) || 0;
  let start = null;
  const duration = 1200;
  setTimeout(() => {
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }, delay);
}

// BROWSER
function animateBrowser() {
  // cards pop in with delay
  document.querySelectorAll(".brow-card").forEach((c, i) => {
    setTimeout(() => c.classList.add("show"), 300 + i * 180);
  });

  // stats count up
  const stats = [
    { el: document.querySelector(".brow-stat:nth-child(1) .brow-stat-num"), from: 0, to: 500, suffix: "+" },
    { el: document.querySelector(".brow-stat:nth-child(2) .brow-stat-num"), from: 80, to: 98,  suffix: "%" },
    { el: document.querySelector(".brow-stat:nth-child(3) .brow-stat-num"), from: 0, to: 10,   suffix: "+" },
  ];
  stats.forEach(({ el, from, to, suffix }, i) => {
    if (!el) return;
    setTimeout(() => {
      let current = from;
      const step = Math.ceil((to - from) / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, to);
        el.textContent = current + suffix;
        if (current >= to) clearInterval(timer);
      }, 30);
    }, 200 + i * 100);
  });
}


//PHONE
function animatePhone() {
  // kpi counters
  document.querySelectorAll(".ph-kpi").forEach((kpi, i) => {
    const delay = parseInt(kpi.getAttribute("data-delay")) || 0;
    setTimeout(() => {
      kpi.classList.add("show");
      animateCounter(kpi.querySelector(".ph-kpi-val"));
    }, delay + 200);
  });

  // bars grow
  document.querySelectorAll(".ph-bar").forEach((bar, i) => {
    const h = bar.getAttribute("data-h");
    setTimeout(() => {
      bar.style.height = h + "px";
    }, 400 + i * 100);
  });

  // list items slide in
  document.querySelectorAll(".ph-item").forEach(item => {
    const delay = parseInt(item.getAttribute("data-delay")) || 0;
    setTimeout(() => item.classList.add("show"), 800 + delay);
  });
}

// STORE
function animateStore() {
  document.querySelectorAll(".store-item").forEach(item => {
    const delay = parseInt(item.getAttribute("data-delay")) || 0;
    setTimeout(() => item.classList.add("show"), 300 + delay);
  });
}

// INTEGRATION
function animateIntegration() {
  document.querySelectorAll(".int-step, .int-connector").forEach(el => {
    const delay = parseInt(el.getAttribute("data-delay")) || 0;
    setTimeout(() => el.classList.add("show"), delay);
  });
}

// INTERSECTION OBSERVERS

const observeEl = (selector, callback) => {
  const el = document.querySelector(selector);
  if (!el) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  obs.observe(el);
};

// Slide in visual + text on scroll for each section
document.querySelectorAll(".wd-visual, .wd-text").forEach(el => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  obs.observe(el);
});

// Section-specific animations
observeEl("#web-visual",  animateBrowser);
observeEl("#app-visual",  animatePhone);
observeEl("#ecom-visual", animateStore);
observeEl("#int-visual",  animateIntegration);

// HERO CARDS — stagger on load

window.addEventListener("load", () => {
  document.querySelectorAll(".wd-hcard").forEach((card, i) => {
    setTimeout(() => card.classList.add("show"), 200 + i * 120);
  });

  // title/desc smooth fade
  ["webTitle","webDesc","appTitle","appDesc","ecomTitle","ecomDesc","intTitle","intDesc"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.transition = "opacity 0.22s ease";
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