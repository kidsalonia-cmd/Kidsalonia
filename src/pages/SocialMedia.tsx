import { Suspense, lazy } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";

const InstagramFeed = lazy(() => import("@/components/InstagramFeed"));

export default function SocialMedia() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-r from-pink-50 via-white to-orange-50 px-4 py-12 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-foreground sm:text-5xl">Gallery & Social Media</h1>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            See real KidSalonia haircuts, nail art, salon moments, transformations and our latest Instagram reels in one place.
          </p>
        </section>

        <GallerySection />

        <section className="border-t border-pink-100">
          <Suspense fallback={<div className="py-20 text-center font-semibold text-primary">Loading latest Instagram moments…</div>}>
            <InstagramFeed />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
}
