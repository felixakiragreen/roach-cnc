# roach-cnc

Bringing Tyler Roach's AXYZ 4012 CNC router back to life: the proprietary control comes out, LinuxCNC over EtherCAT goes in.

AXYZ builds to order and publishes almost nothing, so this repo is the machine's manual as we write it: what the machine is, what we are putting in it, what to buy, how it is wired, and where the work stands. It is an Explorer's ground (`~/code/agents/canon/mantles/explorer.md`) — a git repo on `master`, Felix's to keep or fold, not yet a founded building.

- **The crew** · **Felix** — this repo, the plan, the LinuxCNC computer, building · **Nathan Rivas** — electrical engineer: the parts list, the wiring diagram, the cabinet; nothing carrying mains is built before he has read it · **Tyler Roach** — the machine's owner: buys the parts, supplies the PC, builds · **Jacob Smith** — interested, helping as his time allows
- **The clock** · weekends only
- **This weekend's sheet** · [lab/packet.html](lab/packet.html) — fillable: run `bun lab/serve.ts`, open `http://localhost:4012`, and what is typed and ticked saves to `lab/survey.json`. Opened straight from disk it is read-only; it prints in black and white either way

## The bet

Three people working weekends can take an undocumented AXYZ 4012 to cutting parts — four Leadshine CS3E EtherCAT stepper axes (X1, X2, Y, Z), the HSD spindle kept on a new VFD, LinuxCNC in charge — **if this repo carries the truth between weekends**: every bench day opens on a printed packet (what to do, measure, buy) and closes on photos and measurements that write the next one.

- **The ground's kill criterion** — either result ends the retrofit as drawn:
	- the survey shows the iron is not worth a new control: racks, bearings or the spindle past what the crew will spend to fix
	- the one-axis bench rig — one PC, one CS3E, one motor — cannot be jogged from LinuxCNC over EtherCAT after two bench weekends
- **The cheapest proof** — two things a human can hold, in order:
	1. **the survey packet** — a printed sheet carried to the machine before the cabinet is stripped; filled in, it is the documentation AXYZ never published
	2. **the one-axis rig** — bought and built only after the survey says what to buy

## The target system

```
 LinuxCNC PC ══ EtherCAT ══▶ CS3E X1 ══▶ CS3E X2 ══▶ CS3E Y ══▶ CS3E Z ┄┄▶ (more I/O, if the count says so)
                               │           │           │          │
                            motor X1    motor X2    motor Y    motor Z + brake      limit + home switches → drive inputs

 shop power ─▶ disconnect + breakers ─▶ E-stop chain (hard-wired) ─┬─▶ drive DC supply ─▶ the four drives
                                                                   └─▶ spindle VFD ─▶ HSD ES919 spindle ◀─ air: tool release, pressurization
 24 V DC ─▶ sensors, valves, relays          spindle ─▶ control: tool locked · collet open · overheated
```

The same drawing with its open choices marked: [lab/packet.html](lab/packet.html) §1.

## The machine — what is known

A fact with no evidence yet reads `unrecorded`; the survey replaces it with a photo.

