# roach-cnc

Restoring Tyler Roach's AXYZ 4012 CNC router: the proprietary control comes out, LinuxCNC over EtherCAT goes in.

## 🎯 The project

- **The machine** · an AXYZ 4012 gantry router. AXYZ builds to order, runs proprietary software and publishes almost no documentation — so this repo is the machine's manual, written as we go.
- **The plan** · keep the iron and the spindle; replace everything that thinks.
	- **Stays:** the frame, racks and rails, the HSD spindle, the pneumatics
	- **Goes:** the control cabinet's guts — stepper amps, connector board, power board, FPGA board — the axis motors, and the spindle's old VFD
	- **Comes in:** a LinuxCNC PC, four Leadshine CS3E EtherCAT drives with matching closed-loop motors (X1, X2, Y, Z), a new VFD, a rebuilt cabinet
- **The power** · everything runs on single-phase 220 V. The spindle is re-strapped from 380 V to 220 V to allow it.
- **The goal** · cutting parts with the spindle at its full 8 kW — aluminum, and steel if possible.
- **The clock** · weekends.

## 👥 Who does what

| Who | Role | Owns |
|---|---|---|
| **Felix** | Project lead | This repo and its docs · the manuals · the plan and timeline · setting up the LinuxCNC computer · building |
| **Nathan Rivas** | Electrical engineer | Choosing the parts · the wiring diagram · the system and cabinet design. Nothing that carries mains is built before he has read it |
| **Tyler Roach** | The machine's owner | Buying the parts · the PC for LinuxCNC · building |
| **Jacob Smith** | Helping as his time allows | — |
| **Claude** | AI sessions Felix runs between weekends | Checking each part against its manual · drafting parts lists, wiring and the LinuxCNC configuration · each weekend's survey sheet. It cannot touch or measure anything, and it does not stand in for Nathan on electrical safety |

## 🏭 The machine today

❓ marks what is still unknown — this weekend's survey finds it.

| Part | What we know |
|---|---|
| **Router** | AXYZ 4012, 4000 series. ❓ serial number |
| **Spindle** | HSD ES 919A — 2-pole, air-cooled, 6.6 kW continuous and 8 kW peak duty, 24,000 rpm. Wired 380 V star (15.8 A) or 220 V delta (27.4 A). Air-released tool holder with a manual release button. ❓ how its terminal board is strapped today |
| **Old VFD** | Control Techniques Commander SE — 380–480 V three-phase, 7.5 kW. Coming out |
| **Axis motors** | Vexta PK299-F4.5A steppers on Pacific Scientific 6410 drives. Coming out. ❓ mount and shaft dimensions, which the new motors must match |
| **Mechanics** | ❓ expected: rack and pinion on X and Y, a screw on Z — as on a 2007 AXYZ 4008 |
| **Switches and sensors** | ❓ limit and home switches, E-stops, tool sensor |
| **Pneumatics** | A solenoid valve releases the tool. The spindle wants 6 bar for release and 4 bar for pressurization. ❓ valves and their coil voltage |
| **Cabinet** | Intact, nothing unplugged. Holds the old drives, a power board, an FPGA card, a connector board, a toroidal transformer, fuses and a contactor |
| **Shop power** | Single-phase 220 V. ❓ whether the panel can give the 90–100 A circuit the new VFD's feed is sized for |

The evidence behind every line — manual pages, photos, sources — is in [docs/findings.md](docs/findings.md).

## 🧩 The new system

```
 LinuxCNC PC ══ EtherCAT ══▶ CS3E X1 ══▶ CS3E X2 ══▶ CS3E Y ══▶ CS3E Z ┄┄▶ (more I/O, if needed)
                               │           │           │          │
                            motor X1    motor X2    motor Y    motor Z + brake      limit + home switches → drive inputs

 shop power ─▶ disconnect + fuses ─▶ E-stop chain (hard-wired) ─┬─▶ drive DC supply ─▶ the four drives
                                                                └─▶ spindle VFD ─▶ HSD spindle ◀─ air: tool release, pressurization
 24 V DC ─▶ sensors, valves, relays          spindle ─▶ control: tool locked · collet open · overheated
```

