import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.jpg";
import { Link } from "react-router";

// Add this line to handle the "object" error
const SlickSlider = Slider.default || Slider;

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 200,
    cssEase: "ease-in-out",
  };

  //  reusable slide data
  const slides = [
    {
      id: 1,
      image: banner1,
      title: "Bring Nature Into Your Home 🌿",
      desc: "Discover beautiful indoor plants that purify air and create a calm, fresh environment in your home.",
    },
    {
      id: 2,
      image: banner2,
      title: "Perfect Plants for Every Space",
      desc: "Upgrade your room with easy-care plants that add beauty, freshness, and a natural touch.",
    },
  ];
  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden ">
      <SlickSlider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="min-h-screen relative flex items-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* FULL OVERLAY */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* CONTENT */}
              <div className="relative max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-xl text-left text-white">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-5 text-base md:text-lg text-white/80">
                    {slide.desc}
                  </p>

                  <div className="mt-8 flex gap-4">
                    <Link
                      to="/plants"
                      className="btn bg-primary text-white px-6 border-none"
                    >
                      Explore Plants
                    </Link>

                    <Link
                      to="/guides"
                      className="btn border bg-secondary border-white text-white hover:bg-white hover:text-black"
                    >
                      Learn Care
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default Banner;
