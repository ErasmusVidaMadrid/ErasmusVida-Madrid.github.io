const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const checklistInputs = document.querySelectorAll("[data-check-item]");

checklistInputs.forEach((input) => {
  const key = `erasmusvida:${input.id}`;
  input.checked = localStorage.getItem(key) === "true";

  input.addEventListener("change", () => {
    localStorage.setItem(key, String(input.checked));
  });
});

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("nome") || "";
    const email = formData.get("email") || "";
    const topic = formData.get("argomento") || "";
    const message = formData.get("messaggio") || "";
    const body = [
      `Nome: ${name}`,
      `Email: ${email}`,
      `Argomento: ${topic}`,
      "",
      String(message)
    ].join("\n");

    window.location.href = `mailto:ciao@erasmusvida-madrid.it?subject=${encodeURIComponent("Domanda ErasmusVida Madrid")}&body=${encodeURIComponent(body)}`;

    const status = contactForm.querySelector("[data-form-status]");
    if (status) {
      status.textContent = "Si e' aperta la tua app email con il messaggio gia' composto.";
    }
  });
}
