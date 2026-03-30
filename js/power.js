
// ===== 2. SCROLL FADE-UP FOR ALL SECTIONS =====
const fadeUpElements = document.querySelectorAll(
  ".powerbi-intro, .apps-intro, .pva-section .apps-intro, .auto-intro, " +
  ".bi-text, .apps-text, .pva-text, .auto-text"
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-up-show");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeUpElements.forEach(el => {
  el.classList.add("fade-up-init");
  fadeObserver.observe(el);
});

// ===== 3. COUNTER ANIMATION (Power BI KPI) =====
const counters = document.querySelectorAll(".counter");
const counterSection = document.querySelector(".bi-dashboard");

if (counterSection) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          let target = +counter.getAttribute("data-target");
          let count = 0;
          let increment = Math.ceil(target / 80);
          const update = () => {
            if (count < target) {
              count += increment;
              if (count > target) count = target;
              counter.innerText = count;
              requestAnimationFrame(update);
            } else {
              // pulse once when done
              counter.style.transform = "scale(1.15)";
              counter.style.transition = "transform 0.3s ease";
              setTimeout(() => {
                counter.style.transform = "scale(1)";
              }, 300);
            }
          };
          update();
        });
        counterObserver.unobserve(counterSection);
      }
    });
  }, { threshold: 0.5 });
  counterObserver.observe(counterSection);
}

// ===== 4. CHART BARS ANIMATION (smoother + bounce) =====
const chartSection = document.querySelector(".chart-area");
const bars = document.querySelectorAll(".bar");

if (chartSection) {
  const chartObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach((bar, i) => {
          setTimeout(() => {
            bar.classList.add("animate");
          }, i * 120);
        });
        chartObserver.unobserve(chartSection);
      }
    });
  }, { threshold: 0.4 });
  chartObserver.observe(chartSection);
}

// ===== 5. POWER BI TEXT SWITCHER =====
const titlesBI = [
  "Advanced Data Visualization",
  "Enterprise Data Integration",
  "AI-Driven Analytics",
  "Secure Intelligence Sharing"
];
const descsBI = [
  "Power BI transforms raw business data into powerful interactive dashboards and reports that help organizations monitor performance and uncover insights in real time.",
  "Integrate data from multiple systems including ERP, CRM, Excel and cloud platforms into a unified analytics environment for better visibility.",
  "Leverage built-in AI capabilities such as trend analysis, forecasting and predictive insights to support smarter strategic decisions.",
  "Share dashboards securely across departments while maintaining enterprise-grade governance, role-based access and compliance controls."
];

function changeBiText(index) {
  const title = document.getElementById("biTitle");
  const desc  = document.getElementById("biDesc");
  const btns  = document.querySelectorAll(".bi-buttons button");

  title.style.opacity = "0";
  title.style.transform = "translateY(-8px)";
  desc.style.opacity = "0";

  setTimeout(() => {
    title.innerText = titlesBI[index];
    desc.innerText  = descsBI[index];
    title.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    desc.style.transition  = "opacity 0.4s ease";
    title.style.opacity = "1";
    title.style.transform = "translateY(0)";
    desc.style.opacity  = "1";
  }, 200);

  btns.forEach((btn, i) => {
    btn.style.borderColor = i === index ? "#302b63" : "#334155";
    btn.style.background  = i === index ? " #00b89317"  : "transparent";
    btn.style.fontWeight  = i === index ? "700" : "400";
  });
}

// ===== 6. POWER APPS TEXT + FORM ANIMATION =====
const titles = [
  "Advanced App Insights",
  "Enterprise Integration",
  "AI Automation",
  "Secure Collaboration"
];
const descs = [
  "Gain deeper visibility into application performance and user activity to improve operational efficiency.",
  "Integrate Power Apps with platforms like SharePoint, Dataverse, and SQL to connect enterprise data seamlessly.",
  "Enhance applications with AI-powered capabilities that automate processes and improve productivity.",
  "Enable teams to collaborate securely with role-based access and enterprise governance controls."
];

