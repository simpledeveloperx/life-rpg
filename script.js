/* ==========================================
   REAL LIFE RPG  v2.0
========================================== */

const STORAGE_KEY = "realLifeRPG_v2";
const SNAPSHOT_KEY = "realLifeRPG_snapshots";

/* ==========================================
   CONSTANTS
========================================== */

const QUOTES = [
    "Small actions become great achievements.",
    "Future you is built by today's effort.",
    "Consistency beats intensity.",
    "Every rep counts.",
    "Progress compounds.",
    "The hardest part is starting.",
    "Discipline creates freedom.",
    "You are your greatest boss.",
    "One pushup changes everything.",
    "Build the person you want to fight.",
];

const TITLES = [
    { level: 1,  title: "Novice"      },
    { level: 5,  title: "Apprentice"  },
    { level: 10, title: "Warrior"     },
    { level: 20, title: "Champion"    },
    { level: 35, title: "Hero"        },
    { level: 50, title: "Legend"      },
    { level: 75, title: "Myth"        },
    { level: 100,title: "Immortal"    },
];

const QUEST_TEMPLATES = [
    { type:"pushups", target:20,  text:"20 Pushups",    icon:"💪" },
    { type:"pushups", target:50,  text:"50 Pushups",    icon:"💪" },
    { type:"situps",  target:30,  text:"30 Situps",     icon:"🔥" },
    { type:"situps",  target:100, text:"100 Situps",    icon:"🔥" },
    { type:"pullups", target:10,  text:"10 Pullups",    icon:"🦾" },
    { type:"running", target:1,   text:"Run 1 Mile",    icon:"🏃" },
    { type:"running", target:3,   text:"Run 3 Miles",   icon:"🏃" },
    { type:"walking", target:2,   text:"Walk 2 Miles",  icon:"🚶" },
    { type:"reading", target:15,  text:"Read 15 Min",   icon:"📚" },
    { type:"reading", target:30,  text:"Read 30 Min",   icon:"📚" },
];

const BOSSES = [
    { id:"dummy",  name:"Training Dummy",  emoji:"🪆", baseHP:150,   baseAttack:8,   baseDefense:1,  firstKillReward:50,   description:"A wooden training target. Good for beginners." },
    { id:"goblin", name:"Goblin King",     emoji:"👺", baseHP:500,   baseAttack:12,  baseDefense:2,  firstKillReward:150,  description:"Leader of the goblin tribes. Cunning and relentless." },
    { id:"golem",  name:"Stone Golem",     emoji:"🗿", baseHP:2500,  baseAttack:30,  baseDefense:8,  firstKillReward:500,  description:"Ancient guardian carved from mountain rock." },
    { id:"dragon", name:"Dragon",          emoji:"🐉", baseHP:10000, baseAttack:60,  baseDefense:20, firstKillReward:1500, description:"Ancient ruler of the sky. Near-mythical power." },
    { id:"shadow", name:"Shadow Emperor",  emoji:"👹", baseHP:50000, baseAttack:120, baseDefense:40, firstKillReward:5000, description:"The final boss. Master of darkness and despair." },
];

const ACHIEVEMENTS = [
    { id:"first_pushup",  name:"First Blood",        icon:"💪", desc:"Complete your first pushup.",    type:"pushups",   target:1    },
    { id:"pushup100",     name:"Century",             icon:"💯", desc:"100 total pushups.",             type:"pushups",   target:100  },
    { id:"pushup500",     name:"Iron Will",           icon:"🦾", desc:"500 total pushups.",             type:"pushups",   target:500  },
    { id:"pushup1000",    name:"Beast Mode",          icon:"🏋️", desc:"1000 total pushups.",           type:"pushups",   target:1000 },
    { id:"run10",         name:"Road Runner",         icon:"🏃", desc:"Run 10 total miles.",            type:"running",   target:10   },
    { id:"run50",         name:"Marathon Soul",       icon:"🥇", desc:"Run 50 total miles.",            type:"running",   target:50   },
    { id:"read5h",        name:"Bookworm",            icon:"📚", desc:"Read for 300 minutes.",          type:"reading",   target:300  },
    { id:"read20h",       name:"Scholar",             icon:"🎓", desc:"Read for 1200 minutes.",         type:"reading",   target:1200 },
    { id:"level10",       name:"Warrior",             icon:"⚔️", desc:"Reach level 10.",               type:"level",     target:10   },
    { id:"level25",       name:"Champion",            icon:"🏆", desc:"Reach level 25.",               type:"level",     target:25   },
    { id:"level50",       name:"Legend",              icon:"👑", desc:"Reach level 50.",               type:"level",     target:50   },
    { id:"streak7",       name:"Week Warrior",        icon:"🔥", desc:"7 day streak.",                 type:"streak",    target:7    },
    { id:"streak30",      name:"Iron Streak",         icon:"🌋", desc:"30 day streak.",                type:"streak",    target:30   },
    { id:"boss_dummy",    name:"First Victory",       icon:"🪆", desc:"Defeat the Training Dummy.",    type:"boss",      target:"dummy"  },
    { id:"boss_goblin",   name:"Goblin Slayer",       icon:"👺", desc:"Defeat the Goblin King.",       type:"boss",      target:"goblin" },
    { id:"boss_golem",    name:"Stone Breaker",       icon:"🗿", desc:"Defeat the Stone Golem.",       type:"boss",      target:"golem"  },
    { id:"boss_dragon",   name:"Dragonslayer",        icon:"🐉", desc:"Defeat the Dragon.",            type:"boss",      target:"dragon" },
    { id:"boss_shadow",   name:"Shadow Conqueror",    icon:"👹", desc:"Defeat the Shadow Emperor.",   type:"boss",      target:"shadow" },
    { id:"past_self",     name:"Better Than Yesterday",icon:"👤",desc:"Win a fight against your past self.", type:"past",  target:1   },
];

/* ==========================================
   DEFAULT STATE
========================================== */

function defaultState() {
    return {
        xp: 0,
        level: 1,
        gold: 0,
        strength:   0,
        endurance:  0,
        knowledge:  0,
        discipline: 0,
        speed:      0,
        title: "Novice",
        streak: 0,
        lastVisit: "",
        questDate: "",
        dailyQuests: [],
        dailyBonusClaimed: "",
        achievements: [],
        bosses: Object.fromEntries(BOSSES.map(b => [b.id, { level:1, firstClear:false, kills:0 }])),
        pastWins: 0,
        totals: { pushups:0, situps:0, pullups:0, running:0, walking:0, reading:0 },
        rewards: [],
        rewardHistory: [],
        wishlist: [],
        powerHistory: [],
        activityLog: [],
    };
}

let game = defaultState();

/* ==========================================
   SAVE / LOAD / PATCH
========================================== */

function saveGame() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(game)); } catch(e) {}
}

function loadGame() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const loaded = JSON.parse(raw);
            game = Object.assign(defaultState(), loaded);
        }
    } catch(e) { game = defaultState(); }
    patchState();
}

function patchState() {
    const def = defaultState();
    // ensure all keys
    for (const k of Object.keys(def)) {
        if (game[k] === undefined || game[k] === null) game[k] = def[k];
    }
    // ensure boss entries
    BOSSES.forEach(b => {
        if (!game.bosses[b.id]) game.bosses[b.id] = { level:1, firstClear:false, kills:0 };
    });
    // migrate old defeatedBosses array
    if (game.defeatedBosses) {
        game.defeatedBosses.forEach(id => {
            if (game.bosses[id]) { game.bosses[id].firstClear = true; game.bosses[id].kills = game.bosses[id].kills || 1; }
        });
        delete game.defeatedBosses;
    }
    if (!game.activityLog) game.activityLog = [];
    if (!game.pastWins)   game.pastWins = 0;
}

/* ==========================================
   SNAPSHOTS (Past Self)
========================================== */

