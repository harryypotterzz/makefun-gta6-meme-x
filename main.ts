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

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
copyFileSync(join(here, 'POST.json'), join(out, 'POST.json'));
