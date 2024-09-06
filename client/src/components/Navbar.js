import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "../api/MovieList";
import Cookies from "js-cookie";

export default function Navbar() {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  const buttonRef = useRef(null);

  const togglePopover = () => setIsOpen(!isOpen);

  const userCookie = Cookies.get("user");
  console.log(userCookie);

  if (userCookie) {
    setUserInfo(JSON.parse(userCookie));
    console.log(userInfo);
  }

  const handleLogout = async () => {
    try {
      await MovieList.post("/logout");
    } catch (error) {
      setError("Error logging out");
      console.error(error.message);
    }
  };

  // const userInfo = getCookie("user");
  return (
    <div>
      <nav class="bg-blue-200 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="http://localhost:3000/" class="flex items-center">
            <img
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/undefined/external-movie-movie-theater-flaticons-lineal-color-flat-icons-7.png"
              class="mr-3 h-6 sm:h-9"
              alt="Trailflix Logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Trailflix
            </span>
          </a>
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul class="flex flex-col justify-center items-center text-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a
                  href="http://localhost:3000/"
                  class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:3000/mov"
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Add Movies
                </a>
              </li>

              <li>
                <a
                  href="http://localhost:3000/reg"
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:3000/login"
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Login
                </a>
              </li>
              {/* <li className="flex justify-center items-center">
                <div className="relative inline-block text-left">
                  <button
                    onClick={togglePopover}
                    ref={buttonRef}
                    className="flex items-center space-x-2 p-2 bg-gray-200 rounded-full"
                  >
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="Profile"
                      className="w-6 h-6 rounded-full"
                    />
                  </button>

                  {isOpen && (
                    <div
                      className="absolute z-10 mt-2 w-72 bg-white border rounded-lg shadow-lg"
                      style={{
                        top: buttonRef.current
                          ? buttonRef.current.offsetHeight
                          : 0,
                        left: buttonRef.current
                          ? buttonRef.current.offsetWidth / 2 - 96 // Center it by calculating half of the button width minus half of the popover width
                          : 0,
                        transform: "translateX(-50%)", // Center horizontally
                        maxWidth: "calc(100vw - 32px)", // Flexible width, less restrictive
                        maxHeight: "auto", // Allow flexible height
                        // overflow: "hidden", // Remove scrolling
                      }}
                    >
                      <div className="p-4 w-full">
                        <div className="flex w-full items-center space-x-3">
                          <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">Username</p>
                            <p className="text-gray-600">email@example.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li> */}

              <li>
                <button
                  onClick={handleLogout}
                  class="block py-2 pr-4 pl-3 text-red-500 bg-blue-700 rounded md:bg-transparent md:text-red-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