function getSnapshots() {
    try { return JSON.parse(localStorage.getItem(SNAPSHOT_KEY) || "{}"); } catch(e) { return {}; }
}

function saveSnapshot() {
    const snaps = getSnapshots();
    const today = todayStr();
    snaps[today] = {
        date:       today,
        level:      game.level,
        strength:   game.strength,
        endurance:  game.endurance,
        knowledge:  game.knowledge,
        discipline: game.discipline,
        speed:      game.speed,
        power:      getPower(),
        totals:     { ...game.totals },
    };
    // prune old snapshots beyond 60 days
    const keys = Object.keys(snaps).sort();
    while (keys.length > 60) { delete snaps[keys.shift()]; }
    try { localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snaps)); } catch(e) {}
}

function findSnapshot(daysAgo) {
    const snaps = getSnapshots();
    const target = new Date();
    target.setDate(target.getDate() - daysAgo);
    // find closest snapshot within ±2 days
    let best = null, bestDiff = 9999;
    Object.values(snaps).forEach(s => {
        const d = Math.abs((new Date(s.date) - target) / 86400000);
        if (d < bestDiff && d <= 3) { bestDiff = d; best = s; }
    });
    return best;
}

/* ==========================================
   DATES
========================================== */

function todayStr() { return new Date().toISOString().split("T")[0]; }

function timeUntilMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24,0,0,0);
    const diff = midnight - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return `${h}h ${m}m`;
}

/* ==========================================
   LEVEL / XP
========================================== */

function calculateLevel(xp) { return Math.floor(Math.sqrt(xp / 25)) + 1; }
function xpForLevel(lvl)    { return (lvl - 1) * (lvl - 1) * 25; }
function xpForNextLevel()   { return xpForLevel(game.level + 1); }

function addXP(amount) {
    const oldLevel = game.level;
    game.xp += amount;
    game.level = calculateLevel(game.xp);
    if (game.level > oldLevel) {
        showLevelUpSplash(game.level);
        updateTitle();
        checkGoldMultiplierUp(oldLevel);
        checkAchievements();
    }
}

function getGoldMultiplier() {
    return parseFloat((1 + Math.floor(game.level / 10) * 0.10).toFixed(1));
}

function checkGoldMultiplierUp(oldLevel) {
    const o = 1 + Math.floor(oldLevel / 10) * 0.1;
    const n = getGoldMultiplier();
    if (n > o) notify(`⭐ Gold Multiplier → ${n}x!`, "gold");
}

function updateTitle() {
    let t = "Novice";
    TITLES.forEach(x => { if (game.level >= x.level) t = x.title; });
    if (t !== game.title) {
        game.title = t;
        notify(`🏆 New Title: ${t}`, "purple");
    }
}

/* ==========================================
   POWER
========================================== */

function getPower() {
    return Math.floor(
        game.strength   * 2   +
        game.endurance  * 1.5 +
        game.knowledge        +
        game.discipline       +
        game.speed      * 1.2
    );
}

/* ==========================================
   COMBAT STATS
========================================== */

function getPlayerCombatStats() {
    const atkIntervalMs = 4000 / (1 + game.speed * 0.02);
    return {
        maxHP:         Math.floor(100 + game.endurance * 15),
        attack:        game.strength * 2,
        defense:       game.discipline * 0.5,
        critChance:    game.knowledge * 0.2,
        atkIntervalMs: atkIntervalMs,
        attackSpeed:   1000 / atkIntervalMs,
    };
}

function getGhostCombatStats(snap) {
    const atkIntervalMs = 4000 / (1 + (snap.speed||0) * 0.02);
    return {
        maxHP:         Math.floor(100 + (snap.endurance||0) * 15),
        attack:        (snap.strength||0) * 2,
        defense:       (snap.discipline||0) * 0.5,
        critChance:    (snap.knowledge||0) * 0.2,
        atkIntervalMs: atkIntervalMs,
    };
}

function getBossScaled(boss) {
    const lvl = game.bosses[boss.id]?.level || 1;
    return {
        hp:      Math.floor(boss.baseHP      * Math.pow(1.30, lvl - 1)),
        attack:  boss.baseAttack * Math.pow(1.18, lvl - 1),
        defense: boss.baseDefense * Math.pow(1.10, lvl - 1),
        reward:  Math.floor(25   * Math.pow(1.20, lvl - 1)),
    };
}

/* ==========================================
   STREAK
========================================== */

function checkStreak() {
    const today = todayStr();
    if (!game.lastVisit) { game.lastVisit = today; game.streak = 1; return; }
    const diff = Math.round((new Date(today) - new Date(game.lastVisit)) / 86400000);
    if (diff === 1) {
        game.streak++;
        notify(`🔥 ${game.streak} Day Streak!`, "gold");
        checkAchievements();
    } else if (diff > 1) {
        if (game.streak > 0) notify(`💔 Streak lost. Starting fresh!`, "error");
        game.streak = 1;
    }
    game.lastVisit = today;
}

/* ==========================================
   DAILY BONUS
========================================== */

function checkDailyBonus() {
    const today = todayStr();
    if (game.dailyBonusClaimed === today) return;
    // Show the bonus card
    const bonus = 50 + (game.streak * 10);
    const bonusCard = $("dailyBonusCard");
    if (bonusCard) {
        bonusCard.style.display = "block";
        $("dailyBonusText").textContent = `+${bonus} Gold (Streak bonus × ${game.streak})`;
        $("sidebarDailyBonus").style.display = "block";
    }
    $("claimDailyBtn")?.addEventListener("click", () => {
        if (game.dailyBonusClaimed === today) return;
        game.dailyBonusClaimed = today;
        game.gold += bonus;
        bonusCard.style.display = "none";
        $("sidebarDailyBonus").style.display = "none";
        notify(`🎁 Daily Bonus! +${bonus} Gold`, "gold");
        refreshEverything();
    }, { once: true });
}

/* ==========================================
   DAILY QUESTS
========================================== */

function generateDailyQuests() {
    const today = todayStr();
    if (game.questDate === today && game.dailyQuests.length) return;
    game.questDate = today;
    const shuffled = [...QUEST_TEMPLATES].sort(() => Math.random() - 0.5);
    game.dailyQuests = shuffled.slice(0, 3).map(q => ({ ...q, progress:0, complete:false }));
}

function updateQuestProgress(type, amount) {
    game.dailyQuests.forEach(q => {
        if (q.type !== type || q.complete) return;
        q.progress = Math.min(q.target, q.progress + amount);
        if (q.progress >= q.target) {
            q.complete = true;
            const gold = Math.floor(50 * getGoldMultiplier());
            game.gold += gold;
            addXP(100);
            notify(`📜 Quest Complete: ${q.text}! +${gold} Gold`, "success");
        }
    });
}

/* ==========================================
   ACTIVITY LOGGING
========================================== */

function logActivity(emoji, label, detail) {
    game.activityLog.unshift({ emoji, label, detail, time: new Date().toLocaleTimeString() });
    if (game.activityLog.length > 30) game.activityLog.pop();
}

function logPushups(n) {
    game.strength       += n * 0.01;
    game.totals.pushups += n;
    addXP(n * 0.2);
    updateQuestProgress("pushups", n);
    logActivity("💪", "Pushups", `${n} reps`);
    notify(`💪 ${n} Pushups! +STR +XP`);
}

function logSitups(n) {
    game.strength       += n * 0.005;
    game.discipline     += n * 0.003;
    game.totals.situps  += n;
    addXP(n * 0.2);
    updateQuestProgress("situps", n);
    logActivity("🔥", "Situps", `${n} reps`);
    notify(`🔥 ${n} Situps! +STR +DISC +XP`);
}

function logPullups(n) {
    game.strength       += n * 0.025;
    game.totals.pullups += n;
    addXP(n * 0.5);
    updateQuestProgress("pullups", n);
    logActivity("🦾", "Pullups", `${n} reps`);
    notify(`🦾 ${n} Pullups! +STR +XP`);
}

