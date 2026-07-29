import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
} from "react";

type TiltCardProps = HTMLAttributes<HTMLDivElement> & {
  maxTilt?: number;
};

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, className = "", maxTilt = 4, onPointerMove, onPointerLeave, ...props }, forwardedRef) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const frameRef = useRef<number | null>(null);

    const setRefs = (node: HTMLDivElement | null) => {
      cardRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    const resetTilt = useCallback(() => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      const card = cardRef.current;
      if (!card) return;
      card.style.setProperty("--ks-tilt-x", "0deg");
      card.style.setProperty("--ks-tilt-y", "0deg");
      card.dataset.tilting = "false";
    }, []);

    useEffect(() => {
      const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
      const handleMotionChange = () => {
        if (reducedMotion.matches) resetTilt();
      };
      reducedMotion.addEventListener("change", handleMotionChange);
      return () => {
        reducedMotion.removeEventListener("change", handleMotionChange);
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      };
    }, [resetTilt]);

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event);
      if (
        !window.matchMedia(FINE_POINTER_QUERY).matches ||
        window.matchMedia(REDUCED_MOTION_QUERY).matches
      ) {
        return;
      }

      const card = cardRef.current;
      if (!card) return;
      const { left, top, width, height } = card.getBoundingClientRect();
      if (!width || !height) return;
      const pointerX = (event.clientX - left) / width - 0.5;
      const pointerY = (event.clientY - top) / height - 0.5;
      const rotateX = Math.max(-maxTilt, Math.min(maxTilt, pointerY * -2 * maxTilt));
      const rotateY = Math.max(-maxTilt, Math.min(maxTilt, pointerX * 2 * maxTilt));

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        card.style.setProperty("--ks-tilt-x", `${rotateX.toFixed(2)}deg`);
        card.style.setProperty("--ks-tilt-y", `${rotateY.toFixed(2)}deg`);
        card.dataset.tilting = "true";
      });
    };

    const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(event);
      resetTilt();
    };

    return (
      <div
        ref={setRefs}
        className={`ks-tilt-card ${className}`}
        data-tilting="false"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TiltCard.displayName = "TiltCard";

export default TiltCard;
