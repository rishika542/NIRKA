window.addEventListener("load", () => {
  const heroCards = document.querySelectorAll(".bc-card");
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
    card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 500 + i * 150);
  });
});
// ===== ACTIVE BUTTON HELPER =====
function setActiveBtn(containerSelector, activeIndex) {
  const btns = document.querySelectorAll(containerSelector + " button");

  btns.forEach((btn, i) => {
    if (i === activeIndex) {
      btn.style.borderColor = "#302b63";
      btn.style.background = " #0d948917";
      btn.style.fontWeight = "700";    } else {
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

// ===== FINANCE TEXT =====
const financeTitles = [
  "Automated Financial Management",
  "Multi-Currency & Tax Compliance",
  "Budget & Forecast Planning",
  "Audit Trail & Compliance"
];
const financeDescs = [
  "Business Central automates your entire financial workflow — from journal entries and reconciliations to multi-entity consolidation — so your team focuses on growth, not manual bookkeeping.",
  "Handle transactions in multiple currencies with real-time exchange rates, automatic GST/VAT computation, and country-specific tax compliance built right in.",
  "Create detailed budgets, run what-if scenarios, and compare actuals vs forecasts with real-time dashboards that keep leadership always informed.",
  "Maintain a complete audit trail for every financial transaction with role-based access controls and built-in compliance reporting for regulators."
];

function changeFinanceText(i) {
  switchText(
    "financeTitle",
    "financeDesc",
    ".finance-buttons",
    financeTitles,
    financeDescs,
    i
  );
}

// ===== SUPPLY TEXT =====
const supplyTitles = [
  "Intelligent Inventory Management",
  "Automated Purchase Orders",
  "Vendor & Supplier Management",
  "Warehouse Operations"
];
const supplyDescs = [
  "Business Central gives you real-time stock visibility across warehouses, automates reorder points, and ensures you never face stockouts or overstock situations again.",
  "Auto-generate purchase orders when stock falls below threshold levels and route them for approval — reducing manual effort and procurement lead time.",
  "Maintain vendor scorecards, track delivery performance, and negotiate better contracts with data-driven supplier insights.",
  "Manage bin locations, pick-and-pack operations, and barcode scanning to run your warehouse with precision and speed."
];
function changeSupplyText(i) {
  switchText(
    "supplyTitle",
    "supplyDesc",
    ".supply-buttons",
    supplyTitles,
    supplyDescs,
    i
  );
}
// ===== SALES TEXT =====
const salesTitles = [
  "Quote-to-Cash Automation",
  "Customer & Contact Management",
  "Sales Forecasting & Reporting",
  "After-Sales Service Management"
];
const salesDescs = [
  "Business Central connects your sales pipeline with finance and inventory, so every quote becomes an order, every order becomes an invoice, and payments are tracked automatically.",
  "Maintain a complete 360° view of every customer — contacts, history, outstanding invoices, and communication — in a single unified record.",
  "Use built-in analytics to forecast revenue, track team performance, and identify top opportunities before your competitors do.",
  "Log service calls, manage warranty claims, and schedule field service — all connected to customer records and billing."
];
function changeSalesText(i) {
  switchText(
    "salesTitle",
    "salesDesc",
    ".sales-buttons",
    salesTitles,
    salesDescs,
    i
  );
}
// ===== PROJECT TEXT =====
const projectTitles = [
  "Integrated Project Planning",
  "Resource & Capacity Management",
  "Cost & Billing Tracking",
  "Project Profitability Reporting"
];
const projectDescs = [
  "Business Central connects project planning directly to your finance and resource management — so you always know costs, timelines, and profitability for every engagement.",
  "Allocate the right people to the right projects based on availability and skill, and get alerts when capacity is being exceeded.",
  "Track actual costs vs budgeted costs in real time, and generate invoices directly from project timesheets and expense entries.",
  "Analyse project margins, identify underperforming engagements early, and make data-driven decisions to protect profitability."
];
function changeProjectText(i) {
  switchText(
    "projectTitle",
    "projectDesc",
    ".project-buttons",
    projectTitles,
    projectDescs,
    i
  );
}


// ===== FINANCE KPI COUNTER (handles decimals like 2.4) =====
const financeSection = document.querySelector(".bc-finance-section");
const fdRows = document.querySelectorAll(".fd-row");
const financeCounters = document.querySelectorAll(".counter-finance");

const financeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // Counter animation — decimal support
      financeCounters.forEach(counter => {
        const target = parseFloat(counter.getAttribute("data-target"));
        const isDecimal = target % 1 !== 0;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const update = () => {
          step++;
          current += increment;
          if (step < steps) {
            counter.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.innerText = isDecimal ? target.toFixed(1) : target;
            // pulse when done
            counter.style.transform = "scale(1.15)";
            counter.style.transition = "transform 0.3s ease";
            setTimeout(() => { counter.style.transform = "scale(1)"; }, 300);
          }
        };
        update();
      });

      // Ledger rows animation
      fdRows.forEach((row, i) => {
        setTimeout(() => row.classList.add("show"), i * 300);
      });

      financeObserver.unobserve(financeSection);
    }
  });
}, { threshold: 0.4 });