function logRun(miles) {
    game.endurance      += miles * 0.10;
    game.speed          += miles * 0.08;
    game.totals.running += miles;
    addXP(miles * 3);
    updateQuestProgress("running", miles);
    logActivity("🏃", "Run", `${miles} miles`);
    notify(`🏃 ${miles} mile(s) run! +END +SPD +XP`);
}

function logWalk(miles) {
    game.endurance      += miles * 0.04;
    game.speed          += miles * 0.02;
    game.totals.walking += miles;
    addXP(miles * 1);
    updateQuestProgress("walking", miles);
    logActivity("🚶", "Walk", `${miles} miles`);
    notify(`🚶 ${miles} mile(s) walked! +END +SPD +XP`);
}

function logReading(mins) {
    game.knowledge      += mins * 0.01;
    game.totals.reading += mins;
    addXP(mins * 0.05);
    updateQuestProgress("reading", mins);
    logActivity("📚", "Reading", `${mins} min`);
    notify(`📚 ${mins} min read! +KNOW +XP`);
}

/* ==========================================
   ACHIEVEMENTS
========================================== */

function getAchievementProgress(a) {
    switch (a.type) {
        case "pushups": return game.totals.pushups;
        case "running": return game.totals.running;
        case "reading": return game.totals.reading;
        case "level":   return game.level;
        case "streak":  return game.streak;
        case "boss":    return game.bosses[a.target]?.firstClear ? 1 : 0;
        case "past":    return game.pastWins;
        default:        return 0;
    }
}

function checkAchievements() {
    ACHIEVEMENTS.forEach(a => {
        if (game.achievements.includes(a.id)) return;
        if (a.type === "boss") return; // boss achievements triggered manually
        if (getAchievementProgress(a) >= a.target) {
            unlockAchievement(a);
        }
    });
}

function unlockAchievement(a) {
    if (game.achievements.includes(a.id)) return;
    game.achievements.push(a.id);
    const gold = Math.floor(100 * getGoldMultiplier());
    game.gold += gold;
    notify(`${a.icon} Achievement: ${a.name}! +${gold} Gold`, "success");
}

function unlockBossAchievement(bossId) {
    const a = ACHIEVEMENTS.find(x => x.type === "boss" && x.target === bossId);
    if (a) unlockAchievement(a);
}

/* ==========================================
   DOM HELPERS
========================================== */

const $ = id => document.getElementById(id);
const fmt = n => Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 });
const fmtInt = n => Math.floor(n).toLocaleString();

/* ==========================================
   NOTIFICATIONS
========================================== */

function notify(msg, type = "") {
    const c = $("notificationContainer");
    const el = document.createElement("div");
    el.className = `notification ${type}`;
    el.textContent = msg;
    c.appendChild(el);
    setTimeout(() => el.remove(), 4600);
}

/* ==========================================
   LEVEL UP SPLASH
========================================== */

function showLevelUpSplash(lvl) {
    const splash = $("levelUpSplash");
    $("levelUpNum").textContent = lvl;
    let t = "Novice";
    TITLES.forEach(x => { if (lvl >= x.level) t = x.title; });
    $("levelUpTitle").textContent = t;
    splash.style.display = "flex";
    setTimeout(() => { splash.style.display = "none"; }, 2800);
    splash.addEventListener("click", () => { splash.style.display = "none"; }, { once: true });
}

/* ==========================================
   RENDER DASHBOARD
========================================== */

function renderDashboard() {
    // Topbar XP
    const curXP  = xpForLevel(game.level);
    const nextXP = xpForNextLevel();
    const pct    = Math.max(0, Math.min(100, ((game.xp - curXP) / (nextXP - curXP)) * 100));
    $("topbarXpBar").style.width = pct + "%";
    $("topbarXpLabel").textContent = `Lv ${game.level} — ${fmtInt(game.xp)} XP`;

    // Topbar stats
    $("goldDisplay").textContent  = fmtInt(game.gold);
    $("streakDisplay").textContent = game.streak;
    $("heroPower").textContent    = fmtInt(getPower());

    // Hero card
    $("levelDisplay").textContent   = game.level;
    $("heroPowerBig").textContent   = fmtInt(getPower());
    $("heroTitleBig").textContent   = game.title;
    $("goldMini").textContent       = fmtInt(game.gold);
    $("multiplierDisplay").textContent = getGoldMultiplier() + "x";
    $("streakMini").textContent     = game.streak;

    // XP bar (hero card)
    $("xpBar").style.width = pct + "%";
    $("xpDisplay").textContent    = fmtInt(game.xp) + " XP";
    $("xpRemaining").textContent  = `${fmtInt(Math.max(0, nextXP - game.xp))} XP to next level`;

    // Title badge
    $("playerTitle").textContent  = game.title;

    // Stats
    $("strengthDisplay").textContent   = fmt(game.strength);
    $("enduranceDisplay").textContent  = fmt(game.endurance);
    $("knowledgeDisplay").textContent  = fmt(game.knowledge);
    $("disciplineDisplay").textContent = fmt(game.discipline);
    $("speedDisplay").textContent      = fmt(game.speed);

    renderQuests();
    renderNextGoal();
    renderMilestones();
    renderRecentActivity();
    renderAchievementSummary();
    renderQuestTimer();
}

function renderQuestTimer() {
    const el = $("questResetTimer");
    if (el) el.textContent = `Resets in ${timeUntilMidnight()}`;
}

function renderNextGoal() {
    const el = $("nextGoalContainer");
    if (!el) return;
    if (!game.wishlist || !game.wishlist.length) { el.innerHTML = "<span style='color:var(--muted)'>No wishlist items yet.</span>"; return; }
    const sorted = [...game.wishlist].sort((a,b) => a.cost - b.cost);
    const goal = sorted.find(x => x.cost > game.gold) || sorted[0];
    const pct = Math.min(100, (game.gold / goal.cost) * 100);
    el.innerHTML = `
        <div class="goal-name">${goal.name}</div>
        <div style="font-size:13px;color:var(--muted)">${fmtInt(game.gold)} / ${fmtInt(goal.cost)} Gold</div>
        <div class="next-goal-progress-bar"><div class="next-goal-fill" style="width:${pct}%"></div></div>
        <div style="font-size:12px;color:var(--muted)">${pct.toFixed(1)}% saved</div>
    `;
}

function renderMilestones() {
    const el = $("milestoneContainer");
    if (!el) return;
    const ms = [];
    if (game.totals.pushups < 100)  ms.push(`${100 - game.totals.pushups} more pushups → Century achievement`);
    if (game.totals.running < 10)   ms.push(`${(10 - game.totals.running).toFixed(1)} more miles → Road Runner`);
    const nextTitle = TITLES.find(t => t.level > game.level);
    if (nextTitle)                   ms.push(`${nextTitle.level - game.level} levels → ${nextTitle.title}`);
    if (game.speed < 10)            ms.push(`${(10 - game.speed).toFixed(2)} speed → Faster attacks`);
    const nextStreak = [7,30].find(s => s > game.streak);
    if (nextStreak)                  ms.push(`${nextStreak - game.streak} days → Streak achievement`);
    el.innerHTML = ms.slice(0,4).map(m => `<div class="milestone-row">${m}</div>`).join("") || "<span style='color:var(--muted)'>All caught up!</span>";
}

function renderRecentActivity() {
    const el = $("recentActivityLog");
    if (!el) return;
    if (!game.activityLog.length) { el.innerHTML = "<span style='color:var(--muted);font-size:13px;padding:8px'>No activities logged yet.</span>"; return; }
    el.innerHTML = game.activityLog.slice(0, 10).map(a =>
        `<div class="recent-log-entry">
            <span>${a.emoji}</span>
            <span><b>${a.label}</b> — ${a.detail}</span>
            <span class="recent-log-time">${a.time}</span>
        </div>`
    ).join("");
}