| Part | What we know | Evidence |
|---|---|---|
| Router | AXYZ 4012, 4000 series | Felix's telling; serial plate `unrecorded` |
| Spindle | HSD ES 919A 2P 08,00 kW H1, card H1423H0224 — 6.6 kW S1, 8 kW S6 60%, 380 V star 15.8 A or 220 V delta 27.4 A, 200 Hz at 12,000 rpm, 24,000 rpm marked as maximum; manual release button fitted. Which voltage circle is punched, and the terminal board's links, `unrecorded` | F8 — `refs/photos/IMG_4511.jpeg`; `refs/HSD Spindle Data Sheet ES919A 2P 6.6kW.pdf`; F1 |
| Old VFD | Control Techniques Commander SE33400750 — 380–480 V three-phase, 7.5 kW, 16.5 A | F1 |
| New VFD | VEVOR G300-015-045A-2SB — 15 kW, 45 A out, single- or three-phase 220–240 V in; bought by Tyler 2026-11-13, not yet arrived; the unit's own nameplate `unrecorded` | F9; fork 3 |
| Axis motors | Vexta PK299-F4.5A, 2-phase, 4.5 A, on Pacific Scientific 6410 drives — one motor photographed, its axis and the other three `unrecorded`; being replaced (fork 6); the mounts' dimensions `unrecorded` | F8 — `refs/photos/IMG_4512.jpeg`, `IMG_4499.jpeg`; F5 |
| Mechanics | `unrecorded` — the 4008: rack and pinion on X and Y, a screw on Z | F5 |
| Limit and home switches | `unrecorded` | — |
| Pneumatics | A solenoid valve releases the tool; valve and coil voltage `unrecorded` | Felix's telling; F2 |
| Shop power | Single-phase 220 V for everything (D5); the breaker feeding the machine `unrecorded` — the machine itself ran on three-phase 380–480 V | Felix's telling; F1 |
| Cabinet | Intact — nothing unplugged as of 2026-11-12; to be gutted (D4). Holds the Pacific Scientific 6410 drives, a Power Board Rev 05A, an FPGA card, a connector board, a toroidal transformer, 15 A fuses and an ABB contactor | F8 — `refs/photos/IMG_4373.jpeg`, `IMG_4499`–`IMG_4509`, `IMG_4515` |

## How the weekends run

1. **Friday** — a session writes the weekend's packet into `lab/`: what to do, what to measure, what to buy.
2. **The weekend** — the crew works the packet at the machine. Photo first, label second, unplug last.
3. **Sunday night** — the photos go into `refs/photos/` and the filled `lab/survey.json` is committed; a session reads them into this README, the parts list and the drawings, and reconciles the board.
4. **Weeknights** — sessions do the desk work the weekend exposed: check a part against its manual, draft the parts list and the wiring for Nathan, write the LinuxCNC configuration.

- **Sunday night's summons** · once the photos and `lab/survey.json` are in the repo:

```
You are an Explorer at fable-high.
Enter by the door — read ~/code/agents/canon/GUILD.md,
wear ~/code/agents/canon/mantles/explorer.md,
then boot ~/code/roach-cnc and continue: read the survey's photos and sheet into the README, and rule what they settle.
```

- **What a session is good for here** · reading nameplates and wiring off photos · checking every part against its manual before money moves · the parts list with its reasons · system drawings and wire lists · the LinuxCNC, HAL and EtherCAT configuration · the VFD parameter sheet · each weekend's packet
- **What it cannot do** · touch, measure or energize anything · stand in for Nathan on electrical safety

## The plan — a draft until the survey lands

| Weekend | At the machine | Between weekends |
|---|---|---|
| 1 · Nov 14–15 | **Survey**: the packet, and the photos not already taken | Survey read into the repo; motor model, supply, VFD size and I/O drafted for Nathan |
| 2 · Nov 21–22 | PC: install LinuxCNC, latency test; survey gaps; label and strip the cabinet | Bench kit blessed by Nathan — one drive, one motor, one supply; one-axis configuration |
| 3 · Dec 5–6 | **One-axis rig**: jog and home a motor from LinuxCNC | Schematic and cabinet layout from Nathan's diagram; full order once the rig moves |
| 4–5 · Dec 12–20 | Cabinet: backplate, power, E-stop chain, drives, wiring | Four-axis configuration; wire list checked against build photos |
| 6 · Jan 9–10 | Motors on the machine; each axis: direction, scale, limits, homing, gantry squaring | Configuration tuned from the numbers that come back |
| 7 · Jan 16–17 | Spindle, VFD, air; interlocks proven | VFD parameter sheet; interlock logic |
| 8 · Jan 23–24 | First cuts; a test part measured | As-built drawings; final parts list |

Thanksgiving and the year-end holidays are left empty. Parts lead time and survey surprises move everything after weekend 2.

## The board

