const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const moves = ["R","L","U","D","F","B"];
const modifiers = ["","'","2"];
const scrambleOutput = document.getElementById("scrambleOutput");
document.getElementById("generateScramble").addEventListener("click", () => {
  const scramble = [];
  let previous = "";
  while (scramble.length < 20) {
    const face = moves[Math.floor(Math.random() * moves.length)];
    if (face === previous) continue;
    scramble.push(face + modifiers[Math.floor(Math.random() * modifiers.length)]);
    previous = face;
  }
  scrambleOutput.textContent = scramble.join(" ");
});

const timerDisplay = document.getElementById("timerDisplay");
const resetTimer = document.getElementById("resetTimer");
let running = false;
let startTime = 0;
let elapsed = 0;
let frame = null;
function renderTimer() {
  const time = running ? elapsed + (performance.now() - startTime) : elapsed;
  timerDisplay.textContent = (time / 1000).toFixed(2);
  if (running) frame = requestAnimationFrame(renderTimer);
}
function toggleTimer() {
  if (!running) {
    running = true;
    startTime = performance.now();
    timerDisplay.classList.add("running");
    renderTimer();
  } else {
    elapsed += performance.now() - startTime;
    running = false;
    cancelAnimationFrame(frame);
    timerDisplay.classList.remove("running");
    renderTimer();
  }
}
timerDisplay.addEventListener("click", toggleTimer);
document.addEventListener("keydown", event => {
  if (event.code !== "Space" || event.repeat || /INPUT|TEXTAREA|BUTTON/.test(document.activeElement.tagName)) return;
  event.preventDefault();
  toggleTimer();
});
resetTimer.addEventListener("click", () => {
  running = false;
  elapsed = 0;
  cancelAnimationFrame(frame);
  timerDisplay.classList.remove("running");
  renderTimer();
});
