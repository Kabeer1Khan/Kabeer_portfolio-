/* =========================================================
   NAVBAR — scroll par style change
   ========================================================= */
const navBar = document.querySelector(".nav_bar");

window.addEventListener("scroll", () => {
  if (!navBar) return;
  navBar.classList.toggle("scrolled", window.scrollY > 40);
});

/* =========================================================
   GENERIC SCROLL REVEAL
   ========================================================= */
const revealTargets = document.querySelectorAll(
  [
    ".heading1",
    ".heading2",
    ".text_h",
    ".project_card_1",
    ".skills_h",
    ".about_skills",
    ".privent",
    ".about_picture",
    ".about_container",
    ".about_years",
    ".about_projects",
    ".claint_set",
    ".contact_title",
    ".contact_form",
    ".email",
    ".phone_number",
    ".location",
    ".follow_meLinks",
    ".saperate_line2",
    ".saperate_line3",
    ".saperate_line4",
    ".footer_brand",
    ".footer_nav",
    ".footer_mission",
    ".footer_divider",
    ".footer_bottom",
  ].join(", ")
);

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);

revealTargets.forEach((el) => revealObserver.observe(el));

/* Safety: jo element load par hi screen me hai, use turant reveal kar do */
window.addEventListener("load", () => {
  revealTargets.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("reveal");
    }
  });
});

/* =========================================================
   SKILL BARS
   Purana tareeqa (JS se px width set karna) resize par toot
   jata tha. Ab JS sirf percentage padh kar CSS variable set
   karta hai, fill animation CSS (scaleX) karti hai.
   ========================================================= */
document.querySelectorAll(".scoreSkillBox > div").forEach((row) => {
  const bar = row.querySelector('[class*="score_line"]');
  const label = row.querySelector('[class*="skill_percent"]');
  if (!bar) return;

  const pct = label ? parseFloat(label.textContent) : NaN;
  if (!Number.isNaN(pct)) {
    bar.style.setProperty("--pct", Math.min(Math.max(pct, 0), 100) + "%");
  }

  bar.setAttribute("role", "progressbar");
  if (!Number.isNaN(pct)) bar.setAttribute("aria-valuenow", pct);
  bar.setAttribute("aria-valuemin", "0");
  bar.setAttribute("aria-valuemax", "100");
});

const skillBars = document.querySelectorAll('[class*="score_line"]');

const skillObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("filled");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
);

skillBars.forEach((bar, i) => {
  bar.style.transitionDelay = i * 0.1 + "s";
  skillObserver.observe(bar);
});

/* =========================================================
   CONTACT FORM
   ========================================================= */
const contactForm = document.querySelector(".contact_form");
const subjectRow = document.querySelector(".form_row_select");
const subjectSelect = document.querySelector(".form_select");

if (subjectSelect && subjectRow) {
  subjectSelect.addEventListener("focus", () => subjectRow.classList.add("open"));
  subjectSelect.addEventListener("blur", () => subjectRow.classList.remove("open"));
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector(".send_message_btn");
    const btnText = btn.querySelector("span");
    const btnIcon = btn.querySelector("i");
    const originalText = btnText.textContent;

    const selectedOption = subjectSelect.options[subjectSelect.selectedIndex];

    const templateParams = {
      name: contactForm.user_name.value,
      email: contactForm.user_email.value,
      title: selectedOption ? selectedOption.text : "",
      message: contactForm.message.value,
      time: new Date().toLocaleString(),
    };

    btnText.textContent = "SENDING...";

    emailjs
      .send("service_gcwescv", "template_pdxq2rh", templateParams)
      .then(() => {
        btnText.textContent = "MESSAGE SENT";
        btnIcon.classList.remove("fa-arrow-right");
        btnIcon.classList.add("fa-check");
        btn.classList.add("sent");

        setTimeout(() => {
          contactForm.reset();
          btnText.textContent = originalText;
          btnIcon.classList.remove("fa-check");
          btnIcon.classList.add("fa-arrow-right");
          btn.classList.remove("sent");
        }, 2500);
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        btnText.textContent = "FAILED, TRY AGAIN";
        setTimeout(() => {
          btnText.textContent = originalText;
        }, 2500);
      });
  });
}

/* =========================================================
   "LET'S BUILD" button -> contact section par le jaye
   ========================================================= */
const buildBtn = document.querySelector(".let-build-btn");
const contactSection = document.querySelector("#contact, .contact_section");

if (buildBtn && contactSection) {
  buildBtn.addEventListener("click", () => {
    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}