| ID | Work | Depends on | Staffing | Status |
|---|---|---|---|---|
| 001 | **[Survey the machine](lab/packet.html)** — the printed packet filled at the machine, photos into `photos/`; Felix holds a first set, the spindle plate among them, not yet in the repo | — | ⬡-gate (bench · Felix and Tyler) | OPEN — laid 2026-11-12 |
| 002 | **Buy the LinuxCNC PC** — to fork 4's recommendation | ⬡-gate: fork 4 ruled | ⬡-gate (Tyler) | KILLED 2026-11-12 — fork 4 ruled: Tyler has old PCs; weekend 2's latency test picks one |

**Deferred** — un-laid, each waiting on the survey:

- the motion parts dig — which CS-M motor per axis, the drive supply, cables, Z brake (forks 6, 7)
- the spindle power dig — VFD size on single-phase, the parameter sheet, the input circuit (fork 3)
- the I/O and safety dig — the I/O count, the E-stop chain, where the extra I/O lives (fork 8)
- the one-axis rig — the bench kit order, the configuration, the bench gate
- the schematic and the wire list (fork 9)
- the cabinet build, the four-axis configuration, commissioning

## Forks

*Whose* — `Explorer`: ruled on the evidence, binding the ground · `Felix`: his, built on the recommendation until he rules · `Felix (‹party›)`: his to carry to the party named.

| # | Fork | Whose | Ruling or recommendation | Evidence |
|---|---|---|---|---|
| 1 | What gets proven first | Explorer | **Ruled:** survey before any purchase; one axis on the bench before four in a cabinet | F1 — the VFD as planned does not match the spindle as wired; F4 — the single-axis CS3E is untested in LinuxCNC's driver |
| 2 | Photos in git | Explorer | ~~**Ruled:** resized to 2000 px, filed as `photos/‹subsystem›/`~~ — struck 2026-11-13: Felix files them full-size in `refs/photos/`, and his practice stands | 19 photos, 61 MB, committed `57065ad` |
| 3 | The spindle VFD's size | Felix (Nathan, Tyler) | **Ruled 2026-11-13:** one size up. Nathan agreed; Tyler bought the VEVOR 15 kW, G300-015-045A-2SB by Nathan's BoM — 45 A out against the spindle's 31.2 A | F7, F9 |
| 4 | The PC | Felix (Tyler) | **Ruled by Felix 2026-11-12:** one of Tyler's old PCs. Prefer a desktop, 4 cores, a wired Ethernet port; the latency test is its gate | EtherCAT takes a wired port whole; real-time latency is a property of the board, measured, not read off a spec |
| 5 | The repo | Felix | **Ruled by Felix 2026-11-13:** public on GitHub; Nathan Rivas and Jacob Smith are collaborators. The manuals stay in `refs/`: all came from public links. The Explorer recommended private and holds no strong objection | — |
| 6 | The motors | Felix (Nathan) | **Ruled likely by Felix 2026-11-12, on Nathan's recommendation:** new NEMA 34 Leadshine closed-loop motors matched to the drives. Open: which model per axis, shaft and pilot against the mounts, a brake on Z | F3 — CS3E is a drive, and its open-loop mode exists; F5; survey sheet E |
| 7 | The drive model | Felix (Nathan) | **Recommended: CS3E-D1008** — its condition, NEMA 34, is met by fork 6 | F3, F4 |
| 8 | Where the extra I/O lives | Felix (Nathan) | **Recommended:** limits and homes on the drives' own inputs; count the rest after the survey; expect a small EtherCAT coupler for the spindle, air and E-stop signals | F4 — the driver's digital inputs "aren't complete yet", outputs unconfirmed |
| 9 | What the wiring is drawn in | Felix (Nathan) | **Recommended:** a wire list — from, to, gauge, color, label — as the truth in the repo, drawings rendered from it; Nathan's own tool wins if he has one | a list is checkable against photos line by line |
| 10 | v1 scope | Felix | **Recommended:** v1 cuts parts with the tool released by hand at the spindle's button, interlocked; automatic tool change, vacuum zoning and dust automation wait for v2 | each is its own wiring and logic; none is needed to cut |

**At his gate now:** nothing. **Waiting on the survey, then Nathan:** 6, 7. **Queued:** 10, 8, 9.

## Findings

### F1 · The spindle is wired for 380 V; a 220 V drive needs it re-strapped

