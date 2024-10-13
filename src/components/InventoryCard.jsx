import React from "react";

function InventoryCard({ inventory }) {
  const { name, quantity, category, supplierName, contactNumber } = inventory;

  return (
    <div className=" shadow-md rounded-lg p-4 m-4 border border-violet-300 transform hover:scale-105 hover:bg-violet-100 transition">
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
    </div>
  );
}

export default InventoryCard;
