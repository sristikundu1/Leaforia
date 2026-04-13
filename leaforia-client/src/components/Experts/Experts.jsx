import React from "react";

const Experts = () => {
  // expert data
  const experts = [
    {
      id: 1,
      name: "Alice Green",
      specialization: "Fertilization & Growth Coach",
      image:
        "https://thumbs.dreamstime.com/b/gardener-flowerpot-portrait-handsome-holding-pot-flower-greenhouse-plant-seller-taking-care-flowers-75519201.jpg",
    },
    {
      id: 2,
      name: "Brian Leaf",
      specialization: "Succulent & Cactus Expert",
      image:
        "https://img.freepik.com/free-photo/woman-repotting-houseplant-inside-her-house_53876-132023.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: 3,
      name: "Clara Bloom",
      specialization: "Indoor Plant Specialist ",
      image:
        "https://swaggerandgreys.com/wp-content/uploads/2021/07/copy-of-houseplants-6-2.png",
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
          <div key={expert.id} className="relative">
            <img
              className="h-[600px] object-cover"
              src={expert.image}
              alt="expert"
            />

            <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-1/2">
              <div className="bg-primary flex flex-col gap-2 p-5 text-center min-w-[200px] shadow-xl rounded-sm">
                <h1 className="text-white font-bold text-2xl">{expert.name}</h1>
                <p className="text-white font-semibold text-lg">
                  {expert.specialization}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experts;
