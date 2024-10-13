import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddInventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
    supplierName: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsv] = useState(null);

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://inventory-app-backend-zma5.onrender.com/api/inventory",
        formData
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setFormData({
        name: "",
        quantity: "",
        category: "",
        supplierName: "",
        contactNumber: "",
      });
      setLoading(false);
    }
  };

  // handlecsv
  const handleCsv = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://inventory-app-backend-zma5.onrender.com/api/inventory/import",
        csvFile
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setCsv(null);
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto m-5 ">
      <div className="p-6 rounded-lg shadow-md bg-violet-200">
        <h2 className="text-xl font-bold mb-4 text-violet-600">
          Add New Inventory
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Supplier Name</label>
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <button
            type="submit"
            className={`bg-violet-500 text-white font-semibold py-2 px-4 rounded hover:bg-violet-600 transition ${
              loading && "opacity-50"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Inventory"}
          </button>
        </form>
        <div className="flex items-center mt-2 gap-1">
          <button
            type="submit"
            className={`bg-violet-500 text-white font-semibold py-2 px-4 rounded hover:bg-violet-600 transition ${
              loading && "opacity-50"
            }`}
            disabled={loading}
            onClick={() => {
              handleCsv();
            }}
          >
            {loading ? "Adding..." : "Add CSV file"}
          </button>
          <input
            type="file"
            onChange={(e) => {
              setCsv(e.target.files[0]);
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AddInventory;
