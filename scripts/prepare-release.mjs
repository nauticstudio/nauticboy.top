import { readFile, writeFile } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';
import { fetchLatestRelease, normalizeRelease } from '../src/lib/release/release.mjs';

const snapshotFile = new URL('../src/lib/release/snapshot.json', import.meta.url);

async function fetchWithRetry(maxAttempts = 3, initialDelayMs = 2000) {
  const headers = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fetchLatestRelease(globalThis.fetch, headers, { timeoutMs: 15000 });
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        const delay = initialDelayMs * Math.pow(2, attempt - 1);
        console.warn(`Attempt ${attempt}/${maxAttempts} to fetch latest release failed (${err.message}). Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }
  throw lastError;
}

let snapshot;
try {
  snapshot = await fetchWithRetry();
  await writeFile(snapshotFile, JSON.stringify(snapshot, null, 2) + '\n');
} catch (error) {
  // Never deploy an older fallback over a newer public site during a GitHub outage.
  if (process.env.CI) throw error;
  console.warn('GitHub unavailable; building from the last validated local release snapshot.');
  snapshot = JSON.parse(await readFile(snapshotFile, 'utf8'));
}
const release = normalizeRelease(snapshot);
await writeFile(new URL('../public/release-snapshot.json', import.meta.url), JSON.stringify(snapshot, null, 2) + '\n');
console.log(`NauticMixxx release: ${release.tag} (${release.name})`);
