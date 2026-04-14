const dataUrl = "./data/faq.json";
const faqList = document.getElementById("faq-list");

fetch(dataUrl)
  .then((response) => response.json())
  .then((data) => {
    let htmlContent = "";
    data.forEach((item) => {
      htmlContent += `
        <div class="item">
            <dt>
              <span class="question">Q</span>
              <span>${item.Q}</span>
            </dt>
            <dd>
              <span class="answer">A</span>
              <span>${item.A}</span>
            </dd>
        </div>
      `;
    });
    faqList.innerHTML = htmlContent;
    initAccordion();
  })
  .catch((error) => {
    let htmlContent = `<span>Oops, something went wrong🔨🐒</span>`;
    faqList.innerHTML = htmlContent;
  });
