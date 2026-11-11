# Expectancy

> Test the strategy. Inspect the evidence.

Expectancy is a free-to-download desktop application for specifying, simulating,
and examining rule-based trading strategies. It operates on user-supplied market
data and retains datasets, strategy definitions, run evidence, and research
records on the user’s computer.

## Download

The first release targets macOS on Apple Silicon. Its preview is in preparation;
a verified installer has not yet been listed. Intel macOS, Windows x64 and
Linux x64 are planned later, with no announced dates.

See [downloads and installation](https://prasoon-anand.github.io/expectancy/downloads.html)
for package availability and the
[Releases page](https://github.com/prasoon-anand/expectancy/releases) for release
records. Each published release must identify its application version, tested
macOS baseline, target architecture, package digest, dependency inventory, and
known platform or scientific constraints.

This repository is the public distribution and documentation record. It contains
the website, user documentation, release notes, checksums, notices, and security
reporting information. It does **not** contain the Expectancy application source
code, private development history, build infrastructure, or internal project
records.

## What the application does

- imports CSV and compressed Parquet observations through explicit column
  mapping and validation;
- defines strategies using nested visual rules, typed formulas, JSON, or a
  bounded local Python worker;
- simulates single-symbol and multi-asset portfolios with declared timing,
  costs, liquidity, capital, order, and corporate-action assumptions;
- retains observations, indicator values, decisions, orders, fills, trades,
  positions, cash, ledger, equity, and configuration identity;
- compares verified runs and records parameter, benchmark, chronological-fold,
  sealed-holdout, and multiple-testing evidence; and
- reports missing evidence as not assessed rather than treating absence as a
  favourable result.

## Distribution model

Expectancy installers are made available without charge. Expectancy is
proprietary software, not open-source software and not public-domain software.
Use of an installer is governed by the end-user terms supplied with that release.
Third-party components retain their own licences and attribution requirements.

## Scientific boundary

Expectancy is research software. A backtest is a conditional historical
simulation, not a forecast, investment recommendation, proof of causality, or
guarantee that an order could have executed at the simulated price and quantity.
Interpret results with their data provenance, sampling procedure, tested
interval, trial count, execution assumptions, and out-of-sample evidence.

The complete user guide, computational methodology, capability reference, and
privacy model are available on the
[documentation site](https://prasoon-anand.github.io/expectancy/).

## Security

Report suspected vulnerabilities through
[GitHub private vulnerability reporting](https://github.com/prasoon-anand/expectancy/security/advisories/new).
Do not attach proprietary market data, strategy code, credentials, or personal
paths to a public issue.
