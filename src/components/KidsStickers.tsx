import type { CSSProperties, ReactNode } from "react";

export type StickerIcon =
  | "teddy"
  | "lion"
  | "elephant"
  | "giraffe"
  | "panda"
  | "monkey"
  | "rainbow"
  | "balloons"
  | "stars"
  | "cloud"
  | "bubbles"
  | "sparkles"
  | "scissors"
  | "comb"
  | "hair-dryer"
  | "crown"
  | "rocket"
  | "dinosaur"
  | "unicorn"
  | "flowers"
  | "camera"
  | "hearts"
  | "speech"
  | "smile"
  | "confetti";

export type StickerAnimation = "float" | "rotate" | "bounce" | "none";
export type StickerPosition = Pick<CSSProperties, "top" | "right" | "bottom" | "left">;

export interface FloatingStickerProps {
  icon: StickerIcon;
  size?: number | string;
  animation?: StickerAnimation;
  delay?: number;
  position?: StickerPosition;
  className?: string;
  opacity?: number;
}

export interface StickerItem extends FloatingStickerProps {
  id: string;
}

interface KidsStickersProps {
  items: StickerItem[];
  className?: string;
}

const Face = ({
  color,
  ears,
  extra,
}: {
  color: string;
  ears?: string;
  extra?: ReactNode;
}) => (
  <>
    <circle cx="16" cy="24" r="9" fill={ears ?? color} />
    <circle cx="48" cy="24" r="9" fill={ears ?? color} />
    <circle cx="32" cy="34" r="22" fill={color} />
    {extra}
    <circle cx="24" cy="32" r="2.2" fill="#4b4453" />
    <circle cx="40" cy="32" r="2.2" fill="#4b4453" />
    <path d="M27 42c3 3 7 3 10 0" fill="none" stroke="#4b4453" strokeLinecap="round" strokeWidth="2.5" />
  </>
);

