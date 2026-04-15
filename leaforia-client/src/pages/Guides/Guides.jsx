import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import {
  HiOutlineLightBulb,
  HiOutlineExclamationCircle,
  HiChevronRight,
} from "react-icons/hi";

// animations (add your json files)
import plant from "../../assets/plant.json";
import water from "../../assets/Seed game.json";
import sun from "../../assets/sunny.json";
import leaf from "../../assets/Plant 1.json";
const Guides = () => {
  const data = useLoaderData(); // Initial categories
  const [activeSection, setActiveSection] = useState("");
  const LottieComponent = Lottie.default || Lottie;

  const iconMap = { water, sun, leaf };

  // 1. NEW EFFECT: Handle incoming links from other pages
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small timeout to ensure images/Lottie are rendered before measuring position
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 1. MASTER IMAGE LIBRARY
  const plantGallery = [
    "https://images.unsplash.com/photo-1599277100479-3252d492a19a?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 0
    "https://images.unsplash.com/photo-1736844867059-fc66466c67f9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 1
    "https://images.unsplash.com/photo-1758273705890-204fdc2518fa?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 2
    "https://images.unsplash.com/photo-1512576775730-059ede6767ec?q=80&w=1192&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 3
    "https://images.unsplash.com/photo-1590995247033-ee5ccb348d3c?q=80&w=1140&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 4
    "https://images.unsplash.com/photo-1763518821406-55caf89c01fb?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 5
    "https://images.unsplash.com/photo-1624806992928-9c7a04a8383d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 6
    "https://images.unsplash.com/photo-1643730484055-abc29f2de73c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 7
    "https://images.unsplash.com/photo-1591989331039-f645c3d7888c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 8
  ];

  return (
    <div className="bg-[#fdfefd] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-gray-100 pb-12"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-xs">
            Botanical Resources
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-2">
            The Growth <span className="text-primary">Encyclopedia</span>
          </h1>
          <p className="text-gray-500 mt-6 text-lg max-w-2xl leading-relaxed">
            A comprehensive, visual archive for indoor plant enthusiasts. From
            molecular soil science to aesthetic pruning, find everything your
            greenery needs to thrive.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          {/* NAVIGATION */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32 space-y-2">
              <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-tighter">
                Quick Navigation
              </h4>
              {data.map((item) => (
                <a
                  key={item.id}
                  href={`#guide-${item.id}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    activeSection === `guide-${item.id}`
                      ? "bg-primary/10 text-primary border-l-4 border-primary shadow-sm"
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <HiChevronRight
                    className={`transition-transform ${activeSection === `guide-${item.id}` ? "rotate-90" : ""}`}
                  />
                  <span className="font-semibold text-sm">{item.title}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* CONTENT COLUMN */}
          <div className="lg:w-3/4 space-y-32">
            {data.map((item, idx) => {
              // LOGIC: Select 3 images from the array based on section index
              const sectionImages = plantGallery.slice(idx * 3, idx * 3 + 3);

              return (
                <section
                  key={item.id}
                  id={`guide-${item.id}`}
                  className="scroll-mt-32"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                      <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="w-12 h-[2px] bg-primary"></span>
                          <span className="text-primary font-bold uppercase text-xs tracking-widest">
                            Guide 0{idx + 1}
                          </span>
                        </div>
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">
                          {item.title}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="w-48 h-48 bg-green-50 rounded-full flex items-center justify-center p-4">
                        <LottieComponent
                          animationData={iconMap[item.icon] || plant}
                          loop={true}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-800">
                          Advanced Methodology
                        </h3>
                        <p className="text-gray-600 leading-8">
                          Understanding the cellular respiration of indoor
                          plants is the first step toward mastery. When we talk
                          about {item.title.toLowerCase()}, we aren't just
                          looking at the surface; we are examining the
                          transpiration rates and the ionic balance of the
                          growing medium. Consistent monitoring of these
                          variables prevents root-bound stress and chlorosis.
                        </p>

                        <p className="text-gray-600 leading-8">
                          For long-term health, we recommend seasonal
                          adjustments. What works in the humid months of July
                          will likely cause dormancy shock in the dry heat of
                          December.
                        </p>
                      </div>

                      {/* DYNAMIC IMAGE GRID */}
                      <div className="grid grid-cols-2 gap-4">
                        {sectionImages.map((imgUrl, imgIdx) => (
                          <motion.img
                            key={imgIdx}
                            src={imgUrl}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: imgIdx * 0.15 }} // Staggered appearance
                            className="w-full h-40 object-cover rounded-2xl shadow-sm hover:scale-105   transition-all duration-500"
                            alt={`Plant Guide Image ${imgIdx + 1}`}
                          />
                        ))}

                        {/* Lottie slot remains the 4th item in the 2x2 grid */}
                        <div className="bg-primary/5 rounded-2xl flex items-center justify-center p-4">
                          <LottieComponent
                            animationData={plant}
                            loop={true}
                            className="h-24 w-24"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expert Advice Boxes */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform text-primary">
                          <HiOutlineLightBulb size={80} />
                        </div>
                        <div className="flex items-center gap-3 text-primary mb-4 font-bold uppercase text-xs">
                          <HiOutlineLightBulb size={18} /> Pro Recommendation
                        </div>
                        <p className="text-gray-600 text-sm leading-7 relative z-10">
                          Always perform a "Soil Porosity Test" before a full
                          hydration cycle. Water should drain through the medium
                          within 15 seconds. If it pools, your soil has become
                          compacted and needs aeration with a wooden dowel.
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 bg-slate-50 border border-gray-100 shadow-sm rounded-3xl relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform text-red-500">
                          <HiOutlineExclamationCircle size={80} />
                        </div>
                        <div className="flex items-center gap-3 text-red-500 mb-4 font-bold uppercase text-xs">
                          <HiOutlineExclamationCircle size={18} /> Critical
                          Error Alert
                        </div>
                        <p className="text-gray-600 text-sm leading-7 relative z-10">
                          Avoid tap water for sensitive species like Calatheas.
                          The fluoride and chlorine content lead to "Tip Burn."
                          Use distilled water or allow tap water to sit for 24
                          hours to let chemicals evaporate.
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;
