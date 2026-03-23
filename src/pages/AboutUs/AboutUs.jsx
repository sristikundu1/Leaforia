import React from "react";
import aboutBanner from "../../assets/aboutUsBanner.jpg";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const AboutUs = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-full">
        {/* Banner */}
        <div
          className="relative w-full h-64 md:h-96 bg-cover bg-center  overflow-hidden"
          style={{
            backgroundImage: `url(${aboutBanner})`,
          }}
        >
          {/* Light Gray Overlay Layer */}
          <div className="absolute inset-0 bg-gray-400/30 backdrop-brightness-95 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary drop-shadow-lg text-center">
              About Us
            </h1>
          </div>
        </div>

        {/* Sections */}
        <div className="max-w-6xl mx-auto py-16 space-y-16">
          {/* 1st Div - Image Left, Text Right */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://img.freepik.com/free-photo/green-houseplant-background-plant-lovers_53876-128849.jpg?semt=ais_hybrid&w=740&q=80"
                alt="About Us"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-700 text-lg">
                We are a passionate team dedicated to providing high-quality
                plants and gardening solutions. Our goal is to bring nature
                closer to your home and make green living enjoyable.
              </p>
            </div>
          </div>

          {/* 2nd Div - Image Right, Text Left */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://citymagazine.b-cdn.net/wp-content/uploads/2024/01/portrait-of-young-woman-gardener-admiring-blooming-2023-11-27-05-21-43-utc-1400x931.jpg"
                alt="Our Mission"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg">
                Our mission is to make indoor gardening accessible to everyone,
                offering a variety of plants and expert guidance so everyone can
                enjoy the benefits of greenery at home or work.
              </p>
            </div>
          </div>

          {/* 3rd Div - Image Left, Text Right */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://img.freepik.com/free-photo/woman-growing-plants-home_23-2148928463.jpg?semt=ais_rp_progressive&w=740&q=80"
                alt="Our Vision"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 text-lg">
                We envision a world where greenery enhances every space. Our
                goal is to inspire people to connect with nature and create
                beautiful, sustainable indoor environments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default AboutUs;
