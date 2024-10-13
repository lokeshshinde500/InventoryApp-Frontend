import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header className="bg-violet-600 text-white font-bold shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="logo">
              <img src="/inventoryLogo.png" alt="logo" width={"100px"} />
            </div>
            <nav>
              <ul className="flex gap-4">
                <li>
                  <Link to={"/"}> HOME</Link>
                </li>
                <li>
                  <Link to={"/stock"}> STOCK</Link>
                </li>
                <li>
                  <Link to={"/add"}>ADD</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
