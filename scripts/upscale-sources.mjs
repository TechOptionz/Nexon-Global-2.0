/**
 * Doubles the pixel dimensions of every source photograph.
 *
 * The slots these fill are bigger than the files behind them. A full-bleed
 * hero at 1200 CSS px on a 2x display asks for 2400 device pixels; the
 * destination sources are 1376 wide and the lifestyle (people) ones only
 * 1264, so the browser was stretching them 1.5-2.1x and the result read as
 * blurry — worst on faces, which show softness far more readily than
 * landscapes. No `quality` setting fixes that; it is a resolution problem.
 *
 * Lanczos3 resampling plus a light unsharp mask does not invent detail, but
 * it reconstructs edges far better than the browser's own upscale and
 * restores the local contrast that makes a face read as sharp.
 *
 * Originals are copied to `.image-originals/` on the first run and every
 * later run re-derives from that copy, so this is idempotent — re-running
 * never sharpens an already-sharpened file — and reversible: copy the tree
 * back over `public/` to undo.
 *
 *   node scripts/upscale-sources.mjs [--scale 2] [--revert]
 */
import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const SCALE = Number(args[args.indexOf("--scale") + 1]) || 2;
const REVERT = args.includes("--revert");

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const PUBLIC = path.join(ROOT, "public");
const BACKUP = path.join(ROOT, ".image-originals");

/* The photographs only. SVGs are vector and the video poster's own frame is
   already generated at display size. */
const RE = /\.(jpe?g|png|webp)$/i;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (RE.test(e.name)) out.push(p);
  }
  return out;
}

const files = await walk(PUBLIC);
const rel = (p) => path.relative(PUBLIC, p);

if (REVERT) {
  if (!existsSync(BACKUP)) {
    console.error("No .image-originals/ to revert from.");
    process.exit(1);
  }
  for (const src of await walk(BACKUP)) {
    const dest = path.join(PUBLIC, path.relative(BACKUP, src));
    await copyFile(src, dest);
  }
  console.log("Reverted public/ from .image-originals/");
  process.exit(0);
}

/* First run takes the backup. Later runs leave it alone — it is the master. */
let backed = 0;
for (const f of files) {
  const b = path.join(BACKUP, rel(f));
  if (!existsSync(b)) {
    await mkdir(path.dirname(b), { recursive: true });
    await copyFile(f, b);
    backed += 1;
  }
}
console.log(backed ? `Backed up ${backed} original(s) to .image-originals/` : "Using existing .image-originals/ as the master");

let grew = 0;
let before = 0;
let after = 0;

for (const f of files) {
  const master = path.join(BACKUP, rel(f));
  const src = existsSync(master) ? master : f;
  const img = sharp(src);
  const m = await img.metadata();
  const w = Math.round(m.width * SCALE);

  const pipe = sharp(src)
    .resize(w, null, { kernel: "lanczos3" })
    /* Gentle: these masters carry JPEG artefacts already, and a heavy mask
       would sharpen those as readily as the subject. */
    .sharpen({ sigma: 1.1, m1: 0.6, m2: 2.2 });

  /* Masters are only ever re-encoded by next/image, never served directly,
     so they are kept high-quality — the old q76 pass is what stacked a
     second generation loss under the AVIF encode. */
  const buf = /\.png$/i.test(f)
    ? await pipe.png({ compressionLevel: 9 }).toBuffer()
    : /\.webp$/i.test(f)
      ? await pipe.webp({ quality: 92 }).toBuffer()
      : await pipe.jpeg({ quality: 92, mozjpeg: true, progressive: true }).toBuffer();

  before += (await stat(f)).size;
  after += buf.length;
  await sharp(buf).toFile(f);
  grew += 1;
  console.log(`  ${rel(f).padEnd(46)} ${m.width}x${m.height} -> ${w}x${Math.round(m.height * SCALE)}`);
}

const mb = (n) => (n / 1024 / 1024).toFixed(1) + "MB";
console.log(`\n${grew} image(s) upscaled ${SCALE}x on disk: ${mb(before)} -> ${mb(after)}`);
console.log("Masters are not served — next/image re-encodes them to AVIF at the width each slot needs.");
console.log("Undo with: node scripts/upscale-sources.mjs --revert");
