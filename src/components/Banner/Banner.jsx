import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";

// Add this line to handle the "object" error
const SlickSlider = Slider.default || Slider;

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
  };
  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden ">
      <SlickSlider {...settings}>
        <div>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url(${banner1})`,
            }}
          >
            <div className="hero-overlay bg-slate-900/20"></div>
            <div className=" hero-content text-center">
              <div className="max-w-8/12">
                <h1 className="mb-5 text-5xl font-bold text-primary">
                  Bring Nature Inside Your Home
                </h1>
                <p className="mb-5 text-white text-lg">
                  Discover a wide collection of beautiful indoor plants that
                  purify air, reduce stress, and make your home more vibrant.
                  Choose the perfect green companion for your room and enjoy
                  nature every day.
                </p>
                <button className="btn btn-primary">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url(${banner2})`,
            }}
          >
            <div className="hero-overlay bg-slate-900/20"></div>
            <div className=" hero-content text-left">
              <div className="max-w-11/12">
                <h1 className="mb-5 text-5xl font-bold text-primary">
                  Premium Indoor Plants <br /> for Every Corner
                </h1>
                <p className="mb-5 text-white text-lg">
                  Upgrade your home and workspace with our carefully selected
                  indoor plants. Easy to care, long lasting, and perfect for
                  decoration. Start your green journey today with Leaforia.
                </p>
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </SlickSlider>
    </div>
  );
};

export default Banner;
