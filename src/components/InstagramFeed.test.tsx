import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import InstagramFeed from "./InstagramFeed";
import type { InstagramPost } from "@/data/instagram-posts";

const renderFeed = (posts?: InstagramPost[]) =>
  render(
    <MemoryRouter>
      <InstagramFeed posts={posts} />
    </MemoryRouter>,
  );

describe("InstagramFeed", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.querySelectorAll('script[src="https://www.instagram.com/embed.js"]').forEach((script) => script.remove());
    delete window.instgrm;
  });

  it("renders six fallback posts", () => {
    renderFeed();
    expect(screen.getAllByTestId("instagram-post-card")).toHaveLength(6);
    expect(screen.getAllByRole("img")).toHaveLength(6);
  });

  it("renders no more than two featured public Reels above the six-card grid", () => {
    renderFeed();

    const featuredReels = screen.getAllByTestId("instagram-featured-reel");
    expect(featuredReels).toHaveLength(2);
    expect(featuredReels[0].querySelector("blockquote")).toHaveAttribute(
      "data-instgrm-permalink",
      "https://www.instagram.com/kidsalonia/reel/DZqBpuszGsg/",
    );
    expect(featuredReels[1].querySelector("blockquote")).toHaveAttribute(
      "data-instgrm-permalink",
      "https://www.instagram.com/kidsalonia/reel/DYFKuxIpJhF/",
    );
    expect(screen.getAllByTestId("instagram-post-card")).toHaveLength(6);
  });

  it("shows a secure thumbnail fallback when the official embed script fails", async () => {
    const featuredPost: InstagramPost = {
      postUrl: "https://www.instagram.com/kidsalonia/reel/example-featured/",
      thumbnailUrl: "https://example.com/featured.jpg",
      caption: "Featured haircut Reel",
      mediaType: "reel",
      featured: true,
    };
    renderFeed([featuredPost]);

    const script = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]',
    );
    expect(script).not.toBeNull();
    fireEvent.error(script!);

    const fallback = await screen.findByTestId("instagram-embed-fallback");
    const watchLink = screen.getByRole("link", { name: /watch on instagram/i });
    expect(fallback).toBeInTheDocument();
    expect(watchLink).toHaveAttribute("href", featuredPost.postUrl);
    expect(watchLink).toHaveAttribute("target", "_blank");
    expect(watchLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("loads the official Instagram embed script only once for two featured Reels", () => {
    renderFeed();

    expect(document.querySelectorAll('script[src="https://www.instagram.com/embed.js"]')).toHaveLength(1);
  });

  it("falls back when Instagram creates an iframe that never becomes visible", async () => {
    vi.useFakeTimers();
    const featuredPost: InstagramPost = {
      postUrl: "https://www.instagram.com/kidsalonia/reel/blocked-featured/",
      thumbnailUrl: "https://example.com/blocked.jpg",
      caption: "Privacy-blocked featured Reel",
      mediaType: "reel",
      featured: true,
    };
    window.instgrm = {
      Embeds: {
        process: vi.fn(() => {
          const blockquote = document.querySelector("blockquote.instagram-media");
          const iframe = document.createElement("iframe");
          iframe.setAttribute("height", "0");
          blockquote?.replaceWith(iframe);
        }),
      },
    };

    renderFeed([featuredPost]);
    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });

    expect(screen.getByTestId("instagram-embed-fallback")).toBeInTheDocument();
  });

  it("renders a secure Instagram profile CTA", () => {
    renderFeed();
    const profileLink = screen.getByRole("link", { name: /follow @kidsalonia/i });
    expect(profileLink).toHaveAttribute("href", "https://www.instagram.com/kidsalonia");
    expect(profileLink).toHaveAttribute("target", "_blank");
    expect(profileLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(profileLink).toHaveAttribute("data-analytics-event", "instagram_profile_click");
  });

  it("renders a generic booking CTA", () => {
    renderFeed();
    const bookingLink = screen.getByRole("link", { name: "Book Now" });
    expect(bookingLink).toHaveAttribute("href", "/book");
    expect(bookingLink).toHaveAttribute("data-analytics-event", "instagram_book_click");
  });

  it("uses supported service-aware booking links and safely falls back for generic posts", () => {
    const posts: InstagramPost[] = [
      {
        postUrl: "https://www.instagram.com/kidsalonia/reel/example-one/",
        thumbnailUrl: "https://example.com/one.jpg",
        caption: "Boys haircut transformation",
        mediaType: "reel",
        service: "boys-haircut",
      },
      {
        postUrl: "https://www.instagram.com/kidsalonia/p/example-two/",
        thumbnailUrl: "https://example.com/two.jpg",
        caption: "A generic salon celebration",
        mediaType: "image",
      },
    ];
    renderFeed(posts);

    expect(screen.getByRole("link", { name: /view on instagram: boys haircut transformation/i })).toHaveAttribute(
      "data-analytics-event",
      "instagram_post_click",
    );
    const serviceLinks = screen.getAllByRole("link", { name: /book this service|book a salon visit/i });
    expect(serviceLinks[0]).toHaveAttribute("href", "/book?service=boys-haircut");
    expect(serviceLinks[1]).toHaveAttribute("href", "/book");
  });

  it("renders a graceful empty state while retaining conversion CTAs", () => {
    renderFeed([]);
    expect(screen.getByRole("status")).toHaveTextContent(/previews are temporarily unavailable/i);
    expect(screen.queryAllByTestId("instagram-post-card")).toHaveLength(0);
    expect(screen.getByRole("link", { name: /follow @kidsalonia/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book Now" })).toHaveAttribute("href", "/book");
  });
});
