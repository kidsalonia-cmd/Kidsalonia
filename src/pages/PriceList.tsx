import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceListSection from "@/components/PriceListSection";

export default function PriceList() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-r from-pink-50 via-white to-orange-50 px-4 py-12 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-foreground sm:text-5xl">KidSalonia Price List</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Browse our current starting prices and contact us for the latest complete service menu.</p>
        </section>
        <PriceListSection />
      </main>
      <Footer />
    </div>
  );
}
