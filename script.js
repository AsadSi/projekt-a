const box = document.getElementById("box");
if (!box) {
  throw new Error("Box element not found");
}
let STEP = 20; // pixels per key press

const stepInput = document.getElementById("step");
const stepError = document.getElementById("step-error");
if (!stepInput || !stepError) {
  throw new Error("Step input or error element not found");
}

stepInput.addEventListener("change", () => {
  // Number("") is 0, so an empty field fails the range check too
  const value = Number(stepInput.value);
  if (Number.isFinite(value) && value >= 1 && value <= 100) {
    STEP = value;
    stepError.textContent = "";
  } else {
    stepError.textContent = "Step size must be a number from 1 to 100.";
  }
});

// Start in the middle of the window
let x = (window.innerWidth - box.offsetWidth) / 2;
let y = (window.innerHeight - box.offsetHeight) / 2;

// Keep a value between min and max
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function render() {
  // The box may not leave the window
  x = clamp(x, 0, window.innerWidth - box.offsetWidth);
  y = clamp(y, 0, window.innerHeight - box.offsetHeight);
  box.style.transform = `translate(${x}px, ${y}px)`;
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    // Stacked cases fall through: all three keys run the same line
    case "ArrowUp":
    case "w":
    case "W":
      y -= STEP;
      break;
    case "ArrowDown":
    case "s":
    case "S":
      y += STEP;
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      x -= STEP;
      break;
    case "ArrowRight":
    case "d":
    case "D":
      x += STEP;
      break;
    default:
      return; // ignore all other keys
  }
  event.preventDefault(); // stop the arrow keys from scrolling the page
  render();
});

// If the window gets smaller, pull the box back inside
window.addEventListener("resize", render);

render();
