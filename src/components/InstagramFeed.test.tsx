import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import InstagramFeed from "./InstagramFeed";
import type { InstagramPost } from "@/data/instagram-posts";

const renderFeed = (posts?: InstagramPost[]) =>
  render(
    <MemoryRouter>
      <InstagramFeed posts={posts} />
    </MemoryRouter>,
  );

describe("InstagramFeed", () => {
  it("renders six fallback posts", () => {
    renderFeed();
    expect(screen.getAllByTestId("instagram-post-card")).toHaveLength(6);
    expect(screen.getAllByRole("img")).toHaveLength(6);
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