- the only 2-pole 8 kW motor in the manual is ES919 card H1423H0224: star 380 V, 15.8 A continuous / 18 A at S6 60% · delta 220 V, 27.4 A / 31.2 A · both 6.6 kW / 8 kW, full voltage at 200 Hz (12,000 rpm), to 24,000 rpm at 400 Hz — `refs/HSD Spindle Manual ES929-ES919-ES915.pdf` p.33
- the Commander SE33400750 is 380–480 V three-phase, 7.5 kW, 16.5 A continuous — the star column's drive — [Commander SE product data](https://scigate.com.sg/images/stories/scigate/download/Control-Techniques/Commander-SE/Commander%20SE%20Product%20Data.pdf), read through a web search, not opened
- re-strapping to delta takes the configurable 220/380 V terminal board, which the manual calls optional — p.84, '4.6.3'; whether this spindle has it is `unrecorded`
- left in star on a 220 V drive, full flux holds only to 220/380 × 200 Hz = 116 Hz ≈ 6,900 rpm, about 3.8 kW at the card's 5.3 N·m — the Explorer's arithmetic, not a measurement
- on single-phase 240 V, delta at 8 kW draws an estimated 60–70 A at the input — the Explorer's estimate, for Nathan to check

### F2 · What the spindle asks of the control

- **Source:** `refs/HSD Spindle Manual ES929-ES919-ES915.pdf`
- power connector: pins 4, 6, 8 the motor phases · 1 and 5 the thermal switch · 3 and 9 the fan · 2 and 7 earth — p.80
- signals connector, ISO version: pin 1 S2 collet open · pin 2 S1 tool holder present · pin 3 S3 shaft stopped, optional · pins 4 and 6 the sensors' 24 V and 0 V · pins 7 and 8 the manual release button — p.81
- sensors are PNP, normally open, 10–30 V DC — p.113 · the shaft may turn only while S1 is on — p.114 · the thermal switch is normally closed, 48 V DC and 1.6 A at most, and must stop the spindle — p.115
- the fan runs on 230 V AC, 45 W, and "must always be activated, even when the electrospindle is idle" — p.88–89
- air: tool release at 6 bar, pressurization and cone cleaning at 4 bar, 8×6 mm tube, dry filtered air — p.71–72
- the release button works only with the spindle stopped and the machine in manual mode — p.86

### F3 · CS3E is a drive, and the D1008 is the NEMA 34 one

- **Source:** `refs/Leadshine CSE3.pdf` p.8 — the file name transposes the model: it is the CS3E manual, V1.5
- CS3E-D507: 20–50 V DC, 1.0–7.0 A, matched to NEMA 17, 23, 24 · CS3E-D1008: 30–100 V DC or 20–80 V AC, 2.1–8.0 A, matched to NEMA 23, 24, 34
- modes: cyclic synchronous position, profile position, profile velocity, homing · cycle times 500 µs to 5 ms
- each drive: 7 digital inputs — home, both limits, two probes, two general — and 7 outputs, one a 500 mA brake output that drives a motor brake directly
- object 0x2024 selects open loop (0) or closed loop (2, the default)
- `refs/Leadshine Motion Studio Software.pdf` is the quick start for Leadshine's Windows tuning tool, Modbus over RS232 — the crew needs a Windows laptop within reach

### F4 · LinuxCNC drives the CS3E, with one model proven

