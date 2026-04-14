// Animation
const slideToggle = (el) => {
  el.style.overflow = "hidden";
  const isHidden = window.getComputedStyle(el).display === "none";
  if (isHidden) el.style.display = "flex";

  const { paddingTop, paddingBottom } = window.getComputedStyle(el);
  const keyframes = [
    { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 },
    { height: el.scrollHeight + "px", opacity: 1, paddingTop, paddingBottom },
  ];

  const anime = el.animate(isHidden ? keyframes : keyframes.reverse(), { duration: 300, easing: "ease" });
  anime.onfinish = () => {
    if (!isHidden) el.style.display = "none";
    el.style.overflow = "";
  };
};

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const target = e.target;

    /*-------------------------------
    ハンバーガーメニュー
    ---------------------------------*/
    const h = document.querySelector(".hamburger");
    const n = document.querySelector("#header .navi");
    const m = document.querySelector("#header .mask");

    if (target.closest(".hamburger")) {
      h?.classList.toggle("active");
      n?.classList.toggle("active");
      m?.classList.toggle("active");
    } else if (target.closest(".navi a") || target.closest(".mask")) {
      h?.classList.remove("active");
      n?.classList.remove("active");
      m?.classList.remove("active");
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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("inview");
    });
  });
  document.querySelectorAll(".fadein").forEach((el) => observer.observe(el));

  /*-------------------------------
  タブ切り替え
  ---------------------------------*/
  document.querySelectorAll("section").forEach((section) => {
    const tabs = section.querySelectorAll(".tab-list li");
    const contents = section.querySelectorAll(".products-list");

    if (tabs.length > 0 && !section.querySelector(".tab-list li.active")) {
      tabs[0].classList.add("active");
      contents[0]?.classList.add("active");
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        contents[index]?.classList.add("active");
      });
    });
  });

  /*-------------------------------
  モーダルウィンドウ
  ---------------------------------*/
  document.querySelectorAll(".modal-open").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.body.style.overflowY = "hidden";
      this.closest("[class*='work']").querySelector(".modal-container").classList.add("active");
    });
  });

  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.style.overflowY = "auto";
      document.querySelectorAll(".modal-container").forEach((m) => m.classList.remove("active"));
    });
  });
});

/*-------------------------------
アコーディオン
---------------------------------*/
function initAccordion() {
  const faqList = document.querySelector("#faq-list");
  if (!faqList) return;

  faqList.querySelectorAll("dd").forEach((dd) => (dd.style.display = "none"));
  faqList.querySelectorAll("dt").forEach((dt) => {
    dt.onclick = function () {
      slideToggle(this.nextElementSibling);
      this.classList.toggle("active");
    };
  });
}