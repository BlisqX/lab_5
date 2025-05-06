document.getElementById("colorButton").addEventListener("click", function () {
    const text = document.getElementById("colorText");
    const colors = ["red", "green", "blue", "orange", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    text.style.color = randomColor;
});