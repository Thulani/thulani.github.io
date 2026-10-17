(() => {
  "use strict";

  const root = document.documentElement;

  // Theme toggle: follows the OS until the visitor picks one, then remembers it.
  const toggle = document.querySelector(".theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");
  const syncToggle = () => toggle && toggle.setAttribute("aria-pressed", String(currentTheme() === "dark"));

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncToggle();
    });
    prefersDark.addEventListener("change", syncToggle);
    syncToggle();
  }

  // Email address is assembled at runtime to keep it away from simple scrapers.
  document.querySelectorAll("[data-email-user]").forEach((link) => {
    const address = `${link.dataset.emailUser}@${link.dataset.emailDomain}`;
    link.href = `mailto:${address}`;
    const label = link.querySelector(".js-email-text");
    if (label) label.textContent = address;
  });

  // Keep "years of experience" and the copyright year current.
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-years-since]").forEach((el) => {
    el.textContent = String(year - Number(el.dataset.yearsSince));
  });
  document.querySelectorAll(".js-year").forEach((el) => { el.textContent = String(year); });

  // Print / save as PDF.
  document.querySelectorAll("[data-print]").forEach((btn) => {
    btn.addEventListener("click", () => window.print());
  });

  // Highlight the nav link for the section currently in view.
  const links = new Map(
    [...document.querySelectorAll('.site-nav a[href^="#"]')].map((a) => [a.hash.slice(1), a])
  );
  if ("IntersectionObserver" in window && links.size) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute("aria-current"));
        const active = links.get(entry.target.id);
        if (active) active.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
