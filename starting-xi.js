/* =========================
   CONFIG
========================= */
const API_URL = "https://script.google.com/macros/s/AKfycbxuoSw52SiippXn11oTQpNTGOm-vYe6GwSDE2jA6rNDRIJwOgZpmUGMrZ0BjWyaV-jU/exec";

const normalizeId = id => String(id);
const CREDIT_LIMIT = 100;
const CREDIT_OVERRIDE_USERS = ["Sure", "Suriya"]; // case-insensitive

const ROLE_MIN = {
  "Wicket-Keeper": 1,
  "Bowler": 3,
  "Batter": 3,
  "All-Rounder": 2
};

/* =========================
   STATE
========================= */
let submittedSquad = [];
let selectedXI = [];
let captainId = null;
let viceCaptainId = null;
let draggedRowIndex = null;
let userName = "";
let isOverrideUser = false;

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  userName = localStorage.getItem("fantasy_user");

  if (!userName) {
  showToast("User not found. Redirecting to squad page.");
  window.location.href = "index.html";
  return;
}

  document.getElementById("displayUserName").textContent = userName;
  isOverrideUser = CREDIT_OVERRIDE_USERS.map(u => u.toLowerCase()).includes(userName.trim().toLowerCase());

  fetchSubmittedSquad();
  fetchLastSubmittedXI();

  const backBtn = document.querySelector(".back-btn");
  if (!userName && backBtn) backBtn.disabled = true;
});

/* =========================
   FETCH SUBMITTED SQUAD
========================= */
async function fetchSubmittedSquad() {
  try {
    showLoader("Loading Your Squad...");
    console.log("Fetching squad for user:", userName);

    const res = await fetch(
      `${API_URL}?action=GET_SQUAD&user=${encodeURIComponent(userName)}`
    );

    if (!res.ok) {
      throw new Error("Network response not OK");
    }

    const data = await res.json();
    console.log("GET_SQUAD response:", data);

    if (data.status !== "success") {
      throw new Error(data.message || "Backend error");
    }

    if (!Array.isArray(data.squad) || data.squad.length === 0) {
      showToast("⚠️ No submitted squad found. Please submit your squad first.");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2500);
      return;
    }

    submittedSquad = data.squad.map(p => ({
      id: String(p.id),
      name: p.name,
      category: p.category,
      credits: Number(p.credits),
      team: p.team,
      group: p.group
    }));

    captainId = data.captainId ? String(data.captainId) : null;
    viceCaptainId = data.viceCaptainId ? String(data.viceCaptainId) : null;

    autoIncludeCaptainVice();
    renderSubmittedPlayers();
    updateUI();

  } catch (err) {
    console.error("❌ Squad load error FULL:", err, err?.stack);
    showToast(
      "Unable to fetch squad submitted data.\n\n" +
      (err?.message || err)
    );
  } finally {
    hideLoader();   // ✅ THIS WAS MISSING
  }
}