const StickerArtwork = ({ icon }: { icon: StickerIcon }) => {
  switch (icon) {
    case "teddy":
      return <Face color="#d8a47f" ears="#f3c6a6" extra={<ellipse cx="32" cy="39" rx="8" ry="6" fill="#f9ddc5" />} />;
    case "lion":
      return <Face color="#ffd28a" ears="#f5a65b" extra={<><circle cx="32" cy="34" r="27" fill="#f5a65b" /><circle cx="32" cy="34" r="20" fill="#ffd28a" /></>} />;
    case "panda":
      return <Face color="#fffaf6" ears="#4b4453" extra={<><ellipse cx="24" cy="32" rx="5" ry="7" fill="#4b4453" /><ellipse cx="40" cy="32" rx="5" ry="7" fill="#4b4453" /></>} />;
    case "monkey":
      return <Face color="#b87952" ears="#f0bd91" extra={<ellipse cx="32" cy="38" rx="13" ry="11" fill="#f5cba7" />} />;
    case "elephant":
      return (
        <>
          <circle cx="13" cy="31" r="12" fill="#b9c8e8" /><circle cx="51" cy="31" r="12" fill="#b9c8e8" />
          <circle cx="32" cy="31" r="22" fill="#cad7f0" /><circle cx="24" cy="28" r="2.2" fill="#4b4453" /><circle cx="40" cy="28" r="2.2" fill="#4b4453" />
          <path d="M32 34v17c0 5 8 5 8 0" fill="none" stroke="#9dafd3" strokeLinecap="round" strokeWidth="7" />
        </>
      );
    case "giraffe":
      return (
        <>
          <path d="M20 18V7m24 11V7" stroke="#a96b49" strokeWidth="5" strokeLinecap="round" /><circle cx="20" cy="6" r="4" fill="#f2b85b" /><circle cx="44" cy="6" r="4" fill="#f2b85b" />
          <ellipse cx="32" cy="34" rx="19" ry="25" fill="#ffd27a" /><circle cx="25" cy="25" r="4" fill="#b87952" /><circle cx="41" cy="42" r="4" fill="#b87952" />
          <circle cx="25" cy="34" r="2" fill="#4b4453" /><circle cx="39" cy="34" r="2" fill="#4b4453" /><path d="M27 45c3 2 7 2 10 0" fill="none" stroke="#4b4453" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "rainbow":
      return (
        <>
          <path d="M8 48a24 24 0 0 1 48 0" fill="none" stroke="#f59ab2" strokeWidth="8" />
          <path d="M15 48a17 17 0 0 1 34 0" fill="none" stroke="#ffd27a" strokeWidth="7" />
          <path d="M22 48a10 10 0 0 1 20 0" fill="none" stroke="#9fd8cf" strokeWidth="7" />
          <circle cx="10" cy="49" r="8" fill="#fff" /><circle cx="54" cy="49" r="8" fill="#fff" />
        </>
      );
    case "balloons":
      return (
        <>
          <ellipse cx="20" cy="22" rx="11" ry="15" fill="#f59ab2" /><ellipse cx="43" cy="19" rx="11" ry="15" fill="#9fd8cf" /><ellipse cx="34" cy="35" rx="11" ry="15" fill="#c3a6e8" />
          <path d="M20 37 31 59M43 34 33 59M34 50v9" stroke="#806a87" strokeWidth="1.5" />
        </>
      );
    case "stars":
      return <><path d="m32 5 7 16 17 2-13 11 4 17-15-9-15 9 4-17L8 23l17-2Z" fill="#ffd768" /><circle cx="47" cy="11" r="5" fill="#fff0a9" /></>;
    case "cloud":
      return (
        <>
          <path d="M14 47a11 11 0 0 1 2-22 17 17 0 0 1 32 4 9 9 0 0 1 1 18Z" fill="#fff" />
          <circle cx="26" cy="38" r="2" fill="#4b4453" /><circle cx="39" cy="38" r="2" fill="#4b4453" /><path d="M29 43c2 2 5 2 7 0" fill="none" stroke="#4b4453" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "bubbles":
      return <><circle cx="20" cy="38" r="13" fill="#dff8ff" fillOpacity=".65" stroke="#9edce8" strokeWidth="2" /><circle cx="43" cy="21" r="10" fill="#f1e8ff" fillOpacity=".65" stroke="#c3a6e8" strokeWidth="2" /><circle cx="47" cy="48" r="6" fill="#fff" fillOpacity=".65" stroke="#f7b5cf" strokeWidth="2" /></>;
    case "sparkles":
      return <><path d="M32 5c2 14 5 18 18 20-13 2-16 6-18 20-2-14-5-18-18-20 13-2 16-6 18-20Z" fill="#ffe170" /><path d="M51 37c1 7 3 9 9 10-6 1-8 3-9 10-1-7-3-9-9-10 6-1 8-3 9-10Z" fill="#f7a7cf" /></>;
    case "scissors":
      return <><circle cx="18" cy="46" r="9" fill="none" stroke="#f59ab2" strokeWidth="5" /><circle cx="42" cy="48" r="9" fill="none" stroke="#9fd8cf" strokeWidth="5" /><path d="m24 40 30-31M36 39 10 10" stroke="#7786a8" strokeWidth="5" strokeLinecap="round" /></>;
    case "comb":
      return <><path d="M10 14h44v13H10z" rx="5" fill="#c3a6e8" /><path d="M14 26v24m7-24v20m7-20v24m7-24v20m7-20v24m7-24v20" stroke="#9675be" strokeWidth="4" strokeLinecap="round" /></>;
    case "hair-dryer":
      return <><path d="M8 15h34a13 13 0 0 1 0 26H29L15 32H8Z" fill="#f59ab2" /><path d="m29 38 4 19H21l-5-25" fill="#e57d9f" /><path d="M48 20h9v16h-9" fill="#9fd8cf" /></>;
    case "crown":
      return <><path d="m7 19 13 11 12-20 12 20 13-11-5 34H12Z" fill="#ffd768" stroke="#efb84f" strokeWidth="2" /><circle cx="32" cy="39" r="4" fill="#f59ab2" /></>;
    case "rocket":
      return <><path d="M23 43C18 25 27 10 45 5c3 18-5 31-22 38Z" fill="#dbe6ff" stroke="#7786a8" strokeWidth="2" /><circle cx="34" cy="22" r="6" fill="#9fd8cf" /><path d="M23 38 12 40l-5 12 15-5m5-3-1 13 12-8" fill="#f59ab2" /><path d="m18 49-8 8" stroke="#ffd768" strokeWidth="6" strokeLinecap="round" /></>;
    case "dinosaur":
      return <><path d="M10 46c4-22 20-32 41-24l7-8-1 25c-5 14-24 19-47 7Z" fill="#9fd8cf" /><circle cx="46" cy="27" r="2" fill="#4b4453" /><path d="m13 39-7-7 10-1m7-8-2-9 9 6m9-2 5-8 4 11" fill="#c3a6e8" /></>;
    case "unicorn":
      return <><path d="m31 19 8-17 4 21" fill="#ffd768" /><Face color="#fff8fb" ears="#f7b5cf" extra={<><path d="M13 20c13-11 26-10 38 0-8 1-14 4-18 11" fill="#c3a6e8" /><path d="M46 43c-3 5-8 8-13 9" stroke="#f59ab2" strokeWidth="5" strokeLinecap="round" /></>} /></>;
    case "flowers":
      return <><circle cx="32" cy="32" r="7" fill="#ffd768" />{[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx="32" cy="18" rx="8" ry="11" fill={angle % 120 ? "#f7b5cf" : "#c3a6e8"} transform={`rotate(${angle} 32 32)`} />)}</>;
    case "camera":
      return <><rect x="7" y="18" width="50" height="36" rx="9" fill="#c3a6e8" /><path d="m20 18 5-8h14l5 8" fill="#9675be" /><circle cx="32" cy="36" r="11" fill="#fff" /><circle cx="32" cy="36" r="7" fill="#9fd8cf" /><circle cx="49" cy="25" r="3" fill="#ffd768" /></>;
    case "hearts":
      return <><path d="M32 54 8 31C-4 16 18 4 32 19 46 4 68 16 56 31Z" fill="#f59ab2" /><path d="M45 11c4 5 5 10 2 15" fill="none" stroke="#ffd8e5" strokeWidth="4" strokeLinecap="round" /></>;
    case "speech":
      return <><path d="M6 9h52v38H30L17 58l2-11H6Z" fill="#dff8ff" stroke="#9fd8cf" strokeWidth="2" /><circle cx="20" cy="29" r="3" fill="#806a87" /><circle cx="32" cy="29" r="3" fill="#806a87" /><circle cx="44" cy="29" r="3" fill="#806a87" /></>;
    case "smile":
      return <><circle cx="32" cy="32" r="27" fill="#ffd768" /><circle cx="23" cy="27" r="3" fill="#4b4453" /><circle cx="41" cy="27" r="3" fill="#4b4453" /><path d="M20 38c7 11 18 11 25 0" fill="none" stroke="#4b4453" strokeWidth="4" strokeLinecap="round" /></>;
    case "confetti":
      return <><path d="m17 6 4 13M47 8l-6 12M8 31l13 3m35-4-13 4M14 52l10-8m27 8-10-8" stroke="#f59ab2" strokeWidth="5" strokeLinecap="round" /><circle cx="32" cy="32" r="6" fill="#ffd768" /><path d="m31 3 3 7m-3 44 3 7" stroke="#9fd8cf" strokeWidth="4" /></>;
  }
};

export const FloatingSticker = ({
  icon,
  size = 64,
  animation = "float",
  delay = 0,
  position,
  className = "",
  opacity = 0.9,
}: FloatingStickerProps) => {
  const resolvedSize = typeof size === "number" ? `${size}px` : size;
  const style = {
    ...position,
    "--kids-sticker-size": resolvedSize,
    "--kids-sticker-delay": `${delay}s`,
    "--kids-sticker-opacity": opacity,
  } as CSSProperties;

  return (
    <span
      className={`kids-sticker kids-sticker--${animation} ${className}`}
      style={style}
      aria-hidden="true"
      data-sticker-icon={icon}
    >
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <StickerArtwork icon={icon} />
      </svg>
    </span>
  );
};

const KidsStickers = ({ items, className = "" }: KidsStickersProps) => (
  <div className={`kids-sticker-layer ${className}`} aria-hidden="true">
    {items.map(({ id, ...item }) => <FloatingSticker key={id} {...item} />)}
  </div>
);

export default KidsStickers;
