let squad = [];
let usedCredits = 0;
const MAX_PLAYERS = 15;
const MAX_CREDITS = 150;

let captainId = null;
let viceCaptainId = null;
const validationPanel = document.getElementById("validationPanel");

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

    const card = document.createElement("div");
    card.className = `player-card ${selected ? "selected" : ""}`;

    card.innerHTML = `
      <div>
        <div class="player-name">${p.name}</div>
        <div class="player-meta">
          ${p.category} | ${p.team} | Group ${p.group}
        </div>
      </div>

      <div class="player-footer">
        <span>💳 ${p.credits}</span>
        <button
          class="${selected ? "disabled" : "add"}"
          ${selected ? "disabled" : `onclick="addPlayer('${p.id}')"`}>
          ${selected ? "Selected" : "Add"}
        </button>
      </div>
    `;

    playerList.appendChild(card);
  });
}

/* Render Squad */
function renderSquad() {
  squadList.innerHTML = "";

  squad.forEach((p, i) => {
    const li = document.createElement("li");

    const isC = p.id === captainId ? "active" : "";
    const isVC = p.id === viceCaptainId ? "active" : "";

    li.innerHTML = `
      ${p.name} (${p.credits})
      <span class="badge ${isC}" onclick="setCaptain('${p.id}')">C</span>
      <span class="badge ${isVC}" onclick="setViceCaptain('${p.id}')">VC</span>
      <button onclick="removePlayer(${i})">❌</button>
    `;

    squadList.appendChild(li);
  });

  creditsUsedEl.textContent = usedCredits;
  validateSquad();
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

  if (p.id === captainId) captainId = null;
  if (p.id === viceCaptainId) viceCaptainId = null;

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

  if (!captainId || !viceCaptainId) {
  alert("Select Captain and Vice-Captain");
  return;
}

  fetch("https://script.google.com/macros/s/AKfycbzGW5EJVwHb6zrDhEWME-9x2P56uR-g_0FWDuxIaJS_W_Q1qBIfLSa7e-oBjTIaVrvh/exec", {
  method: "POST",
 body: JSON.stringify({
  user: user,
  captainId: captainId,
  viceCaptainId: viceCaptainId,
  squad: squad,          // plain objects only
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
  captainId = null;
  viceCaptainId = null;
  renderSquad();
  applyFilters();
}


function setCaptain(id) {
  if (viceCaptainId === id) {
    alert("Vice-Captain cannot be Captain");
    return;
  }
  captainId = id;
  renderSquad();
}

function setViceCaptain(id) {
  if (captainId === id) {
    alert("Captain cannot be Vice-Captain");
    return;
  }
  viceCaptainId = id;
  renderSquad();
}

function validateSquad() {
  let valid = true;
  const lines = [];

  // Player count
  const pc = squad.length;
  lines.push(
    pc === MAX_PLAYERS
      ? `<p class="ok">✔ Players: ${pc}/15</p>`
      : `<p class="err">✖ Players: ${pc}/15</p>`
  );
  if (pc !== MAX_PLAYERS) valid = false;

  // Credits
  lines.push(
    usedCredits <= MAX_CREDITS
      ? `<p class="ok">✔ Credits: ${usedCredits}/150</p>`
      : `<p class="err">✖ Credits exceeded</p>`
  );
  if (usedCredits > MAX_CREDITS) valid = false;

  // Category validation
  const limits = {
    "Wicket-Keeper": 2,
    "Batter": 6,
    "Bowler": 6,
    "All-Rounder": 4
  };

  Object.keys(limits).forEach(cat => {
    const count = squad.filter(p => p.category === cat).length;
    lines.push(
      count <= limits[cat]
        ? `<p class="ok">✔ ${cat}: ${count}/${limits[cat]}</p>`
        : `<p class="err">✖ ${cat}: ${count}/${limits[cat]}</p>`
    );
    if (count > limits[cat]) valid = false;
  });

  // Captain / VC
  if (captainId) {
    lines.push(`<p class="ok">✔ Captain selected</p>`);
  } else {
    lines.push(`<p class="err">✖ Captain not selected</p>`);
    valid = false;
  }

  if (viceCaptainId) {
    lines.push(`<p class="ok">✔ Vice-Captain selected</p>`);
  } else {
    lines.push(`<p class="err">✖ Vice-Captain not selected</p>`);
    valid = false;
  }

  validationPanel.innerHTML = lines.join("");
  submitBtn.disabled = !valid;
}

function autoPick() {
  // Reset first
  resetCycle();

  const limits = {
    "Wicket-Keeper": 2,
    "Batter": 6,
    "Bowler": 6,
    "All-Rounder": 4
  };

  const categoryCount = {
    "Wicket-Keeper": 0,
    "Batter": 0,
    "Bowler": 0,
    "All-Rounder": 0
  };

  // Sort players by credits (desc) – smarter picks first
  const sorted = [...players].sort((a, b) => b.credits - a.credits);

  for (let p of sorted) {
    if (squad.length >= MAX_PLAYERS) break;

    if (categoryCount[p.category] >= limits[p.category]) continue;
    if (usedCredits + p.credits > MAX_CREDITS) continue;

    squad.push(p);
    usedCredits += p.credits;
    categoryCount[p.category]++;
  }

  // Auto-assign Captain & VC (highest credit players)
  if (squad.length >= 2) {
    captainId = squad[0].id;
    viceCaptainId = squad[1].id;
  }

  renderSquad();
  applyFilters();
}