function changeText(i) {
  const title = document.getElementById("appsTitle");
  const desc  = document.getElementById("appsDesc");
  const btns  = document.querySelectorAll(".apps-buttons button");

  title.style.opacity = "0";
  desc.style.opacity  = "0";
  setTimeout(() => {
    title.innerText = titles[i];
    desc.innerText  = descs[i];
    title.style.transition = "opacity 0.4s ease";
    desc.style.transition  = "opacity 0.4s ease";
    title.style.opacity = "1";
    desc.style.opacity  = "1";
  }, 200);

  btns.forEach((btn, j) => {
    btn.style.borderColor = j === i ? "#302b63" : "#334155";
    btn.style.background  = j === i ? " #00b89317" : "transparent";
    btn.style.fontWeight  = j === i ? "700" : "400";
  });
}

// Power Apps form typing animation
const appsSection = document.querySelector("#powerapps");
let animationStarted = false;

function typeText(input, text, speed, callback) {
  let i = 0;
  input.value = "";
  function typing() {
    if (i < text.length) {
      input.value += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      if (callback) callback();
    }
  }
  typing();
}

function startAnimation() {
  if (animationStarted) return;
  animationStarted = true;

  const name      = document.getElementById("nameField");
  const dept      = document.getElementById("deptField");
  const role      = document.getElementById("roleField");
  const submit    = document.getElementById("submitBtn");
  const status    = document.getElementById("statusText");
  const dashboard = document.getElementById("dashboard");
  const table     = document.getElementById("tableData");
  const formArea  = document.querySelector(".form-area");

  typeText(name, "Sarah Johnson", 75, function () {
    typeText(dept, "Sales", 75, function () {
      typeText(role, "Manager", 75, function () {
        setTimeout(() => {
          submit.innerText = "Creating Record...";
          submit.style.opacity = "0.7";
          setTimeout(() => {
            status.innerText = " Dataverse Connected";
            status.style.animation = "statusPop 0.4s ease forwards";
            setTimeout(() => {
              formArea.style.transition = "opacity 0.5s ease";
              formArea.style.opacity    = "0";
              setTimeout(() => {
                formArea.style.display = "none";
                table.innerHTML = `
                  <tr>
                    <td>Sarah Johnson</td>
                    <td>Sales</td>
                    <td>Manager</td>
                  </tr>`;
                dashboard.style.display  = "block";
                dashboard.style.opacity  = "0";
                dashboard.style.transition = "opacity 0.5s ease";
                setTimeout(() => { dashboard.style.opacity = "1"; }, 50);
                status.innerText = " App Generated Successfully";
                submit.style.opacity = "1";
              }, 500);
            }, 1000);
          }, 1200);
        }, 800);
      });
    });
  });
}

window.addEventListener("scroll", () => {
  if (!appsSection) return;
  const rect = appsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) startAnimation();
});

// ===== 7. PVA CHATBOT ANIMATION (with better timing) =====
const pvaTitles = [
  "Intelligent AI Chatbots",
  "Automated Conversations",
  "Integrated Business Assistance",
  "Enterprise Grade Security"
];
const pvaDescs = [
  "Power Virtual Agents enables organizations to build intelligent AI-powered chatbots that automatically resolve customer queries and improve support experiences.",
  "Create automated conversational experiences that guide users, answer questions, and reduce manual customer support workload.",
  "Connect chatbots with Microsoft services and enterprise systems to perform real-time tasks and retrieve data instantly.",
  "Maintain secure, compliant chatbot deployments with enterprise-grade authentication and governance controls."
];

function changePvaText(i) {
  const title = document.getElementById("pvaTitle");
  const desc  = document.getElementById("pvaDesc");
  const btns  = document.querySelectorAll(".pva-buttons button");

  title.style.opacity = "0";
  desc.style.opacity  = "0";
  setTimeout(() => {
    title.innerText = pvaTitles[i - 1];
    desc.innerText  = pvaDescs[i - 1];
    title.style.transition = "opacity 0.4s ease";
    desc.style.transition  = "opacity 0.4s ease";
    title.style.opacity = "1";
    desc.style.opacity  = "1";
  }, 200);

  btns.forEach((btn, j) => {
    btn.style.borderColor = j === i - 1 ? "#302b63" : "#334155";
    btn.style.background  = j === i - 1 ? " #00b89317" : "transparent";
    btn.style.fontWeight  = j === i - 1 ? "700" : "400";
  });
}