function renderAchievementSummary() {
    const el = $("achievementSummary");
    if (el) el.textContent = `${game.achievements.length} / ${ACHIEVEMENTS.length} unlocked`;
}

/* ==========================================
   RENDER QUESTS
========================================== */

function renderQuests() {
    const el = $("dailyQuestContainer");
    if (!el) return;
    el.innerHTML = game.dailyQuests.map(q => {
        const pct = Math.min(100, (q.progress / q.target) * 100);
        return `<div class="quest-card">
            <div class="quest-icon">${q.icon}</div>
            <div class="quest-info">
                <div class="quest-name">${q.text}</div>
                <div class="quest-bar-bg"><div class="quest-bar-fill" style="width:${pct}%"></div></div>
                <div class="quest-progress-text">${fmt(q.progress)} / ${q.target}</div>
            </div>
            <div class="quest-reward">
                ${q.complete
                    ? `<div class="quest-complete-badge">✅ Done</div>`
                    : `<div>+100 XP</div><div>+50 Gold</div>`
                }
            </div>
        </div>`;
    }).join("");
}

/* ==========================================
   RENDER ACHIEVEMENTS
========================================== */

function renderAchievements() {
    const el = $("achievementContainer");
    if (!el) return;
    el.innerHTML = ACHIEVEMENTS.map(a => {
        const unlocked = game.achievements.includes(a.id);
        const prog = getAchievementProgress(a);
        const target = a.type === "boss" || a.type === "past" ? 1 : a.target;
        const pct = Math.min(100, (prog / target) * 100);
        return `<div class="achievement-card ${unlocked ? "unlocked" : "locked"}">
            <div class="achievement-icon">${unlocked ? a.icon : "🔒"}</div>
            <div class="achievement-name">${a.name}</div>
            <div class="achievement-desc">${a.desc}</div>
            <div class="progress-bar" style="height:6px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden;margin:6px 0">
                <div style="width:${pct}%;height:100%;background:${unlocked ? "var(--gold)" : "var(--muted)"};border-radius:99px;transition:width .4s"></div>
            </div>
            <div class="achievement-progress-text">${prog < 1 && a.type === "boss" ? "0" : Math.min(prog, target).toLocaleString()} / ${target.toLocaleString()}</div>
        </div>`;
    }).join("");
}

/* ==========================================
   RENDER BOSSES
========================================== */

function renderBosses() {
    const el = $("bossContainer");
    if (!el) return;
    el.innerHTML = BOSSES.map(boss => {
        const bd     = game.bosses[boss.id];
        const scaled = getBossScaled(boss);
        const inBattle = combatState && combatState.bossId === boss.id;
        return `<div class="boss-card">
            <div class="boss-card-top">
                <div class="boss-portrait">${boss.emoji}</div>
                <span class="boss-level-badge">Lv ${bd.level}</span>
            </div>
            <div class="boss-name">${boss.name}</div>
            <div class="boss-desc">${boss.description}</div>
            <div class="boss-stats-row">
                <div class="boss-stat-box"><div class="bsl">HP</div><div class="bsv" style="color:var(--green)">${fmtInt(scaled.hp)}</div></div>
                <div class="boss-stat-box"><div class="bsl">ATK</div><div class="bsv" style="color:var(--red)">${scaled.attack.toFixed(1)}</div></div>
                <div class="boss-stat-box"><div class="bsl">DEF</div><div class="bsv" style="color:var(--blue)">${scaled.defense.toFixed(1)}</div></div>
            </div>
            <div class="boss-reward-row">
                Reward: ${fmtInt(scaled.reward)} Gold / kill
                ${!bd.firstClear ? ` · <span style="color:var(--orange)">First kill: +${boss.firstKillReward}</span>` : ""}
            </div>
            <div class="boss-meta-row">Kills: ${bd.kills} ${bd.firstClear ? "· ✅ First cleared" : ""}</div>
            <button class="fight-btn" ${inBattle ? "disabled" : ""} onclick="startCombat('${boss.id}')">
                ${inBattle ? "⚔️ In Battle..." : `⚔️ Fight (Lv ${bd.level})`}
            </button>
        </div>`;
    }).join("");
}

/* ==========================================
   BOSS COMBAT
========================================== */

let combatState  = null;
let combatInterval = null;
let pTickAccum  = 0;
let bTickAccum  = 0;
const TICK_MS = 100;
const BOSS_ATK_MS = 2000;

function startCombat(bossId) {
    if (combatInterval) { endCombat(false, true); }
    const bossDef = BOSSES.find(b => b.id === bossId);
    if (!bossDef) return;
    const ps     = getPlayerCombatStats();
    const scaled = getBossScaled(bossDef);
    combatState = {
        type: "boss",
        bossId,
        bossName: bossDef.name,
        playerHP: ps.maxHP, playerMaxHP: ps.maxHP,
        bossHP:   scaled.hp, bossMaxHP: scaled.hp,
        bossAtk:  scaled.attack, bossDef: scaled.defense,
        bossReward: scaled.reward,
    };
    pTickAccum = 0; bTickAccum = 0;

    $("combatArena").style.display = "block";
    $("arenaTitle").textContent    = `${bossDef.emoji} ${bossDef.name} — Lv ${game.bosses[bossId].level}`;
    $("bossPortraitArena").textContent  = bossDef.emoji;
    $("bossNameArena").textContent      = bossDef.name;
    $("bossLevelArena").textContent     = `Lv ${game.bosses[bossId].level}`;
    $("arenaPlayerLevel").textContent   = `Lv ${game.level}`;
    $("arenaAtk").textContent  = ps.attack.toFixed(1);
    $("arenaDef").textContent  = ps.defense.toFixed(1);
    $("arenaSpd").textContent  = (ps.atkIntervalMs / 1000).toFixed(1) + "s";
    $("arenaCrit").textContent = ps.critChance.toFixed(1);
    $("bossAtkDisplay").textContent = scaled.attack.toFixed(1);
    $("bossDefDisplay").textContent = scaled.defense.toFixed(1);
    $("combatLog").innerHTML = "";
    addLog(`⚔️ Battle begins vs ${bossDef.name}!`, "log-system");
    updateCombatBars();
    renderBosses();
    combatInterval = setInterval(bossCombatTick, TICK_MS);
    $("combatArena").scrollIntoView({ behavior:"smooth", block:"start" });
}

function bossCombatTick() {
    if (!combatState || combatState.type !== "boss") return;
    const ps = getPlayerCombatStats();
    pTickAccum += TICK_MS; bTickAccum += TICK_MS;

    if (pTickAccum >= ps.atkIntervalMs) {
        pTickAccum = 0;
        const isCrit = ps.critChance > 0 && Math.random() * 100 < ps.critChance;
        let dmg = Math.max(0, ps.attack - combatState.bossDef);
        if (isCrit && dmg > 0) dmg *= 2;
        combatState.bossHP -= dmg;
        if (dmg === 0) addLog(`🛡️ Blocked by ${combatState.bossName}! (0 dmg)`, "log-system");
        else if (isCrit) addLog(`💥 CRIT! You deal ${Math.round(dmg)} to ${combatState.bossName}!`, "log-crit");
        else addLog(`🗡️ You hit ${combatState.bossName} for ${Math.round(dmg)}.`, "log-player");
        if (dmg > 0) spawnFloat(Math.round(dmg), isCrit ? "crit-dmg" : "player-dmg", "boss-side");
        if (combatState.bossHP <= 0) { combatState.bossHP = 0; updateCombatBars(); endCombat(true, false); return; }
    }

    if (bTickAccum >= BOSS_ATK_MS) {
        bTickAccum = 0;
        let dmg = Math.max(0, combatState.bossAtk - ps.defense);
        combatState.playerHP -= dmg;
        if (dmg === 0) addLog(`🛡️ You block ${combatState.bossName}'s attack!`, "log-system");
        else addLog(`👊 ${combatState.bossName} hits you for ${Math.round(dmg)}!`, "log-boss");
        if (dmg > 0) spawnFloat(Math.round(dmg), "boss-dmg", "player-side");
        if (combatState.playerHP <= 0) { combatState.playerHP = 0; updateCombatBars(); endCombat(false, false); return; }
    }

    updateCombatBars();
    const elapsed = (pTickAccum / 1000).toFixed(1);
    $("arenaTickDisplay").textContent = `⏱ ${elapsed}s`;
}