/* =========================
   FETCH LAST SUBMITTED XI
========================= */
async function fetchLastSubmittedXI() {
  try {
    const res = await fetch(
      `${API_URL}?action=GET_LAST_XI&user=${encodeURIComponent(userName)}`
    );
    const data = await res.json();

    if (data.status !== "success" || !Array.isArray(data.startingXI) || data.startingXI.length === 0) {
      showToast("ℹ️ No previous Starting XI submission found");
      document.getElementById("lastXITable").innerHTML = `
        <tr>
          <td colspan="4" class="muted">No Starting XI Submitted Yet.</td>
        </tr>
      `;
      return;
    }

    const table = document.getElementById("lastXITable");

    table.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Role</th>
          <th>Credits</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    data.startingXI.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.order}</td>
        <td>${p.name}${p.isCaptain ? " (C)" : p.isViceCaptain ? " (VC)" : ""}</td>
        <td>${p.category}</td>
        <td>${p.credits}</td>
      `;
      tbody.appendChild(row);
    });

    document.getElementById("lastXIMeta").textContent =
      `Submitted on ${data.timestamp}`;

  } catch (err) {
    console.warn("No previous XI found");
  }
}

/* =========================
   RENDER PLAYER CARDS
========================= */
function renderSubmittedPlayers() {
  const list = document.getElementById("submittedPlayerList");
  list.innerHTML = "";

  submittedSquad.forEach((player, index) => {
    const selected = selectedXI.some(p => p.id === player.id);

    const card = document.createElement("div");
    let glowClass = "";

    if (player.id === captainId) glowClass = "captain";
    else if (player.id === viceCaptainId) glowClass = "vice-captain";

    card.className = `player-card ${selected ? "selected" : ""} ${glowClass}`;
    card.dataset.id = player.id;

    card.innerHTML = `
      <div class="player-main">
        <div class="player-name">${player.name}</div>
        <div class="player-meta">
          <img
            src="https://images.icc-cricket.com/image/upload/t_q-good/prd/assets/flags/${player.team}.png"
            class="team-logo"
            onerror="this.style.display='none'"
          >
          ${player.category} | ${player.team}
        </div>
      </div>

      <div class="player-footer">
        <span>🪙 ${player.credits}</span>
        <button class="player-btn ${selected ? "selected" : "add"}"
          ${selected ? "disabled" : ""}>
          ${selected ? "✔ Selected" : "Add"}
        </button>
      </div>
    `;

    // ✅ SAFE event binding
    const btn = card.querySelector(".player-btn");
    if (!selected) {
      btn.addEventListener("click", () => togglePlayer(player.id));
    }

    list.appendChild(card);

    // animation
    requestAnimationFrame(() => {
      setTimeout(() => card.classList.add("show"), index * 40);
    });
  });
}

/* =========================
   AUTO INCLUDE C / VC
========================= */
function autoIncludeCaptainVice() {
  if (!Array.isArray(selectedXI)) selectedXI = [];

  [captainId, viceCaptainId].forEach(id => {
    if (!id) return;

    const already = selectedXI.some(p => p.id === id);
    if (already) return;

    const player = submittedSquad.find(p => p.id === id);
    if (player) {
      selectedXI.push(player);
    }
  });

  updateUI();
}

/* =========================
   TOGGLE PLAYER
========================= */
function togglePlayer(playerId) {
  playerId = normalizeId(playerId);
  const index = selectedXI.findIndex(p => p.id === playerId);

  // Remove (except C / VC)
  if (index !== -1) {
    if (playerId === captainId || playerId === viceCaptainId) return;
    selectedXI.splice(index, 1);
    updateUI();
    return;
  }

  // Add (LIMIT CHECK)
  if (selectedXI.length >= 11) {
    showToast("⚠️ Maximum 11 players allowed in Starting XI");
    return;
  }

  const player = submittedSquad.find(p => p.id === playerId);
  selectedXI.push({ ...player });
  updateUI();
}

/* =========================
   UPDATE UI
========================= */
function updateUI() {
  if (typeof renderSubmittedPlayers === "function") {
    renderSubmittedPlayers();
  }

  if (typeof updateSelectedXI === "function") {
    updateSelectedXI();
  }

  if (typeof updateValidationPanel === "function") {
    updateValidationPanel();
  }
  renderXITable();
  updateCounts();
  validateXI();
}

/* =========================
   RENDER XI TABLE (DnD)
========================= */
function renderXITable() {
  const tbody = document.querySelector("#xiTable tbody");
  tbody.innerHTML = "";

  selectedXI.forEach((p, index) => {
    const row = document.createElement("tr");

    if (p.id === captainId) row.classList.add("captain-row");
    if (p.id === viceCaptainId) row.classList.add("vice-captain-row");

    row.draggable = true;

    row.ondragstart = () => draggedRowIndex = index;
    row.ondragover = e => e.preventDefault();
    row.ondrop = () => onDrop(index);

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.name}${p.id === captainId ? " (C)" : p.id === viceCaptainId ? " (VC)" : ""}</td>
      <td>${p.category}</td>
      <td>${p.credits}</td>
      <td>
        ${p.id !== captainId && p.id !== viceCaptainId
          ? `<button onclick="removeFromXI('${p.id}')">✖</button>`
          : ""}
      </td>
    `;

    tbody.appendChild(row);
  });
}

function onDrop(targetIndex) {
  const item = selectedXI.splice(draggedRowIndex, 1)[0];
  selectedXI.splice(targetIndex, 0, item);
  updateUI();
}

/* =========================
   REMOVE
========================= */
function removeFromXI(playerId) {
  selectedXI = selectedXI.filter(p => p.id !== playerId);
  updateUI();
}

/* =========================
   COUNTS
========================= */
function updateCounts() {
  const totalCredits = selectedXI.reduce((s, p) => s + p.credits, 0);
  document.getElementById("xiCount").textContent = selectedXI.length;
  document.getElementById("xiCredits").textContent = totalCredits;
}

