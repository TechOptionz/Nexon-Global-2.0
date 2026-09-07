/* ------------------------------------------------------------------
   Route transition.

   A `template` remounts on every navigation, where a `layout` does
   not — so the animation below replays on each route change without a
   single line of JavaScript, and without holding up hydration or
   interaction. It is a CSS animation on an element that is already
   painted: nothing waits for it.

   Deliberately opacity only. A transform here — even one that ends at
   `none` — makes this wrapper the containing block for every fixed
   descendant while it runs, and the mobile drawer is `position: fixed`
   inside it. The upward movement the brief asks for is still there: it
   comes from the per-element hero entrances, which remount and replay
   with this wrapper, so the page fades in as its first elements rise.
   ------------------------------------------------------------------ */

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}
