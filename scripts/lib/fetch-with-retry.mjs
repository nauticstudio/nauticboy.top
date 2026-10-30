import { setTimeout as defaultSleep } from 'node:timers/promises';

export function getStatus(error) {
  if (Number.isInteger(error?.status)) return error.status;
  const match = /\((\d{3})\)/.exec(error?.message ?? '');
  return match ? Number(match[1]) : undefined;
}

export function isRetryable(error) {
  // Respuestas inválidas o de otro repositorio no mejoran reintentando.
  if (/Invalid published NauticMixxx release|Unexpected release repository/.test(error?.message ?? '')) return false;
  const status = getStatus(error);
  if (status === undefined) return true; // red, timeout, abort, JSON truncado
  return status >= 500 || status === 403 || status === 408 || status === 429;
}

export async function fetchWithRetry(fetchOnce, {
  maxAttempts = 3,
  initialDelayMs = 2000,
  sleep = defaultSleep,
  random = Math.random,
  log = console.warn,
} = {}) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fetchOnce(attempt);
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts || !isRetryable(error)) break;
      const base = initialDelayMs * 2 ** (attempt - 1);
      const delay = Math.round(base * (1 + random() * 0.2)); // +0–20 % de jitter
      log(`Attempt ${attempt}/${maxAttempts} to fetch latest release failed (${error.message}). Retrying in ${delay}ms...`);
      await sleep(delay);
    }
  }
  throw lastError;
}