function updateCombatBars() {
    if (!combatState) return;
    const pPct = Math.max(0, (combatState.playerHP / combatState.playerMaxHP) * 100);
    const bPct = Math.max(0, (combatState.bossHP   / combatState.bossMaxHP)   * 100);
    $("playerHPBar").style.width = pPct + "%";
    $("bossHPBar").style.width   = bPct + "%";
    $("playerHPText").textContent = `${Math.max(0,Math.round(combatState.playerHP))} / ${Math.round(combatState.playerMaxHP)}`;
    $("bossHPText").textContent   = `${Math.max(0,Math.round(combatState.bossHP))} / ${Math.round(combatState.bossMaxHP)}`;
}

function endCombat(victory, fled) {
    clearInterval(combatInterval);
    combatInterval = null;
    if (!combatState) return;
    const bossId  = combatState.bossId;
    const bossDef = BOSSES.find(b => b.id === bossId);

    if (fled) {
        addLog("🏃 You fled the battle!", "log-system");
        combatState = null;
        setTimeout(() => { $("combatArena").style.display = "none"; renderBosses(); }, 800);
        return;
    }

    if (victory) {
        const bd = game.bosses[bossId];
        const reward = Math.floor(combatState.bossReward * getGoldMultiplier());
        game.gold += reward;
        let msgs = [`🏆 Victory! +${reward} Gold`];
        if (!bd.firstClear) {
            bd.firstClear = true;
            game.gold += bossDef.firstKillReward;
            msgs.push(`🎉 First kill bonus! +${bossDef.firstKillReward} Gold`);
            unlockBossAchievement(bossId);
        }
        bd.kills++;
        bd.level++;
        addXP(Math.floor(reward * 0.5));
        msgs.forEach(m => addLog(m, "log-victory"));
        notify(`⚔️ ${bossDef.name} defeated! +${reward} Gold`, "success");
        checkAchievements();
    } else {
        addLog("💀 Defeated...", "log-defeat");
        notify(`💀 You were defeated by ${bossDef?.name}!`, "error");
    }

    combatState = null;
    setTimeout(() => { $("combatArena").style.display = "none"; refreshEverything(); }, 2500);
}

$("fleeBtn")?.addEventListener("click", () => { if (combatState) endCombat(false, true); });

/* ==========================================
   PAST SELF COMBAT
========================================== */

let ghostState    = null;
let ghostInterval = null;
let pgTickAccum   = 0;
let ggTickAccum   = 0;

const PAST_PERIODS = [
    { label:"Yesterday",   days:1,  icon:"🌙" },
    { label:"1 Week Ago",  days:7,  icon:"📅" },
    { label:"2 Weeks Ago", days:14, icon:"🗓️" },
    { label:"1 Month Ago", days:30, icon:"📆" },
];

function renderPastSelf() {
    const el = $("pastSelfCards");
    if (!el) return;
    el.innerHTML = PAST_PERIODS.map(period => {
        const snap = findSnapshot(period.days);
        const available = !!snap;
        const ps = getPlayerCombatStats();
        const gs = snap ? getGhostCombatStats(snap) : null;
        const diffPower = snap ? getPower() - snap.power : 0;
        let diffHtml = "";
        if (snap) {
            const diffs = [
                { name:"STR", now:game.strength,  then:snap.strength||0 },
                { name:"END", now:game.endurance, then:snap.endurance||0 },
                { name:"KNO", now:game.knowledge, then:snap.knowledge||0 },
                { name:"DIS", now:game.discipline,then:snap.discipline||0 },
                { name:"SPD", now:game.speed,     then:snap.speed||0 },
            ];
            diffHtml = `<div class="past-diff-grid">${diffs.map(d => {
                const diff = d.now - d.then;
                const cls = diff > 0 ? "diff-pos" : diff < 0 ? "diff-neg" : "diff-zero";
                return `<div class="past-diff-row"><span>${d.name}</span><span class="${cls}">${diff > 0 ? "+" : ""}${diff.toFixed(2)}</span></div>`;
            }).join("")}</div>`;
        }
        return `<div class="boss-card ghost-card ${available ? "" : "ghost-unavailable"}">
            <div class="boss-card-top">
                <div class="boss-portrait">${period.icon}</div>
                ${snap ? `<span class="boss-level-badge">Lv ${snap.level}</span>` : `<span class="boss-level-badge" style="color:var(--muted)">No data</span>`}
            </div>
            <div class="boss-name">You — ${period.label}</div>
            <div class="boss-desc">${snap ? `Recorded: ${snap.date}` : `Keep playing to unlock this — you need ${period.days} days of data.`}</div>
            ${snap ? `
            <div class="boss-stats-row">
                <div class="boss-stat-box"><div class="bsl">ATK</div><div class="bsv" style="color:var(--red)">${(gs.attack).toFixed(1)}</div></div>
                <div class="boss-stat-box"><div class="bsl">DEF</div><div class="bsv" style="color:var(--blue)">${(gs.defense).toFixed(1)}</div></div>
                <div class="boss-stat-box"><div class="bsl">Power</div><div class="bsv" style="color:var(--purple)">${fmtInt(snap.power)}</div></div>
            </div>
            <div class="boss-reward-row" style="color:${diffPower >= 0 ? "var(--green)" : "var(--red)"}">
                Power diff: ${diffPower >= 0 ? "+" : ""}${fmtInt(diffPower)}
            </div>
            ${diffHtml}
            ` : ""}
            <button class="fight-btn" ${available ? "" : "disabled"} style="${available ? "background:linear-gradient(135deg,#a855f7,#7c3aed)" : ""}"
                onclick="startGhostCombat(${period.days})">
                ${available ? `👤 Fight ${period.label} Self` : "🔒 Not enough history"}
            </button>
        </div>`;
    }).join("");
}

function startGhostCombat(daysAgo) {
    if (ghostInterval) { endGhostCombat(false, true); }
    const snap = findSnapshot(daysAgo);
    if (!snap) { notify("No snapshot found for that period.", "error"); return; }

    const ps = getPlayerCombatStats();
    const gs = getGhostCombatStats(snap);

    ghostState = {
        snap,
        playerHP:  ps.maxHP, playerMaxHP: ps.maxHP,
        ghostHP:   gs.maxHP || 100, ghostMaxHP: gs.maxHP || 100,
        ghostAtk:  gs.attack, ghostDef: gs.defense,
        ghostCrit: gs.critChance,
        ghostAtkMs: gs.atkIntervalMs,
    };
    pgTickAccum = 0; ggTickAccum = 0;

    $("pastSelfArena").style.display = "block";
    $("pastArenaTitle").textContent = `You vs ${snap.date} Self`;
    $("pastArenaPlayerLevel").textContent = `Lv ${game.level}`;
    $("pastGhostName").textContent = `Past You (${snap.date})`;
    $("pastGhostLevel").textContent = `Lv ${snap.level}`;
    $("pastArenaAtk").textContent = ps.attack.toFixed(1);
    $("pastArenaDef").textContent = ps.defense.toFixed(1);
    $("pastGhostAtk").textContent = gs.attack.toFixed(1);
    $("pastGhostDef").textContent = gs.defense.toFixed(1);
    $("pastCombatLog").innerHTML = "";
    addGhostLog(`👤 Battle vs your past self from ${snap.date}!`, "log-system");
    updateGhostBars();
    ghostInterval = setInterval(ghostCombatTick, TICK_MS);
    $("pastSelfArena").scrollIntoView({ behavior:"smooth", block:"start" });
}

