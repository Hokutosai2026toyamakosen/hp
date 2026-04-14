const dataUrlEvents = "../data/events.json";

fetch(dataUrlEvents)
  .then((response) => response.json())
  .then((data) => {
    const D1 = document.getElementById("events-1");
    const D2 = document.getElementById("events-2");
    if (D1 && data.day1) D1.innerHTML = generateEventsHtml(data.day1);
    if (D2 && data.day2) D2.innerHTML = generateEventsHtml(data.day2);
    createTimeline(data);
  })
  .catch((error) => {
    console.error(error);
  });

function generateEventsHtml(items) {
  const inside = items
    .map(
      (item) => `
        <dt>${item.start}～${item.end}</dt>
        <dd>${item.name}</dd>
    `,
    )
    .join("");
  return `
        <dl class="overview-list wrapper">
            ${inside}
        </dl>
    `;
}
