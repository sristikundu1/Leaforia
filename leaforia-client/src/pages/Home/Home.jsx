import React from "react";
import Banner from "./Banner/Banner";
import Plants from "../../components/Plants/Plants";
import PlantCare from "../../components/PlantCare/PlantCare";
import Experts from "../../components/Experts/Experts";
import Articles from "../../components/Articles/Articles";
import WeeksPlant from "../../components/WeeksPlant/WeeksPlant";
import Newsletter from "./NewsLetter/Newsletter";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WeeksPlant></WeeksPlant>
      <Plants></Plants>
      <PlantCare></PlantCare>
      <Experts></Experts>
      <Articles></Articles>
      <Reviews></Reviews>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
