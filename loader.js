gsap.registerPlugin();

const fill = document.querySelector('.progress-fill');
const text = document.querySelector('.progress-text');
const loader = document.getElementById('loader');

function fakeLoadSimulation() {
  // Simulate loading progress from 0 to 100%
  gsap.to({}, {
    duration: 3, // total fake load time (seconds)
    onUpdate: function() {
      const progress = this.progress() * 100;
      fill.style.width = progress + '%';
      text.textContent = Math.round(progress) + '%';
    },
    onComplete: function() {
      // Animate loader fade-out
      gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // Redirect to main.html after loader fade-out completes
          window.location.href = "main.html";
        }
      });
    }
  });
}

// Kick it off
fakeLoadSimulation();
