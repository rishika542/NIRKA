window.addEventListener("load", () => {
  const heroCards = document.querySelectorAll(".crm-card");
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
      btn.style.background = " #0e52b31a";
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

// ===== SALES TEXT =====
const crmSalesTitles = [
  "Visual Sales Pipeline",
  "Lead Scoring & Prioritization",
  "Activity & Follow-up Tracking",
  "Sales Forecasting"
];
const crmSalesDescs = [
  "Dynamics Sales(CRM) gives your sales team a drag-and-drop pipeline to track every deal from first contact to closed-won — with AI scoring to prioritize the hottest opportunities.",
  "AI-powered lead scoring ranks every prospect by likelihood to convert, so your team always focuses energy on deals that actually close.",
  "Log calls, emails, meetings, and tasks against every contact and deal — with smart reminders so nothing ever falls through the cracks.",
  "Get accurate revenue forecasts based on pipeline data, historical win rates, and AI predictions — and share them with leadership in one click."
];

function changeCrmSalesText(i) {
  switchText(
    "crmSalesTitle",
    "crmSalesDesc",
    ".crm-sales-text .crm-buttons",
    crmSalesTitles,
    crmSalesDescs,
    i
  );
}
// ===== MARKETING TEXT =====
const crmMktTitles = [
  "Targeted Campaign Automation",
  "Email & Social Marketing",
  "Lead Nurture Journeys",
  "Campaign Analytics & ROI"
];
const crmMktDescs = [
  "Build multi-channel campaigns with drag-and-drop journey builders, segment your audience intelligently, and let AI optimize send times and messaging for maximum engagement.",
  "Design beautiful emails and schedule social posts across LinkedIn, Facebook, and more — all managed from a single marketing dashboard.",
  "Create automated nurture journeys that guide leads from awareness to purchase with personalized content at every touchpoint.",
  "Track campaign ROI with real-time dashboards showing cost per lead, conversion rates, and revenue attributed to every campaign."
];
function changeCrmMktText(i) {
  switchText(
    "crmMktTitle",
    "crmMktDesc",
    ".crm-marketing-text .crm-buttons",
    crmMktTitles,
    crmMktDescs,
    i
  );
}

// ===== SERVICE TEXT =====
const crmSvcTitles = [
  "AI-Powered Case Management",
  "Omnichannel Support",
  "SLA & Escalation Management",
  "Customer Satisfaction Tracking"
];
const crmSvcDescs = [
  "Dynamics 365 Customer Service uses AI to automatically route cases to the right agent, suggest solutions from a knowledge base, and track SLA compliance — so every customer gets fast, consistent support.",
  "Handle customer queries from email, phone, chat, WhatsApp, and social media in one unified inbox — with full context always visible to agents.",
  "Set SLA targets per customer tier, auto-escalate breached cases, and get real-time alerts before deadlines are missed.",
  "Automatically send CSAT surveys after every resolved case and track satisfaction trends over time to continuously improve service quality."
];
function changeCrmSvcText(i) {
  switchText(
    "crmSvcTitle",
    "crmSvcDesc",
    ".crm-service-text .crm-buttons",
    crmSvcTitles,
    crmSvcDescs,
    i
  );
}
// ===== AI INSIGHTS TEXT =====
const crmAiTitles = [
  "Predictive Customer Analytics",
  "Churn Risk Detection",
  "Upsell & Cross-Sell Signals",
  "Sentiment Analysis"
];
const crmAiDescs = [
  "Dynamics 365 AI analyses customer behaviour, purchase history, and interaction data to predict which customers are likely to churn — and recommends the best next action to retain them.",
  "Identify at-risk customers before they leave using AI churn models trained on your own data — and trigger proactive outreach automatically.",
  "Spot customers who are ready to upgrade or buy complementary products based on usage patterns and purchase history.",
  "Analyse customer emails, support tickets, and survey responses to understand overall sentiment trends and act before issues escalate."
];

function changeCrmAiText(i) {
  switchText(
    "crmAiTitle",
    "crmAiDesc",
    ".crm-insights-text .crm-buttons",
    crmAiTitles,
    crmAiDescs,
    i
  );
}

const salesSection = document.querySelector(".crm-sales-section");
const funnelStages = document.querySelectorAll(".funnel-stage");
const funnelBars   = document.querySelectorAll(".funnel-bar");
const funnelArrows = document.querySelectorAll(".funnel-arrow");

const salesObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      funnelStages.forEach((stage, i) => {
        const delay = parseInt(stage.getAttribute("data-delay")) || 0;

        // 1. Fade in the stage row
        setTimeout(() => {
          stage.classList.add("show");
        }, delay);

        // 2. Animate the bar width AFTER stage appears
        setTimeout(() => {
          const bar = stage.querySelector(".funnel-bar");
          const targetW = bar.getAttribute("data-w");
          bar.style.width = targetW + "%";
        }, delay + 200);

        // 3. Show the arrow below (except last)
        if (funnelArrows[i]) {
          setTimeout(() => {
            funnelArrows[i].classList.add("show");
          }, delay + 400);
        }
      });

      salesObserver.unobserve(salesSection);
    }
  });
}, { threshold: 0.3 });

