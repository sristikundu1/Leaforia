import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router";

const UpdatePlant = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const plant = state?.plant || {};

  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const [imageInputs, setImageInputs] = useState(
    plant.images || [plant.image] || [""],
  );

  const addImageField = () => setImageInputs([...imageInputs, ""]);

  const handleEditPlant = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const allImages = imageInputs.filter((img) => img.trim() !== "");

    const updatedData = {
      plantName: form.name.value,
      providerName: form.providerName.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      availableStock: parseInt(form.stock.value),
      careLevel: form.careLevel.value,
      image: allImages[0],
      images: allImages,
      description: form.description.value,
    };

    try {
      // Must include the ID in the URL so the backend knows which one to change
      const res = await axiosSecure.patch(`/plants/${id}`, updatedData);
      if (res.data.modifiedCount) {
        toast.success("Plant updated successfully! 🌿");
        navigate("/dashboard/all-plants"); // Redirect after success
      }
    } catch (err) {
      toast.error("Error updating plant.");
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
        {/* YOUR EXISTING CODE STARTS HERE */}

        {/* Header Area */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-primary">
            Refine Your Collection
          </h1>
          <p className="text-secondary text-sm">
            Update the growth and inventory details for this specimen
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleEditPlant} className="max-w-5xl">
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
                    defaultValue={plant.plantName}
                    className="w-full bg-white/90 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-primary tracking-widest">
                    Category
                  </label>
                  <select
                    name="category"
                    className="w-full bg-white/90 border-none rounded-xl p-4 outline-none"
                    defaultValue={plant?.category}
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
                    defaultValue={plant.price}
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
                    defaultValue={plant.availableStock}
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
                  defaultValue={plant.description}
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
                  defaultValue={plant.providerName}
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
                    defaultValue={plant?.careLevel}
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
                  {loading ? "Updating..." : "Update Plant"}
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

export default UpdatePlant;
