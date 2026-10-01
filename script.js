const box = document.getElementById("box");
const STEP = 20; // pixels per key press

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
    case "ArrowUp":    y -= STEP; break;
    case "ArrowDown":  y += STEP; break;
    case "ArrowLeft":  x -= STEP; break;
    case "ArrowRight": x += STEP; break;
    default: return; // ignore all other keys
  }
  event.preventDefault(); // stop the arrow keys from scrolling the page
  render();
});

// If the window gets smaller, pull the box back inside
window.addEventListener("resize", render);

render();
