# Security policy

## Reporting a vulnerability

Report a suspected vulnerability through
[GitHub private vulnerability reporting](https://github.com/prasoon-anand/expectancy/security/advisories/new).
Do not disclose an uncorrected vulnerability in a public issue or discussion.

Include only the information required to reproduce and assess the issue:

- application version, operating system, and processor architecture;
- the affected security or evidence-integrity boundary;
- minimal reproduction steps using synthetic data where possible;
- the observed and expected behaviour; and
- any known workaround.

Do not submit real market data, strategies, credentials, signing material,
personal file paths, or complete diagnostic archives unless an encrypted transfer
has been explicitly arranged.

## Supported versions

Security corrections are issued for the current release line. A superseded
version may be used to reproduce a report, but users should move to the corrected
current release after verification.

## Security boundaries

- Imported datasets, project archives, strategy documents, Python files, and
  result archives are untrusted input.
- User-authored Python runs with the local user’s authority inside bounded process
  controls; it is not a security sandbox.
- The interface has no general filesystem, process, network, or raw inter-process
  authority.
- A packaged application starts only native components whose target, protocol,
  manifest, and exact bytes satisfy its release record.
- Normal research actions require no account, telemetry, or data upload.
- Exports are initiated by the user and may contain proprietary research data;
  they should be inspected before sharing.

## Response policy

Reports are acknowledged within three working days when the reporting channel is
operational. Correctness, arbitrary-code-execution, data-loss, signing-key, or
silent evidence-corruption findings stop an affected release until disposition.
Publication timing may be coordinated so users can install a correction before
technical details are broadly disclosed.
