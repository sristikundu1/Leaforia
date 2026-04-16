import toast from "react-hot-toast";

// get function from localstorage
const getFavPlants = () => {
  const getPlantId = localStorage.getItem("wishlistPlant");

  if (getPlantId) {
    const storePlantData = JSON.parse(getPlantId);
    return storePlantData;
  } else {
    return [];
  }
};

// store the data in localstorage
const addPlantId = (id) => {
  const storePlant = getFavPlants();

  if (storePlant.includes(id)) {
    toast.error();
    ("That plant is already in your wishlist");
    return;
  } else {
    storePlant.push(id);
    const addPlantData = JSON.stringify(storePlant);
    localStorage.setItem("wishlistPlant", addPlantData);
    window.dispatchEvent(new Event("wishlistUpdated"));
    toast.success("Plant added to wishlist 🌿");
  }
};

// remove from wishlist

const removePlant = (id) => {
  const RemoveStorePlants = getFavPlants(); // get current stored plants
  const updatedPlants = RemoveStorePlants.filter((PlantId) => PlantId !== id); // remove the id
  localStorage.setItem("wishlistPlant", JSON.stringify(updatedPlants)); // save updated array
  // Dispatch a custom event to notify the whole app
  window.dispatchEvent(new Event("wishlistUpdated"));
  toast.success("Removed from wishlist ");
};

export { getFavPlants, addPlantId, removePlant };
