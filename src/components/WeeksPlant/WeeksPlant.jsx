import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { motion, AnimatePresence } from "framer-motion";

const WeeksPlant = () => {
  const [plant, setPlant] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [daysUntilNext, setDaysUntilNext] = useState(0);

  // 1. Integrated Fetch & Weekly Logic
  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        const msInWeek = 1000 * 60 * 60 * 24 * 7;
        const currentWeekIndex = Math.floor(Date.now() / msInWeek);
        const selected = data[currentWeekIndex % data.length];
        setPlant(selected);

        // Calculate days until next Monday reset
        const now = new Date();
        const dayOfWeek = now.getDay();
        const remaining = (8 - dayOfWeek) % 7 || 7;
        setDaysUntilNext(remaining);
      })
      .catch((err) => console.error("Error loading plants:", err));
  }, []);

  if (!plant) {
    return <Loading></Loading>;
  }
  return (
    <section className="relative min-h-[850px] bg-[#F3F4F1] overflow-hidden p-6 md:p-20 font-sans">
      {/* Background Stylized Shape (Matches Image) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white rounded-l-[120px] z-0 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* --- LEFT SIDE: TEXT CONTENT --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <header className="space-y-2">
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.2em] text-xs font-bold text-gray-400">
                Decorate your living space 🪴
              </p>
              <div className="badge badge-outline border-primary text-[8px] md:text-[10px] font-bold py-3">
                Next plant in {daysUntilNext} days
              </div>
            </div>
            <h1 className="text-8xl md:text-9xl font-serif text-primary  tracking-tighter leading-none">
              {plant.plantName.split(" ")[0]}
            </h1>
          </header>

          <p className="text-[#716F6B] max-w-md leading-relaxed text-lg italic">
            {plant.description.substring(0, 200)}...
          </p>

          {/* Stats Row */}
          <div className="flex gap-16 py-6 border-t border-gray-200">
            <div>
              <p className="text-[10px] text-secondary uppercase font-bold mb-2">
                Family
              </p>
              <p className="font-medium text-[#4A5D45]">{plant.category}</p>
            </div>
            <div>
              <p className="text-[10px] text-secondary uppercase font-bold mb-2">
                Rating
              </p>
              <p className="font-medium text-[#4A5D45]">⭐ {plant.rating}</p>
            </div>
            <div>
              <p className="text-[10px] text-secondary uppercase font-bold mb-2">
                Care
              </p>
              <p className="font-medium text-[#4A5D45]">{plant.careLevel}</p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <button className="btn bg-primary hover:bg-secondary text-white rounded-none border-none px-12 h-14 text-base capitalize shadow-xl">
              Add to Wishlist — ${plant.price}
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex gap-4 pt-10">
            {plant.images?.slice(0, 3).map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="w-44 h-44 bg-secondary p-1 rounded-2xl shadow-sm border border-gray-100"
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: INTERACTIVE IMAGE --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative inline-block group">
            <img
              src={plant.image}
              alt={plant.plantName}
              className="max-h-[650px] rounded-lg w-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] transition-transform duration-700 group-hover:scale-105"
            />

            {/* INTERACTIVE HOTSPOTS */}
            <Hotspot
              top="35%"
              left="25%"
              label="Growth Tip"
              text="Loves indirect sunlight and stable temps."
              id={1}
              active={activeTooltip}
              setActive={setActiveTooltip}
            />

            <Hotspot
              top="65%"
              left="60%"
              label="Health"
              text="Effective at clearing indoor pollutants."
              id={2}
              active={activeTooltip}
              setActive={setActiveTooltip}
            />

            <Hotspot
              top="85%"
              left="45%"
              label="Material"
              text="Comes in a premium matte ceramic pot."
              id={3}
              active={activeTooltip}
              setActive={setActiveTooltip}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* --- Sub-Component: Hotspot with Hover State --- */
const Hotspot = ({ top, left, label, text, id, active, setActive }) => (
  <div
    className="absolute z-30 cursor-pointer"
    style={{ top, left }}
    onMouseEnter={() => setActive(id)}
    onMouseLeave={() => setActive(null)}
  >
    {/* Pulse Ring */}
    <div className="absolute inset-0 w-6 h-6 bg-white rounded-full animate-ping opacity-50" />

    {/* The Dot */}
    <div className="w-7 h-7 bg-white border-2 border-[#4A5D45] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-125">
      <span className="text-[#4A5D45] font-black text-sm">+</span>
    </div>

    {/* Tooltip Popup */}
    <AnimatePresence>
      {active === id && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-44 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white"
        >
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-gray-100" />
          <h4 className="text-[10px] font-bold uppercase text-[#4A5D45] tracking-widest mb-1">
            {label}
          </h4>
          <p className="text-xs text-gray-600 leading-tight">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default WeeksPlant;
