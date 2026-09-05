import type { CSSProperties } from "react";

type Props = {
  /** Caption shown while the slot is empty — the art direction note. */
  placeholder: string;
  /** Optional real image. When present it fills the slot. */
  src?: string;
  shape?: "rect" | "rounded" | "circle";
  radius?: number;
  /** Renders in normal flow instead of filling a positioned parent. */
  inFlow?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Stand-in for the design source's <image-slot> custom element. Empty
 * slots render the sand placeholder with its art-direction caption, so
 * the composition reads exactly as it does on the artboards; passing
 * `src` swaps in the real photograph.
 */
export default function ImageSlot({
  placeholder,
  src,
  shape = "rect",
  radius,
  inFlow = false,
  className = "",
  style,
}: Props) {
  const radiusStyle: CSSProperties =
    shape === "circle"
      ? { borderRadius: "50%" }
      : shape === "rounded"
        ? { borderRadius: radius ?? 12 }
        : radius
          ? { borderRadius: radius }
          : {};

  return (
    <div
      className={`image-slot${inFlow ? " image-slot--static" : ""} ${className}`.trim()}
      style={{ ...radiusStyle, ...style }}
    >
      {src ? (
        /* Slots are decorative art direction sized entirely by their
           container, so a plain <img> is the right primitive here. */
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={placeholder} loading="lazy" />
      ) : (
        <span className="image-slot__caption">{placeholder}</span>
      )}
    </div>
  );
}