const pvaSection = document.querySelector(".pva-section");
const chat       = document.querySelector(".chat-window");
const userMsg    = document.querySelector(".msg.user");
const botMsgs    = document.querySelectorAll(".msg.bot");
const typingDots = document.querySelector(".typing");

if (pvaSection) {
  const pvaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        chat.classList.add("show");

        setTimeout(() => { userMsg.classList.add("show"); }, 600);
        setTimeout(() => { typingDots.classList.add("show"); }, 1300);
        setTimeout(() => {
          typingDots.classList.remove("show");
          botMsgs[0].classList.add("show");
        }, 2500);
        setTimeout(() => { botMsgs[1].classList.add("show"); }, 3400);
        setTimeout(() => { botMsgs[2].classList.add("show"); }, 4200);

        pvaObserver.unobserve(pvaSection);
      }
    });
  }, { threshold: 0.45 });
  pvaObserver.observe(pvaSection);
}

// ===== 8. POWER AUTOMATE ANIMATIONS (slide + glow) =====
const autoTitles = [
  "Automate Business Workflows",
  "Intelligent Email Processing",
  "Seamless System Integration",
  "Automated Team Notifications"
];
const autoDescs = [
  "Power Automate processes incoming emails and triggers automated workflows.",
  "Extract business information from emails and store it in connected systems.",
  "Connect services like Excel, SharePoint, and CRM platforms seamlessly.",
  "Automatically notify teams when workflows complete."
];

function changeAutoText(index) {
  const title = document.getElementById("autoTitle");
  const desc  = document.getElementById("autoDesc");
  const btns  = document.querySelectorAll(".auto-buttons button");

  title.style.opacity = "0";
  desc.style.opacity  = "0";
  setTimeout(() => {
    title.innerText = autoTitles[index];
    desc.innerText  = autoDescs[index];
    title.style.transition = "opacity 0.4s ease";
    desc.style.transition  = "opacity 0.4s ease";
    title.style.opacity = "1";
    desc.style.opacity  = "1";
  }, 200);

  btns.forEach((btn, j) => {
    btn.style.borderColor = j === index ? "#302b63" : "#334155";
    btn.style.background  = j === index ? " #00b89317" : "transparent";
    btn.style.fontWeight  = j === index ? "700" : "400";
  });
}

const autoSection  = document.querySelector(".powerauto-section");
const emailWindow  = document.querySelector(".email-window");
const excelWindow  = document.querySelector(".excel-window");
const fillRow      = document.querySelector(".fill");
const teamsPopup   = document.querySelector(".teams-popup");

if (autoSection) {
  const autoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          emailWindow.classList.add("show");
          emailWindow.style.boxShadow = "0 0 30px rgba(79,70,229,0.35)";
        }, 400);
        setTimeout(() => {
          excelWindow.classList.add("show");
          excelWindow.style.boxShadow = "0 0 30px rgba(147,51,234,0.35)";
        }, 1500);
        setTimeout(() => { fillRow.classList.add("show"); }, 2300);
        setTimeout(() => {
          teamsPopup.classList.add("show");
          teamsPopup.style.animation = "popup 0.6s ease forwards, glowPulse 1.5s ease 0.6s 2";
        }, 3200);
        autoObserver.unobserve(autoSection);
      }
    });
  }, { threshold: 0.4 });
  autoObserver.observe(autoSection);
}

// ===== 9. BUTTON HOVER ACTIVE HIGHLIGHT =====
document.querySelectorAll(
  ".bi-buttons button, .apps-buttons button, .pva-buttons button, .auto-buttons button"
).forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.paddingLeft = "18px";
    btn.style.transition  = "all 0.25s ease";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.paddingLeft = "12px";
  });
});


// Generic function — pass button container selector + index
function setActiveBtn(containerSelector, activeIndex) {
  const btns = document.querySelectorAll(containerSelector + " button");
  btns.forEach((btn, i) => {
    if (i === activeIndex) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

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
