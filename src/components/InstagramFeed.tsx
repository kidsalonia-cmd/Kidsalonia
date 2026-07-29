import { useState } from "react";
import { CalendarDays, ExternalLink, Instagram, Layers3, MessageCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { instagramPosts, type InstagramPost } from "@/data/instagram-posts";
import { getBookingPath } from "@/lib/booking";

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/kidsalonia";
const WHATSAPP_URL = `https://wa.me/918130307036?text=${encodeURIComponent(
  "Hi KidSalonia! I saw your Instagram feed and would like help booking a salon visit for my child.",
)}`;

type InstagramFeedProps = {
  posts?: InstagramPost[];
};

const InstagramCard = ({ post, index }: { post: InstagramPost; index: number }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const bookingPath = getBookingPath(post.service);
  const isReel = post.mediaType === "reel";
  const mediaLabel = isReel ? "Reel" : post.mediaType === "carousel" ? "Carousel" : "Post";

  return (
    <article
      className="group overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-bold text-white">
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-pink-50/70 to-orange-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="instagram-feed-title">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-300"
            >
              <Instagram size={19} aria-hidden="true" /> Follow @kidsalonia
            </a>
            <Link
              to="/book"
              data-analytics-event="instagram_book_click"
              data-instagram-service="generic"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <CalendarDays size={19} aria-hidden="true" /> Book Now
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emerald-500 bg-white px-6 py-3 font-bold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <MessageCircle size={19} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>

        {visiblePosts.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {visiblePosts.map((post, index) => (
              <InstagramCard key={post.postUrl} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-dashed border-pink-200 bg-white/80 p-8 text-center shadow-sm" role="status">
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
