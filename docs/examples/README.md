# First-backtest example

TST is fictional. These eight observations are synthetic, not licensed market data.
The example is intended to explain event timing and accounting, not performance.
You may copy and adapt these example data and strategy documents for research and
teaching. This permission does not apply to the application's proprietary source.

Expected values were produced by the Rust engine on 17 September 2026 using the
included CSV and strategy: cash 1000, commission 1 per fill, slippage 0 bps.
The downloadable expected-values file records the engine and manifest schema IDs,
full logical result identity, assumptions, fills and metrics.

Buy 10 at 13 on 8 January; sell 10 at 5 on 13 January. Gross P&L -80,
fees 2, net P&L -82, ending equity 918, net return -8.20%.

Workspace screenshots use an isolated in-memory documentation adapter and the
engine-generated numerical result. They illustrate the interface, not native
import persistence, signing, installer availability or platform compatibility.
