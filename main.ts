// GTA 6 meme on X — a working gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is the X post named in POST.json beside this file: a GTA 6 meme
// made by the agent (the joke and the picture, built by build_meme.py from a
// screenshot of the agent's own Sunset Shores GTA 6 game), posted from the
// public X account @harryypotterzz with make.fun and @makefunai and the
// entrant's make.fun play code in its text. The program hands it in: it
// copies POST.json from beside this file to /output, so the grader reads the
// post's address from there.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const postPath = join(here, 'POST.json');

// The entry is only valid when POST.json names a real X post: refuse to hand
// in a missing, malformed or non-X address instead of copying it blindly.
if (!existsSync(postPath)) {
  process.stderr.write('gta6-meme-x-01: POST.json is missing beside main.ts\n');
  process.exit(2);
}
let post;
try {
  post = JSON.parse(readFileSync(postPath, 'utf8'));
} catch {
  process.stderr.write('gta6-meme-x-01: POST.json is not valid JSON\n');
  process.exit(2);
}
const url = typeof post?.url === 'string' ? post.url : '';
let parsed;
try {
  parsed = new URL(url);
} catch {
  parsed = null;
}
if (!parsed || parsed.protocol !== 'https:' || !parsed.hostname.endsWith('x.com')) {
  process.stderr.write(`gta6-meme-x-01: POST.json url is not an https://x.com post address: ${url}\n`);
  process.exit(2);
}

mkdirSync(out, { recursive: true });
copyFileSync(postPath, join(out, 'POST.json'));
console.log(`gta6-meme-x-01: handed in ${url} -> ${join(out, 'POST.json')}`);
