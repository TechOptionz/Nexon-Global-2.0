import type { CSSProperties } from "react";
import { getSlotImage } from "@/lib/slot-images";

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
 * Stand-in for the design source's <image-slot> custom element.
 * Checks for a mapped image in `SLOT_IMAGES` or an explicitly provided `src`.
 * If found, renders the photograph. If absent, renders the elegant sand
 * placeholder with its art-direction caption.
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
  const activeSrc = getSlotImage(placeholder, src);

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
      {activeSrc ? (
        /* Slots are decorative art direction sized entirely by their
           container, so a plain <img> is the right primitive here. */
        // eslint-disable-next-line @next/next/no-img-element
        <img src={activeSrc} alt={placeholder} loading="lazy" />
      ) : (
        <span className="image-slot__caption">{placeholder}</span>
      )}
    </div>
  );
}
