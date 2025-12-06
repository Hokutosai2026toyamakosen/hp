const backToTop = document.getElementById("backToTop");
  const hamburgerButton = document.getElementById('hamburger-button');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = navMenu.querySelectorAll('a');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" });
    });
  });

  const sections = document.querySelectorAll("section");
  const showOnScroll = () => {
    const trigger = window.innerHeight * 0.8;
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if(top < trigger) sec.classList.add("visible");
    });
  };
  window.addEventListener("scroll", showOnScroll);
  window.addEventListener("load", showOnScroll);

  window.addEventListener("scroll", () => {
    if (!navMenu.classList.contains('active')) {
      backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    }
    if (window.scrollY > window.innerHeight * 0.9) {
      hamburgerButton.classList.add('visible');
      document.getElementById("lang-switch").classList.add('visible');
    } else {
      hamburgerButton.classList.remove('visible');
      document.getElementById("lang-switch").classList.remove('visible');
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  hamburgerButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
      backToTop.style.display = 'none';
    } else {
      backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
  });

  const switchBtn = document.getElementById("lang-switch");
  let currentLang = "ja";
  switchBtn.addEventListener("click", () => {
    currentLang = currentLang === "ja" ? "en" : "ja";
    switchBtn.textContent = currentLang === "ja" ? "EN" : "日本語";
    document.querySelectorAll("[data-ja]").forEach(el => {
      el.innerHTML = el.getAttribute(`data-${currentLang}`);
    });
    document.documentElement.setAttribute("lang", currentLang);
  });
