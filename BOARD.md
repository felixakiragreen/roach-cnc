# roach-cnc — Board

- **The work state:** the board and the deferred list — this file carries what moves; the bet, the forks and the agreements live in [MAP.md](MAP.md).
- **Law:** `~/code/agents/canon/work/DOCTRINE.md` §4.

| ID | Work | Depends on | Staffing | Status |
|---|---|---|---|---|
| 001 | **[Survey the machine](lab/packet.html)** — the fillable packet worked at the machine, answers into `lab/survey.json`, photos into `refs/photos/`; a first 19 photos are in | — | ⬡-gate (bench · Felix and Tyler) | OPEN — laid 2026-11-12 |
| 002 | **Buy the LinuxCNC PC** — to fork 4's recommendation | ⬡-gate: fork 4 ruled | ⬡-gate (Tyler) | KILLED 2026-11-12 — fork 4 ruled: Tyler has old PCs; weekend 2's latency test picks one |

Statuses: OPEN → IN FLIGHT → LANDED / KILLED; BLOCKED transient, PENDING annotates external waits, DEFERRED annotates deliberate shelving.

**Deferred (tracked, not lost)** — un-laid, each waiting on the survey:

- the motion parts dig — which CS-M motor per axis, the drive supply, cables, Z brake ([MAP.md](MAP.md) forks 6, 7)
- the spindle power sheet — the bought drive's parameters, the input circuit, Nathan's four notes ([docs/findings.md](docs/findings.md) F9, F10)
- the I/O and safety dig — the I/O count, the E-stop chain, where the extra I/O lives (fork 8)
- the one-axis rig — the bench kit order, the configuration, the bench gate
- the schematic and the wire list (fork 9)
- the cabinet build, the four-axis configuration, commissioning
