import React, { useState } from "react";
import { FaRegHeart, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useLoaderData, useParams } from "react-router";

const PlantDetails = () => {
  const [quantity, setQuantity] = useState(1); // default quantity 1
  const { id } = useParams();

  const allPlants = useLoaderData();
  console.log(allPlants, id);

  const plantData = allPlants?.find((plant) => plant.plantId == id);

  const {
    plantId,
    image,
    plantName,
    price,
    rating,
    description,
    providerName,
    availableStock,
    category,
    careLevel,
  } = plantData;

  const handleIncrease = () => {
    if (quantity < availableStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-10/12 mx-auto my-20">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
        <div className="col-span-1 md:col-span-5">
          <img className="h-auto" src={image} alt="plant" />
        </div>
        <div className="col-span-1 md:col-span-5">
          <h2 className="text-5xl font-bold text-primary">{plantName}</h2>

          <p className="font-bold text-lg my-4 text-secondary">{category}</p>

          <div className="flex justify-between items-center my-5">
            <p className="font-semibold text-2xl"> ${price}</p>

            <div className="flex items-center justify-center  gap-1">
              {Array.from({ length: 5 }).map((_, index) => {
                const starNumber = index + 1;

                return (
                  <span key={index}>
                    {rating >= starNumber ? (
                      /* 1. Full Star: Rating is higher than or equal to the star rank */
                      <FaStar className="text-orange-400" />
                    ) : rating >= starNumber - 0.5 ? (
                      /* 2. Half Star: Rating is between the current and previous whole number */
                      <FaStarHalfAlt className="text-orange-400" />
                    ) : (
                      /* 3. Empty Star: Rating hasn't reached this level yet */
                      <FaRegStar className="text-gray-300" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
          <p className="text-[#716F6B] font-medium text-lg leading-8 mb-10">
            {description}
          </p>

          <p className="font-bold text-lg my-3">
            Vendor: <span className="pl-15 text-[#716F6B]">{providerName}</span>
          </p>

          <p className="font-bold text-lg my-3">
            Availability:
            <span className="pl-8 text-[#716F6B]">
              {availableStock && availableStock > 0
                ? "In Stock"
                : "Out Of stock"}
            </span>
          </p>

          <p className="font-bold text-lg my-2">
            Care: <span className="pl-20 text-[#716F6B]">{careLevel}</span>{" "}
          </p>

          <div className="flex justify-between items-center my-12">
            <div className="flex items-center  rounded-lg border-2 border-primary gap-3">
              <button
                onClick={handleDecrease}
                className="bg-primary text-white px-6 py-3 text-lg hover:bg-secondary"
              >
                -
              </button>
              <span className="text-lg font-bold px-6 py-3">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="bg-primary text-white px-6 py-3 text-lg  hover:bg-secondary"
              >
                +
              </button>
            </div>

            <div>
              <button className="btn bg-primary text-white px-8 py-6">
                Buy Now
              </button>
            </div>

            <button
              title="Add to Wishlist"
              className="rounded-full bg-white p-3 text-primary shadow hover:bg-red-50 transition"
            >
              <FaRegHeart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
