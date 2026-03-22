import React from "react";
import { FaSunPlantWilt } from "react-icons/fa6";
import { GiFertilizerBag, GiPlantWatering } from "react-icons/gi";

const PlantCareCard = ({ plantCare, index }) => {
  const { bg, title, description, icon } = plantCare;

  const iconMap = {
    water: <GiPlantWatering size={20} />,
    sun: <FaSunPlantWilt size={20} />,
    leaf: <GiFertilizerBag size={20} />,
  };

  return (
    <div
      className={`
        group relative h-[500px] rounded-xl overflow-hidden shadow-lg
        md:${index === 1 ? "mt-0" : "mt-12"}
      `}
    >
      {/* bg image */}
      <img src={bg} className="w-full h-full object-cover" />

      {/* bottom content (default state) */}
      <div className="absolute inset-0 flex gap-3 items-end justify-center bottom-4 z-10 group-hover:opacity-0 transition duration-300">
        <div className="text-primary rounded-full bg-white p-3 shadow">
          {iconMap[icon]}
        </div>

        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>

      {/* overlay hover content */}
      <div
        className="
          absolute inset-0 bg-[#0000004d]/70
          flex flex-col items-center justify-center gap-4
          text-center
          transform translate-y-full opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-500 ease-in-out
        "
      >
        <div className="text-primary rounded-full bg-white p-3 shadow">
          {iconMap[icon]}
        </div>

        <h3 className="text-2xl font-bold text-white">{title}</h3>

        <p className="text-white px-6 font-medium">{description}</p>
      </div>
    </div>
  );
};

export default PlantCareCard;
