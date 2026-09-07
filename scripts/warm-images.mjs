/**
 * Pre-generates every optimised image rendition the site actually serves.
 *
 * `next/image` encodes on demand: the first request for a given
 * (source, width, format) triple pays the full AVIF encode — measured at
 * 1–2s per rendition on this project's 1376x768 sources — and every request
 * after that is served from `.next/cache/images` in ~15ms. Left alone, that
 * cost lands on whoever browses first, and it lands again on every page they
 * scroll into. Warming the cache moves it to build time, once.
 *
 * Routes come from the build's own prerender manifest and the renditions come
 * from the rendered HTML, so this warms exactly what the site emits — no
 * separate list to keep in step with the components.
 *
 *   node scripts/warm-images.mjs [--base http://localhost:3000] [--webp]
 *
 * `--webp` additionally warms the WebP fallback that browsers without AVIF
 * (Safari before 16) request. It roughly doubles the run, so it is opt-in.
 */
import { readFile } from "node:fs/promises";
import { availableParallelism } from "node:os";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const BASE = (flag("base", "http://localhost:3000")).replace(/\/$/, "");
const WITH_WEBP = args.includes("--webp");

/* Encoding is CPU-bound, so more in flight than we have cores just adds
   queueing. One core is left for the server's own work. */
const CONCURRENCY = Math.max(2, availableParallelism() - 1);

const ACCEPT = {
  avif: "image/avif,image/webp,image/*,*/*;q=0.8",
  webp: "image/webp,image/*,*/*;q=0.8",
};

async function routes() {
  try {
    const manifest = JSON.parse(
      await readFile(new URL("../.next/prerender-manifest.json", import.meta.url), "utf8"),
    );
    return Object.keys(manifest.routes ?? {}).filter(
      /* Error pages and the favicon carry no photography. */
      (r) => !r.startsWith("/_") && r !== "/favicon.ico",
    );
  } catch {
    console.warn("! no prerender manifest — falling back to the home page only");
    console.warn("  (run `next build` first to warm every route)");
    return ["/"];
  }
}

/** Every distinct `/_next/image` rendition referenced by a page's srcsets. */
async function renditionsOf(route) {
  const res = await fetch(`${BASE}${route}`);
  if (!res.ok) throw new Error(`${route} -> ${res.status}`);
  const html = await res.text();
  const found = html.match(/\/_next\/image\?url=[^"\s]+/g) ?? [];
  /* srcset URLs arrive HTML-escaped. */
  return found.map((u) => u.replace(/&amp;/g, "&"));
}

/** Runs `worker` over `items`, `limit` at a time, preserving nothing. */
async function pool(items, limit, worker) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    for (let item = queue.shift(); item !== undefined; item = queue.shift()) {
      await worker(item);
    }
  });
  await Promise.all(runners);
}

const started = Date.now();
const list = await routes();
console.log(`Warming images for ${list.length} route(s) via ${BASE}`);

const urls = new Set();
const failedRoutes = [];
await pool(list, CONCURRENCY, async (route) => {
  try {
    for (const u of await renditionsOf(route)) urls.add(u);
  } catch (err) {
    failedRoutes.push(`${route}: ${err.message}`);
  }
});

const formats = WITH_WEBP ? ["avif", "webp"] : ["avif"];
const jobs = [...urls].flatMap((url) => formats.map((format) => ({ url, format })));

if (jobs.length === 0) {
  console.error("No image renditions found. Is the server at", BASE, "running?");
  process.exit(1);
}

console.log(`${urls.size} rendition(s) x ${formats.join("+")} = ${jobs.length} request(s), ${CONCURRENCY} at a time\n`);

let done = 0;
let slow = 0;
const failed = [];

await pool(jobs, CONCURRENCY, async ({ url, format }) => {
  const at = Date.now();
  try {
    const res = await fetch(`${BASE}${url}`, { headers: { Accept: ACCEPT[format] } });
    /* The body has to be drained or the encode may not be committed to cache. */
    await res.arrayBuffer();
    if (!res.ok) failed.push(`${res.status} ${format} ${url}`);
  } catch (err) {
    failed.push(`ERR ${format} ${url} — ${err.message}`);
  }
  /* Anything past half a second was a real encode rather than a cache hit. */
  if (Date.now() - at > 500) slow += 1;
  done += 1;
  if (done % 25 === 0 || done === jobs.length) {
    process.stdout.write(`  ${done}/${jobs.length}\r`);
  }
});

const secs = ((Date.now() - started) / 1000).toFixed(1);
console.log(`\n\nWarmed ${jobs.length - failed.length}/${jobs.length} in ${secs}s (${slow} encoded, rest already cached)`);

for (const r of failedRoutes) console.warn(`! route ${r}`);
/* A missing source file 400s here rather than at 3am in front of a visitor. */
for (const f of failed.slice(0, 20)) console.warn(`! ${f}`);
if (failed.length > 20) console.warn(`! ...and ${failed.length - 20} more`);

if (failed.length || failedRoutes.length) process.exitCode = 1;
