const API_URL = "https://script.google.com/macros/s/AKfycbxuoSw52SiippXn11oTQpNTGOm-vYe6GwSDE2jA6rNDRIJwOgZpmUGMrZ0BjWyaV-jU/exec";
// === SUBMISSION LOCK CONFIG ===
const SUBMISSION_DEADLINE = new Date("2026-02-07T11:00:00"); // change later
let submissionLocked = false;
let isSubmitting = false;

let isSquadLocked = false;
let lastSubmittedSquad = [];

let squad = [];
let usedCredits = 0;
const MAX_PLAYERS = 15;
const MAX_CREDITS = 150;

let captainId = null;
let viceCaptainId = null;
let lastSubmittedCaptainId = null;
let lastSubmittedViceCaptainId = null;

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
const startingXiBtn = document.getElementById("startingXiBtn");

/* Save username */
function saveUser() {
  const raw = userNameInput.value.trim();
  const name = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();

  if (!name) {
    showToast("Enter your name");
    return;
  }

  const prevUser = localStorage.getItem("fantasy_user");

  if (prevUser && prevUser !== name) {
    localStorage.removeItem(`last_submission_${prevUser}`);
    showToast(`User switched to ${name}`);
  } else {
    showToast("Name saved!");
  }

  localStorage.setItem("fantasy_user", name);
  rehydrateUserState();   // 🔥 THIS IS THE KEY
}


window.onload = () => {
  const saved = localStorage.getItem("fantasy_user");
  if (saved) userNameInput.value = saved;
  
  populateTeamFilter();
  applyFilters();

  rehydrateUserState();   // 🔥 unified logic
  
  hideOverlay();
};

setInterval(checkSubmissionLock, 1000);

/* Populate Teams dropdown */
function populateTeamFilter() {
  
  [...new Set(players.map(p => p.team))].forEach(t => {
    const o = document.createElement("option");
    o.value = t; o.textContent = t;
    teamFilter.appendChild(o);
  });
}

const clearFiltersBtn = document.getElementById("clearFiltersBtn");

clearFiltersBtn.addEventListener("click", () => {
  // Clear all filters
  searchInput.value = "";
  categoryFilter.value = "";
  teamFilter.value = "";
  groupFilter.value = "";
  sortCredits.value = "";

  applyFilters();       // re-render player list
  updateActionButtons(); // optional
});

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
  playerList.innerHTML = ""; // clears previous cards

  data.forEach((p, index) => {
    const selected = squad.some(s => s.id === p.id);
    const card = document.createElement("div");
    card.className = `player-card ${selected ? "selected" : ""}`;
    
    card.innerHTML = `
      <div>
        <div class="player-name">${p.name}</div>
        <div class="player-meta">
          <div><img src="https://images.icc-cricket.com/image/upload/t_q-good/prd/assets/flags/${p.team}.png" class="team-logo"></div>
          ${p.category} | ${p.team} | Group ${p.group}<br>
        </div>
      </div>
      <div class="player-footer">
        <span>🪙 ${p.credits}</span>
        <button class="player-btn ${selected ? "selected" : "add"}"
                ${selected ? "disabled" : ""} 
                onclick="${selected ? "" : `addPlayer('${p.id}')`}">
          ${selected ? "✔ Selected" : "Add"}
        </button>
      </div>
    `;

    playerList.appendChild(card);

    // staggered fade-in
    requestAnimationFrame(() => {
      setTimeout(() => card.classList.add("show"), index * 50);
    });
  });
}

