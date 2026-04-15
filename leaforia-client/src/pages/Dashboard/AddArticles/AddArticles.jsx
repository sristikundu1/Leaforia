import React, { use, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import { HiOutlineInformationCircle, HiOutlineTag } from "react-icons/hi2";
import { HiOutlinePhotograph } from "react-icons/hi";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const inputVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
const AddArticle = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(false);

  // Default values for author section (dynamic)
  const defaultAuthorName = user?.displayName || "Flora Admin";
  const defaultAuthorSpeciality = "Botanical Curator";
  const defaultAuthorImage =
    user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const shortDescription = form.shortDescription.value;
    const details = form.details.value;
    const image = form.image.value;
    const category = form.category.value;

    // Tag handling: convert comma-separated string into an array
    const tagsRaw = form.tags.value;
    const tags = tagsRaw
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    // Author Overrides (if admin manually changes them)
    const authorName = form.authorName.value;
    const authorSpeciality = form.authorSpeciality.value;
    const authorImage = form.authorImage.value;

    const articleData = {
      title,
      shortDescription,
      details,
      image,
      category,
      tags,
      author: {
        name: authorName,
        speciality: authorSpeciality,
        image: authorImage,
      },
      date: new Date().toISOString().split("T")[0],
      comments: [],
    };

    try {
      const res = await axiosSecure.post("/articles", articleData);
      if (res.data.insertedId) {
        toast.success("Article safely curated into the collection! 🌱");
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to curate article. Connection error.");
    } finally {
      setLoading(false);
    }
  };

  // Reusable label component for consistent styling
  const InputLabel = ({ htmlFor, children, icon: Icon }) => (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1"
    >
      {Icon && <Icon className="text-primary text-sm" />}
      {children}
    </label>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#f9fbf8] font-montserrat"
    >
      {/* LEFT SIDE: IMMERSIVE IMAGE SECTION (Takes 5/12 of space on large screens) */}
      <div
        className="lg:col-span-5 relative bg-cover bg-center bg-no-repeat p-10 flex flex-col justify-end"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/Q3dnbcvS/marble-pothos-indoor-hanging-plant.jpg')",
        }}
      >
        {/* Subtle Overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        {/* Header Text Overlay */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative z-10 text-white"
        >
          <div className="mb-6 w-16 h-1 bg-white rounded-full"></div>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight ">
            Inventory <br /> Management
          </h1>
          <p className="mt-4 text-gray-200 text-lg max-w-sm">
            Curate and submit a new botanical masterpiece to your digital
            garden.
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE: FORM PANEL (Takes 7/12 of space) */}
      <motion.div
        className="lg:col-span-7 p-6 md:p-12 xl:p-16 flex items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          {/* Section 1: Article Identity */}
          <fieldset className="space-y-6">
            <motion.div
              variants={inputVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="md:col-span-2">
                <InputLabel htmlFor="title">Article Identity</InputLabel>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="The Silent Wisdom of Oak Trees"
                  className="w-full p-4 rounded-xl border border-gray-100 focus:outline-primary bg-white transition-all shadow-inner"
                />
              </div>
              <div>
                <InputLabel htmlFor="category">Collection Category</InputLabel>
                <select
                  name="category"
                  required
                  className="w-full p-4 rounded-xl border border-gray-100 focus:outline-primary bg-white transition-all shadow-inner"
                >
                  <option value="Gardening">Gardening</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Plant Care">Plant Care</option>
                  <option value="Outdoor Living">Outdoor Living</option>
                </select>
              </div>
              <div>
                <InputLabel htmlFor="tags" icon={HiOutlineTag}>
                  Related Tags (Comma separated)
                </InputLabel>
                <input
                  name="tags"
                  type="text"
                  placeholder="Succulents, Easy Care, Decor, MERN"
                  className="w-full p-4 rounded-xl border border-gray-100 focus:outline-primary bg-white transition-all shadow-inner"
                />
              </div>
            </motion.div>
          </fieldset>

          {/* Section 2: Visual Elements */}
          <fieldset className="space-y-6">
            <motion.div variants={inputVariants}>
              <InputLabel htmlFor="image" icon={HiOutlinePhotograph}>
                Featured Image URL
              </InputLabel>
              <input
                name="image"
                type="url"
                required
                placeholder="https://images.unsplash.com/your-image-url"
                className="w-full p-4 rounded-xl border border-gray-100 focus:outline-primary bg-white transition-all shadow-inner"
              />
            </motion.div>
          </fieldset>

          {/* Section 3: The Content */}
          <fieldset className="space-y-6">
            <motion.div variants={inputVariants}>
              <InputLabel htmlFor="shortDescription">
                Abstract / Short Description
              </InputLabel>
              <input
                name="shortDescription"
                type="text"
                required
                placeholder="A brief overview for listings..."
                maxLength={150}
                className="w-full p-4 rounded-xl border border-gray-100 focus:outline-primary bg-white transition-all shadow-inner"
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <InputLabel htmlFor="details">
                Complete Botanical Insights
              </InputLabel>
              <textarea
                name="details"
                required
                placeholder="Dive deep into the insights..."
                rows="7"
                className="w-full p-4 rounded-xl border border-gray-100 focus:outline-primary bg-white resize-none transition-all shadow-inner"
              ></textarea>
            </motion.div>
          </fieldset>

          {/* Section 4: Author Curation */}
          <fieldset className="border border-gray-100 p-6 rounded-2xl bg-white shadow-sm">
            <motion.legend
              variants={inputVariants}
              className="font-bold text-gray-800 px-3 uppercase text-xs tracking-widest flex items-center gap-2"
            >
              <HiOutlineInformationCircle className="text-primary" /> Curated By
            </motion.legend>
            <motion.div
              variants={inputVariants}
              className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5 items-center"
            >
              <img
                src={defaultAuthorImage}
                className="w-16 h-16 rounded-full mx-auto md:mx-0 border border-gray-200 p-1"
              />
              <input
                name="authorName"
                type="text"
                defaultValue={defaultAuthorName}
                required
                placeholder="Author Name"
                className="w-full md:col-span-2 p-3 text-sm rounded-lg border border-gray-100 focus:outline-primary bg-gray-50"
              />
              <input
                name="authorSpeciality"
                type="text"
                defaultValue={defaultAuthorSpeciality}
                required
                placeholder="Expertise (e.g. Plant Care Specialist)"
                className="w-full md:col-span-3 p-3 text-sm rounded-lg border border-gray-100 focus:outline-primary bg-gray-50"
              />
              <input
                name="authorImage"
                type="url"
                defaultValue={defaultAuthorImage}
                required
                placeholder="Author Image URL"
                className="w-full md:col-span-3 p-3 text-sm text-gray-500 rounded-lg border border-gray-100 focus:outline-primary bg-gray-50"
              />
            </motion.div>
          </fieldset>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={loading}
            type="submit"
            className={`w-full py-4 mt-8 rounded-full font-bold uppercase tracking-widest shadow-lg transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-primary text-white hover:bg-secondary"
            }`}
          >
            {loading ? "Curation in progress..." : "Curate Article 🌱"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddArticle;
