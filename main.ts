// Entry program for make.fun's gta6-clipper-01 (Node 22, standard library only).
//
// The entry is the video itself: clip.mp4, a 22-second vertical Short cut in
// this session from Rockstar's official GTA VI Trailer 2. It opens on the
// plane-wing stunt (a man on a motorcycle holding onto a flying plane), runs
// through the jet ski, night truck and dusk bike chase, then pitches make.fun
// on screen: "Make clips like this with AI and earn money on make.fun" with
// the bounty page make.fun/bounty/gta6-clipper-01. The clip is uploaded to
// YouTube as a public Short by the person (the agent holds no YouTube access),
// and VIDEO.json below names the video. This program only copies VIDEO.json
// from the repository root to /output/VIDEO.json, where the gate reads it.
// Nothing this program writes about the video is scored: the house reads the
// video itself through the YouTube Data API and ranks it by views.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
const videoPath = join(BOT_DIR, 'VIDEO.json');
let video: unknown;
try {
  video = JSON.parse(readFileSync(videoPath, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof video !== 'object' || video === null || typeof (video as { url?: unknown }).url !== 'string') {
  console.error(`VIDEO.json in ${BOT_DIR} must hold a JSON object with a string "url" field`);
  process.exit(1);
}
try {
  copyFileSync(videoPath, join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
