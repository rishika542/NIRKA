document.addEventListener("DOMContentLoaded", function () {
  console.log("Popup JS loaded");

  const popup = document.getElementById("demoFormPopup");
  if (!popup) {
    console.log("Popup not found");
    return;
  }

  const closeBtn = popup.querySelector(".close-btn");
  const demoForm = popup.querySelector("#demoForm");
  const demoFormMsg = popup.querySelector("#demoFormMsg");

  const POPUP_TIME = 90000; 
  const startTimeKey = "siteStartTime";
  const shownKey = "demoPopupShown";

  // 
  if (sessionStorage.getItem(shownKey)) return;

  // 
  if (!sessionStorage.getItem(startTimeKey)) {
    sessionStorage.setItem(startTimeKey, Date.now());
  }

  function checkTime() {
    const startTime = parseInt(sessionStorage.getItem(startTimeKey));
    const now = Date.now();

    if (now - startTime >= POPUP_TIME) {
      popup.style.display = "flex";
      sessionStorage.setItem(shownKey, "true");
    }
  }

  // check in every 1 sec
  const interval = setInterval(() => {
    if (sessionStorage.getItem(shownKey)) {
      clearInterval(interval);
    } else {
      checkTime();
    }
  }, 1000);

  // close popup
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // form submit
  demoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(demoForm);

    fetch("/php/sendDemoMail.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(data => {
        if (data.trim() === "success") {
          demoFormMsg.style.color = "green";
          demoFormMsg.textContent = "Thanks! We will contact you soon.";
          demoForm.reset();
        } else {
          demoFormMsg.style.color = "red";
          demoFormMsg.textContent = "Oops! Something went wrong.";
        }
      })
      .catch(() => {
        demoFormMsg.style.color = "red";
        demoFormMsg.textContent = "Error sending form!";
      });
  });
});
