import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin4Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { Link } from "react-router";

const AllPlants = () => {
  const axiosSecure = useAxiosSecure();

  const [plants, setPlants] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/plants")
      .then((res) => {
        setPlants(res.data); // store data
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDeletePlant = async (id) => {
    const res = await axiosSecure.delete(`/plants/${id}`);
    if (res.data.deletedCount) {
      toast.error("Plant deleted from dashboard! ☘️");
      const remainingPlant = plants.filter((plant) => plant._id !== id);
      setPlants(remainingPlant);
    }
  };
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-primary font-montserrat uppercase tracking-wider">
          Plant Directory
        </h1>
        <p className="text-secondary text-sm">
          Manage and monitor the entire Leaforia garden collection
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Plant</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, index) => (
              <tr className="hover:bg-secondary/20" key={plant._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask  h-24 w-24">
                        <img src={plant.image} alt={plant.plantName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-primary">
                        {plant.plantName}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{plant.category}</td>
                <td>{plant.availableStock}</td>
                <td>${plant.price}</td>
                <th className="space-x-3">
                  <Link
                    to={`/dashboard/edit-plant/${plant._id}`}
                    state={{ plant }}
                    className="btn btn-ghost btn-xs bg-secondary text-white hover:bg-primary hover:text-white p-4"
                  >
                    <MdOutlineModeEditOutline size={20} />
                  </Link>
                  <button
                    onClick={() => handleDeletePlant(plant._id)}
                    className="btn btn-ghost btn-xs bg-secondary text-white hover:bg-primary hover:text-white p-4"
                  >
                    <RiDeleteBin4Line size={20} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPlants;
