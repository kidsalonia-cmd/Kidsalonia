import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-r from-pink-50 via-white to-orange-50 px-4 py-12 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-foreground sm:text-5xl">KidSalonia Gallery</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">See real hair, nail and salon moments from KidSalonia.</p>
        </section>
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
