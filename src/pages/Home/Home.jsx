import React from "react";
import Banner from "../../components/Banner/Banner";
import Plants from "../../components/Plants/Plants";
import PlantCare from "../../components/PlantCare/PlantCare";
import Experts from "../../components/Experts/Experts";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Plants></Plants>
      <PlantCare></PlantCare>
      <Experts></Experts>
    </div>
  );
};

export default Home;