- **Source:** [linuxcnc-ethercat, the Leadshine stepper driver](https://linuxcnc-ethercat.github.io/linuxcnc-ethercat/leadshine_stepper.html)
- the driver lists CS3E-D503, CS3E-D507 and CS3E-D1008; "Only the 2CS3E-D507 has been tested at this point"; it needs the `cia402` HAL component beside it
- "Digital input controls aren't complete yet"; no HAL output pins are documented; input functions are set by `ethercat download` and a power cycle
- a user reports a D1008 with a NEMA 34 Leadshine motor "properly homed the motor", home switch on a Beckhoff input; another ran a D1008 to about 2,000 rpm at 48 V, home switch on the drive's own input — [LinuxCNC forum thread 47546](https://forum.linuxcnc.org/ethercat/47546-anyone-looking-at-cs3e-d1008-drivers-from-leadshine)
- the page dates its list "as of early 2024": the driver's source is the next thing to read before the bench kit is ordered

### F5 · The nearest relative on record is a 2007 AXYZ 4008

- **Source:** [LinuxCNC forum thread 59100](https://www.forum.linuxcnc.org/30-cnc-machines/59100-axyz-4008-retrofit-original-steppers-drives-mesa-7i95t-linuxcnc)
- Vexta PK299-F4.5A 2-phase steppers on Pacific Scientific 6410 step-and-direction drives; rack and pinion on X and Y, a screw on Z; a connection board with a toroidal transformer giving 5, 12 and 18 V
- its E-stop was interpreted by the AXYZ electronics — so the new chain is designed, not inherited
- no frame sizes, ratios, switch types or supply voltage are in the thread: the 4012's are the survey's to find

### F6 · The VEVOR 11 kW unit is undocumented

- no manual for the exact model turned up in one web search; buyers of related 11 kW units report about 5.5 kW on single-phase input
- one search is not a hunt: a manual with a Modbus map and a single-phase rating would reopen it

### F7 · On single-phase, the 11 kW drive's input side is short of full power

- **Source:** `refs/HSD Spindle Manual ES929-ES919-ES915.pdf` p.33–35, and the Explorer's arithmetic on it — for Nathan to check
- full-load current in delta: 27.4 A continuous, 31.2 A at S6 60% — p.33. A 50 A drive's output covers it
- locked-rotor current is not listed; the delta equivalent circuit (0.07 + 0.09 Ω, 0.29 + 0.6 Ω, p.34) gives about 127 V ÷ 0.90 Ω ≈ 140 A per leg at 220 V, 200 Hz. A VFD ramps the frequency and limits current, so it never flows
- electrical input at the continuous rating: √3 × 380 V × 15.8 A × 0.72 ≈ 7.5 kW, for 6.6 kW at the shaft — the star page's numbers, p.35; the delta page's power factor of 0.65 does not close and reads as a misprint. At S6's 8 kW, about 9–10 kW
- single-phase input current at 240 V, rectifier power factor 0.6–0.7, drive efficiency 0.96: about 46–54 A continuous, 56–72 A at S6 — an estimate, and about 9% higher at 220 V
- an 11 kW, 220 V-class drive's rectifier is built for roughly 40–50 A a leg, and its capacitors for three-phase ripple — typical of the class, not this unit's data sheet, which F6 could not find. The common rule halves the rating on single-phase; F6's buyer reports of about 5.5 kW agree with it
- so the 11 kW unit lands between about 5.5 and 6.5 kW at the shaft: under the plate, with no margin
- below 12,000 rpm the spindle is torque-limited at 5.3 N·m — 3.3 kW at 6,000 rpm — so steel at low speed never asks the supply for full power; aluminum at 12,000–24,000 rpm can
- VFD settings off the card: motor voltage 220 V, rated frequency 200 Hz, maximum 400 Hz, motor current 27.4 A — p.33, and p.87 for the rule

> **F6 and F7, note of 2026-11-13.** The 11 kW unit was not bought. The VEVOR manual puts its output at 30 A and the listings' 50 A and 68.5 A at the input (F9), so F7's concern held and its "50 A drive's output" was the listing's input figure.

### F8 · What Felix's first photos show

- **Source:** `refs/photos/`, 19 photos committed `57065ad`; `refs/HSD Spindle Data Sheet ES919A 2P 6.6kW.pdf`
- spindle plate: "ES 919A 2P 08,00 kW H1", H1423H0224, 380V / 220V, 200 Hz, 12000 rpm, S1 6,6 kW, 15,8A / 27,4A, S6 60% 8 kW, peak 19 kW, cosφ 0,8, η 0,8, IP 54; the 24000 circle under MAX RPM is punched; neither RATED VOLTAGE circle reads as punched at this resolution — `IMG_4511.jpeg`. The data sheet carries the same heading and card number: F1's inference is confirmed
- axis motor: "VEXTA 2-PHASE, MODEL PK299-F4.5A, DC 4.5A", Oriental Motor — `IMG_4512.jpeg`; which axis is `unrecorded`
- old drives: Pacific Scientific 6410 — `IMG_4499.jpeg`, `IMG_4506.jpeg`. Motor and drive match F5's 4008
- cabinet: `IMG_4373.jpeg` whole; fuses marked 15 AMP and an ABB contactor — `IMG_4500`, `IMG_4501`; "POWER BOARD REV.05A" and a toroidal transformer — `IMG_4502`, `IMG_4503`; an FPGA card — `IMG_4505`; a connector board — `IMG_4515`
- the machine whole — `IMG_4513`, `IMG_4514`; a page of the Commander SE guide — `IMG_4498`

### F9 · The VEVOR 15 kW drive fits the spindle on paper

- **Source:** `refs/VEVOR VariableFrequencySpeedController.pdf`, English section, models G300-011-030A-2SB and G300-015-045A-2SB
- Table 2-1: the 11 kW model is 30 A out, the 15 kW model 45 A out, both single- or three-phase 220–240 V in. 45 A covers the spindle's 31.2 A; 30 A does not
- single-phase input lands on R and S — the main-circuit terminal table
- maximum frequency F0.07 is 5–300 Hz until F8.32 "Frequency resolution" is 1, which lifts the ceiling to 3000 Hz: F8.32 is set first, then F0.07 = 400
- motor parameters F2.01–F2.05 take power, frequency, speed, voltage and current; a braking resistor lands on + and PB; Table 8-3 gives 10 Ω for the 15 kW drive
- control: 8 digital inputs, 2 analog inputs 0–10 V, 2 relay outputs, RS-485 Modbus-RTU — either an analog speed command or Modbus can carry LinuxCNC's spindle speed (fork 8)
- the drive is 201 × 344 × 219 mm — Table 2-3
- the manual gives no rated input current: its "Table 2-3" reference lands on the dimensions table. The listing's 68.5 A equals 15 kW ÷ 220 V
- that the delivered unit is this model is `unrecorded` until its nameplate is photographed

### F10 · Nathan's spindle BoM, read against the manuals

- **Source:** `refs/VFD_Spindle_Protection_BOM.xlsx`, prepared 2026-11-13 — input side, output side, drive settings
- it agrees with F1, F2 and F9 on every number checked: the drive model and 45 A, R and S, F8.32 before F0.07, 200 Hz, 220 V, 27.4 A, a braking resistor no lower than 10 Ω, no capacitors or filters on the drive's output
- the feed is sized from the drive's input rating: Class J 100 A fuses and #3 copper, 125% of 68.5 A. Whether the shop's panel can give that circuit is `unrecorded` — survey sheet B
- four notes back to Nathan, none a blocker:
- the thermal switch lands on the drive's X4 only; the manual wants the control to stop the feed as well (p.115), so the drive's fault relay should reach a LinuxCNC input
- the fan line says its rating is not on the plate: it is 230 V AC, 45 W at 50 Hz and 39 W at 60 Hz, and runs whenever the spindle is powered, idle included (p.88–89)
- the motor cable is #8; the manual's minimum for the phase pins is 6 mm² or AWG 10 (p.80), and whether #8 fits the connector is `unrecorded`
- the settings put the lower frequency limit near 100 Hz, 6,000 rpm, "confirm with HSD"; D6's steel sits below that

## Decisions

- **D1** (2026-11-12, Felix): **The control is LinuxCNC over EtherCAT.** The AXYZ controller and its software are not revived.
- **D2** (2026-11-12, Felix): **Four Leadshine CS3E axes.** X1 and X2 the gantry pair, Y, Z.
- **D3** (2026-11-12, Felix): **The HSD spindle stays and its VFD is replaced.** Which VFD is fork 3.
- **D4** (2026-11-12, Felix): **The cabinet is gutted.** Stepper amps, connector board, power board and FPGA board come out.
- **D5** (2026-11-12, Felix): **Everything runs on single-phase 220 V.** The spindle is re-strapped from 380 V star to 220 V delta to allow it.
- **D6** (2026-11-12, Felix): **The spindle reaches its full power.** For aluminum, and steel if possible; the VFD and its feed are sized for the plate, not for wood.

The Explorer's proposals ride the forks table until he rules; a founding re-mints or drops them.

## Non-goals — proposed

- Automatic tool change, vacuum zoning, dust automation — after v1 (fork 10)
- Reverse-engineering the AXYZ controller, its boards or its software
- A CAM workflow — the machine takes G-code; where it comes from is the crew's

## Working agreements

- **The repo is the truth** · a fact lives here with its evidence, or it reads `unrecorded`. A text thread is a cache.
- **Writers** · the repo is public; Felix, Nathan and Jacob can push. A session pulls before it works and reads a collaborator's new file before building on it.
- **Nathan reads before mains** · a drawing or parts list that carries mains voltage is a draft until he has read it.
- **Evidence before money** · a part is ordered when the manual page or the photo that justifies it is cited beside it in the parts list.
- **Files appear when needed** · reference material — manuals, photos as shot, Nathan's BoM — lives in `refs/`; drawings and `linuxcnc/` appear when their first file exists. `lab/` holds what is built to die — packets, their server, scratch — and `lab/survey.json`, the survey's answers.
- **Pages** · a page in `lab/` is Felikai on screen — dark, every face Inter, tokens copied from `~/code/felix/src/felikai.css` and embedded so it opens from disk anywhere — and black and white in print (Felix, 2026-11-12).
- **Commits** · straight to `master`, one line each.
- **The red list** — a session stops for Felix's read yes before:
	- ordering or spending anything
	- pushing to GitHub, or changing the repo's visibility
	- any message to Tyler, Nathan or a vendor
	- telling anyone to energize a circuit Nathan has not read
	- telling anyone to remove original wiring the survey has not recorded

## Done when — v1, proposed

1. Every axis homes on its own switch, the gantry pair squaring itself, three times running.
2. The E-stop, pressed while jogging with the spindle turning, removes drive and spindle power; LinuxCNC shows the fault.
3. The spindle runs at a commanded 24,000 rpm, refuses to start without S1's "tool locked", and the tool release is refused while it turns.
4. A cut test part — a 100 mm square and a 100 mm circle — measures within the tolerance Felix names.
5. The wire list matches the cabinet as built, the parts list matches what was bought, and the LinuxCNC configuration that made the cut is committed.

## Ledger

**2026-11-12 · Explorer · fable-high (unrecorded)** — the ground laid: the bet, the survey packet, ten forks, three ruled in the room
- read the three manuals whole and four web sources; six findings filed above
- F1 and F7 are the headline: delta on single-phase is the plan (D5), full power is required (D6), and the 11 kW VEVOR's input side is then short — one size up, on a 70–80 A feed
- built [lab/packet.html](lab/packet.html): the target system drawn, the survey sheet, the draft plan
- **Decided:** D1–D6, his; forks 1 and 2 ruled by the Explorer; forks 4 and 6 by Felix, 3 in part; 002 killed
- **Next:** Felix adds his photos to `photos/` tonight; one ruling — fork 5, the repo — then the survey; behind it, Sunday night's summons under 'How the weekends run'.

---

**2026-11-13 · Explorer · fable-high (unrecorded)** — the same session, day two: his first files read, the packet made fillable
- read 19 photos, the VEVOR manual, the HSD data sheet and Nathan's BoM — F8, F9, F10; the spindle and the Vexta motors are confirmed, the bought drive fits on paper
- the packet now takes answers: `bun lab/serve.ts` serves it and writes `lab/survey.json`; tested end to end in a browser
- forks 3 and 5 ruled by Felix, fork 2 struck; nothing pushed — the push is his
- **Decided:** nothing new minted
- **Next:** the four BoM notes go to Nathan by Felix's hand; behind the survey, Sunday night's summons under 'How the weekends run'.

Baton — ⬡ → bench: run the survey (001) at Tyler's this weekend, filling the packet at `http://localhost:4012`.
