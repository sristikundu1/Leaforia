import React from "react";
import { FaRegHeart, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { LuEye } from "react-icons/lu";

const PlantCard = ({ plants }) => {
  const { image, plantName, price, rating } = plants;
  return (
    <div>
      <div className="group w-full max-w-sm rounded-lg  p-4 shadow-sm transition hover:shadow-lg">
        {/* 2. Image container: relative and overflow-hidden are key */}
        <div className="relative mb-4 overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt="plant"
            className="h-96 w-full object-cover scale-110 transition-transform duration-500 group-hover:scale-100"
          />

          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-[#0000004d] bg-opacity-20 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              title="Add to Wishlist"
              className="rounded-full bg-white p-3 text-primary shadow hover:bg-red-50 transition"
            >
              <FaRegHeart size={20} />
            </button>
            <button
              title="View Details"
              className="rounded-full bg-white p-3 text-primary shadow hover:bg-gray-100 transition"
            >
              <LuEye size={20} />
            </button>
          </div>
        </div>

        {/* Product Information (Text part of the card) */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3 gap-1">
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

            <span className="text-[#706f6f] font-medium ml-2">{rating}</span>
          </div>
          <h3 className="mb-2 text-xl font-medium text-gray-800">
            {plantName}
          </h3>
          <p className="text-lg font-bold text-green-700">price: ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
