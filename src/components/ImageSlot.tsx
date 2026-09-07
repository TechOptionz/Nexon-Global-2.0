import type { CSSProperties } from "react";
import Image from "next/image";
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
  /**
   * How wide the slot actually renders, so the browser can pick the smallest
   * usable file from the generated srcset. Defaults to full viewport width,
   * which is never too small — pass a tighter hint for cards and grids.
   */
  sizes?: string;
  /**
   * Above-the-fold slots load eagerly; everything else stays lazy so the
   * first screen isn't competing with images further down the page.
   */
  eager?: boolean;
  /**
   * Where the subject sits in the frame, as an `object-position` value.
   *
   * The card slots are portrait and the photographs are 16:9, so a card
   * shows roughly the middle 40% of its picture and the rest is cropped
   * away. Centre is the right guess often enough to be the default, but
   * a photograph whose subject sits off-centre needs to say so — e.g.
   * `focal="70% 40%"`.
   */
  focal?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Stand-in for the design source's <image-slot> custom element.
 * Checks for a mapped image in `SLOT_IMAGES` or an explicitly provided `src`.
 * If found, renders the photograph. If absent, renders the elegant sand
 * placeholder with its art-direction caption.
 *
 * Photographs go through `next/image`, which serves AVIF/WebP at the width the
 * slot actually needs instead of shipping the full-size original to every
 * viewport.
 */
export default function ImageSlot({
  placeholder,
  src,
  shape = "rect",
  radius,
  inFlow = false,
  sizes = "100vw",
  eager = false,
  focal,
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
           container, so `fill` is the right primitive here. */
        <Image
          src={activeSrc}
          alt={placeholder}
          fill
          sizes={sizes}
          quality={90}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          style={focal ? { objectPosition: focal } : undefined}
        />
      ) : (
        <span className="image-slot__caption">{placeholder}</span>
      )}
    </div>
  );
}
