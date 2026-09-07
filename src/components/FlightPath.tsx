"use client";

import { useId, type CSSProperties } from "react";

/* ------------------------------------------------------------------
   Flight path — a routing diagram for the empty half of a hero.

   A plane flies a multi-leg route across the blank column and leaves a
   dashed trail behind it. Each leg ends at a stop, marked and named;
   the route ahead of the plane is drawn faintly, so the graphic reads
   as an itinerary rather than as decoration.

   Nothing here is timed by hand. The trail, the stop markers and the
   names are all revealed by masks wiped along the same path on the
   same clock as the plane, so a name arrives exactly as the plane
   passes its stop — whatever the route turns out to be.

   The geometry is generated from the stops given, so a service with
   four programs and one with two both get a route that fits.
   ------------------------------------------------------------------ */

/** The user-space box. Wide and shallow: the hero only leaves the band
    between the heading and the photograph, and the box has to clear the
    heading in Arabic too, where the h1 fills its whole column. Its size
    is close to the smallest the graphic is drawn at, so scaling mostly
    enlarges the labels rather than shrinking them. */
const W = 640;
const H = 138;

/** Route shape. Stops alternate either side of a gently climbing
    baseline, which is what gives every leg its own slope and direction
    instead of one long sweep. */
/* The route stops short of the box on both sides so a name centred on
   the first or last stop still has room to sit under it. */
const X0 = 84;
const X1 = 556;
const BASE_START = 72;
const BASE_END = 66;
const ZIG = 34;
const CORNER = 18;
const LEAD = 120;

/** The most stops the route stays legible with. An even count also
    puts the destination at the top of the climb. */
const MAX_STOPS = 4;

/* A plan-view airliner on a 24-unit grid, nose up; the wrapper turns it
   nose-right, the direction `offset-rotate: auto` aims along the path. */
const PLANE =
  "M 21 16 v -2 l -8 -5 V 3.5 a 1.5 1.5 0 0 0 -3 0 V 9 l -8 5 v 2 l 8 -2.5 V 19 " +
  "l -2 1.5 V 22 l 3.5 -1 3.5 1 v -1.5 L 13 19 v -5.5 z";

type Point = { x: number; y: number };

/** Whether a stop sits above the baseline. The first is always low, so
    the graphic keeps its top-left corner clear of the heading it sits
    beside; with an even number of stops the last one is the high point.
    A name follows its stop, above the high ones and below the low. */
const isHigh = (i: number) => i % 2 === 1;

/** Corner points: evenly spaced along the baseline, alternating sides. */
function corners(count: number): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    return {
      x: X0 + (X1 - X0) * t,
      y: BASE_START + (BASE_END - BASE_START) * t + (isHigh(i) ? -ZIG : ZIG),
    };
  });
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** The point `by` past `from`, on the line away from `towards`. */
function extend(from: Point, towards: Point, by: number): Point {
  const len = Math.hypot(towards.x - from.x, towards.y - from.y);
  return {
    x: from.x - ((towards.x - from.x) / len) * by,
    y: from.y - ((towards.y - from.y) / len) * by,
  };
}

/**
 * The route, with its corners eased off so the plane banks through a
 * turn rather than snapping round it. Returns the path and the point
 * on each turn the line actually passes through: the corner itself is
 * cut away, so markers belong on the curve, not on the corner.
 */
function route(pts: Point[]): { body: string; marks: Point[] } {
  const d: string[] = [];
  const marks: Point[] = [pts[0]];

  for (let i = 1; i < pts.length - 1; i += 1) {
    const prev = pts[i - 1];
    const here = pts[i];
    const next = pts[i + 1];
    const inLen = Math.hypot(here.x - prev.x, here.y - prev.y);
    const outLen = Math.hypot(next.x - here.x, next.y - here.y);
    const r = Math.min(CORNER, inLen / 2, outLen / 2);

    const a = {
      x: here.x - ((here.x - prev.x) / inLen) * r,
      y: here.y - ((here.y - prev.y) / inLen) * r,
    };
    const b = {
      x: here.x + ((next.x - here.x) / outLen) * r,
      y: here.y + ((next.y - here.y) / outLen) * r,
    };

    d.push(
      `L ${round1(a.x)} ${round1(a.y)}`,
      `Q ${round1(here.x)} ${round1(here.y)} ${round1(b.x)} ${round1(b.y)}`,
    );
    // Midpoint of that quadratic: where the flown line really goes.
    marks.push({ x: (a.x + 2 * here.x + b.x) / 4, y: (a.y + 2 * here.y + b.y) / 4 });
  }

  const last = pts[pts.length - 1];
  d.push(`L ${last.x} ${last.y}`);
  marks.push(last);

  // Returned without its opening move, so the mask below can start the
  // same shape from a point of its own.
  return { body: d.join(" "), marks };
}

type Props = {
  /** Stops along the route, in order. The last one is the destination. */
  stops: string[];
  /** Extra classes — `flight-path--hero` places it in a page hero. */
  className?: string;
  style?: CSSProperties;
};

