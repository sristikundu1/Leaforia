import React from "react";
import { motion } from "framer-motion";

const Experts = () => {
  // expert data
  const experts = [
    {
      id: 1,
      name: "Alice Green",
      specialization: "Fertilization & Growth Coach",
      image:
        "https://images.unsplash.com/photo-1615346832334-23e27e819c0d?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      direction: { x: -100, y: 0 },
    },
    {
      id: 2,
      name: "Brian Leaf",
      specialization: "Succulent & Cactus Expert",
      image:
        "https://img.freepik.com/free-photo/woman-repotting-houseplant-inside-her-house_53876-132023.jpg?semt=ais_hybrid&w=740&q=80",
      direction: { x: 0, y: -50 },
    },
    {
      id: 3,
      name: "Clara Bloom",
      specialization: "Indoor Plant Specialist ",
      image:
        "https://images.unsplash.com/photo-1728881652462-5984859ec3fb?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      direction: { x: 100, y: 0 },
    },
  ];

  return (
    <div className="max-w-10/12 mx-auto my-20 mb-36">
      <div className="text-center">
        <p className="font-medium text-lg text-secondary ">
          Meet Our Green Experts
        </p>
        <h2 className="font-bold text-3xl text-primary  mb-14">
          Experts who make your plants thrive.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-24 md:grid-cols-3 md:gap-4">
        {experts.map((expert) => (
          <motion.div
            key={expert.id}
            initial={{
              opacity: 0,
              x: expert.direction.x,
              y: expert.direction.y,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 4.5, // Slower, more graceful entrance
              ease: [0.22, 1, 0.36, 1], // Smooth professional easing
            }}
            className="relative group"
          >
            {/* Image Container with a slight zoom on hover */}
            <div className="overflow-hidden rounded-2xl">
              <img
                className="h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={expert.image}
                alt={expert.name}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-1/2">
              <div className="bg-primary flex flex-col gap-2 p-5 text-center min-w-[220px] shadow-2xl rounded-lg ">
                <h1 className="text-white font-bold text-2xl">{expert.name}</h1>
                <p className="text-white/90 font-medium text-sm tracking-wide">
                  {expert.specialization}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experts;
