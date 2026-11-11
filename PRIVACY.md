# Privacy model

Expectancy is designed for local research. Normal data import, strategy authoring,
simulation, result inspection, and project management do not require an account,
telemetry, or upload of market data or strategy material.

## Data stored on the computer

The application stores normalized dataset identities, strategy documents,
projects, run attempts, completed evidence, research annotations, and user
preferences in application-managed local storage. Source data remains at the path
selected by the user; import produces a separate normalized dataset.

## Explicit exports

The application writes a file outside its managed storage only after an explicit
export or save action. Result tables and evidence archives may contain market,
trade, fill, position, or ledger information. Diagnostic summaries are designed
to exclude source paths, market observations, strategy source, credentials, and
run or dataset identifiers. Users should inspect any export before sharing it.

## Network behaviour

Research workflows do not require a remote service. Visiting documentation or a
release page uses the user’s web browser and is separate from simulation.

The published documentation uses Cloudflare Web Analytics for aggregate page-view
and performance measurement. The analytics loader runs only on the declared
production hostname, remains inactive on localhost, and respects browser Global
Privacy Control and Do Not Track signals. Website measurement does not receive
application telemetry, market data, strategy material, result evidence, local file
paths, or application identifiers.

If a future network-dependent application capability is added, its destination,
transmitted data, and activation state must be disclosed before use.

## User-authored code

Python strategy code executes locally with the user’s operating-system
permissions. Process and resource limits reduce accidental overuse but do not
make untrusted code safe. Only execute code from a source you trust.
