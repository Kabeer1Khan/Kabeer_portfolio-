window.addEventListener("scroll", ()=>{
    const navBar = document.querySelector(".nav_bar");
    if(window.scrollY > 40){
        navBar.classList.add("scrolled");
    } else {
        navBar.classList.remove("scrolled");
    }
});


const headings = document.querySelectorAll('.heading1, .heading2, .text_h');

const observerOption = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry =>{
        if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
        }
    });
}, observerOption);

headings.forEach(el => observer.observe(el));

// ===================== SCROLL REVEAL — PROJECTS & SKILLS =====================
const revealTargets = document.querySelectorAll(
  '.project_card_1, .skills_h, .about_skills, .privent, .contact_form'
);

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

revealTargets.forEach(el => revealObserver.observe(el));


// ===================== SKILL BARS — LOADING STYLE FILL =====================
const scoreLines = document.querySelectorAll(
  '.score_line1, .score_line2, .score_line3, .score_line4'
);

// pehle unki asli (final) width save karo, phir 0 kar do
scoreLines.forEach((bar, index) => {
  const finalWidth = getComputedStyle(bar).width;
  bar.dataset.finalWidth = finalWidth;
  bar.style.width = "0px";
  bar.style.transition = `width 1.3s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`;
});

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.finalWidth;
      observer.unobserve(bar);
    }
  });
}, { threshold: 0, rootMargin: "0px 0px -100px 0px" });

scoreLines.forEach(bar => skillObserver.observe(bar));

// ===================== CONTACT FORM ANIMATIONS =====================
const contactForm = document.querySelector('.contact_form');
const subjectRow = document.querySelector('.form_row_select');
const subjectSelect = document.querySelector('.form_select');

if (subjectSelect) {
  subjectSelect.addEventListener('focus', () => subjectRow.classList.add('open'));
  subjectSelect.addEventListener('blur', () => subjectRow.classList.remove('open'));
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.send_message_btn');
    const btnText = btn.querySelector('span');
    const btnIcon = btn.querySelector('i');
    const originalText = btnText.textContent;

    btnText.textContent = 'MESSAGE SENT';
    btnIcon.classList.remove('fa-arrow-right');
    btnIcon.classList.add('fa-check');
    btn.classList.add('sent');

    setTimeout(() => {
      contactForm.reset();
      btnText.textContent = originalText;
      btnIcon.classList.remove('fa-check');
      btnIcon.classList.add('fa-arrow-right');
      btn.classList.remove('sent');
    }, 2500);

    // 👉 yaha apna real backend (EmailJS / Formspree / apna API) call karna
  });
}




// ============== SMOOTH SCROLL REVEAL — ABOUT / CONTACT / FOOTER ==============
const softRevealTargets = document.querySelectorAll(
  '.about_picture, .about_container, .about_years, .about_projects, .claint_set, ' +
  '.contact_title, .email, .phone_number, .location, .follow_meLinks, ' +
  '.footer_brand, .footer_nav, .footer_mission, .footer_divider, .footer_bottom'
);

const softRevealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

softRevealTargets.forEach(el => softRevealObserver.observe(el));

// Safety: agar koi element page load par hi viewport me ho to turant reveal
window.addEventListener('load', () => {
  softRevealTargets.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('reveal');
    }
  });
});