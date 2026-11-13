# roach-cnc — Map

The ground's master doc, for the sessions that work it. The crew's page is [README.md](README.md): what the project is, who does what, the machine, the plan. By Felix's ruling of 2026-11-13 the README is for humans, and the books live here and beside this file:

- **[BOARD.md](BOARD.md)** — the work state
- **[LEDGER.md](LEDGER.md)** — where the last session left off
- **[DECISIONS.md](DECISIONS.md)** — what Felix has decided
- **[docs/findings.md](docs/findings.md)** — what has been checked, with its evidence

This is an Explorer's ground (`~/code/agents/canon/mantles/explorer.md`) — a git repo on `master`, public on GitHub, Felix's to keep or fold, not a founded building.

## 1. The bet

Three people working weekends can take an undocumented AXYZ 4012 to cutting parts — four Leadshine CS3E EtherCAT stepper axes (X1, X2, Y, Z), the HSD spindle kept on a new VFD, LinuxCNC in charge — **if this repo carries the truth between weekends**: every bench day opens on a printed packet (what to do, measure, buy) and closes on photos and measurements that write the next one.

- **The ground's kill criterion** — either result ends the retrofit as drawn:
	- the survey shows the iron is not worth a new control: racks, bearings or the spindle past what the crew will spend to fix
	- the one-axis bench rig — one PC, one CS3E, one motor — cannot be jogged from LinuxCNC over EtherCAT after two bench weekends
- **The cheapest proof** — two things a human can hold, in order:
	1. **the survey packet** — a printed sheet carried to the machine before the cabinet is stripped; filled in, it is the documentation AXYZ never published
	2. **the one-axis rig** — bought and built only after the survey says what to buy

## 2. Forks

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

## 3. Non-goals — proposed

- Automatic tool change, vacuum zoning, dust automation — after v1 (fork 10)
- Reverse-engineering the AXYZ controller, its boards or its software
- A CAM workflow — the machine takes G-code; where it comes from is the crew's

## 4. Working agreements

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
- **The README's status** · its "Where we stand" section is rewritten at the end of every session that changes the state — it is the one digest the crew reads.

## 5. Done when — v1, proposed

1. Every axis homes on its own switch, the gantry pair squaring itself, three times running.
2. The E-stop, pressed while jogging with the spindle turning, removes drive and spindle power; LinuxCNC shows the fault.
3. The spindle runs at a commanded 24,000 rpm, refuses to start without S1's "tool locked", and the tool release is refused while it turns.
4. A cut test part — a 100 mm square and a 100 mm circle — measures within the tolerance Felix names.
5. The wire list matches the cabinet as built, the parts list matches what was bought, and the LinuxCNC configuration that made the cut is committed.

## 6. The next session's summons

Once the survey's photos and `lab/survey.json` are in the repo:

```
You are an Explorer at fable-high.
Enter by the door — read ~/code/agents/canon/GUILD.md,
wear ~/code/agents/canon/mantles/explorer.md,
then boot ~/code/roach-cnc and continue: read the survey's photos and `lab/survey.json` into the books, and rule what they settle.
```
