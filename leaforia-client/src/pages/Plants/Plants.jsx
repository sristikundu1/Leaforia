import React from "react";
import { useLoaderData } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PlantCard from "../../components/PlantCard/PlantCard";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Plants = () => {
  const allPlants = useLoaderData();
  //   get all category
  const categories = [...new Set(allPlants.map((p) => p.category))];

  return (
    <div>
      <Navbar></Navbar>
      <div className="text-center mt-6">
        <p className="font-medium text-lg text-secondary ">
          Browse all available plants in one place.
        </p>
        <h2 className="font-bold text-3xl text-primary  mb-14">
          Our Plant Collection
        </h2>
      </div>

      <div className="max-w-10/12 mx-auto my-16">
        <Tabs>
          {/* Tabs button */}
          <TabList className="flex gap-3 justify-start md:justify-center mb-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth">
            {categories.map((cat, index) => (
              <Tab
                key={index}
                className="shrink-0 whitespace-nowrap px-6 py-2 rounded-full border border-gray-200 bg-white hover:bg-primary hover:text-white transition-all cursor-pointer text-sm font-medium"
              >
                {cat}
              </Tab>
            ))}
          </TabList>

          {/* Tabs content */}
          {categories.map((cat, index) => (
            <TabPanel key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {allPlants
                  .filter((plant) => plant.category === cat)
                  .map((plant) => (
                    <PlantCard key={plant.plantId} plants={plant} />
                  ))}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Plants;
