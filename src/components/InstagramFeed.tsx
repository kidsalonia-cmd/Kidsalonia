import { useEffect, useRef, useState } from "react";
import { CalendarDays, ExternalLink, Instagram, Layers3, MessageCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { instagramPosts, type InstagramPost } from "@/data/instagram-posts";
import { getBookingPath } from "@/lib/booking";
import KidsStickers from "@/components/KidsStickers";

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/kidsalonia";
const INSTAGRAM_EMBED_SCRIPT_SRC = "https://www.instagram.com/embed.js";
const INSTAGRAM_EMBED_SCRIPT_ID = "instagram-embed-script";
const EMBED_TIMEOUT_MS = 10_000;
const EMBED_PROCESS_RETRY_DELAYS_MS = [500, 1_500] as const;
const WHATSAPP_URL = `https://wa.me/918130307036?text=${encodeURIComponent(
  "Hi KidSalonia! I saw your Instagram feed and would like help booking a salon visit for my child.",
)}`;

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

type InstagramFeedProps = {
  posts?: InstagramPost[];
};

const loadInstagramEmbedScript = () => {
  if (window.instgrm?.Embeds) {
    return Promise.resolve();
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${INSTAGRAM_EMBED_SCRIPT_SRC}"]`,
  );

  return new Promise<void>((resolve, reject) => {
    const script = existingScript ?? document.createElement("script");
    const handleLoad = () => {
      script.dataset.instagramLoaded = "true";
      resolve();
    };
    const handleError = () => reject(new Error("Instagram embed script failed to load."));

    if (script.dataset.instagramLoaded === "true") {
      resolve();
      return;
    }

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (!existingScript) {
      script.id = INSTAGRAM_EMBED_SCRIPT_ID;
      script.src = INSTAGRAM_EMBED_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
};

const FeaturedReelFallback = ({ post }: { post: InstagramPost }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      className="ks-depth-surface ks-shine mx-auto w-full max-w-lg overflow-hidden rounded-3xl bg-white"
      data-testid="instagram-embed-fallback"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-fuchsia-100 via-pink-50 to-orange-100">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-primary">
          <Play className="h-12 w-12" fill="currentColor" aria-hidden="true" />
          <span className="font-bold">Watch this featured KidSalonia Reel on Instagram</span>
        </div>
        {!imageFailed && (
          <img
            src={post.thumbnailUrl}
            alt={post.caption}
            width={640}
            height={800}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="relative h-full w-full object-cover"
          />
        )}
      </div>
      <div className="space-y-4 p-5">
        <p className="text-sm font-medium leading-6 text-foreground">{post.caption}</p>
        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="instagram_post_click"
          className="ks-button-3d inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 px-5 py-3 font-bold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-300"
        >
          <Play size={18} fill="currentColor" aria-hidden="true" />
          Watch on Instagram
        </a>
      </div>
    </article>
  );
};

const FeaturedReelEmbed = ({ post }: { post: InstagramPost }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embedFailed, setEmbedFailed] = useState(false);

  useEffect(() => {
    let active = true;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const retryIds: ReturnType<typeof setTimeout>[] = [];
    let observer: MutationObserver | undefined;
    let visibilityObserver: IntersectionObserver | undefined;

    const hasRenderedEmbed = () => {
      const iframe = containerRef.current?.querySelector("iframe");
      if (!iframe) return false;

      const declaredHeight = Number(iframe.getAttribute("height") ?? 0);
      return declaredHeight >= 200 || iframe.getBoundingClientRect().height >= 200;
    };
    const markRendered = () => {
      if (!hasRenderedEmbed()) return;
      if (timeoutId) clearTimeout(timeoutId);
      retryIds.forEach(clearTimeout);
      observer?.disconnect();
      visibilityObserver?.disconnect();
    };
    const processEmbed = () => {
      if (!active || hasRenderedEmbed()) return;
      try {
        window.instgrm?.Embeds.process();
        markRendered();
      } catch {
        // A later bounded retry can recover if Instagram is still initializing.
      }
    };

    loadInstagramEmbedScript()
      .then(() => {
        if (!active) return;
        processEmbed();
        EMBED_PROCESS_RETRY_DELAYS_MS.forEach((delay) => {
          retryIds.push(setTimeout(processEmbed, delay));
        });

        if (hasRenderedEmbed()) return;
        observer = new MutationObserver(markRendered);
        if (containerRef.current) {
          observer.observe(containerRef.current, {
            attributes: true,
            attributeFilter: ["height", "style"],
            childList: true,
            subtree: true,
          });
        }
        if ("IntersectionObserver" in window && containerRef.current) {
          visibilityObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) processEmbed();
          });
          visibilityObserver.observe(containerRef.current);
        }
        timeoutId = setTimeout(() => {
          if (active && !hasRenderedEmbed()) setEmbedFailed(true);
        }, EMBED_TIMEOUT_MS);
      })
      .catch(() => {
        if (active) setEmbedFailed(true);
      });

    return () => {
      active = false;
      if (timeoutId) clearTimeout(timeoutId);
      retryIds.forEach(clearTimeout);
      observer?.disconnect();
      visibilityObserver?.disconnect();
    };
  }, [post.postUrl]);

  if (embedFailed) {
    return <FeaturedReelFallback post={post} />;
  }

  return (
    <article
      className="ks-depth-surface mx-auto min-h-[720px] w-full max-w-lg overflow-hidden rounded-3xl bg-white sm:min-h-[780px]"
      data-testid="instagram-featured-reel"
    >
      <div ref={containerRef} className="flex min-h-[720px] items-start justify-center sm:min-h-[780px]">
        <blockquote
          className="instagram-media m-0 w-full bg-white"
          data-instgrm-permalink={post.postUrl}
          data-instgrm-version="14"
          style={{ border: 0, margin: 0, maxWidth: "540px", minWidth: 0, width: "100%" }}
        >
          <a
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="instagram_post_click"
            className="flex min-h-[720px] flex-col items-center justify-center gap-4 px-8 text-center text-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 sm:min-h-[780px]"
          >
            <Instagram className="h-12 w-12" aria-hidden="true" />
            <span className="font-bold" role="status" aria-live="polite">Loading Instagram Reel&hellip;</span>
            <span className="text-sm underline">Watch on Instagram</span>
          </a>
        </blockquote>
      </div>
    </article>
  );
};

