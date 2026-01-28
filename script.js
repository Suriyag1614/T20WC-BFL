let squad = [];
let usedCredits = 0;
const MAX_PLAYERS = 15;
const MAX_CREDITS = 150;

const playerList = document.getElementById("playerList");
const squadList = document.getElementById("squadList");
const creditsUsedEl = document.getElementById("creditsUsed");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const teamFilter = document.getElementById("teamFilter");
const groupFilter = document.getElementById("groupFilter");
const sortCredits = document.getElementById("sortCredits");
const userNameInput = document.getElementById("userName");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

/* Save username */
function saveUser() {
  const name = userNameInput.value.trim();
  if (!name) { alert("Enter your name"); return; }
  localStorage.setItem("fantasy_user", name);
  alert("Name saved!");
}

/* Load user & populate team filter */
window.onload = () => {
  const saved = localStorage.getItem("fantasy_user");
  if (saved) userNameInput.value = saved;
  populateTeamFilter();
  applyFilters();
};

/* Populate Teams dropdown */
function populateTeamFilter() {
  [...new Set(players.map(p => p.team))].forEach(t => {
    const o = document.createElement("option");
    o.value = t; o.textContent = t;
    teamFilter.appendChild(o);
  });
}

/* Filter/Search/Sort */
function applyFilters() {
  let data = [...players];
  if (searchInput.value) data = data.filter(p => p.name.toLowerCase().includes(searchInput.value.toLowerCase()));
  if (categoryFilter.value) data = data.filter(p => p.category === categoryFilter.value);
  if (teamFilter.value) data = data.filter(p => p.team === teamFilter.value);
  if (groupFilter.value) data = data.filter(p => p.group === groupFilter.value);
  if (sortCredits.value === "asc") data.sort((a,b) => a.credits - b.credits);
  if (sortCredits.value === "desc") data.sort((a,b) => b.credits - a.credits);
  renderPlayers(data);
}

[searchInput, categoryFilter, teamFilter, groupFilter, sortCredits].forEach(el => el.addEventListener("input", applyFilters));

/* Render Player List */
function renderPlayers(data) {
  playerList.innerHTML = "";
  data.forEach(p => {
    const selected = squad.some(s => s.id === p.id);
    const div = document.createElement("div");
    div.className = "player";
    div.innerHTML = `
      <span>${p.name} (${p.team}) - ${p.credits}</span>
      <button ${selected ? "" : "onclick='addPlayer(\""+p.id+"\")'"}>${selected ? "Selected" : "Add"}</button>
    `;
    playerList.appendChild(div);
  });
}

/* Render Squad */
function renderSquad() {
  squadList.innerHTML = "";
  squad.forEach((p, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.name} (${p.credits}) <button onclick="removePlayer(${i})">❌</button>`;
    squadList.appendChild(li);
  });
  creditsUsedEl.textContent = usedCredits;
}

/* Add player with category & credit limits */
function addPlayer(id) {
  if (squad.length >= MAX_PLAYERS) { alert("Max 15 players"); return; }
  const p = players.find(x => x.id === id);
  if (!p) return;
  if (usedCredits + p.credits > MAX_CREDITS) { alert("Credit limit exceeded"); return; }

  // Category limits
  const categoryCount = squad.filter(x => x.category === p.category).length;
  const limits = { "Wicket-Keeper": 2, "Batter": 6, "Bowler": 6, "All-Rounder": 4 };
  if (categoryCount >= limits[p.category]) { alert(`Max ${limits[p.category]} ${p.category}s allowed`); return; }

  squad.push(p);
  usedCredits += p.credits;
  renderSquad();
  applyFilters();
}

/* Remove player */
function removePlayer(index) {
  const p = squad[index];
  usedCredits -= p.credits;
  squad.splice(index, 1);
  renderSquad();
  applyFilters();
}

/* Submit squad */
function submitSquad() {
  const user = localStorage.getItem("fantasy_user");
  if (!user) { alert("Save your name first"); return; }
  if (squad.length !== MAX_PLAYERS) { alert("Select exactly 15 players"); return; }

  statusEl.textContent = "Submitting...";
  submitBtn.disabled = true;

  fetch("https://script.google.com/macros/s/AKfycbyn9iCjQvDLJee0YS0WqY5LxauG9E2Ypg4hqzYfmqs5Qvag5Pce-Nzk1DBttNhzSpYz/exec", {
    method: "POST",
    body: JSON.stringify({
      user: user,
      squad: squad,
      totalCredits: usedCredits
    })
  })
  .then(async res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    statusEl.textContent = "Submitted successfully!";
    resetCycle();
    setTimeout(() => { statusEl.textContent = ""; submitBtn.disabled = false; }, 2000);
  })
  .catch(err => {
    console.error(err);
    statusEl.textContent = "Submission failed! Check console.";
    submitBtn.disabled = false;
  });
}

/* Reset squad */
function resetCycle() {
  squad = [];
  usedCredits = 0;
  renderSquad();
  applyFilters();
}
