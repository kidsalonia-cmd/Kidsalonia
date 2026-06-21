import { useState, useEffect, useCallback } from "react";
import { X, Users, Clock, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const icons = [Users, Clock, MapPin, Calendar, Users, Clock];

const generateMessage = (index: number): string => {
  const bookings = Math.floor(Math.random() * 5) + 1;
  const views = Math.floor(Math.random() * 7) + 2;
  const timeAgo = ["a few minutes ago", "in the last hour", "recently"][Math.floor(Math.random() * 3)];
  const mins = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];

  const templates = [
    `${bookings} parent${bookings > 1 ? "s" : ""} recently checked haircut slots`,
    `${bookings} booking${bookings > 1 ? "s" : ""} made ${timeAgo}`,
    `1 parent booked a haircut ${mins} mins ago`,
    `${views} parents viewed this page today`,
    `Someone from Gurgaon just checked availability`,
    `Parents are booking weekend slots`,
  ];
  return templates[index % templates.length];
};

const SocialProofWidget = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [iconIndex, setIconIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  const showNext = useCallback(() => {
    if (dismissed) return;
    const idx = Math.floor(Math.random() * 6);
    setIconIndex(idx);
    setMessage(generateMessage(idx));
    setVisible(true);

    setTimeout(() => setVisible(false), 5000 + Math.random() * 2000);
  }, [dismissed]);

  // Activate after 20s on page or 40% scroll
  useEffect(() => {
    if (ready) return;
    const timer = setTimeout(() => setReady(true), 20000);
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPct > 0.4) setReady(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, [ready]);

  useEffect(() => {
    if (!ready || dismissed) return;
    showNext();
    const interval = setInterval(showNext, 15000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, [ready, dismissed, showNext]);

  const Icon = icons[iconIndex];

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-none" style={{ maxWidth: 320 }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-3 pr-8 flex items-center gap-3"
          >
            <div className="shrink-0 w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center">
              <Icon className="w-4 h-4 text-pink-500" />
            </div>
            <p className="text-xs text-gray-700 leading-snug font-medium">{message}</p>
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialProofWidget;