/* =========================
   VALIDATION
========================= */
function validateXI() {
  const panel = document.getElementById("xiValidationPanel");
  panel.innerHTML = "";

  let valid = true;
  const roleCount = {};

  selectedXI.forEach(p => {
    roleCount[p.category] = (roleCount[p.category] || 0) + 1;
  });

  Object.keys(ROLE_MIN).forEach(role => {
    const ok = (roleCount[role] || 0) >= ROLE_MIN[role];
    panel.innerHTML += `
  <div class="validation-row ${ok ? "ok" : "fail"}">
    ${ok ? "✔" : "✖"} ${role}: ${roleCount[role] || 0}/${ROLE_MIN[role]}
  </div>`;

    if (!ok) valid = false;
  });

  const credits = selectedXI.reduce((s, p) => s + p.credits, 0);

if (credits > CREDIT_LIMIT) {
  if (isOverrideUser) {
    panel.innerHTML += `✔ Credits ${credits} (Override allowed)<br>`;
  } else {
    panel.innerHTML += `✖ Credits exceed ${CREDIT_LIMIT}<br>`;
    valid = false;
  }
} else {
  panel.innerHTML += `✔ Credits ${credits}/${CREDIT_LIMIT}<br>`;
}


  document.getElementById("submitXI").disabled = !(valid && selectedXI.length === 11);
}

/* =========================
   CLEAR
========================= */
function clearStartingXI() {
  selectedXI = [];
  autoIncludeCaptainVice();
}

/* =========================
   SUBMIT
========================= */
async function submitStartingXI() {
  const payload = {
    type: "STARTING_XI",
    user: userName,
    isOverrideUser,
    totalCredits: selectedXI.reduce((s, p) => s + p.credits, 0),
    startingXI: selectedXI.map((p, i) => ({
      order: i + 1,
      id: p.id,
      name: p.name,
      category: p.category,
      credits: p.credits,
      isCaptain: p.id === captainId,
      isViceCaptain: p.id === viceCaptainId
    }))
  };

  showLoader("Submitting Starting XI…");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `payload=${encodeURIComponent(JSON.stringify(payload))}`
  });
  hideLoader();

  const data = await res.json();
  if (data.status === "success") {
    showToast("✅ Starting XI submitted successfully!, You may close this page now.", 7000);
    fetchLastSubmittedXI();
  } else {
    showToast(data.message || "Submission failed");
  }
}

function goBackToSquad() {
  window.location.href = "index.html";
}

function toggleInstructions() {
  const box = document.getElementById("instructionsBox");
  const toggle = document.getElementById("instructionsToggle");

  box.classList.toggle("collapsed");

  const collapsed = box.classList.contains("collapsed");
  toggle.textContent = collapsed ? "➕" : "➖";

  localStorage.setItem("xi_instructions_collapsed", collapsed);
}

window.addEventListener("load", () => {
  const collapsed =
    localStorage.getItem("xi_instructions_collapsed") === "true";
  if (collapsed) toggleInstructions();
});

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 5000);
}

function showLoader(text = "Loading...") {
  const overlay = document.getElementById("overlay");
  if (!overlay) return;

  overlay.classList.add("show");

  const p = overlay.querySelector("p");
  if (p) p.textContent = text;
}

function hideLoader() {
  const overlay = document.getElementById("overlay");
  if (!overlay) return;

  overlay.classList.remove("show");
}

/* =========================
   SUBMISSION TIMER (XI PAGE)
========================= */

const SUBMISSION_DEADLINE = new Date("2026-02-06T18:00:00");
let xiSubmissionLocked = false;

function startXITimer() {
  const countdownEl = document.getElementById("countdownText");
  if (!countdownEl) return;

  setInterval(() => {
    const now = new Date();
    const diff = SUBMISSION_DEADLINE - now;

    if (diff <= 0) {
      xiSubmissionLocked = true;
      countdownEl.textContent = "⛔ Submissions Closed";
      document.body.classList.add("locked");
      disableXIPage(true);
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    countdownEl.textContent =
      `⏳ Submission closes in ${d}d ${h}h ${m}m ${s}s`;
  }, 1000);
}

function disableXIPage(disabled) {
  const app = document.getElementById("appRoot");
  if (!app) return;
  app.style.pointerEvents = disabled ? "none" : "auto";
  app.style.opacity = disabled ? "0.6" : "1";
}

document.addEventListener("DOMContentLoaded", startXITimer);
