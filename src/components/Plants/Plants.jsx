import React, { Suspense, use, useState } from "react";
import PlantCard from "../PlantCard/PlantCard";
import { Link } from "react-router";

const plantPromises = fetch("/plants.json").then((res) => res.json());
const Plants = () => {
  const allPlants = use(plantPromises);

  const homePlants = allPlants.slice(0, 6);

  return (
    <div className="max-w-10/12 mx-auto my-20">
      <div className="text-center">
        <p className="font-medium text-lg text-secondary ">
          Easy, beautiful, and healthy plants.
        </p>
        <h2 className="font-bold text-3xl text-primary  mb-14">
          Our Indoor Plants Collection
        </h2>
      </div>

      <div>
        <Suspense
          fallback={
            <span className="loading loading-dots loading-xl flex justify-center items-center"></span>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
            {homePlants.map((plants) => (
              <PlantCard key={plants.plantId} plants={plants}></PlantCard>
            ))}
          </div>
        </Suspense>

        <div className="flex justify-center mt-8">
          <Link to={"/plants"}>
            <button className="btn btn-primary px-10">Show All Plants</button>
          </Link>
        </div>

        {/* 3. Only show the button if there are more than 6 plants 
          AND we haven't clicked "Show All" yet */}
        {/* {!showAll && allPlants.length > 6 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-primary px-10"
            >
              Show All Plants
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Plants;