financeObserver.observe(financeSection);

// ===== SUPPLY CHAIN FLOW ANIMATION =====
const supplySection = document.querySelector(".bc-supply-section");
const supplySteps = document.querySelectorAll(".supply-step");
const supplyConns = document.querySelectorAll(".supply-connector");

const supplyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      supplySteps.forEach((step, i) => {
        setTimeout(() => step.classList.add("show"), i * 400);
        if (supplyConns[i]) {
          setTimeout(() => supplyConns[i].classList.add("show"), i * 400 + 200);
        }
      });
      supplyObserver.unobserve(supplySection);
    }
  });
}, { threshold: 0.3 });

supplyObserver.observe(supplySection);


// ===== SALES BARS ANIMATION =====
const salesSection = document.querySelector(".bc-sales-section");
const sBars = document.querySelectorAll(".s-bar");

const salesObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const chartHeight = 160; 
      sBars.forEach((bar, i) => {
        setTimeout(() => {
          const pct = parseInt(bar.getAttribute("data-h")) || 0;
          const px = Math.round((pct / 100) * chartHeight);
          bar.style.height = px + "px";
        }, i * 150);
      });
      salesObserver.unobserve(salesSection);
    }
  });
}, { threshold: 0.2 });

salesObserver.observe(salesSection);

// ===== GANTT ANIMATION =====
const projectSection = document.querySelector(".bc-project-section");
const ganttBars = document.querySelectorAll(".gantt-bar");

const ganttObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      ganttBars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.getAttribute("data-w") + "%";
        }, i * 250);
      });
      ganttObserver.unobserve(projectSection);
    }
  });
}, { threshold: 0.4 });

ganttObserver.observe(projectSection);


// Generic text switcher with fade + active btn highlight
function switchText(titleId, descId, containerSelector, titles, descs, index) {
  const title = document.getElementById(titleId);
  const desc  = document.getElementById(descId);

  // fade out
  title.style.opacity = "0";
  title.style.transform = "translateY(-8px)";
  title.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  desc.style.opacity  = "0";
  desc.style.transition = "opacity 0.3s ease";

  setTimeout(() => {
    title.innerText = titles[index];
    desc.innerText  = descs[index];

    // fade in
    title.style.opacity = "1";
    title.style.transform = "translateY(0)";
    desc.style.opacity  = "1";
  }, 250);

  // highlight active button
  setActiveBtn(containerSelector, index);
}


// --- FINANCE ---
function changeFinanceText(i) {
  switchText("financeTitle", "financeDesc", ".finance-buttons", financeTitles, financeDescs, i);
}

// --- SUPPLY ---
function changeSupplyText(i) {
  switchText("supplyTitle", "supplyDesc", ".supply-buttons", supplyTitles, supplyDescs, i);
}

// --- SALES ---
function changeSalesText(i) {
  switchText("salesTitle", "salesDesc", ".sales-buttons", salesTitles, salesDescs, i);
}

// --- PROJECT ---
function changeProjectText(i) {
  switchText("projectTitle", "projectDesc", ".project-buttons", projectTitles, projectDescs, i);
}


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
