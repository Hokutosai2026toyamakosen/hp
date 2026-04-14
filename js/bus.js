const dataUrlBus = "./data/bus.json";

fetch(dataUrlBus)
  .then((response) => response.json())
  .then((data) => {
    const table = document.getElementById("timetable");
    table.innerHTML = generateBusTable(data);
  })
  .catch((error) => {
    console.error(error);
  });

function generateBusTable(items) {
  let tableHTML =
    "<h2>本郷キャンパス／富山駅から射水キャンパスへ</h2><p>※1日目、2日目共通の時刻表です。</p>";
  let contents = "";
  for (let i = 0; i < 6; i++) {
    const timeData = i < 3 ? items.HongoToImizu[i] : items.ImizuToHongo[i - 3];
    const times = timeData.map((t) => `<td>${t}</td>`).join("");
    contents += `
            <tr>
                <th>${items.route[i]}</th>
                ${times}
            </tr>`;
    if (i == 2 || i == 5) {
      tableHTML += `
            <table>
                ${contents}
            </table>`;
      if (i == 2) tableHTML += "<br><br><h2>射水キャンパスから富山駅／本郷キャンパスへ</h2>";
      contents = "";
    }
  }
  return `${tableHTML}<p>射水キャンパスからの乗り場は管理棟前の噴水付近です。</p>`;
}
