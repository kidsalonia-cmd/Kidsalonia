import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TiltCard from "./TiltCard";

const setMediaPreferences = ({ finePointer = true, reducedMotion = false } = {}) => {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query.includes("prefers-reduced-motion") ? reducedMotion : finePointer,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
  }));
};

describe("TiltCard", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children and keeps nested links interactive", () => {
    setMediaPreferences();
    const handleClick = vi.fn();
    render(
      <TiltCard>
        <a
          href="/book?service=kids-haircut"
          onClick={(event) => {
            event.preventDefault();
            handleClick();
          }}
        >
          Book haircut
        </a>
      </TiltCard>,
    );

    const bookingLink = screen.getByRole("link", { name: "Book haircut" });
    expect(bookingLink).toHaveAttribute(
      "href",
      "/book?service=kids-haircut",
    );
    fireEvent.click(bookingLink);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("resets tilt variables after pointer leave", () => {
    setMediaPreferences();
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });
    const { container } = render(<TiltCard>Salon card</TiltCard>);
    const card = container.firstElementChild as HTMLDivElement;
    vi.spyOn(card, "getBoundingClientRect").mockReturnValue({
      width: 200,
      height: 100,
      left: 0,
      top: 0,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    fireEvent.pointerMove(card, { clientX: 180, clientY: 20 });
    expect(card.dataset.tilting).toBe("true");
    expect(card.style.getPropertyValue("--ks-tilt-y")).not.toBe("0deg");

    fireEvent.pointerLeave(card);
    expect(card.dataset.tilting).toBe("false");
    expect(card.style.getPropertyValue("--ks-tilt-x")).toBe("0deg");
    expect(card.style.getPropertyValue("--ks-tilt-y")).toBe("0deg");
  });

  it("does not tilt when reduced motion is enabled", () => {
    setMediaPreferences({ reducedMotion: true });
    const requestFrame = vi.spyOn(window, "requestAnimationFrame");
    const { container } = render(<TiltCard>Calm card</TiltCard>);
    const card = container.firstElementChild as HTMLDivElement;

    fireEvent.pointerMove(card, { clientX: 80, clientY: 20 });

    expect(requestFrame).not.toHaveBeenCalled();
    expect(card.dataset.tilting).toBe("false");
  });
});
