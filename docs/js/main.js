const slideToggle = (el) => {
  if (!el) return;
  el.style.overflow = "hidden";
  const isHidden = window.getComputedStyle(el).display === "none";
  if (isHidden) el.style.display = "flex";

  const { paddingTop, paddingBottom } = window.getComputedStyle(el);
  const keyframes = [
    { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 },
    {
      height: (isHidden ? el.scrollHeight : el.offsetHeight) + "px",
      opacity: 1,
      paddingTop,
      paddingBottom,
    },
  ];

  const anime = el.animate(isHidden ? keyframes : keyframes.reverse(), {
    duration: 300,
    easing: "ease",
  });
  anime.onfinish = () => {
    if (!isHidden) el.style.display = "none";
    el.style.overflow = "";
  };
};

const setupObserver = () => {
  const elements = document.querySelectorAll(".fadein");
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("inview");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  elements.forEach((el) => observer.observe(el));
};

const initAll = () => {
  setupObserver();

  document.querySelectorAll("section").forEach((section) => {
    const tabs = section.querySelectorAll(".tab-list li");
    const contents = section.querySelectorAll(".products-list");
    if (tabs.length > 0 && !section.querySelector(".tab-list li.active")) {
      tabs[0].classList.add("active");
      contents[0]?.classList.add("active");
    }
  });

  const faqList = document.querySelector("#faq-list");
  if (faqList) {
    faqList.querySelectorAll("dt").forEach((dt) => {
      const dd = dt.nextElementSibling;
      if (dd && !dt.classList.contains("active")) {
        dd.style.display = "none";
      }
    });
  }
};

document.addEventListener("click", (e) => {
  const target = e.target;
  const hamburger = document.querySelector(".hamburger");
  const navi = document.querySelector(".navi");

  if (target.closest(".hamburger")) {
    hamburger?.classList.toggle("active");
    navi?.classList.toggle("active");
  } else if (target.closest(".navi a")) {
    hamburger?.classList.remove("active");
    navi?.classList.remove("active");
    document.querySelectorAll(".navi .menu .menu-first span.active").forEach((el) => {
      el.classList.remove("active");
      if (el.nextElementSibling) slideToggle(el.nextElementSibling);
    });
  }

  const firstSpan = target.closest(".navi .menu .menu-first span");
  if (firstSpan) {
    document.querySelectorAll(".navi .menu .menu-first span.active").forEach((el) => {
      if (el !== firstSpan) {
        el.classList.remove("active");
        if (el.nextElementSibling) slideToggle(el.nextElementSibling);
      }
    });

    firstSpan.classList.toggle("active");
    if (firstSpan.nextElementSibling) slideToggle(firstSpan.nextElementSibling);
  }

  const tabItem = target.closest(".tab-list li");
  if (tabItem) {
    const section = tabItem.closest("section");
    const tabs = Array.from(section.querySelectorAll(".tab-list li"));
    tabs.forEach((t) => t.classList.remove("active"));
    tabItem.classList.add("active");
  }

  if (target.closest(".modal-open")) {
    document.body.style.overflowY = "hidden";
    target.closest("[class*='work']").querySelector(".modal-container")?.classList.add("active");
  }
  if (target.closest(".modal-close")) {
    document.body.style.overflowY = "auto";
    document.querySelectorAll(".modal-container").forEach((m) => m.classList.remove("active"));
  }
  const dt = target.closest("#faq-list dt");
  if (dt) {
    slideToggle(dt.nextElementSibling);
    dt.classList.toggle("active");
  }
});

let timer;
const observer = new MutationObserver((mutations) => {
  const hasAddedNodes = mutations.some((m) => m.addedNodes.length > 0);
  if (hasAddedNodes) {
    clearTimeout(timer);
    timer = setTimeout(initAll, 100);
  }
});

if (typeof window !== "undefined") {
  initAll();
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("popstate", initAll);
}
