// Animation
const slideToggle = (el) => {
  el.style.overflow = "hidden";

  if (window.getComputedStyle(el).display === "none") {
    el.style.display = "block";

    const style = window.getComputedStyle(el);
    const pt = style.paddingTop;
    const pb = style.paddingBottom;

    el.animate(
      [
        { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 },
        {
          height: el.scrollHeight + "px",
          opacity: 1,
          paddingTop: pt,
          paddingBottom: pb,
        },
      ],
      { duration: 300, easing: "ease" },
    ).onfinish = () => {
      el.style.overflow = "";
    };
  } else {
    const style = window.getComputedStyle(el);
    const pt = style.paddingTop;
    const pb = style.paddingBottom;

    const anime = el.animate(
      [
        {
          height: el.scrollHeight + "px",
          opacity: 1,
          paddingTop: pt,
          paddingBottom: pb,
        },
        { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 },
      ],
      { duration: 300, easing: "ease" },
    );

    anime.onfinish = () => {
      el.style.display = "none";
      el.style.overflow = "";
    };
  }
};

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const target = e.target;

    /*-------------------------------
    ハンバーガーメニュー
    ---------------------------------*/
    const hamburger = target.closest(".hamburger");
    if (hamburger) {
      hamburger.classList.toggle("active");
      document.querySelector("#header .navi")?.classList.toggle("active");
      document.querySelector("#header .mask")?.classList.toggle("active");
    }

    if (target.closest(".navi a") || target.closest(".mask")) {
      document.querySelector(".hamburger")?.classList.remove("active");
      document.querySelector("#header .navi")?.classList.remove("active");
      document.querySelector("#header .mask")?.classList.remove("active");
    }

    /*-------------------------------
    ドロップダウンメニュー
    ---------------------------------*/
    const firstSpan = target.closest(".navi .menu .menu-first span");
    if (firstSpan) {
      firstSpan.classList.toggle("active");
      if (firstSpan.nextElementSibling) slideToggle(firstSpan.nextElementSibling);
    }

    const secondMenu = target.closest(".navi .menu .menu-second");
    if (secondMenu) {
      secondMenu.previousElementSibling?.classList.toggle("active");
      slideToggle(secondMenu);
    }
  });

  const fadeinElements = document.querySelectorAll(".fadein");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("inview");
    });
  });
  fadeinElements.forEach((el) => observer.observe(el));

  /*-------------------------------
  タブ切り替え
  ---------------------------------*/
  const tabSections = document.querySelectorAll("section");

  tabSections.forEach((section) => {
    const tabs = section.querySelectorAll(".tab-list li");
    const contents = section.querySelectorAll(".products-list");

    if (tabs.length > 0 && !section.querySelector(".tab-list li.active")) {
      tabs[0].classList.add("active");
      if (contents[0]) contents[0].classList.add("active");
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));

        tab.classList.add("active");
        if (contents[index]) {
          contents[index].classList.add("active");
        }
      });
    });
  });

  /*-------------------------------
  モーダルウィンドウ
  ---------------------------------*/
  // オープン
  document.querySelectorAll(".modal-open").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.body.style.overflowY = "hidden";
      this.closest("[class*='work']").querySelector(".modal-container").classList.add("active");
    });
  });
  // クローズ
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.style.overflowY = "auto";
      document.querySelectorAll(".modal-container").forEach((m) => m.classList.remove("active"));
    });
  });

  /*-------------------------------
  アコーディオン
  ---------------------------------*/
  document.querySelectorAll(".faq-list dd").forEach((dd) => (dd.style.display = "none"));
  document.querySelectorAll(".faq-list dt").forEach((dt) => {
    dt.addEventListener("click", function () {
      slideToggle(this.nextElementSibling);
      this.classList.toggle("active");
    });
  });
});
