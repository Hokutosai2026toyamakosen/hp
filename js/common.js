window.addEventListener("DOMContentLoaded", () => {
  const headerElem = document.getElementById("header-box");
  if (headerElem) {
    fetch("header.html")
      .then((response) => response.text())
      .then((data) => (headerElem.innerHTML = data));
  }
  const footerElem = document.getElementById("footer-box");
  if (footerElem) {
    fetch("footer.html")
      .then((response) => response.text())
      .then((data) => (footerElem.innerHTML = data));
  }
});
