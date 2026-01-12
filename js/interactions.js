// Interaction helpers for the landing page.
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupWhatsApp() {
  const buttons = document.querySelectorAll("[data-whatsapp]");
  const defaultPhone = "5532999989987";

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const phone = button.dataset.phone || defaultPhone;
      const message = button.dataset.message || "Ola! Gostaria de informacoes.";
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

function setupReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  const toggleHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  toggleHeader();
  window.addEventListener("scroll", toggleHeader, { passive: true });
}

function setupTracking() {
  const trackables = document.querySelectorAll("[data-track]");
  if (!trackables.length) {
    return;
  }

  trackables.forEach((item) => {
    item.addEventListener("click", () => {
      const action = item.dataset.track || "click";
      const unit = item.dataset.unit || "unknown";
      console.info(`[tracking] ${action} - ${unit}`);
    });
  });
}

function setupMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav a");
  if (!header || !toggle) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  const openMenu = () => {
    header.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
  };

  toggle.addEventListener("click", () => {
    if (header.classList.contains("is-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });
}
