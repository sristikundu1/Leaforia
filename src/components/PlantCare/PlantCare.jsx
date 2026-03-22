import React, { Suspense, use } from "react";
import PlantCareCard from "../PlantCareCard/PlantCareCard";
import careCover from "../../assets/banner-bg-3.jpg";

// fetch the data
const plantCarePromises = fetch("plantCare.json").then((res) => res.json());

const PlantCare = () => {
  const plantCareData = use(plantCarePromises);
  return (
    <div
      className="bg-cover bg-center py-4"
      style={{ backgroundImage: `url(${careCover})` }}
    >
      <div className="px-5 md:px-0 md:max-w-10/12 mx-auto md:my-20">
        {/* heading */}
        <div className="text-center">
          <h2 className="font-medium text-lg text-secondary">
            Plant Care Tips
          </h2>
          <p className="font-bold text-3xl text-primary  mb-14">
            Keep your plants healthy and happy
          </p>
        </div>

        {/* cards */}

        <Suspense
          fallback={
            <span className="loading loading-dots loading-xl flex justify-center items-center"></span>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
            {plantCareData.map((plantCare, index) => (
              <PlantCareCard
                key={plantCare.id}
                plantCare={plantCare}
                index={index}
              ></PlantCareCard>
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default PlantCare;
