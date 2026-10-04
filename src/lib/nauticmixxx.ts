import snapshot from './release/snapshot.json';
import { normalizeRelease, RELEASE_REPO } from './release/release.mjs';

export const NAUTICMIXXX_CURRENT_RELEASE = normalizeRelease(snapshot);
export const NAUTICMIXXX_VERSION = NAUTICMIXXX_CURRENT_RELEASE.version;
export const NAUTICMIXXX_SITE = 'https://nauticmixxx.nauticboy.top';
export const NAUTICMIXXX_REPO = RELEASE_REPO;
export const NAUTICMIXXX_RELEASE = NAUTICMIXXX_CURRENT_RELEASE.page;
export const nauticMixxxPage = (lang: string) => `${NAUTICMIXXX_SITE}/${lang === 'en' ? 'en/' : ''}`;
