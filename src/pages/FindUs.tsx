import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FindUs() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-r from-pink-50 via-white to-orange-50 px-4 py-12 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-foreground sm:text-5xl">Find KidSalonia</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Find our salon location and plan your visit.</p>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">
            <iframe
              src="https://storage.googleapis.com/maps-solutions-7mlx2nszrt/locator-plus/lnnc/locator-plus.html"
              title="KidSalonia location finder"
              width="100%"
              height="650"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
