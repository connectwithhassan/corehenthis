gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

const frameCount = 360;
const currentFrame = index => `sequence/sec-${index}.webp`;

const images = [];
let frame = { index: 0 };
let target = { index: 0 }; // 👈 actual scroll target

// Preload
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

images[0].onload = function () {
  canvas.width = images[0].width;
  canvas.height = images[0].height;
  render();
};

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[Math.round(frame.index)], 0, 0);
}

// ScrollTrigger updates "target.index"
gsap.to(target, {
  index: frameCount - 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "10000",
    scrub: true,
    pin: true
  },
  onUpdate: () => {
    // instead of instantly setting frame.index,
    // animate it towards the target with 0.5s lag
    gsap.to(frame, {
      index: target.index,
      duration: 1.5,   // 👈 glide duration after scroll
      overwrite: true,
      onUpdate: render
    });
  }
});
