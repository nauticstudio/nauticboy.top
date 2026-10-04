import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';

// Static hosting cannot set the root HTML language per request.
// Stamp the locale into each exported document before publishing.
const output = resolve('out');
async function finalize(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await finalize(path);
    else if (entry.name.endsWith('.html')) {
      const route = relative(output, path).split(sep).join('/');
      const lang = route === 'es.html' || route.startsWith('es/') ? 'es' : 'en';
      const html = await readFile(path, 'utf8');
      await writeFile(path, html.replace(/(<html\b[^>]*\blang=")[^"]*(")/, `$1${lang}$2`));
    }
  }
}
await finalize(output);
console.log('Exported HTML languages: en / es');
