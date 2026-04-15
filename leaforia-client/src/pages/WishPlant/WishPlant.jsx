import { use, useEffect, useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { getFavPlants, removePlant } from "../../utils/localStorage";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../contexts/AuthContext";

const Wishlist = () => {
  const [wishlistPlants, setWishlistPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  // Fetch + filter in ONE step (efficient)
  useEffect(() => {
    const fetchWishlistPlants = async () => {
      try {
        const res = await axiosSecure.get("plants"); // your API
        const data = res.data;

        const favIds = getFavPlants();

        const filteredPlants = data.filter((plant) =>
          favIds.includes(plant._id),
        );

        // create quantity object
        const initialQty = {};
        filteredPlants.forEach((plant) => {
          initialQty[plant._id] = 1;
        });

        setWishlistPlants(filteredPlants);
        setQuantities(initialQty);
      } catch (error) {
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistPlants();
  }, []);

  // Remove from wishlist
  const handleRemove = (id) => {
    removePlant(id);

    setWishlistPlants((prev) => prev.filter((plant) => plant._id !== id));
  };

  const handleIncrease = (plant) => {
    setQuantities((prev) => {
      const current = prev[plant._id];

      if (current < plant.availableStock) {
        return {
          ...prev,
          [plant._id]: current + 1,
        };
      }
      return prev;
    });
  };

  const handleDecrease = (plant) => {
    setQuantities((prev) => {
      const current = prev[plant._id];

      if (current > 1) {
        return {
          ...prev,
          [plant._id]: current - 1,
        };
      }
      return prev;
    });
  };

  const handleBuy = async (plant) => {
    const paymentInfo = {
      plantId: plant._id,
      email: user.email,
      quantity: quantities[plant._id],
      plantName: plant.plantName,
      price: plant.price,
      userName: user.displayName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    window.location.href = res.data.url;
    toast.success("Your payment is successful", {
      icon: "🎉",
      style: {
        borderRadius: "10px",
        background: "#034e3b",
        color: "#fff",
      },
    });
  };

  // Loading state
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-28 ">
      <div className="max-w-7xl mx-auto ">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-primary uppercase tracking-wider">
            My Wishlist
          </h1>
          <p className="text-secondary text-sm">
            Your saved plants 🌱 — ready to bring home
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="table">
            <thead className="bg-secondary/20 text-primary">
              <tr>
                <th>#</th>
                <th>Plant</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {wishlistPlants.length > 0 ? (
                wishlistPlants.map((plant, index) => (
                  <tr key={plant._id} className="hover:bg-secondary/10">
                    <th>{index + 1}</th>

                    {/* Plant Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-16 w-16 rounded-lg overflow-hidden">
                          <img
                            src={plant.image}
                            alt={plant.plantName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-semibold text-primary">
                          {plant.plantName}
                        </span>
                      </div>
                    </td>

                    <td>{plant.category}</td>
                    <td>
                      <div className="flex items-center bg-slate-100 rounded-xl p-1 shadow-sm w-fit">
                        <button
                          onClick={() => handleDecrease(plant)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-slate-900 hover:bg-primary hover:text-white transition shadow-sm"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-slate-900">
                          {quantities[plant._id]}
                        </span>
                        <button
                          onClick={() => handleIncrease(plant)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-slate-900 hover:bg-primary hover:text-white transition shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="font-semibold">${plant.price}</td>

                    {/* Actions */}
                    <td className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleBuy(plant)}
                        className="btn btn-sm bg-primary text-white hover:bg-secondary"
                      >
                        Buy Now
                      </button>

                      <button
                        onClick={() => handleRemove(plant._id)}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      >
                        <RiDeleteBin4Line size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    🌱 Your wishlist is empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
