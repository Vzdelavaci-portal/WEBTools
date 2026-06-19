const animatedObject = document.getElementById("animatedObject");
const cssOutput = document.getElementById("cssOutput");
const message = document.getElementById("message");

const animationType = document.getElementById("animationType");
const objectType = document.getElementById("objectType");
const objectColor = document.getElementById("objectColor");
const duration = document.getElementById("duration");
const delay = document.getElementById("delay");
const iteration = document.getElementById("iteration");
const easing = document.getElementById("easing");
const direction = document.getElementById("direction");

const durationValue = document.getElementById("durationValue");
const delayValue = document.getElementById("delayValue");

const replayBtn = document.getElementById("replayBtn");
const randomBtn = document.getElementById("randomBtn");
const copyCssBtn = document.getElementById("copyCssBtn");

const keyframes = {
  fadeIn: `@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}`,

  slideUp: `@keyframes slideUp {
  from {
    transform: translateY(120px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}`,

  slideDown: `@keyframes slideDown {
  from {
    transform: translateY(-120px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}`,

  slideLeft: `@keyframes slideLeft {
  from {
    transform: translateX(120px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}`,

  slideRight: `@keyframes slideRight {
  from {
    transform: translateX(-120px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}`,

  scaleIn: `@keyframes scaleIn {
  from {
    transform: scale(0.3);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}`,

  rotate: `@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}`,

  bounce: `@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-80px);
  }
}`,

  pulse: `@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.18);
  }
}`,

  shake: `@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-18px);
  }

  40% {
    transform: translateX(18px);
  }

  60% {
    transform: translateX(-12px);
  }

  80% {
    transform: translateX(12px);
  }
}`,

  flip: `@keyframes flip {
  from {
    transform: rotateY(0);
  }

  to {
    transform: rotateY(360deg);
  }
}`,

  swing: `@keyframes swing {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(12deg);
  }

  50% {
    transform: rotate(-10deg);
  }

  75% {
    transform: rotate(6deg);
  }

  100% {
    transform: rotate(0deg);
  }
}`
};

function updateLabels() {
  durationValue.textContent = `${Number(duration.value).toFixed(2)}s`;
  delayValue.textContent = `${Number(delay.value).toFixed(2)}s`;
}

function applyObjectType() {
  animatedObject.className = `animated-object ${objectType.value}`;

  if (objectType.value === "button") {
    animatedObject.innerHTML = "<span>Button</span>";
  } else if (objectType.value === "card") {
    animatedObject.innerHTML = "<span>Card</span>";
  } else if (objectType.value === "text") {
    animatedObject.innerHTML = "<span>Hello!</span>";
  } else {
    animatedObject.innerHTML = "<span>Animate</span>";
  }
}

function applyColor() {
  animatedObject.style.background = objectColor.value;
  animatedObject.style.boxShadow = `0 24px 70px ${objectColor.value}55`;

  if (objectType.value === "text") {
    animatedObject.style.color = objectColor.value;
  } else {
    animatedObject.style.color = "#020617";
  }
}

function getAnimationCSS() {
  return `.animated-object {
  animation-name: ${animationType.value};
  animation-duration: ${duration.value}s;
  animation-delay: ${delay.value}s;
  animation-timing-function: ${easing.value};
  animation-iteration-count: ${iteration.value};
  animation-direction: ${direction.value};
  animation-fill-mode: both;
}

${keyframes[animationType.value]}`;
}

function updateAnimation() {
  applyObjectType();
  applyColor();

  animatedObject.style.animation = "none";

  requestAnimationFrame(() => {
    animatedObject.style.animation = `
      ${animationType.value}
      ${duration.value}s
      ${easing.value}
      ${delay.value}s
      ${iteration.value}
      ${direction.value}
      both
    `;
  });

  cssOutput.textContent = getAnimationCSS();

  updateLabels();

  message.textContent = "";
}

function replayAnimation() {
  animatedObject.style.animation = "none";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      updateAnimation();
    });
  });
}

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function randomAnimation() {
  const animationTypes = Object.keys(keyframes);
  const objectTypes = ["box", "circle", "button", "card", "text"];
  const easings = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"];
  const directions = ["normal", "reverse", "alternate", "alternate-reverse"];
  const iterations = ["1", "2", "3", "5", "infinite"];

  animationType.value =
    animationTypes[Math.floor(Math.random() * animationTypes.length)];

  objectType.value =
    objectTypes[Math.floor(Math.random() * objectTypes.length)];

  objectColor.value = randomColor();

  duration.value = (Math.random() * 2.5 + 0.5).toFixed(1);
  delay.value = "0";

  easing.value =
    easings[Math.floor(Math.random() * easings.length)];

  direction.value =
    directions[Math.floor(Math.random() * directions.length)];

  iteration.value =
    iterations[Math.floor(Math.random() * iterations.length)];

  updateAnimation();
}

async function copyCSS() {
  try {
    await navigator.clipboard.writeText(cssOutput.textContent);
    message.textContent = "CSS copied to clipboard!";
  } catch {
    message.textContent = "Copy failed.";
  }
}

[
  animationType,
  objectType,
  objectColor,
  duration,
  delay,
  iteration,
  easing,
  direction
].forEach(input => {
  input.addEventListener("input", updateAnimation);
});

replayBtn.addEventListener("click", replayAnimation);
randomBtn.addEventListener("click", randomAnimation);
copyCssBtn.addEventListener("click", copyCSS);

updateAnimation();