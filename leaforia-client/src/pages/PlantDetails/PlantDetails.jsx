import React, { use, useState } from "react";
import { FaRegHeart, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useLoaderData, useParams } from "react-router";
import Consultation from "../../components/Consultation/Consultation";
import PlantCard from "../../components/PlantCard/PlantCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { addPlantId } from "../../utils/localStorage";

const PlantDetails = () => {
  const [quantity, setQuantity] = useState(1); // default quantity 1
  const { id } = useParams();
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { plant, relatedPlants } = useLoaderData();

  const plantData = plant;
  const relatedPlant = relatedPlants;

  if (!plantData) return <Loading></Loading>;

  const {
    _id,
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

  // Add this line to handle the "object" error
  const SlickSlider = Slider.default || Slider;

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    mobileFirst: false,
    speed: 500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280, // Extra large desktops
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  // wishlist function
  const handleWishPlant = (_id) => {
    addPlantId(_id);
  };

  // payment function
  const handlePayment = async () => {
    const paymentInfo = {
      plantId: id,
      email: user.email,
      quantity: quantity,
      plantName: plantName,
      price: price,
      userName: user.displayName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    window.location.href = res.data.url;
    toast.success("Your payment is successful", {
      icon: "🎉",
      style: {
        borderRadius: "10px",
        background: "#034e3b",
        color: "#fff",
      },
    });
  };

  return (
    <div className="px-5 md:px-0 md:max-w-10/12 mx-auto my-20 pt-24">
      <div className="max-w-7xl mx-auto p-4 lg:p-10 bg-white rounded-3xl shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Section */}
          <div className="lg:col-span-6 bg-secondary/30 rounded-2xl overflow-hidden flex items-center justify-center p-8 transition-all hover:shadow-inner">
            <img
              className="w-full h-auto object-contain mix-blend-multiply transform transition hover:scale-105 duration-500"
              src={image}
              alt={plantName}
            />
          </div>

          {/* Right Column: Content Section */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Category Badge */}
            <span className="uppercase tracking-widest text-xs font-bold text-secondary mb-2">
              {category}
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              {plantName}
            </h2>

            {/* Price & Rating Bar */}
            <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-slate-100">
              <span className="text-3xl font-bold text-primary">${price}</span>

              <div className="flex items-center gap-1 border-l pl-6 border-slate-200">
                <div className="flex text-orange-400">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const starNumber = index + 1;
                    if (rating >= starNumber) return <FaStar key={index} />;
                    if (rating >= starNumber - 0.5)
                      return <FaStarHalfAlt key={index} />;
                    return <FaRegStar key={index} className="text-slate-300" />;
                  })}
                </div>
                <span className="text-sm font-medium text-slate-500 ml-2">
                  ({rating}/5)
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {description}
            </p>

            {/* Product Specs Table-style layout */}
            <div className="space-y-4 mb-10">
              <div className="flex py-2 border-b border-slate-50">
                <span className="w-32 font-semibold text-slate-900">
                  Vendor
                </span>
                <span className="text-slate-600">{providerName}</span>
              </div>
              <div className="flex py-2 border-b border-slate-50">
                <span className="w-32 font-semibold text-slate-900">
                  Availability
                </span>
                <span
                  className={`${availableStock > 0 ? "text-emerald-600" : "text-red-500"} font-medium`}
                >
                  {availableStock > 0
                    ? `In Stock (${availableStock} units)`
                    : "Out Of stock"}
                </span>
              </div>
              <div className="flex py-2">
                <span className="w-32 font-semibold text-slate-900">
                  Care Level
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
                  {careLevel}
                </span>
              </div>
            </div>

            {/* Action Area */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center bg-slate-100 rounded-xl p-1 shadow-sm">
                <button
                  onClick={handleDecrease}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-slate-900 hover:bg-primary hover:text-white transition shadow-sm"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-lg text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-slate-900 hover:bg-primary hover:text-white transition shadow-sm"
                >
                  +
                </button>
              </div>

              {/* Buy Button */}
              <button
                onClick={handlePayment}
                className="flex-1 bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-secondary transition-all transform active:scale-95 shadow-lg shadow-primary/20"
              >
                Buy Now
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => handleWishPlant(_id.toString())}
                title="Add to Wishlist"
                className="p-4 rounded-xl border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
              >
                <FaRegHeart size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* related products  */}

      {relatedPlant.length > 1 && (
        <div className="text-center my-20">
          <h2 className="font-bold text-3xl text-primary  mb-14">
            Related Products
          </h2>

          <div className="mt-10 ">
            <SlickSlider {...settings}>
              {relatedPlant.map((plant) => (
                <div key={plant._id} className="px-2 py-4 ">
                  <PlantCard plants={plant} />
                </div>
              ))}
            </SlickSlider>
          </div>
        </div>
      )}

      {/* consultant form  */}

      <Consultation></Consultation>
    </div>
  );
};

export default PlantDetails;
