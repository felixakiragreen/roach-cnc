# Decisions

The decision register: what shapes the retrofit, each with who decided it and when. Ids are monotonic, not reused; a gap in the numbering is a killed entry — git holds it. Law: `~/code/agents/canon/work/DOCTRINE.md` §8.

- **D1** (2026-11-12, Felix): **The control is LinuxCNC over EtherCAT.** The AXYZ controller and its software are not revived.
- **D2** (2026-11-12, Felix): **Four Leadshine CS3E axes.** X1 and X2 the gantry pair, Y, Z.
- **D3** (2026-11-12, Felix): **The HSD spindle stays and its VFD is replaced.** Which VFD is [MAP.md](MAP.md) fork 3.
- **D4** (2026-11-12, Felix): **The cabinet is gutted.** Stepper amps, connector board, power board and FPGA board come out.
- **D5** (2026-11-12, Felix): **Everything runs on single-phase 220 V.** The spindle is re-strapped from 380 V star to 220 V delta to allow it.
- **D6** (2026-11-12, Felix): **The spindle reaches its full power.** For aluminum, and steel if possible; the VFD and its feed are sized for the plate, not for wood.

The Explorer's proposals ride the forks table in [MAP.md](MAP.md) until he rules; a founding re-mints or drops them.
