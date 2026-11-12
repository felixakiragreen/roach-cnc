# roach-cnc

Bringing Tyler Roach's AXYZ 4012 CNC router back to life: the proprietary control comes out, LinuxCNC over EtherCAT goes in.

## The bet

Three people working weekends can take an undocumented AXYZ 4012 to cutting parts — four Leadshine CS3E EtherCAT stepper axes (X1, X2, Y, Z), the HSD spindle kept on a new VFD, LinuxCNC in charge — **if this repo carries the truth between weekends**: every bench day opens on a printed packet (what to do, measure, buy) and closes on photos and measurements that write the next one.

- **The ground's kill criterion** — either result ends the retrofit as drawn:
	- the survey shows the iron is not worth a new control: racks, bearings or the spindle past what the crew will spend to fix
	- the one-axis bench rig — one PC, one CS3E, one motor — cannot be jogged from LinuxCNC over EtherCAT after two bench weekends
- **The cheapest proof** — two things a human can hold, in order:
	1. **the survey packet** — a printed sheet carried to the machine before anything more is unplugged; filled in, it is the documentation AXYZ never published
	2. **the one-axis rig** — bought and built only after the survey says what to buy
