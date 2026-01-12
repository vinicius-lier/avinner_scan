const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function applyReveal(entry) {
  const delay = Number(entry.dataset.delay || 0);
  entry.style.transitionDelay = `${delay}ms`;
  entry.classList.add("is-visible");
}

if (revealItems.length) {
  if (prefersReduced) {
    revealItems.forEach((item) => applyReveal(item));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            applyReveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
}

const tiltCards = document.querySelectorAll("[data-tilt]");

function handleTilt(event, card) {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateX = ((y / rect.height) - 0.5) * -10;
  const rotateY = ((x / rect.width) - 0.5) * 10;
  card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

if (!prefersReduced && tiltCards.length) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => handleTilt(event, card));
    card.addEventListener("mouseenter", () => card.classList.add("tilt-active"));
    card.addEventListener("mouseleave", () => {
      card.classList.remove("tilt-active");
      card.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});