/* Render Squad */
function renderSquad() {
  const table = document.getElementById("squadList");

  table.innerHTML = `
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Category</th>
      <th>Team</th>
      <th>Credits</th>
      <th>Role</th>
      <th>Remove</th>
    </tr>
  `;

  squad.forEach((p, i) => {
    const isC = p.id === captainId;
    const isVC = p.id === viceCaptainId;

    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.team}</td>
        <td>${p.credits}</td>
        <td>
          <label>
            <input type="radio" name="captain" 
              ${isC ? "checked" : ""} 
              onclick="setCaptain('${p.id}')"> C
          </label>
          <br>
          <label>
            <input type="radio" name="viceCaptain" 
              ${isVC ? "checked" : ""} 
              onclick="setViceCaptain('${p.id}')"> VC
          </label>
        </td>
        <td>
          <button type="button" class="btn" onclick="removePlayer(${i})">❌</button>
        </td>
      </tr>
    `;
  });

  // After filling the table
const rows = squadList.querySelectorAll("tr:not(.show)");
rows.forEach(row => requestAnimationFrame(() => row.classList.add("show")));

  creditsUsedEl.textContent = usedCredits;
  document.getElementById("playersCount").textContent = squad.length;
  document.getElementById("creditsUsed").textContent = usedCredits;

  // Validate squad
  if (squad.length === 0) {
    renderEmptySquadState();
  } else {
    validateSquad();
  }
}

/* Add player with category & credit limits */
function addPlayer(id) {

  if (squad.length >= MAX_PLAYERS) { showToast("Max 15 players"); return; }
  const p = players.find(x => x.id === id);
  if (!p) return;
  if (usedCredits + p.credits > MAX_CREDITS) { showToast("Credit limit exceeded"); return; }

  const categoryCount = squad.filter(x => x.category === p.category).length;
  const limits = { "Wicket-Keeper": 2, "Batter": 5, "Bowler": 5, "All-Rounder": 5 };
  if (categoryCount >= limits[p.category]) { showToast(`Max ${limits[p.category]} ${p.category}s allowed`); return; }

  const teamCount = squad.filter(x => x.team === p.team).length;
  if (teamCount >= 4) { showToast(`Max 4 players allowed from ${p.team}`); return; }

  squad.push(p);
  usedCredits += p.credits;

  renderPlayers(players);
  // After rendering players
const newCards = document.querySelectorAll(".player-card:not(.show)");
newCards.forEach(card => {
  requestAnimationFrame(() => card.classList.add("show"));
});

  renderSquad();
  applyFilters();
  updateActionButtons();
  updateRuleHighlights();
  requestAnimationFrame(() => applyFilters());
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
  updateActionButtons();
  updateRuleHighlights();
  requestAnimationFrame(() => applyFilters());
}

/* Submit squad */
function submitSquad(formPreview = false) {
  
  if (submissionLocked) {
    showToast("⛔ Submissions are closed");
    return;
  }
    
  const user = getActiveUserOrBlock();
  if(!user) return;

  if (!user) {
    showToast("Save your name first");
    return;
  }
  
  if (squad.length !== MAX_PLAYERS) {
    showToast("Select exactly 15 players");
    return;
  }
  
  if (!captainId || !viceCaptainId) {
    showToast("Select Captain and Vice-Captain");
    return;
  }
  
  if (isSubmitting) return;
  isSubmitting = true;

statusEl.textContent = "Submitting...";
showOverlay("Submitting Your Squad...");
submitBtn.disabled = true;

const formData = new URLSearchParams();
formData.append("payload", JSON.stringify({
  type: "SQUAD",                 // 🔥 REQUIRED BY BACKEND
  user,
  captainId,
  viceCaptainId,
  totalCredits: usedCredits,
  squad: squad.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    credits: p.credits,
    team: p.team
  }))
}));

console.log("Submitting SQUAD payload:", JSON.parse(formData.get("payload")));

fetch(API_URL, {
  method: "POST",
  body: formData
})
.then(r => r.json())
.then(resp => {
  if (resp.status !== "success") {
    throw new Error(resp.message || "Server error");
  }

statusEl.textContent = "Submitted successfully!";
showToast("✅ Squad submitted!");

if (formPreview) {
  closePreview();
}

localStorage.setItem(`last_submission_${user}`, JSON.stringify({
  squad,
  captainId,
  viceCaptainId,
  totalCredits: usedCredits,
  submittedAt: new Date().toISOString()
}));

renderLastSubmittedSquad();
resetCycle(true);  
updateActionButtons();
checkSquadExistsFromBackend();

// Show Starting XI button
if (startingXiBtn) {
  startingXiBtn.style.display = "inline-block";
}
})

.catch(err => {
  console.error(err);
  statusEl.textContent = "Submission failed!";
  showToast("❌ Submission failed");
})
.finally(() => {
  hideOverlay();
  isSubmitting = false;

  if (!submissionLocked) {
    submitBtn.disabled = false;
    disablePage(false);
  }
});

}

/* Reset squad */
function resetCycle(fromSubmit = false, silent = false) {
  squad = [];
  usedCredits = 0;
  captainId = null;
  viceCaptainId = null;

  if (!fromSubmit) {
    if (startingXiBtn) {
    startingXiBtn.style.display = "none";
    }
  }

  if (!silent) {
    if (fromSubmit) {
      validationPanel.innerHTML =
        `<p class="ok">✅ Submission completed. Build a new squad.</p>`;
    }

    renderSquad();
    applyFilters();
    updateActionButtons();
    updateRuleHighlights();
    requestAnimationFrame(() => applyFilters());
  }
}

function setCaptain(id) {
  if (viceCaptainId === id) {
    showToast("Vice-Captain cannot be Captain");
    return;
  }
  captainId = id;
  renderSquad();
  updateActionButtons();
}

function setViceCaptain(id) {
  if (captainId === id) {
    showToast("Captain cannot be Vice-Captain");
    return;
  }
  viceCaptainId = id;
  renderSquad();
  updateActionButtons();
}

function validateSquad() {

  if (isSubmitting) return;

  // ✅ EMPTY STATE (first load, refresh, clear, recycle)
  if (squad.length === 0) {
    renderEmptySquadState();
    return;
  }

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
    "Batter": 5,
    "Bowler": 5,
    "All-Rounder": 5
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
  const wkCount = squad.filter(p => p.category === "Wicket-Keeper").length;
    if (wkCount < 1) {
      lines.push(`<p class="err">✖ At least 1 Wicket-Keeper required</p>`);
      valid = false;
    } else {
      lines.push(`<p class="ok">✔ Wicket-Keeper selected</p>`);
    }
  
  // Team-wise validation
  [...new Set(squad.map(p => p.team))]
    .sort((a, b) => {
      const countB = squad.filter(p => p.team === b).length;
      const countA = squad.filter(p => p.team === a).length;
      return countB - countA;
    })
    .forEach(team => {
      const count = squad.filter(p => p.team === team).length;

      lines.push(
        count <= 4
          ? `<p class="ok">✔ ${team} players: ${count}/4</p>`
          : `<p class="err">✖ ${team} players: ${count}/4</p>`
      );

      if (count > 4) valid = false;
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
}

function addPlayerAuto(p, categoryCount, teamCount, limits) {
  if (squad.length >= MAX_PLAYERS) return false;
  if (categoryCount[p.category] >= limits[p.category]) return false;
  if ((teamCount[p.team] || 0) >= 4) return false;
  if (usedCredits + p.credits > MAX_CREDITS) return false;
  if (squad.some(x => x.id === p.id)) return false;

  squad.push(p);
  usedCredits += p.credits;
  categoryCount[p.category]++;
  teamCount[p.team] = (teamCount[p.team] || 0) + 1;
  return true;
}

function clearSquad() {
  if (!confirm("Are you sure you want to clear your squad?")) return;

  squad = [];
  usedCredits = 0;
  captainId = null;
  viceCaptainId = null;

  isSquadLocked = true;

  const editBtn = document.getElementById("editBtn");
  if (editBtn) {
    editBtn.textContent = "✏️ Edit Squad";
    editBtn.disabled = submissionLocked || !lastSubmittedSquad.length;
  }

  renderSquad();
  applyFilters();
  updateActionButtons();
  updateRuleHighlights();
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast show";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}

function checkSubmissionLock() {
  const now = new Date();
  const diff = SUBMISSION_DEADLINE - now;
  const countdownEl = document.getElementById("countdownText");

  if (diff <= 0) {
  submissionLocked = true;
  countdownEl.textContent = "⛔ Submissions Closed";
  document.body.classList.add("locked");

  submitBtn.disabled = true;

  // 🔥 DISABLE EDIT AFTER DEADLINE
  const editBtn = document.getElementById("editBtn");
  if (editBtn) editBtn.disabled = true;

  disableAllPlayerCards(true);
  return;
}

  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  countdownEl.textContent = `⏳ Submission closes in ${days}d ${hrs}h ${mins}m ${secs}s`;
}

function disablePage(disabled) {
  const app = document.getElementById("appRoot");
  if (!app) return;
  app.style.pointerEvents = disabled ? "none" : "auto";
  app.style.opacity = disabled ? "0.6" : "1";
}

function showOverlay(text = "Loading Data…") {
  const overlay = document.getElementById("overlay");
  const label = document.getElementById("overlayText");
  if (!overlay) return;

  if (label) label.textContent = text;
  overlay.classList.add("show");
}

function hideOverlay() {
  const overlay = document.getElementById("overlay");
  if (!overlay) return;

  overlay.classList.remove("show");
}

function openPreview() {
   if (submissionLocked) {
    showToast("⛔ Submissions are closed");
    return;
  }
  const list = document.getElementById("previewList");

  list.innerHTML = `
    <table class="squad-table">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Category</th>
        <th>Team</th>
        <th>Role</th>
      </tr>
      ${squad.map((p, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>${p.team}</td>
          <td>
            ${p.id === captainId ? "C" : ""}
            ${p.id === viceCaptainId ? "VC" : ""}
          </td>
        </tr>
      `).join("")}
    </table>
  `;

  document.getElementById("previewCredits").textContent = usedCredits;
  document.getElementById("previewModal").classList.add("show");
}

function closePreview() {
  document.getElementById("previewModal").classList.remove("show");
}

function confirmSubmit() {
  if (submissionLocked) {
    showToast("⛔ Submissions are closed");
    return; // ❌ don't close modal
  }
  submitSquad(true); // pass flag

  isSquadLocked = true;

  // deep clone to avoid mutation bugs
  lastSubmittedSquad = JSON.parse(JSON.stringify(squad));

  renderLastSubmittedSquad(lastSubmittedSquad);

  lockUIAfterSubmit();
}

function renderLastSubmittedSquad() {
  const user = localStorage.getItem("fantasy_user");
  if (!user) return;

  const raw = localStorage.getItem(`last_submission_${user}`);
  if (!raw) return;

  const data = JSON.parse(raw);

  const meta = document.getElementById("lastSubmittedMeta");
  const table = document.getElementById("lastSquadTable");

  if (data.submittedAt) {
    const dt = new Date(data.submittedAt);
    meta.textContent =
      `Submitted on ${dt.toLocaleDateString("en-GB")} at ${dt.toLocaleTimeString()}`;
  }

  table.innerHTML = `
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Category</th>
      <th>Team</th>
      <th>Credits</th>
      <th>Role</th>
    </tr>
  `;

  data.squad.forEach((p, i) => {
    const role =
      p.id === data.captainId ? "C" :
      p.id === data.viceCaptainId ? "VC" : "";

    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.team}</td>
        <td>${p.credits}</td>
        <td>${role}</td>
      </tr>
    `;
  });
}

function updateActionButtons() {
  // Submit enabled only when exactly 15 players

  submitBtn.disabled =
  squad.length !== MAX_PLAYERS ||
  usedCredits > MAX_CREDITS ||
  !captainId ||
  !viceCaptainId;

  // Clear enabled when squad has at least 1 player
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) {
    clearBtn.disabled = squad.length === 0;
  }
  const editBtn = document.getElementById("editBtn");
  if (editBtn) editBtn.disabled = submissionLocked || !lastSubmittedSquad.length;
}

function toggleInstructions() {
  const box = document.getElementById("instructionsBox");
  const toggle = document.getElementById("instructionsToggle");

  box.classList.toggle("collapsed");

  const collapsed = box.classList.contains("collapsed");
  toggle.textContent = collapsed ? "➕" : "➖";

  localStorage.setItem("instructions_collapsed", collapsed);
}

// Restore state on load
window.addEventListener("load", () => {
  const collapsed = localStorage.getItem("instructions_collapsed") === "true";
  if (collapsed) toggleInstructions();
});

function updateRuleHighlights() {
  const count = cat =>
    squad.filter(p => p.category === cat).length;

  const setRule = (id, ok) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = ok ? "rule-ok" : "rule-bad";
  };

  setRule("rule-wk", count("Wicket-Keeper") >= 1);
  setRule("rule-bat", count("Batter") <= 6);
  setRule("rule-bowl", count("Bowler") <= 6);
  setRule("rule-ar", count("All-Rounder") <= 4);

  const teams = {};
  squad.forEach(p => teams[p.team] = (teams[p.team] || 0) + 1);
  setRule("rule-team", Object.values(teams).every(v => v <= 4));
}

function renderEmptySquadState() {
  validationPanel.innerHTML =
    `<p class="ok">➕ Add players to start building your squad</p>`;
  submitBtn.disabled = true;
}

function goToStartingXI() {
  window.location.href = "starting-xi.html";
}

async function checkSquadExistsFromBackend() {
  const user = localStorage.getItem("fantasy_user");
  const btn = document.getElementById("startingXiBtn");
  if (!btn) return;

  btn.style.display = "none";
  if (!user) return;
  showOverlay("Loading Data...");
  await new Promise(requestAnimationFrame);
  try {
    const res = await fetch(
      `${API_URL}?action=GET_SQUAD&user=${encodeURIComponent(user)}`
    );
    const data = await res.json();

    if (data.status === "success" && data.squad?.length === 15) {
      btn.style.display = "inline-block";

      localStorage.setItem(`last_submission_${user}`, JSON.stringify({
      squad: data.squad,
      captainId: data.captainId,
      viceCaptainId: data.viceCaptainId,
      totalCredits: data.totalCredits,
      submittedAt: new Date().toISOString()
    }));

    renderLastSubmittedSquad(); // 🔥 sync UI immediately

    }
  } catch (err) {
    console.warn("Squad fetch failed", err);
  } finally {
    hideOverlay();  // ✅ ALWAYS stop loader
  }
}

function rehydrateUserState() {
  const user = localStorage.getItem("fantasy_user");

  // Reset live state
  squad = [];
  usedCredits = 0;
  captainId = null;
  viceCaptainId = null;

  renderSquad();
  updateActionButtons();
  updateRuleHighlights();

  if (!user) return;

  const raw = localStorage.getItem(`last_submission_${user}`);

  if (raw) {
    const data = JSON.parse(raw);

    // 🔥 THIS WAS MISSING
    lastSubmittedSquad = JSON.parse(JSON.stringify(data.squad));
    captainId = data.captainId;
    
    lastSubmittedCaptainId = data.captainId;
    lastSubmittedViceCaptainId = data.viceCaptainId;

    viceCaptainId = data.viceCaptainId;
    usedCredits = data.totalCredits;
    usedCredits=data.totalCredits;
    
    // Enable Edit button
    const editBtn = document.getElementById("editBtn");
    if (editBtn) {
      editBtn.textContent = "✏️ Edit Squad";
      editBtn.disabled = submissionLocked;
    }

    renderLastSubmittedSquad();
  } else {
    lastSubmittedSquad = [];
    document.getElementById("editBtn").disabled = true;
    document.getElementById("lastSubmittedMeta").textContent =
      "No Squad Submitted Yet.";
    document.getElementById("lastSquadTable").innerHTML = "";
  }

  checkSquadExistsFromBackend();
}

function disableSquadPage(disabled) {
  const app = document.getElementById("appRoot");
  if (!app) return;

  app.style.pointerEvents = disabled ? "none" : "auto";
  app.style.opacity = disabled ? "0.6" : "1";
}

function getActiveUserOrBlock() {
  const name = userNameInput.value.trim();

  if (!name) {
    showToast("Save your name first");
    return null;
  }

  const saved = localStorage.getItem("fantasy_user");

  // Sync input → storage (important)
  if (!saved || saved !== name) {
    localStorage.setItem("fantasy_user", name);
  }

  return name;
}

function lockUIAfterSubmit() {
  isSquadLocked = true;

  submitBtn.disabled = true;
  document.getElementById("clearBtn").disabled = true;

  const editBtn = document.getElementById("editBtn");
  if (editBtn) {
    editBtn.textContent = "✏️ Edit Squad";
    editBtn.disabled = submissionLocked;
  }

  startingXiBtn.style.display = "inline-flex";
  disableAllPlayerCards(true);
}

function disableAllPlayerCards(state) {
  document.querySelectorAll(".player-card button").forEach(btn => {
    btn.disabled = state;
  });
}

function toggleEditSquad() {
  if (submissionLocked) {
    showToast("⛔ Editing is closed after deadline");
    return;
  }

  const editBtn = document.getElementById("editBtn");

  /* =========================
     ENTER EDIT MODE
  ========================= */
  if (!isSquadLocked) {
    // Already editing → cancel
    cancelEditSquad();
    return;
  }

  if (!lastSubmittedSquad.length) {
    showToast("⚠️ No submitted squad to edit");
    return;
  }

  // 🔥 Enter edit mode
  isSquadLocked = false;
  editBtn.textContent = "❌ Cancel Edit";

  // Restore squad + C / VC from last submission
  squad = JSON.parse(JSON.stringify(lastSubmittedSquad));
  captainId = lastSubmittedCaptainId;
  viceCaptainId = lastSubmittedViceCaptainId;
  usedCredits = squad.reduce((s, p) => s + p.credits, 0);

  showToast("✏️ Edit mode enabled");

  disableAllPlayerCards(false);
  updateActionButtons();
  updateRuleHighlights();
  renderSquad();
  applyFilters();
}

function cancelEditSquad() {
  const editBtn = document.getElementById("editBtn");

  isSquadLocked = true;
  editBtn.textContent = "✏️ Edit Squad";

  // Restore original submitted squad
  // Restore original submitted squad
  squad = JSON.parse(JSON.stringify(lastSubmittedSquad));
  captainId = lastSubmittedCaptainId;
  viceCaptainId = lastSubmittedViceCaptainId;
  usedCredits = squad.reduce((s, p) => s + p.credits, 0);

  showToast("↩️ Edit cancelled. Original squad restored");

  disableAllPlayerCards(true);
  updateActionButtons();
  updateRuleHighlights();
  renderSquad();
  applyFilters();
}
