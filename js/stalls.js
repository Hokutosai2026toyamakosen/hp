const dataUrlStalls = "../data/stalls.json";

/*
List ID
1 : 運動部
2 : 文化部
3 : クラス
4 : その他
*/
fetch(dataUrlStalls)
  .then((response) => response.json())
  .then((data) => {
    const L1 = document.getElementById("stalls-list-1");
    const L2 = document.getElementById("stalls-list-2");
    const L3 = document.getElementById("stalls-list-3");
    const L4 = document.getElementById("stalls-list-4");
    if (L1 && data.L1) L1.innerHTML = generateHtml(data.L1);
    if (L2 && data.L2) L2.innerHTML = generateHtml(data.L2);
    if (L3 && data.L3) L3.innerHTML = generateHtml(data.L3);
    if (L4 && data.L4) L4.innerHTML = generateHtml(data.L4);
  })
  .catch((error) => {
    let htmlContent = `<span>Oops, something went wrong🔨🐒</span>`;
    stallsList.innerHTML = htmlContent;
  });

function generateHtml(items) {
  return items.map(item => `
        <li>
          <a href="stalls.html?name=${item.name}">
            <img src="${item.image}" alt="" />
            <div class="info">
              <p class="name">${item.name}</p>
              <p class="price">${item.team}</p>
              <p class="place">${item.place}</p>
            </div>
          </a>
        </li>
      `).join('');
}