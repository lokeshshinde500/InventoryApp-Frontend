import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InventoryCard from "../components/InventoryCard";

export default function Home() {
  const [originalInventories, setOriginalInventories] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://inventory-app-backend-zma5.onrender.com/api/inventory"
      );
      setOriginalInventories(response.data.inventories);
      setInventories(response.data.inventories);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // download csv
  const downloadCsv = async () => {
    try {
      const response = await axios.get(
        "https://inventory-app-backend-zma5.onrender.com/api/inventory/export",
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventoryData.csv");

      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Downloding");
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while downloading the file.");
      }
    }
  };

  // handle search here
  const handleSearch = async (e) => {
    e.preventDefault();
    const filter = originalInventories.filter((inventory) =>
      inventory.name.includes(search)
    );
    setInventories(filter);
  };

  return (
    <>
      <section className="section-home my-5">
        <div className="container mx-auto px-5">
          <div className="basic-features flex items-center gap-2 justify-center mb-10">
            <input
              type="text"
              className="border-2 p-2 w-1/3 border-violet-400 outline-none rounded-lg shadow-lg transition duration-300 focus:border-violet-600 focus:shadow-xl"
              placeholder="Search here..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              className="button bg-violet-500 text-white p-2 rounded-lg shadow-md hover:bg-violet-600 transition duration-300 font-semibold text-sm flex items-center justify-center"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="button bg-violet-500 text-white p-2 rounded-lg shadow-md hover:bg-violet-600 transition duration-300 font-semibold text-sm flex items-center justify-center"
              onClick={downloadCsv}
            >
              Download csv File
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {inventories.map((inventory) => (
              <InventoryCard key={inventory._id} inventory={inventory} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
