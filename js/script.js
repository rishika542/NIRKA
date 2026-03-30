// HERO BACKGROUND SLIDER
const hero = document.querySelector(".hero");
const images = ["images/11.webp", "images/12.webp"];
let index = 0;

function changeHeroBg() {
  hero.classList.remove("fade");
  hero.style.backgroundImage = `url('${images[index]}')`;
  hero.classList.add("fade");
  index = (index + 1) % images.length;
}

changeHeroBg();
setInterval(changeHeroBg, 5000);

function openServicesDropdown(e) {
  e.preventDefault();
  e.stopPropagation(); // important!
  
  const dropdown = document.querySelector('.nav-dropdown');
  const menu = document.querySelector('.dropdown-menu');
  
  if (window.innerWidth > 768) {
    dropdown.classList.add('open');
    document.querySelector('.navbar').scrollIntoView({ behavior: 'smooth' });
  } else {
    toggleMenu();
    const accTrigger = document.querySelector('.mobile-acc-trigger');
    const accBody = document.querySelector('.mobile-acc-body');
    accBody.style.display = 'block';
    accTrigger.classList.add('active');
  }
}

//dropdownn
document.addEventListener('click', function(e) {
  const dropdown = document.querySelector('.nav-dropdown');
  
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
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

// CONTACT FORM SUBMIT
document.addEventListener('DOMContentLoaded', function() {
  const homeForm = document.getElementById('homeContactForm');
  const homeFormMsg = document.getElementById('homeFormMsg');

  if(homeForm){
    homeForm.addEventListener('submit', function(e){
      e.preventDefault();
      homeFormMsg.style.display = 'none';

      const formData = new FormData(homeForm);

      fetch('endmail.php', {  
          method: 'POST',   
          body: formData
      })
      .then(res => res.text())
      .then(data => {
          data = data.trim();
          homeFormMsg.style.display = 'block';

          if(data === 'success'){
              homeFormMsg.style.color = 'green';
              homeFormMsg.textContent = "Message sent successfully!";
              homeForm.reset();
          } else {
              homeFormMsg.style.color = 'red';
              homeFormMsg.textContent = "Failed to send message!";
              console.log("Error details:", data);
          }
      })
      .catch(err => {
          homeFormMsg.style.display = 'block';
          homeFormMsg.style.color = 'red';
          homeFormMsg.textContent = "Error sending message!";
          console.error(err);
      });
    });
  }
});

// MENU TOGGLE
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if(menuToggle){
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

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

document.addEventListener("DOMContentLoaded", () => {
  const aboutBox = document.querySelector(".about-box");

  function revealAboutBox() {
    const windowHeight = window.innerHeight;
    const elementTop = aboutBox.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      aboutBox.classList.add("show");
      // ek baar hi add hoga, phir remove nahi hoga
      window.removeEventListener("scroll", revealAboutBox);
    }
  }

  window.addEventListener("scroll", revealAboutBox);
  window.addEventListener("load", revealAboutBox);
});
const counters = document.querySelectorAll(".counter");
const speed = 200; // lower = faster

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute("data-target");
      let count = 0;

      const updateCount = () => {
        const increment = target / speed;

        if (count < target) {
          count += increment;
          // Add "+" while counting
          counter.innerText = Math.ceil(count) + "+";
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target + "+";
        }
      };

      updateCount();
      observer.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  observer.observe(counter);
});
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right");

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

document.addEventListener("DOMContentLoaded", function () {

  const elements = document.querySelectorAll(".reveal-left, .reveal-right");

  function checkPosition() {
    const windowHeight = window.innerHeight;

    elements.forEach(function(el) {
      const position = el.getBoundingClientRect().top;

      if (position < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", checkPosition);
  checkPosition(); 

});
const words = ["Strategy", "Technology", "Execution", "Partnership"]
let i = 0;
const wordSpan = document.getElementById("changing-word");

setInterval(() => {

  // move slightly up + fade
  wordSpan.style.opacity = "0";
  wordSpan.style.transform = "translateY(-8px)";

  setTimeout(() => {
    i = (i + 1) % words.length;
    wordSpan.textContent = words[i];

    // reset position below
    wordSpan.style.transform = "translateY(8px)";
    
    setTimeout(() => {
      // bring back smoothly
      wordSpan.style.opacity = "1";
      wordSpan.style.transform = "translateY(0)";
    }, 50);

  }, 300);

}, 2200);

const techData = [
  {
    img: "images/microsoft (2).png",
    title: "Dynamics 365",
    desc: "Enterprise resource planning and CRM solutions to streamline business processes."
  },
  {
    img: "images/powerapp.png",
    title: "Power Platform",
    desc: "Low-code tools to build apps, automate workflows, and analyze data."
  },
  {
    img: "images/cloud.png",
    title: "Cloud & Azure",
    desc: "Secure, scalable cloud infrastructure for modern business needs."
  },
  {
    img: "images/a-cinematic-3d-logo-centered-on-a-pure-infinite-wh-removebg-preview.png",
    title: "Web & Mobile",
    desc: "Custom web and mobile solutions to engage customers and drive growth."
  }
];

let techIndex = 0;
const logo = document.querySelector(".tech-logo img");
const title = document.querySelector(".tech-info h3");
const desc = document.querySelector(".tech-info p");
const dots = document.querySelectorAll(".tech-dots span");

function updateTech(index) {
  logo.src = techData[index].img;
  logo.alt = techData[index].title;
  title.textContent = techData[index].title;
  desc.textContent = techData[index].desc;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

  techIndex = index;
}

// Auto change
setInterval(() => {
  techIndex = (techIndex + 1) % techData.length;
  updateTech(techIndex);
}, 5000);

// Manual dot click
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const idx = parseInt(dot.getAttribute("data-index"));
    updateTech(idx);
  });
});
// ===== STICKY HEADER  =====
const headerWrapper = document.querySelector('.header-wrapper');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    headerWrapper.classList.add('scrolled');
  } else {
    headerWrapper.classList.remove('scrolled');
  }
});






