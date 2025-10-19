const container = document.getElementById("cardsContainer");
const buttons = document.querySelectorAll(".time-btn");
let currentView = "daily";

async function loadData() {
  const response = await fetch("data.json");
  const data = await response.json();
  renderCards(data);
}

function renderCards(data) {
  container.innerHTML = "";
  data.forEach((activity, index) => {
    const colors = [
      "hsl(15, 100%, 70%)",
      "hsl(195, 74%, 62%)",
      "hsl(348, 100%, 68%)",
      "hsl(145, 58%, 55%)",
      "hsl(264, 64%, 52%)",
      "hsl(43, 84%, 65%)"
    ];
    const timeframe = activity.timeframes[currentView];
    const label = currentView === "daily" ? "Yesterday" : "Last Week";

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-header" style="background-color:${colors[index]}"></div>
      <div class="card-content">
        <h2>${activity.title} <span>...</span></h2>
        <p class="hours">${timeframe.current}${timeframe.current === 1 ? "hr" : "hrs"}</p>
        <p class="previous">${label} - ${timeframe.previous}${timeframe.previous === 1 ? "hr" : "hrs"}</p>

      </div>
    `;
    container.appendChild(card);
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentView = btn.dataset.time;
    loadData();
  });
});

loadData();