salesObserver.observe(salesSection);


const mktSection     = document.querySelector(".crm-marketing-section");
const campaignScreen = document.querySelector(".campaign-screen");
const csRows         = document.querySelectorAll(".cs-row");

const mktObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // 1. Screen slides in
      setTimeout(() => {
        campaignScreen.classList.add("show");
      }, 100);

      // 2. Table rows slide in one by one
      csRows.forEach(row => {
        const delay = parseInt(row.getAttribute("data-delay")) || 0;
        setTimeout(() => {
          row.classList.add("show");
        }, 400 + delay);
      });

      mktObserver.unobserve(mktSection);
    }
  });
}, { threshold: 0.25 });

mktObserver.observe(mktSection);


// ===== TICKET ITEMS ANIMATION =====
const svcSection = document.querySelector(".crm-service-section");
const ticketItems = document.querySelectorAll(".ticket-item");

const svcObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      ticketItems.forEach(item => {
        const delay = parseInt(item.getAttribute("data-delay")) || 0;
        setTimeout(() => item.classList.add("show"), delay);
      });
      svcObserver.unobserve(svcSection);
    }
  });
}, { threshold: 0.3 });

svcObserver.observe(svcSection);

// ===== AI SCORE CARDS ANIMATION =====
const aiSection = document.querySelector(".crm-insights-section");
const aiCards = document.querySelectorAll(".ai-score-card");

const aiObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aiCards.forEach(card => {
        const delay = parseInt(card.getAttribute("data-delay")) || 0;
        setTimeout(() => card.classList.add("show"), delay);
      });
      aiObserver.unobserve(aiSection);
    }
  });
}, { threshold: 0.3 });

aiObserver.observe(aiSection);


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

// --- CRM SALES ---
function changeCrmSalesText(i) {
  switchText("crmSalesTitle", "crmSalesDesc", ".crm-sales-text .crm-buttons", crmSalesTitles, crmSalesDescs, i);
}

// --- CRM MARKETING ---
function changeCrmMktText(i) {
  switchText("crmMktTitle", "crmMktDesc", ".crm-marketing-text .crm-buttons", crmMktTitles, crmMktDescs, i);
}

// --- CRM SERVICE ---
function changeCrmSvcText(i) {
  switchText("crmSvcTitle", "crmSvcDesc", ".crm-service-text .crm-buttons", crmSvcTitles, crmSvcDescs, i);
}

// --- CRM AI ---
function changeCrmAiText(i) {
  switchText("crmAiTitle", "crmAiDesc", ".crm-insights-text .crm-buttons", crmAiTitles, crmAiDescs, i);
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
