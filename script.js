// Ano automático
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const navBtn = document.getElementById("navBtn");
const navMenu = document.getElementById("navMenu");

navBtn?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navBtn.setAttribute("aria-expanded", String(isOpen));
});

// Fecha menu ao clicar em link (mobile)
navMenu?.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.tagName === "A") {
    navMenu.classList.remove("open");
    navBtn.setAttribute("aria-expanded", "false");
  }
});

// Reveal ao rolar
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => io.observe(el));

// Contadores na hero
const counters = document.querySelectorAll("[data-count]");
const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const to = Number(el.getAttribute("data-count"));
      let current = 0;

      const step = Math.max(1, Math.floor(to / 60));
      const tick = () => {
        current += step;
        if (current >= to) {
          el.textContent = String(to);
          return;
        }
        el.textContent = String(current);
        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  },
  { threshold: 0.7 }
);

counters.forEach((el) => counterIO.observe(el));

// Botão "copiar email"
const copyBtn = document.getElementById("copyEmail");
const status = document.getElementById("copyStatus");
const email = "SEU_EMAIL@gmail.com";

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = "Email copiado! Agora é só colar ✨";
  } catch {
    status.textContent = "Não consegui copiar automaticamente. Copie manualmente do lado esquerdo.";
  }
});
