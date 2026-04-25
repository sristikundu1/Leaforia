import React, { useEffect, useState } from "react";
import PlantCard from "../PlantCard/PlantCard";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// const plantPromises = fetch("/plants.json").then((res) => res.json());
const Plants = () => {
  const [plants, setPlants] = useState([]);
  const axiosSecure = useAxiosSecure();
  // const allPlants = use(plantPromises);

  useEffect(() => {
    axiosSecure
      .get("/plants")
      .then((res) => {
        setPlants(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const homePlants = plants.slice(0, 6);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
          {homePlants.map((plants) => (
            <PlantCard key={plants.plantId} plants={plants}></PlantCard>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link to={"/plants"}>
            <button className="btn btn-primary px-10 border-none">
              Show All Plants
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Plants;