export default function FlightPath({ stops, className = "", style }: Props) {
  // Masks are document-scoped; two of these on a page must not collide.
  const uid = useId().replace(/:/g, "");

  const names = stops.slice(0, MAX_STOPS);
  if (names.length < 2) return null;

  const pts = corners(names.length);
  const { body, marks } = route(pts);
  const start = pts[0];
  const end = marks[marks.length - 1];
  const d = `M ${start.x} ${start.y} ${body}`;

  /* The wipes below are squared off across the route at each end, and
     would cut through a name lying beyond those lines. The one that
     uncovers the names therefore runs from well short of the first stop
     to well past the last — and, because both are normalised to a
     length of 1, is given the offsets that put its front exactly where
     the shorter wipe's front is, rather than a fraction of a leg ahead. */
  const before = extend(pts[0], pts[1], LEAD);
  const after = extend(pts[pts.length - 1], pts[pts.length - 2], LEAD);
  const stopsD =
    `M ${round1(before.x)} ${round1(before.y)} L ${start.x} ${start.y} ${body} ` +
    `L ${round1(after.x)} ${round1(after.y)}`;
  const legs = pts
    .slice(1)
    .reduce((sum, p, i) => sum + Math.hypot(p.x - pts[i].x, p.y - pts[i].y), 0);
  const overshoot = LEAD / (legs + 2 * LEAD);

  // A name sits on the outside of its turn, never on the line.
  const above = names.map((_, i) => isHigh(i));

  const stop = (p: Point, i: number) => {
    const last = i === names.length - 1;
    const side = above[i] ? -1 : 1;
    return (
      <g
        key={names[i]}
        className={last ? "flight-path__stop flight-path__stop--end" : "flight-path__stop"}
      >
        <circle className="flight-path__ring" cx={p.x} cy={p.y} r={last ? 5 : 3.9} />
        {last && <circle className="flight-path__core" cx={p.x} cy={p.y} r="1.8" />}
        <line
          className="flight-path__tick"
          x1={p.x}
          y1={p.y + side * 6}
          x2={p.x}
          y2={p.y + side * 13}
        />
        <text
          className="flight-path__label"
          x={p.x}
          y={p.y + (above[i] ? -20 : 26)}
          textAnchor="middle"
        >
          {names[i]}
        </text>
      </g>
    );
  };

  return (
    <div
      className={`flight-path ${className}`.trim()}
      style={style}
      aria-hidden="true"
      data-no-anim
    >
      <svg viewBox={`0 0 ${W} ${H}`} fill="none" role="presentation" focusable="false">
        <defs>
          {/* Both wipes run the same 1 -> 0 dash offset on the same
              clock. The narrow one uncovers the trail at the nose, the
              wide one the stops and names to either side of it — wide
              enough that a name is never left half-drawn where the leg
              runs steeply. pathLength="1" keeps the wipe independent of
              the route's real length, so the geometry can change. */}
          {[
            { id: `flight-trail-${uid}`, width: 12, d, from: 1, to: 0 },
            {
              id: `flight-stops-${uid}`,
              width: 96,
              d: stopsD,
              from: 1 - overshoot,
              to: overshoot,
            },
          ].map((mask) => (
            <mask
              key={mask.id}
              id={mask.id}
              maskUnits="userSpaceOnUse"
              x={-LEAD - 60}
              y="-60"
              width={W + 2 * LEAD + 120}
              height={H + 120}
            >
              <path
                className="flight-path__wipe"
                d={mask.d}
                pathLength="1"
                stroke="#fff"
                strokeWidth={mask.width}
                strokeLinecap="butt"
                fill="none"
                style={
                  {
                    "--wipe-from": mask.from,
                    "--wipe-to": mask.to,
                  } as CSSProperties
                }
              />
            </mask>
          ))}
        </defs>

        <g className="flight-path__group">
          {/* The itinerary, before it is flown. */}
          <path className="flight-path__route" d={d} />
          {marks.map((p, i) => (
            <circle key={names[i]} className="flight-path__ahead" cx={p.x} cy={p.y} r="3.4" />
          ))}

          {/* And the same route once the plane has been over it. */}
          <g mask={`url(#flight-trail-${uid})`}>
            <path className="flight-path__trail" d={d} />
          </g>

          {/* Every stop on the way is uncovered by the wipe, as the
              plane draws level with it. */}
          <g mask={`url(#flight-stops-${uid})`}>{marks.slice(0, -1).map(stop)}</g>

          {/* The destination is not. A plane eases into its last stop,
              so a wipe would crawl across that name letter by letter
              just as the eye arrives at it; it fades up over the final
              approach instead, and is whole on touchdown. */}
          {stop(end, names.length - 1)}

          <circle className="flight-path__pulse" cx={end.x} cy={end.y} r="5" />

          {/* offset-path is set here rather than in CSS so the route has
              a single source of truth. */}
          <g className="flight-path__plane" style={{ offsetPath: `path("${d}")` } as CSSProperties}>
            <path d={PLANE} transform="rotate(90) scale(1.15) translate(-12 -12)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