function ghostCombatTick() {
    if (!ghostState) return;
    const ps = getPlayerCombatStats();
    pgTickAccum += TICK_MS; ggTickAccum += TICK_MS;

    // Player hits ghost
    if (pgTickAccum >= ps.atkIntervalMs) {
        pgTickAccum = 0;
        const isCrit = ps.critChance > 0 && Math.random() * 100 < ps.critChance;
        let dmg = Math.max(0, ps.attack - ghostState.ghostDef);
        if (isCrit && dmg > 0) dmg *= 2;
        ghostState.ghostHP -= dmg;
        if (dmg === 0) addGhostLog(`🛡️ Past self blocks! (0 dmg)`, "log-system");
        else if (isCrit) addGhostLog(`💥 CRIT! You hit your past self for ${Math.round(dmg)}!`, "log-crit");
        else addGhostLog(`🗡️ You hit past self for ${Math.round(dmg)}.`, "log-player");
        if (dmg > 0) spawnFloatGhost(Math.round(dmg), isCrit ? "crit-dmg" : "player-dmg", true);
        if (ghostState.ghostHP <= 0) { ghostState.ghostHP = 0; updateGhostBars(); endGhostCombat(true, false); return; }
    }

    // Ghost hits player
    if (ggTickAccum >= ghostState.ghostAtkMs) {
        ggTickAccum = 0;
        const ghostCrit = ghostState.ghostCrit > 0 && Math.random() * 100 < ghostState.ghostCrit;
        let dmg = Math.max(0, ghostState.ghostAtk - ps.defense);
        if (ghostCrit && dmg > 0) dmg *= 2;
        ghostState.playerHP -= dmg;
        if (dmg === 0) addGhostLog(`🛡️ You block your past self!`, "log-system");
        else if (ghostCrit) addGhostLog(`👻 CRIT! Past self hits you for ${Math.round(dmg)}!`, "log-crit");
        else addGhostLog(`👻 Past self hits you for ${Math.round(dmg)}!`, "log-ghost");
        if (dmg > 0) spawnFloatGhost(Math.round(dmg), "ghost-dmg", false);
        if (ghostState.playerHP <= 0) { ghostState.playerHP = 0; updateGhostBars(); endGhostCombat(false, false); return; }
    }

    updateGhostBars();
    $("pastArenaTickDisplay").textContent = `⏱ ${(pgTickAccum/1000).toFixed(1)}s`;
}

function updateGhostBars() {
    if (!ghostState) return;
    const pPct = Math.max(0, (ghostState.playerHP / ghostState.playerMaxHP) * 100);
    const gPct = Math.max(0, (ghostState.ghostHP  / ghostState.ghostMaxHP)  * 100);
    $("pastPlayerHPBar").style.width = pPct + "%";
    $("pastGhostHPBar").style.width  = gPct + "%";
    $("pastPlayerHPText").textContent = `${Math.max(0,Math.round(ghostState.playerHP))} / ${Math.round(ghostState.playerMaxHP)}`;
    $("pastGhostHPText").textContent  = `${Math.max(0,Math.round(ghostState.ghostHP))} / ${Math.round(ghostState.ghostMaxHP)}`;
}

function endGhostCombat(victory, fled) {
    clearInterval(ghostInterval);
    ghostInterval = null;
    if (!ghostState) return;
    const snap = ghostState.snap;

    if (fled) {
        addGhostLog("🏃 You fled!", "log-system");
        ghostState = null;
        setTimeout(() => { $("pastSelfArena").style.display = "none"; renderPastSelf(); }, 800);
        return;
    }

    if (victory) {
        game.pastWins++;
        const reward = Math.floor(200 * getGoldMultiplier());
        game.gold += reward;
        addXP(150);
        addGhostLog(`🏆 You beat your past self! +${reward} Gold`, "log-victory");
        notify(`👤 Past self defeated! You've grown so much! +${reward} Gold`, "purple");
        checkAchievements();
    } else {
        addGhostLog(`💀 Your past self won. Keep training!`, "log-defeat");
        notify(`👻 Your past self beat you! Train harder.`, "error");
    }

    ghostState = null;
    setTimeout(() => { $("pastSelfArena").style.display = "none"; renderPastSelf(); refreshEverything(); }, 2500);
}

$("pastFleeBtn")?.addEventListener("click", () => { if (ghostState) endGhostCombat(false, true); });

function addGhostLog(text, cls) {
    const log = $("pastCombatLog");
    if (!log) return;
    const e = document.createElement("div");
    e.className = `log-entry ${cls}`;
    e.textContent = text;
    log.prepend(e);
    while (log.children.length > 50) log.lastChild.remove();
}

/* ==========================================
   SHARED COMBAT HELPERS
========================================== */

function addLog(text, cls) {
    const log = $("combatLog");
    if (!log) return;
    const e = document.createElement("div");
    e.className = `log-entry ${cls}`;
    e.textContent = text;
    log.prepend(e);
    while (log.children.length > 50) log.lastChild.remove();
}

function spawnFloat(amount, cls, side) {
    const el = document.querySelector(`.${side}`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const d = document.createElement("div");
    d.className = `float-dmg ${cls}`;
    d.textContent = `-${amount}`;
    d.style.left = (rect.left + rect.width/2 + (Math.random()-.5)*60) + "px";
    d.style.top  = (rect.top  + rect.height/2 + (Math.random()-.5)*30) + "px";
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 950);
}

function spawnFloatGhost(amount, cls, hitGhost) {
    const side = hitGhost ? "ghost-side" : "player-side";
    const el = document.querySelector(`.${side}`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const d = document.createElement("div");
    d.className = `float-dmg ${cls}`;
    d.textContent = `-${amount}`;
    d.style.left = (rect.left + rect.width/2 + (Math.random()-.5)*60) + "px";
    d.style.top  = (rect.top  + rect.height/2 + (Math.random()-.5)*30) + "px";
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 950);
}

/* ==========================================
   RENDER PROGRESS
========================================== */

function renderProgress() {
    renderTotals();
    renderStatBreakdown();
    renderBossProgress();
    drawPowerGraph();
}

function renderTotals() {
    const el = $("lifetimeTotals");
    if (!el) return;
    const items = [
        { icon:"💪", label:"Pushups",   value:game.totals.pushups },
        { icon:"🔥", label:"Situps",    value:game.totals.situps  },
        { icon:"🦾", label:"Pullups",   value:game.totals.pullups },
        { icon:"🏃", label:"Miles Run", value:game.totals.running },
        { icon:"🚶", label:"Miles Walked",value:game.totals.walking},
        { icon:"📚", label:"Min Read",  value:game.totals.reading },
    ];
    el.innerHTML = items.map(x => `
        <div class="total-card">
            <div class="total-icon">${x.icon}</div>
            <div class="total-label">${x.label}</div>
            <div class="total-value">${fmt(x.value)}</div>
        </div>
    `).join("");
}

function renderStatBreakdown() {
    const el = $("statBreakdown");
    if (!el) return;
    const maxStat = Math.max(game.strength, game.endurance, game.knowledge, game.discipline, game.speed, 1);
    const stats = [
        { name:"Strength",   val:game.strength,   color:"var(--str)", icon:"💪" },
        { name:"Endurance",  val:game.endurance,  color:"var(--end)", icon:"🏃" },
        { name:"Knowledge",  val:game.knowledge,  color:"var(--kno)", icon:"📚" },
        { name:"Discipline", val:game.discipline, color:"var(--dis)", icon:"🧠" },
        { name:"Speed",      val:game.speed,      color:"var(--spd)", icon:"⚡" },
    ];
    el.innerHTML = stats.map(s => {
        const pct = Math.min(100, (s.val / maxStat) * 100);
        return `<div class="sbd-card">
            <div class="sbd-stat" style="color:${s.color}">${s.icon} ${fmt(s.val)}</div>
            <div class="sbd-label">${s.name}</div>
            <div class="sbd-bar-bg"><div class="sbd-bar-fill" style="width:${pct}%;background:${s.color}"></div></div>
        </div>`;
    }).join("");
}

