import React, { useState } from "react";

function MyStock({ inventory, onDelete, onUpdate }) {
  const { _id, name, quantity, category, supplierName, contactNumber } =
    inventory;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedInventory, setUpdatedInventory] = useState({
    name,
    quantity,
    category,
    supplierName,
    contactNumber,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInventory((prev) => ({ ...prev, [name]: value }));
  };

  // handling update
  const handleUpdateSubmit = () => {
    onUpdate(_id, updatedInventory);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="shadow-md rounded-lg p-4 m-4 border border-violet-300 transform hover:scale-105 hover:bg-violet-100 transition">
        <h2 className="text-xl font-bold text-violet-600">{name}</h2>
        <div className="flex items-center justify-between mt-2">
          <span
            className={`${
              quantity <= 20 ? "bg-red-200" : "bg-violet-200"
            } text-violet-800 text-xs font-semibold px-2 py-1 rounded-full`}
          >
            {quantity} in stock
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Category:{" "}
          <span className="font-semibold text-violet-500">{category}</span>
        </p>
        <p className="text-sm text-gray-600">
          Supplier:{" "}
          <span className="font-semibold text-violet-500">{supplierName}</span>
        </p>
        <p className="text-sm text-gray-600">
          Contact:{" "}
          <span className="font-semibold text-violet-500">{contactNumber}</span>
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-violet-500 text-white text-sm font-semibold py-1 px-2 rounded hover:bg-violet-600 transition"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="bg-red-500 text-white text-sm font-semibold py-1 px-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold text-violet-600">
              Update Inventory
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedInventory.name}
                  onChange={handleInputChange}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={updatedInventory.quantity}
                  onChange={handleInputChange}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  value={updatedInventory.category}
                  onChange={handleInputChange}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Supplier</label>
                <input
                  type="text"
                  name="supplierName"
                  value={updatedInventory.supplierName}
                  onChange={handleInputChange}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Contact</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={updatedInventory.contactNumber}
                  onChange={handleInputChange}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleUpdateSubmit}
                  className="bg-violet-500 text-white font-semibold py-1 px-3 rounded hover:bg-violet-600 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyStock;
