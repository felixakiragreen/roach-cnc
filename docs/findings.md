# Findings

What has been checked, with the evidence that proved it: a manual page, a photo, a web source, or arithmetic labeled as such. Paths are from the repo's root. A finding is appended, and corrected by a dated note, not rewritten. A fact with no evidence yet reads `unrecorded`.

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
