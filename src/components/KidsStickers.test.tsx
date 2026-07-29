import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import KidsStickers, { FloatingSticker, type StickerIcon } from "./KidsStickers";

const requiredThemes: StickerIcon[] = [
  "teddy",
  "lion",
  "elephant",
  "giraffe",
  "panda",
  "monkey",
  "rainbow",
  "balloons",
  "stars",
  "cloud",
  "bubbles",
  "sparkles",
  "scissors",
  "comb",
  "hair-dryer",
  "crown",
  "rocket",
  "dinosaur",
  "unicorn",
];

describe("KidsStickers", () => {
  it("renders every required sticker theme as lightweight inline SVG", () => {
    const { container } = render(
      <KidsStickers
        items={requiredThemes.map((icon) => ({
          id: icon,
          icon,
          animation: "none",
        }))}
      />,
    );

    expect(container.querySelectorAll("[data-sticker-icon]")).toHaveLength(requiredThemes.length);
    expect(container.querySelectorAll("svg")).toHaveLength(requiredThemes.length);
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });

  it("keeps decorative artwork hidden from assistive technology and pointer input", () => {
    const { container } = render(
      <KidsStickers items={[{ id: "cloud", icon: "cloud" }]} />,
    );

    const layer = container.querySelector(".kids-sticker-layer");
    const sticker = container.querySelector("[data-sticker-icon='cloud']");
    const svg = container.querySelector("svg");

    expect(layer).toHaveAttribute("aria-hidden", "true");
    expect(sticker).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(layer).toHaveClass("kids-sticker-layer");
  });

  it("supports configurable size, animation, delay, position, and opacity", () => {
    const { container } = render(
      <FloatingSticker
        icon="rainbow"
        size="5rem"
        animation="rotate"
        delay={1.5}
        position={{ top: "12%", right: "4%" }}
        opacity={0.65}
      />,
    );

    const sticker = container.querySelector("[data-sticker-icon='rainbow']") as HTMLElement;
    expect(sticker).toHaveClass("kids-sticker--rotate");
    expect(sticker.style.top).toBe("12%");
    expect(sticker.style.right).toBe("4%");
    expect(sticker.style.getPropertyValue("--kids-sticker-size")).toBe("5rem");
    expect(sticker.style.getPropertyValue("--kids-sticker-delay")).toBe("1.5s");
    expect(sticker.style.getPropertyValue("--kids-sticker-opacity")).toBe("0.65");
  });
});