function renderBossProgress() {
    const el = $("bossProgress");
    if (!el) return;
    const cleared = BOSSES.filter(b => game.bosses[b.id]?.firstClear).length;
    const totalKills = BOSSES.reduce((s,b) => s + (game.bosses[b.id]?.kills||0), 0);
    el.innerHTML = `
        <p style="margin-bottom:14px;color:var(--muted)">${cleared}/${BOSSES.length} first-clears · ${totalKills} total kills</p>
        <div style="display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">
        ${BOSSES.map(b => {
            const bd = game.bosses[b.id];
            return `<div style="background:var(--panel2);border-radius:12px;padding:14px;border:1px solid ${bd.firstClear ? "rgba(255,213,74,.25)" : "var(--border)"}">
                <div style="font-size:28px">${b.emoji}</div>
                <div style="font-weight:700;margin:6px 0 2px">${b.name}</div>
                <div style="font-size:12px;color:var(--muted)">Lv ${bd.level} · ${bd.kills} kills</div>
                ${bd.firstClear ? `<div style="font-size:11px;color:var(--gold);margin-top:4px">✅ Cleared</div>` : ""}
            </div>`;
        }).join("")}
        </div>
    `;
}

function drawPowerGraph() {
    const canvas = $("powerChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth || 900;
    canvas.width = W;
    const H = 280;
    canvas.height = H;
    ctx.clearRect(0,0,W,H);

    const data = game.powerHistory;
    if (!data || data.length < 2) {
        ctx.fillStyle = "rgba(255,255,255,.3)";
        ctx.font = "16px Inter";
        ctx.fillText("Not enough data yet — keep logging activities!", 40, H/2);
        return;
    }

    const pad = { t:20, r:20, b:40, l:55 };
    const cW = W - pad.l - pad.r;
    const cH = H - pad.t - pad.b;
    const maxP = Math.max(...data.map(d => d.power), 10);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,.05)";
    ctx.lineWidth = 1;
    for (let i=0; i<=4; i++) {
        const y = pad.t + (cH / 4) * i;
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cW, y); ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,.3)";
        ctx.font = "11px Inter";
        ctx.textAlign = "right";
        ctx.fillText(fmtInt(maxP * (1 - i/4)), pad.l - 6, y + 4);
    }

    // Gradient fill
    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + cH);
    grad.addColorStop(0,   "rgba(255,213,74,.3)");
    grad.addColorStop(1,   "rgba(255,213,74,.0)");
    ctx.beginPath();
    data.forEach((pt, i) => {
        const x = pad.l + (i/(data.length-1)) * cW;
        const y = pad.t + cH - (pt.power / maxP) * cH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    const lastX = pad.l + cW, firstX = pad.l;
    ctx.lineTo(lastX, pad.t + cH);
    ctx.lineTo(firstX, pad.t + cH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.strokeStyle = "rgba(255,213,74,.9)";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    data.forEach((pt, i) => {
        const x = pad.l + (i/(data.length-1)) * cW;
        const y = pad.t + cH - (pt.power / maxP) * cH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dots
    data.forEach((pt, i) => {
        const x = pad.l + (i/(data.length-1)) * cW;
        const y = pad.t + cH - (pt.power / maxP) * cH;
        ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI*2);
        ctx.fillStyle = "var(--gold)"; ctx.fill();
    });

    // X labels (first + last + a few)
    const labelIdxs = [0, Math.floor(data.length/3), Math.floor(data.length*2/3), data.length-1];
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.font = "11px Inter";
    labelIdxs.forEach(i => {
        if (i < data.length) {
            const x = pad.l + (i/(data.length-1)) * cW;
            ctx.fillText(data[i].date.slice(5), x, H - 10);
        }
    });
}

/* ==========================================
   REWARD SHOP
========================================== */

function getRewardCost(reward) {
    return Math.floor(reward.baseCost * Math.pow(1.15, reward.timesRedeemed || 0));
}

function renderRewards() {
    const el = $("rewardContainer");
    if (!el) return;
    if (!game.rewards.length) { el.innerHTML = "<p style='color:var(--muted)'>No rewards yet.</p>"; return; }
    el.innerHTML = game.rewards.map(r => {
        const cost = getRewardCost(r);
        const next = Math.floor(r.baseCost * Math.pow(1.15, r.timesRedeemed + 1));
        return `<div class="reward-card">
            <div class="reward-header">
                <div class="reward-name-text">${r.name}</div>
                <div class="reward-cost-badge">🪙 ${fmtInt(cost)}</div>
            </div>
            <div class="reward-desc-text">${r.description || ""}</div>
            <div class="reward-meta">Category: ${r.category} · Redeemed ${r.timesRedeemed}× · Next cost: ${fmtInt(next)}</div>
            <button class="buy-btn" onclick="redeemReward('${r.id}')">
                ${game.gold >= cost ? "✅ Redeem" : `🔒 Need ${fmtInt(cost - game.gold)} more Gold`}
            </button>
        </div>`;
    }).join("");
    $("rewardStats").textContent = `${game.rewards.length} rewards · ${game.rewardHistory.length} total redemptions`;
}

function redeemReward(id) {
    const r = game.rewards.find(x => x.id === id);
    if (!r) return;
    const cost = getRewardCost(r);
    if (game.gold < cost) { notify("❌ Not enough gold!", "error"); return; }
    game.gold -= cost;
    r.timesRedeemed++;
    game.rewardHistory.unshift({ reward:r.name, date: new Date().toLocaleString(), cost });
    notify(`🎉 Reward redeemed: ${r.name}!`, "success");
    refreshEverything();
}

function renderRewardHistory() {
    const el = $("rewardHistory");
    if (!el) return;
    if (!game.rewardHistory.length) { el.innerHTML = "<p style='color:var(--muted)'>No redemptions yet.</p>"; return; }
    el.innerHTML = game.rewardHistory.slice(0,20).map(e =>
        `<div class="reward-card"><strong>${e.reward}</strong><br>
         <span style="color:var(--muted);font-size:13px">${e.date} · ${fmtInt(e.cost)} Gold</span></div>`
    ).join("");
}

function renderWishlist() {
    const el = $("wishlistContainer");
    if (!el) return;
    if (!game.wishlist.length) { el.innerHTML = "<p style='color:var(--muted);font-size:13px'>No goals yet.</p>"; return; }
    el.innerHTML = game.wishlist.map((item,i) => {
        const pct = Math.min(100, (game.gold / item.cost) * 100);
        return `<div class="wishlist-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <span style="font-weight:700">${item.name}</span>
                <span style="font-size:12px;color:var(--gold)">${fmtInt(game.gold)} / ${fmtInt(item.cost)}</span>
            </div>
            <div style="width:100%;height:7px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden;margin-bottom:6px">
                <div style="width:${pct}%;height:100%;background:var(--gold);border-radius:99px;transition:width .4s"></div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:12px;color:var(--muted)">${pct.toFixed(1)}%</span>
                <button onclick="removeWishlist(${i})" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:12px">✕ Remove</button>
            </div>
        </div>`;
    }).join("");
}

function removeWishlist(i) {
    game.wishlist.splice(i, 1);
    renderWishlist();
    saveGame();
}

/* ==========================================
   SAVE/EXPORT/IMPORT
========================================== */

function exportSave() {
    const code = btoa(JSON.stringify(game));
    showModal(
        "📤 Export Save Code",
        "Copy this code and paste it on another device to import your progress.",
        `<div class="modal-code">${code}</div>`,
        [
            { label:"📋 Copy Code", primary:true,  action:() => { navigator.clipboard.writeText(code).then(() => notify("Copied to clipboard!", "success")); }},
            { label:"Close",        primary:false, action:closeModal },
        ]
    );
}

function importSave() {
    const code = $("importInput").value.trim();
    if (!code) { notify("Paste a save code first.", "error"); return; }
    try {
        const loaded = JSON.parse(atob(code));
        game = Object.assign(defaultState(), loaded);
        patchState();
        saveGame();
        refreshEverything();
        $("importInput").value = "";
        notify("✅ Save imported successfully!", "success");
    } catch(e) {
        notify("❌ Invalid save code.", "error");
    }
}

function wipeSave() {
    showModal(
        "⚠️ Wipe Save Data",
        "This will permanently delete ALL your progress — levels, stats, gold, everything. This cannot be undone.",
        "",
        [
            { label:"🗑️ Yes, wipe everything", primary:false, danger:true, action:() => {
                game = defaultState();
                createStarterRewards();
                localStorage.removeItem(STORAGE_KEY);
                closeModal();
                refreshEverything();
                notify("Save wiped. Starting fresh!", "error");
            }},
            { label:"Cancel", primary:true, action:closeModal },
        ]
    );
}

/* ==========================================
   MODAL
========================================== */

function showModal(title, body, extra, buttons) {
    $("modalContent").innerHTML = `
        <div class="modal-title">${title}</div>
        <div class="modal-body">${body}</div>
        ${extra}
        <div class="modal-btns">
            ${buttons.map((b,i) => `<button class="modal-btn ${b.primary ? "primary" : b.danger ? "danger" : "secondary"}" data-modal-btn="${i}">${b.label}</button>`).join("")}
        </div>
    `;
    $("modalOverlay").style.display = "flex";
    buttons.forEach((b,i) => {
        document.querySelector(`[data-modal-btn="${i}"]`)?.addEventListener("click", b.action);
    });
    $("modalOverlay").addEventListener("click", e => { if (e.target === $("modalOverlay")) closeModal(); }, { once:true });
}

function closeModal() { $("modalOverlay").style.display = "none"; }

/* ==========================================
   STARTER REWARDS
========================================== */

function createStarterRewards() {
    if (game.rewards && game.rewards.length) return;
    game.rewards = [
        { id:"r1", name:"Ice Cream 🍦",         description:"Sweet treat, well earned.",    baseCost:50,   category:"Food",         timesRedeemed:0 },
        { id:"r2", name:"30 Min Gaming 🎮",      description:"No guilt gaming session.",     baseCost:250,  category:"Gaming",       timesRedeemed:0 },
        { id:"r3", name:"Movie Night 🎬",        description:"Pick any movie you want.",     baseCost:500,  category:"Entertainment",timesRedeemed:0 },
        { id:"r4", name:"Cheat Meal 🍕",         description:"Eat whatever you want.",       baseCost:750,  category:"Food",         timesRedeemed:0 },
        { id:"r5", name:"Full Day Off 😎",       description:"No obligations, just rest.",   baseCost:2000, category:"Break Time",   timesRedeemed:0 },
    ];
}

/* ==========================================
   POWER HISTORY
========================================== */

function savePowerHistory() {
    const today = todayStr();
    const existing = game.powerHistory.find(p => p.date === today);
    if (existing) { existing.power = getPower(); existing.level = game.level; }
    else game.powerHistory.push({ date:today, power:getPower(), level:game.level });
    if (game.powerHistory.length > 90) game.powerHistory.shift();
}

/* ==========================================
   NAVIGATION
========================================== */

function bindNavigation() {
    const btns  = document.querySelectorAll(".nav-btn");
    const pages = document.querySelectorAll(".page");
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            pages.forEach(p => p.classList.remove("active-page"));
            btn.classList.add("active");
            const page = document.getElementById(btn.dataset.page);
            if (page) page.classList.add("active-page");
            // Lazy render on nav
            const pg = btn.dataset.page;
            if (pg === "bosses")      renderBosses();
            if (pg === "pastself")    renderPastSelf();
            if (pg === "achievements")renderAchievements();
            if (pg === "progress")    renderProgress();
            if (pg === "shop")        { renderRewards(); renderRewardHistory(); renderWishlist(); }
        });
    });
}

