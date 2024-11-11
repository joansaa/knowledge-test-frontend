import React, { useEffect, useRef, useState } from "react";
import GoFinanceLogo from "../assets/GoFinance.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { logout } = useAuthContext();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const user = {
    name: "Jason Lee L. W.",
    position: "Sales Lead",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header className="bg-blue-600 p-4 sm:p-6 md:p-6 flex justify-between items-center text-white lg:pr-16">
        <div className="flex items-center space-x-4">
          <Link to="/" className="ml-4 lg:ml-12">
            <img
              src={GoFinanceLogo}
              alt="GoFinance Logo"
              className="h-10 w-auto lg:h-12"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          <div className="text-right hidden sm:block">
            <p className="font-bold text-sm lg:text-base">{user.name}</p>
            <p className="text-xs lg:text-sm">{user.position}</p>
          </div>
          <button onClick={toggleDropdown} className="text-2xl lg:text-3xl">
            <i className="bx bx-user" style={{ fontSize: 32 }}></i>
          </button>

          {isDropdownOpen && (
            <div
              className={`absolute right-0 mt-4 sm:mt-16 md:mt-20 w-40 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2 sm:p-0 ${isDropdownOpen ? "block" : "hidden"}`}
            >          
              <button
                className="w-full text-left px-4 py-2 text-black hover:bg-gray-100 rounded-lg text-sm"
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate("/profile");
                }}
              >
                Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center rounded-lg text-sm"
                onClick={() => {
                  setIsDropdownOpen(false);
                  logout();
                  navigate("/login");
                }}
              >
                <i className="bx bx-log-out mr-2"></i> Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
