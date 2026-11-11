(function () {
  const siteToken = 'a1a99204282747cb9c9e4194517b3ae5';
  const publishedHosts = new Set(['prasoon-anand.github.io']);
  const currentHost = window.location.hostname.toLowerCase();
  const privacyOptOut = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';

  if (
    !publishedHosts.has(currentHost)
    || privacyOptOut
    || !/^[a-f0-9]{32}$/i.test(siteToken)
  ) return;

  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.dataset.cfBeacon = JSON.stringify({ token: siteToken });
  beacon.referrerPolicy = 'no-referrer';
  document.head.append(beacon);
}());