const InstagramCard = ({ post, index }: { post: InstagramPost; index: number }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const bookingPath = getBookingPath(post.service);
  const isReel = post.mediaType === "reel";
  const mediaLabel = isReel ? "Reel" : post.mediaType === "carousel" ? "Carousel" : "Post";

  return (
    <article
      className="ks-depth-surface ks-shine group overflow-hidden rounded-3xl bg-white"
      data-testid="instagram-post-card"
    >
      <a
        href={post.postUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-event="instagram_post_click"
        data-instagram-position={index + 1}
        className="block rounded-t-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
        aria-label={`View on Instagram: ${post.caption}`}
      >
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-100 via-orange-50 to-purple-100">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center text-primary">
            <Instagram className="h-12 w-12" aria-hidden="true" />
            <span className="text-sm font-bold">View this KidSalonia moment on Instagram</span>
          </div>
          {!imageFailed && (
            <img
              src={post.thumbnailUrl}
              alt={post.caption}
              width={640}
              height={640}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="relative h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          )}
          <span className="ks-reel-badge absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-bold text-white">
            {isReel ? <Play size={13} fill="currentColor" aria-hidden="true" /> : post.mediaType === "carousel" ? <Layers3 size={13} aria-hidden="true" /> : <Instagram size={13} aria-hidden="true" />}
            {mediaLabel}
          </span>
          <span className="absolute bottom-3 right-3 rounded-full bg-white/90 p-2 text-primary shadow" aria-hidden="true">
            <ExternalLink size={16} />
          </span>
        </div>
        <p className="min-h-20 px-4 py-4 text-sm font-medium leading-6 text-foreground">{post.caption}</p>
      </a>
      <div className="border-t border-pink-50 px-4 py-3">
        <Link
          to={bookingPath}
          data-analytics-event="instagram_book_click"
          data-instagram-service={post.service ?? "generic"}
          className="ks-button-3d inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <CalendarDays size={16} aria-hidden="true" />
          {post.service ? "Book this service" : "Book a salon visit"}
        </Link>
      </div>
    </article>
  );
};

const InstagramFeed = ({ posts = instagramPosts }: InstagramFeedProps) => {
  const visiblePosts = posts.slice(0, 6);
  const featuredReels = posts
    .filter((post) => post.featured && post.mediaType === "reel")
    .slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-pink-50/70 to-orange-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="instagram-feed-title">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
      <KidsStickers items={[
        { id: "instagram-hearts", icon: "hearts", size: 50, animation: "float", delay: -1, position: { left: "3%", top: "7%" }, className: "hidden md:block", opacity: 0.72 },
        { id: "instagram-camera", icon: "camera", size: 55, animation: "rotate", delay: -2, position: { right: "3%", top: "8%" }, className: "hidden lg:block", opacity: 0.72 },
        { id: "instagram-stars", icon: "stars", size: 38, animation: "bounce", delay: -3, position: { right: "2%", bottom: "4%" }, opacity: 0.68 },
      ]} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm">
            <Instagram size={18} aria-hidden="true" /> @kidsalonia
          </span>
          <h2 id="instagram-feed-title" className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Follow the Fun on Instagram
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Discover recent kids haircuts, nail art, cheerful transformations, celebrations and real salon experiences from KidSalonia in Gurugram.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="instagram_profile_click"
              className="ks-button-3d inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 px-6 py-3 font-bold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-300"
            >
              <Instagram size={19} aria-hidden="true" /> Follow @kidsalonia
            </a>
            <Link
              to="/book"
              data-analytics-event="instagram_book_click"
              data-instagram-service="generic"
              className="ks-button-3d inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground hover:opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <CalendarDays size={19} aria-hidden="true" /> Book Now
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ks-button-3d inline-flex items-center justify-center gap-2 rounded-full border-2 border-emerald-500 bg-white px-6 py-3 font-bold text-emerald-700 hover:bg-emerald-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <MessageCircle size={19} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>

        {featuredReels.length > 0 && (
          <div className="mt-12" aria-labelledby="featured-reels-title">
            <div className="mb-7 text-center">
              <h3 id="featured-reels-title" className="text-2xl font-extrabold text-foreground sm:text-3xl">
                Featured Reels
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                Press play to see recent KidSalonia transformations and salon moments.
              </p>
            </div>
            <div className={`grid gap-6 ${featuredReels.length > 1 ? "md:grid-cols-2" : ""}`}>
              {featuredReels.map((post) => (
                <FeaturedReelEmbed key={`featured-${post.postUrl}`} post={post} />
              ))}
            </div>
          </div>
        )}

        {visiblePosts.length > 0 ? (
          <div className="mt-12">
            {featuredReels.length > 0 && (
              <h3 className="mb-7 text-center text-2xl font-extrabold text-foreground sm:text-3xl">
                More from @kidsalonia
              </h3>
            )}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
              {visiblePosts.map((post, index) => (
                <InstagramCard key={post.postUrl} post={post} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="ks-depth-surface mx-auto mt-12 max-w-xl rounded-3xl border border-dashed border-pink-200 bg-white/80 p-8 text-center" role="status">
            <Instagram className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-bold">Fresh salon moments are on Instagram</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Our latest post previews are temporarily unavailable. Visit @kidsalonia to see recent haircuts, nail art and celebrations.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramFeed;
