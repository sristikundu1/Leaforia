import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPlant = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [imageInputs, setImageInputs] = useState([""]); // For multiple images

  // Handle adding more image URL fields
  const addImageField = () => setImageInputs([...imageInputs, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const allImages = imageInputs.filter((img) => img.trim() !== "");

    const plantData = {
      plantName: form.name.value,
      providerName: form.providerName.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      availableStock: parseInt(form.stock.value),
      careLevel: form.careLevel.value,
      image: allImages[0], // Main image
      images: allImages, // Array of all images
      description: form.description.value,
      rating: 5.0,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/plants", plantData);
      if (res.data.insertedId) {
        toast.success("Plant added to dashboard! 🌿");
        form.reset();
        setImageInputs([""]);
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat rounded-lg"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/tMMgyQRb/front-view-botanical-concept-with-copy-space.jpg')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>

      {/* CONTENT */}
      <div className="relative z-10 p-4 md:p-8 animate-fade-in font-montserrat">
        {/* Header Area */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-primary">
            Inventory Management
          </h1>
          <p className="text-secondary text-sm">
            Add a new botanical piece to your collection
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* LEFT */}
            <div className="flex-1 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-primary tracking-widest ">
                    Plant Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="e.g., Monstera Deliciosa"
                    className="w-full bg-white/90 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/30 outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-primary tracking-widest">
                    Category
                  </label>
                  <select
                    name="category"
                    className="w-full bg-white/90 border-none rounded-xl p-4 outline-none"
                  >
                    <option>Air Purifier</option>
                    <option>Indoor Tree</option>
                    <option>Low Light</option>
                    <option>Succulent</option>
                    <option>Medicinal</option>
                    <option>Flowering</option>
                    <option>Decorative</option>
                    <option>Mini Plants</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-primary tracking-widest">
                    Price ($)
                  </label>
                  <input
                    name="price"
                    type="number"
                    className="w-full bg-white/90 rounded-xl p-4 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-primary tracking-widest">
                    Stock Count
                  </label>
                  <input
                    name="stock"
                    type="number"
                    className="w-full bg-white/90 rounded-xl p-4 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-primary tracking-widest">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="8"
                  className="w-full bg-white/90 rounded-xl p-4 outline-none resize-none"
                  placeholder="Describe the plant's unique features..."
                ></textarea>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full lg:w-80 space-y-6">
              <div className="bg-white/90 p-6 rounded-3xl border border-white/20">
                <label className="text-xs uppercase font-bold text-gray-600 tracking-widest block mb-4">
                  Plant Gallery
                </label>

                <div className="space-y-3">
                  {imageInputs.map((url, index) => (
                    <input
                      key={index}
                      type="url"
                      placeholder={`Image URL ${index + 1}`}
                      className="w-full text-xs border rounded-lg p-3 outline-none"
                      value={url}
                      onChange={(e) => {
                        const newInputs = [...imageInputs];
                        newInputs[index] = e.target.value;
                        setImageInputs(newInputs);
                      }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addImageField}
                  className="mt-4 text-xs font-bold text-primary hover:underline"
                >
                  + Add another image
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-primary tracking-widest ">
                  Provider Name
                </label>
                <input
                  name="providerName"
                  type="text"
                  placeholder="e.g., UrbanGreen Studio"
                  className="w-full bg-white/90 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/30 outline-none"
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-primary tracking-widest">
                    Care Level
                  </label>
                  <select
                    name="careLevel"
                    className="w-full bg-white/90 rounded-xl p-4 outline-none"
                  >
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Expert</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:bg-gray-300"
                >
                  {loading ? "Sowing seeds..." : "Publish Plant"}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* YOUR EXISTING CODE ENDS HERE */}
      </div>
    </div>
  );
};

export default AddPlant;
