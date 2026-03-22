import React, { Suspense, use, useState } from "react";
import PlantCard from "../PlantCard/PlantCard";

const plantPromises = fetch("plants.json").then((res) => res.json());
const Plants = () => {
  const allPlants = use(plantPromises);

  // 1. Create a state to track if we should show everything
  const [showAll, setShowAll] = useState(false);

  // 2. Decide which plants to display based on the state
  // If showAll is false, we only take the first 6
  const visiblePlants = showAll ? allPlants : allPlants.slice(0, 6);
  return (
    <div className="max-w-10/12 mx-auto my-20">
      <div className="text-center">
        <p className="font-medium text-lg text-secondary ">
          Easy, beautiful, and healthy plants.
        </p>
        <h2 className="font-bold text-3xl text-primary  mb-5">
          Our Indoor Plants Collection
        </h2>
      </div>

      <div>
        <Suspense fallback={<p>Loading......</p>}>
          <div className="grid grid-cols-3 gap-5 ">
            {visiblePlants.map((plants) => (
              <PlantCard key={plants.plantId} plants={plants}></PlantCard>
            ))}
          </div>
        </Suspense>

        {/* 3. Only show the button if there are more than 6 plants 
          AND we haven't clicked "Show All" yet */}
        {!showAll && allPlants.length > 6 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-primary px-10"
            >
              Show All Plants
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plants;
