# ⚔️ Real Life RPG

**Turn your real-world habits into RPG stats. Every pushup, mile, and page read makes you stronger — in the game and in life.**

![Version](https://img.shields.io/badge/version-1.0-gold) ![License](https://img.shields.io/badge/license-MIT-green) ![Platform](https://img.shields.io/badge/platform-browser-blue)

---

## 🎮 What Is This?

Real Life RPG is a browser-based habit tracker disguised as an RPG. You log real physical and mental activities — pushups, running, reading — and they translate directly into character stats that affect combat power, boss fights, and progression.

No logins. No servers. No subscriptions. Just open `index.html` and start grinding.

---

## ✨ Features

### 📊 Real Stats From Real Work
| Activity | Gains |
|----------|-------|
| Pushups | +Strength, +XP |
| Situps | +Strength, +Discipline, +XP |
| Pullups | +Strength (×2.5), +XP |
| Running | +Endurance, +Speed, +XP per mile |
| Walking | +Endurance, +Speed, +XP per mile |
| Reading | +Knowledge, +XP per minute |

### ⚔️ Boss Battles
Five bosses ranging from a Training Dummy to the Shadow Emperor. Bosses level up after every kill and scale infinitely — so your grind never stops mattering. Combat is automatic with real-time HP bars, floating damage numbers, and a battle log.

| Boss | Base HP | Base ATK |
|------|---------|----------|
| 🪆 Training Dummy | 150 | 8 |
| 👺 Goblin King | 500 | 12 |
| 🗿 Stone Golem | 2,500 | 30 |
| 🐉 Dragon | 10,000 | 60 |
| 👹 Shadow Emperor | 50,000 | 120 |

### 👤 Fight Your Past Self
The game automatically snapshots your stats over time. You can fight ghost versions of yourself from:
- Yesterday
- 1 Week Ago
- 2 Weeks Ago
- 1 Month Ago

Each ghost card shows exactly how much you've grown in every stat. Win the fight, earn gold, unlock the achievement.

### 💾 Save Anywhere
Export your save as a base64 code you can paste into any device. Import it back instantly. No account needed.

### 📜 Daily Quests & Streaks
Three randomised quests refresh every day. Your daily login bonus scales with your streak — the longer you keep showing up, the more gold you earn just for opening the game.

### 🛒 Reward Shop
Create real-life rewards (ice cream, gaming time, a movie night) with gold costs. The game makes you earn them. Costs scale up the more you redeem, so nothing stays cheap forever.

### 🏆 19 Achievements
From "First Blood" (one pushup) to "Shadow Conqueror" (defeat the final boss) to "Better Than Yesterday" (beat your past self).

---

## 🚀 Getting Started

### Play Instantly
Just open `index.html` in any modern browser. No build step, no dependencies, no internet required after the font loads.

```
RealLifeRPG/
├── index.html   ← open this
├── style.css
├── script.js
└── README.md
```

### Host on GitHub Pages
1. Fork or upload this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your game is live at `https://yourusername.github.io/your-repo-name`

---

## ⚔️ Combat System

### Your Stats
| Stat | Combat Effect |
|------|--------------|
| Strength | Attack damage (×2) |
| Endurance | Max HP (+15 per point) |
| Knowledge | Crit chance (+0.2% per point) |
| Discipline | Defense (+0.5 per point) |
| Speed | Attack interval (faster = more DPS) |

### Formulas
```
Max HP        = 100 + (Endurance × 15)
Attack        = Strength × 2
Defense       = Discipline × 0.5
Crit Chance   = Knowledge × 0.2%
Atk Interval  = 4000ms / (1 + Speed × 0.02)
```

At zero stats you attack every **4 seconds**. Bosses attack every **2 seconds** — so you start slower and speed up as you train.

Player damage floors at **0** — if your attack doesn't exceed the boss's defense, you deal nothing. Gear up before picking a fight.

### Boss Scaling (per kill)
```
HP      × 1.30 per level
Attack  × 1.18 per level
Defense × 1.10 per level
Reward  × 1.20 per level
```

---

## 📈 Progression

### Levels
```
XP to reach level N = (N-1)² × 25
```

### Titles
| Level | Title |
|-------|-------|
| 1 | Novice |
| 5 | Apprentice |
| 10 | Warrior |
| 20 | Champion |
| 35 | Hero |
| 50 | Legend |
| 75 | Myth |
| 100 | Immortal |

### Gold Multiplier
Every 10 levels adds +0.10× to all gold earned. At level 50 you earn 1.5× gold from everything.

---

## 💡 Tips

- **Start with the Training Dummy.** You need Strength > 0.5 to reliably deal damage to it.
- **Run to get speed.** Faster attack intervals mean dramatically more DPS at higher stats.
- **Log every day.** The streak bonus compounds fast and past-self snapshots require daily history.
- **Set wishlist goals.** Having a target makes grinding feel purposeful.
- **Export your save** before clearing browser data — it only lives in `localStorage`.

---

## 🗺️ Roadmap

- [ ] Mobile PWA (installable to home screen)
- [ ] Guild system — share a code, see friends' stats
- [ ] Prestige system — wipe stats for a permanent gold multiplier
- [ ] Weekly challenge boss
- [ ] Leaderboard (opt-in, via free backend)

---

## 🛠️ Tech Stack

Pure vanilla HTML, CSS, and JavaScript. Zero dependencies, zero build tools, zero frameworks. The only external resource is the Google Fonts load for Cinzel and Inter.

All save data lives in `localStorage` under the key `realLifeRPG_v2`. Snapshots (for Past Self battles) use `realLifeRPG_snapshots`.

---

## 📄 License

MIT — do whatever you want with it. If you build something cool on top of it, a star on the repo would be appreciated. ⭐

---

*Built for people who want their habits to feel like progress — because they are.*
