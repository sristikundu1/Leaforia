import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import reviewBanner from "../../../assets/rm191-nu-08.jpg";

// 1. The promise must resolve to the JSON data, not just the response
const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Reviews = () => {
  // 2. Use the 'use' hook to unwrap the promise
  const reviews = use(reviewsPromise);

  return (
    <div
      className="bg-cover bg-center py-4"
      style={{ backgroundImage: `url(${reviewBanner})` }}
    >
      <div className="max-w-11/12 mx-auto my-20 px-4">
        {/* Heading Section */}
        <div className="text-center">
          <p className="font-medium text-lg text-secondary">
            Easy, beautiful, and healthy plants.
          </p>
          <h2 className="font-bold text-3xl text-primary mb-6">
            What Our Plant Parents Say
          </h2>
          <p className="max-w-2xl mx-auto text-base-content/70 mb-14">
            Discover why thousands of indoor gardeners trust us for their green
            companions. Real stories from real plant lovers.
          </p>
        </div>

        {/* Swiper Section */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 800, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          className="pb-16"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className=" bg-secondary/30 h-[280px] border border-base-200 shadow-xl rounded-3xl p-8 mb-9 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4 text-orange-400">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating ? "opacity-100" : "opacity-30"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-base-content/80 italic leading-relaxed mb-6">
                    "{review.comment}"
                  </p>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 mt-auto border-t border-base-200 pt-6">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-[#39B8AD] ring-offset-base-100 ring-offset-2">
                      <img src={review.userImage} alt={review.userName} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">
                      {review.userName}
                    </h4>
                    <p className="text-xs font-semibold text-[#7F81C8] uppercase tracking-wider">
                      {review.plantName}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Theme Customization */}
      </div>
    </div>
  );
};

export default Reviews;
