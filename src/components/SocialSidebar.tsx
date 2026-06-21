import { Facebook, Instagram } from "lucide-react";
import whatsappIcon from "@/assets/whatsapp-icon.png";

const SocialSidebar = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-0">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="bg-[#1877F2] text-white p-3 hover:opacity-90 transition rounded-l-lg"
      >
        <Facebook size={20} fill="currentColor" />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-white p-3 hover:opacity-90 transition"
        style={{
          background:
            "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        }}
      >
        <Instagram size={20} />
      </a>
      <a
        href="https://wa.me/918130307036"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="bg-[#25D366] p-3 hover:opacity-90 transition rounded-l-lg flex items-center justify-center"
      >
        <img src={whatsappIcon} alt="WhatsApp" width={20} height={20} className="block" />
      </a>
    </div>
  );
};

export default SocialSidebar;
