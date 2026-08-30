import { MapPin } from "lucide-react";

const LOCATOR_URL =
  "https://storage.googleapis.com/maps-solutions-7mlx2nszrt/locator-plus/lnnc/locator-plus.html";

const LocationMapSection = () => {
  return (
    <section className="bg-gradient-to-b from-white via-pink-50/50 to-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
            <MapPin size={18} /> Find KidSalonia
          </div>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Visit Our KidSalonia Location
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
            Explore our location on the interactive map and get directions to the nearest KidSalonia salon.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-xl shadow-pink-100/40">
          <iframe
            src={LOCATOR_URL}
            title="KidSalonia salon locator"
            width="100%"
            height="640"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="block min-h-[520px] w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default LocationMapSection;
