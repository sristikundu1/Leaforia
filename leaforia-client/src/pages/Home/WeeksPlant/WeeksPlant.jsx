import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WeeksPlant = () => {
  const [plant, setPlant] = useState(null);
  const axiosSEcure = useAxiosSecure();
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [daysUntilNext, setDaysUntilNext] = useState(0);

  // 1. Integrated Fetch & Weekly Logic
  useEffect(() => {
    const res = axiosSEcure
      .get("/plants")
      .then((res) => {
        const msInWeek = 1000 * 60 * 60 * 24 * 7;
        const currentWeekIndex = Math.floor(Date.now() / msInWeek);
        const selected = res.data[currentWeekIndex % res.data.length];
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
    <section className="relative  bg-gradient-to-br from-[#eef2f0] to-[#f8faf9] overflow-hidden py-16 px-4 md:px-12">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-56 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-56 bg-secondary/20 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-4">
          {/* Header */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold mb-2">
              🌿 Plant of the Week
            </p>

            <h1 className="text-5xl md:text-7xl font-bold text-primary leading-tight">
              {plant.plantName}
            </h1>

            <div className="mt-3 inline-block px-4 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-semibold">
              Next update in {daysUntilNext} days
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
            {plant.description.substring(0, 180)}...
          </p>

          {/* Stats */}
          <div className="flex  gap-8">
            <div className="bg-white/60 backdrop-blur-md p-4  rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-xs text-gray-400 uppercase">
                Category:
                <span className="font-semibold text-primary ml-2">
                  {plant.category}
                </span>
              </p>
              {/* <p className="font-semibold text-primary">{plant.category}</p> */}
            </div>

            <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-xs text-gray-400 uppercase">
                Rating:{" "}
                <span className="font-semibold text-primary ml-2">
                  {plant.rating}⭐
                </span>
              </p>
              {/* <p className="font-semibold text-primary"></p> */}
            </div>

            <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-xs text-gray-400 uppercase">
                Care:{" "}
                <span className="font-semibold text-primary ml-2">
                  {plant.careLevel}
                </span>
              </p>
              {/* <p className="font-semibold text-primary">{plant.careLevel}</p> */}
            </div>
          </div>

          {/* CTA */}
          <button className="mt-5 px-10 py-4 bg-primary text-white rounded-full shadow-lg hover:scale-105 hover:bg-secondary transition-all duration-300">
            Add to Wishlist — ${plant.price}
          </button>

          {/* Thumbnails */}
          <div className="flex gap-4 pt-6">
            {plant.images?.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                className="w-28 h-28 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
              >
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[900px]">
            {/* Background Shape */}
            <div className="absolute -top-10 -right-10 w-[120%] h-[120%] bg-primary/10 rounded-[60px] blur-2xl z-0"></div>

            {/* Main Image */}
            <div className="relative z-10 group">
              <img
                src={plant.image}
                alt={plant.plantName}
                className="w-full max-h-[850px] rounded-lg object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.2)] transition duration-500 group-hover:scale-105"
              />

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full shadow-md text-sm font-semibold text-primary">
                🌱 Trending
              </div>

              {/* HOTSPOTS */}
              <Hotspot
                top="35%"
                left="25%"
                label="Growth Tip"
                text="Thrives in indirect sunlight."
                id={1}
                active={activeTooltip}
                setActive={setActiveTooltip}
              />

              <Hotspot
                top="65%"
                left="70%"
                label="Air Quality"
                text="Improves indoor air quality."
                id={2}
                active={activeTooltip}
                setActive={setActiveTooltip}
              />

              <Hotspot
                top="85%"
                left="45%"
                label="Care"
                text="Water when soil is dry."
                id={3}
                active={activeTooltip}
                setActive={setActiveTooltip}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- Sub-Component: Hotspot with Hover State --- */
const Hotspot = ({ top, left, label, text, id, active, setActive }) => (
  <div
    className="absolute z-30"
    style={{ top, left }}
    onMouseEnter={() => setActive(id)}
    onMouseLeave={() => setActive(null)}
  >
    {/* Pulse */}
    <span className="absolute inline-flex h-5 w-5 rounded-full bg-primary opacity-75 animate-ping"></span>

    {/* Dot */}
    <div className="relative w-5 h-5 bg-white border-2 border-primary rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-125 transition">
      <span className="text-primary text-xs font-bold">+</span>
    </div>

    {/* Tooltip */}
    <AnimatePresence>
      {active === id && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 bg-white/90 backdrop-blur-lg p-3 rounded-xl shadow-xl border"
        >
          <h4 className="text-[10px] font-bold uppercase text-primary mb-1">
            {label}
          </h4>
          <p className="text-xs text-gray-600">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default WeeksPlant;
