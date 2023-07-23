// Utility functions:

const el = (sel, par) => (par || document).querySelector(sel);
const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);
const repeat = (n, cb) => [...Array(n)].forEach((_, i) => cb(i));
const rand = (min, max) => Math.random() * (max - min) + min;
var count = 0;
// Game:
const elHtml = el("html");
const elBody = el("body");
const elPointers = el("#pointers");
const elBtn = el("#btn");
const startBtn = el("#start");
const stopBtn = el("#stop");
const score = el("#score");
var totPointers = 0;

function disablekeypress() {
  document.onkeydown = function (e) {
    return false;
  };
}
function enablekeypress() {
  document.onkeydown = function (e) {
    return true;
  };
}

const startGame = () => {
  console.log("start");
  elBtn.style.display = "block";
  startBtn.style.display = "none";
  stopBtn.style.display = "block";
  document.documentElement.requestFullscreen();
  disablekeypress();
  count = 0;
};

const stopGame = () => {
  console.log(count);
  elBtn.style.display = "none";
  startBtn.style.display = "block";
  stopBtn.style.display = "none";
  score.innerHTML = 'score: '+ count;
  document.exitFullscreen();
  enablekeypress();
};

const createPointers = () => {
  totPointers += ~~rand(3, 10); // between 3 and 10 new pointers
  elPointers.innerHTML = ""; // Remove old pointers
  repeat(totPointers, (i) => {
    const elPointer = elNew("div", { className: "pointer" });
    elPointer.style.left = `${rand(0, 100)}%`;
    elPointer.style.top = `${rand(0, 100)}%`;
    elPointers.append(elPointer);
  });
};

const moveBtn = () => {
  elBtn.style.left = `${rand(5, 95)}%`;
  elBtn.style.top = `${rand(5, 95)}%`;
};

const changeBackground = () => {
  const hue = ~~rand(0, 360);
  elBody.style.background = `hsl(${hue}, 80%, 50%)`;
};

const levelUp = () => {
  count += 1;
  score.innerHTML = 'score: '+ count;
  createPointers();
  moveBtn();
  changeBackground();
};

const movePointers = (evt) => {
  const xCenter = evt.clientX / elBody.offsetWidth - 0.5;
  const yCenter = evt.clientY / elBody.offsetHeight - 0.5;
  elPointers.style.translate = `${xCenter * 100}% ${yCenter * 100}%`;
};

// Events
elBtn.addEventListener("click", levelUp);
elBody.addEventListener("pointermove", movePointers);
startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // e.keyCode === 27 used for legacy
    stopGame();
  }
});

// Init
moveBtn();
