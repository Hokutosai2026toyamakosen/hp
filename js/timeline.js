const START_HOUR = 10;
const END_HOUR = 14;

function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// ./data/events.jsonを送ると2日分まとめてタイムライン化する関数
function createTimeline(data) {
  for (let i = 1; i <= 2; i++) {
    const day = i;
    const timetableData = day === 1 ? data.day1 : data.day2;
    const timelineBox = document.getElementById(`timeline-box-${day}`);

    let timeAxis = "";
    let timelineData = "";

    // 時間軸生成
    for (let h = START_HOUR; h <= END_HOUR; h++) {
      timeAxis += `<div class="time-label" style="height: 150px;">${h}</div>`;
    }

    // イベント配置
    timetableData.forEach((event) => {
      const start = timeToMinutes(event.start);
      const end = timeToMinutes(event.end);
      const base = START_HOUR * 60;
      const HEIGHT_SCALE = 2.5;

      const topPos = (start - base) * HEIGHT_SCALE;
      const height = (end - start) * HEIGHT_SCALE;

      timelineData += `
    <div class="event" style="top: ${topPos}px; height: ${height}px;">
      <div class="event-name">${event.name}</div>
      <div class="event-time">${event.start} - ${event.end}</div>
    </div>
  `;
    });

    timelineBox.innerHTML = `
    <div class="timeline-container">
      <div class="time-axis" id="time-axis-${day}">${timeAxis}</div>
      <div class="timeline" id="timeline-${day}">
        ${timelineData}
      </div>
    </div>
`;
  }
}
