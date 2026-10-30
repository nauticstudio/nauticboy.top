import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchWithRetry, isRetryable } from './lib/fetch-with-retry.mjs';

const opts = (sleeps) => ({ sleep: async (ms) => { sleeps.push(ms); }, random: () => 0, log: () => {} });

test('recovers after transient failures with exponential backoff', async () => {
  const sleeps = [];
  let calls = 0;
  const result = await fetchWithRetry(async () => {
    calls++;
    if (calls < 3) throw new Error('GitHub release request failed (503)');
    return 'ok';
  }, opts(sleeps));
  assert.equal(result, 'ok');
  assert.equal(calls, 3);
  assert.deepEqual(sleeps, [2000, 4000]);
});

test('rethrows the last error after the maximum number of attempts', async () => {
  const sleeps = [];
  let calls = 0;
  await assert.rejects(
    fetchWithRetry(async () => { calls++; throw new Error(`GitHub release request failed (502)`); }, opts(sleeps)),
    /502/,
  );
  assert.equal(calls, 3);
  assert.equal(sleeps.length, 2);
});

test('does not retry permanent client errors', async () => {
  const sleeps = [];
  let calls = 0;
  await assert.rejects(
    fetchWithRetry(async () => { calls++; throw new Error('GitHub release request failed (404)'); }, opts(sleeps)),
    /404/,
  );
  assert.equal(calls, 1);
  assert.deepEqual(sleeps, []);
});

test('retries rate limiting and request timeouts', () => {
  for (const status of [403, 408, 429, 500, 503]) {
    assert.equal(isRetryable(new Error(`GitHub release request failed (${status})`)), true, String(status));
  }
});

test('retries network and timeout errors without an HTTP status', () => {
  assert.equal(isRetryable(new Error('fetch failed')), true);
  const timeout = new Error('The operation was aborted due to timeout');
  timeout.name = 'TimeoutError';
  assert.equal(isRetryable(timeout), true);
});

test('does not retry invalid release payloads', () => {
  assert.equal(isRetryable(new Error('Invalid published NauticMixxx release')), false);
  assert.equal(isRetryable(new Error('Unexpected release repository')), false);
});