/* ==========================================
   ACTIVITY BUTTONS
========================================== */

function bindActivityButtons() {
    const bindings = [
        ["pushupBtn", "pushupInput", v => logPushups(parseInt(v))],
        ["situpBtn",  "situpInput",  v => logSitups(parseInt(v))],
        ["pullupBtn", "pullupInput", v => logPullups(parseInt(v))],
        ["runBtn",    "runInput",    v => logRun(parseFloat(v))],
        ["walkBtn",   "walkInput",   v => logWalk(parseFloat(v))],
        ["readBtn",   "readInput",   v => logReading(parseInt(v))],
    ];
    bindings.forEach(([btnId, inputId, fn]) => {
        const btn = $(btnId), inp = $(inputId);
        if (!btn || !inp) return;
        const run = () => {
            const v = inp.value;
            if (!v || parseFloat(v) <= 0) { notify("Enter a valid amount!", "error"); return; }
            fn(v);
            inp.value = "";
            afterActivity();
        };
        btn.addEventListener("click", run);
        inp.addEventListener("keydown", e => { if (e.key === "Enter") run(); });
    });
}

function afterActivity() {
    checkAchievements();
    savePowerHistory();
    saveSnapshot();
    refreshEverything();
}

/* ==========================================
   SHOP BUTTONS
========================================== */

function bindShopButtons() {
    $("createRewardBtn")?.addEventListener("click", () => {
        const name = $("rewardName").value.trim();
        const desc = $("rewardDescription").value.trim();
        const cost = Number($("rewardCost").value);
        const cat  = $("rewardCategory").value;
        if (!name || !cost) { notify("Name and cost required.", "error"); return; }
        game.rewards.push({ id:Date.now().toString(), name, description:desc, baseCost:cost, category:cat, timesRedeemed:0 });
        $("rewardName").value = $("rewardDescription").value = $("rewardCost").value = "";
        notify(`🎁 Reward created: ${name}`, "success");
        refreshEverything();
    });
    $("addWishlistBtn")?.addEventListener("click", () => {
        const name = $("wishlistName").value.trim();
        const cost = Number($("wishlistCost").value);
        if (!name || !cost) { notify("Name and cost required.", "error"); return; }
        game.wishlist.push({ id:Date.now().toString(), name, cost });
        $("wishlistName").value = $("wishlistCost").value = "";
        notify(`⭐ Goal added: ${name}`, "success");
        refreshEverything();
    });
    $("exportBtn")?.addEventListener("click", exportSave);
    $("importBtn")?.addEventListener("click", importSave);
    $("wipeBtn")?.addEventListener("click", wipeSave);
}

/* ==========================================
   GLOBAL REFRESH
========================================== */

function refreshEverything() {
    renderDashboard();
    renderQuests();
    renderAchievements();
    renderBosses();
    renderPastSelf();
    renderRewards();
    renderRewardHistory();
    renderWishlist();
    renderTotals();
    renderBossProgress();
    drawPowerGraph();
    saveGame();
}

/* ==========================================
   INIT
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    loadGame();
    checkStreak();
    generateDailyQuests();
    createStarterRewards();
    checkDailyBonus();
    checkAchievements();
    savePowerHistory();
    saveSnapshot();
    bindNavigation();
    bindActivityButtons();
    bindShopButtons();

    // Quote rotation
    const quoteEl = $("quoteDisplay");
    if (quoteEl) {
        quoteEl.textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        setInterval(() => {
            quoteEl.style.opacity = "0";
            setTimeout(() => {
                quoteEl.textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];
                quoteEl.style.opacity = "1";
            }, 400);
        }, 12000);
    }

    // Quest timer update
    setInterval(renderQuestTimer, 60000);

    refreshEverything();
});