| Piece | Choice | Status |
|---|---|---|
| **Control** | LinuxCNC on one of Tyler's PCs | ✅ decided — a latency test picks which PC |
| **Axis drives** | 4 × Leadshine CS3E-D1008, EtherCAT | 🟡 recommended — Nathan to confirm |
| **Axis motors** | NEMA 34 Leadshine closed-loop, matched to the drives; a brake on Z | 🟡 likely — model per axis after the survey |
| **Spindle** | The HSD ES 919A, kept, re-strapped to 220 V delta | ✅ decided |
| **Spindle VFD** | VEVOR G300-015-045A-2SB — 15 kW, 45 A out, single-phase in | 🛒 bought 2026-11-13 |
| **VFD protection** | Disconnect, fuses, filter, choke, braking resistor, shielded cable — [Nathan's BoM](refs/VFD_Spindle_Protection_BOM.xlsx) | 🟡 draft |
| **Safety** | A hard-wired E-stop chain that drops drive and spindle power | ❓ to design |
| **Extra I/O** | Limits and homes on the drives' own inputs; spindle, air and E-stop signals likely on a small EtherCAT coupler | ❓ open |
| **Air** | Filter, regulator, valves on 24 V outputs | ❓ after the survey |

## 🗓️ The timeline

A draft until the survey lands. Parts lead time and survey surprises move everything after weekend 2; Thanksgiving and the year-end holidays are left empty.

| Weekend | At the machine | Between weekends |
|---|---|---|
| **1 · Nov 14–15** | **Survey**: photos, measurements, the kill check on the iron | Survey read into the repo; motor model, supplies and I/O drafted for Nathan |
| **2 · Nov 21–22** | PC: install LinuxCNC, latency test; survey gaps; label and strip the cabinet | Bench kit ordered — one drive, one motor, one supply; one-axis configuration |
| **3 · Dec 5–6** | **One-axis rig**: jog and home a motor from LinuxCNC on the bench | Schematic and cabinet layout; the full order once the rig moves |
| **4–5 · Dec 12–20** | Cabinet: backplate, power, E-stop chain, drives, wiring | Four-axis configuration; wiring checked against build photos |
| **6 · Jan 9–10** | Motors on the machine; each axis: direction, scale, limits, homing, gantry squaring | Configuration tuned from the numbers that come back |
| **7 · Jan 16–17** | Spindle, VFD, air; interlocks proven | VFD parameter sheet; interlock logic |
| **8 · Jan 23–24** | First cuts; a test part measured | As-built drawings; final parts list |

- **Two things are proven before the big spend:**
	1. **The survey** — the iron is worth a new control, and we know what bolts on.
	2. **The one-axis rig** — one PC, one drive, one motor moving under LinuxCNC, before four drives get a cabinet.
- **v1 is done when** the machine homes itself, stops safely on E-stop, runs its spindle to 24,000 rpm behind its interlocks, and cuts a test part that measures true — the full list is in [MAP.md](MAP.md) §5.

## 🔁 How a weekend runs

1. **Friday** — the weekend's sheet is ready in `lab/`: what to do, what to measure, what to buy.
2. **The weekend** — we work the sheet at the machine. Photo first, label second, unplug last.
3. **Sunday night** — photos go into `refs/photos/`, the filled sheet is committed.
4. **Weeknights** — the desk work the weekend exposed: parts checked against manuals, drafts for Nathan, the LinuxCNC configuration, the next sheet.

- **This weekend's sheet** · [lab/packet.html](lab/packet.html) — the survey. To fill it in:
	- run `bun lab/serve.ts` in the repo and open `http://localhost:4012`
	- what you type and tick saves to `lab/survey.json` as you go
	- opened straight from disk it is read-only; it prints in black and white either way

## 📍 Where we stand — 2026-11-13

- **Done**
	- the spindle identified from its plate and matched to HSD's data sheet
	- the VFD sized, bought, and checked against its manual: 45 A out against the spindle's 31.2 A peak
	- Nathan's protection BoM for the spindle drafted and read against the manuals
	- the survey sheet built, with 19 photos already in
- **Next** · the survey at Tyler's, Nov 14–15
- **Open questions**
	- **Tyler** — can the shop's panel give a 2-pole 90–100 A circuit?
	- **Nathan** — four notes on the spindle BoM: [docs/findings.md](docs/findings.md), F10
	- **Nathan** — which Leadshine motor per axis, once the mounts are measured
	- **Nathan** — where the extra I/O lives, and how LinuxCNC commands the VFD: 0–10 V or Modbus
	- **Nathan** — what the wiring is drawn in
	- **Felix** — v1 scope: tool released by hand at the spindle's button first, automatic tool change later?

## 📂 What's where

| Path | What it is |
|---|---|
| [refs/](refs/) | Manuals, data sheets, Nathan's BoM, and `refs/photos/` |
| [lab/](lab/) | The weekend sheets and the survey's answers — working files, built to be thrown away |
| [docs/findings.md](docs/findings.md) | What has been checked, each claim with its manual page, photo or source |
| [DECISIONS.md](DECISIONS.md) | What has been decided, by whom, when |
| [MAP.md](MAP.md) · [BOARD.md](BOARD.md) · [LEDGER.md](LEDGER.md) | Project bookkeeping for the Claude sessions: open questions with recommendations, work state, session log |
