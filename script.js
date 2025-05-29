// 1. Save browser info to localStorage
const browserInfo = {
  platform: navigator.platform,
  userAgent: navigator.userAgent,
  language: navigator.language,
  appVersion: navigator.appVersion
};
localStorage.setItem("browserInfo", JSON.stringify(browserInfo));

// 2. Display browser info in footer
const footer = document.getElementById("footer-info");
const info = JSON.parse(localStorage.getItem("browserInfo"));
if (info) {
  footer.innerHTML = `OS: ${info.platform}, Browser: ${info.userAgent}, Language: ${info.language}`;
}

// 3. Fetch and show comments
fetch("https://jsonplaceholder.typicode.com/posts/17/comments")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("comments");
    data.forEach(comment => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${comment.name}</strong><p>${comment.body}</p>`;
      container.appendChild(div);
    });
  });

// 4. Show feedback modal after 1 min
setTimeout(() => {
  openFeedback();
}, 60000);

function openFeedback() {
  document.getElementById("feedbackModal").style.display = "block";
}

function closeFeedback() {
  document.getElementById("feedbackModal").style.display = "none";
}

// 5. Toggle theme manually
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// 6. Auto theme by time
(function setAutoTheme() {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 21) {
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.add("dark-mode");
  }
})();

// 7. Phone field validation
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function () {
  if (!this.value.startsWith("+380")) this.value = "+380";
  const numbersOnly = this.value.replace(/\D/g, "").slice(3);
  this.value = "+380" + numbersOnly.slice(0, 9);
  if (this.value.length <= 4) this.value = "+380";
});
phoneInput.addEventListener("keydown", function (e) {
  const cursorPos = this.selectionStart;
  if (this.value.length >= 13 && !["ArrowLeft", "ArrowRight", "Tab", "Backspace"].includes(e.key)) {
    e.preventDefault();
  }
  if (cursorPos < 4 && !["ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
    e.preventDefault();
    this.setSelectionRange(this.value.length, this.value.length);
  }
});
phoneInput.addEventListener("focus", function () {
  if (this.selectionStart < 4) {
    this.setSelectionRange(this.value.length, this.value.length);
  }
});