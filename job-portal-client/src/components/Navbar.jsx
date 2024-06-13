import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {

    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "MY Jobs" },
    { path: "/salary", title: "Salary Estimated" },
    { path: "/post-job", title: "Post A Job" },
  ];
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6  ">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          JobPortal
        </a>

 
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary ">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>


        <div className="text-base text-primary font-medium space-x-5 lg:block hidden">
        <Link to="/login" className="py-2 px-5 border rounded transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800">
  Log in
</Link>
<Link
  to="/sign-up"
  className="py-2 px-5 border rounded bg-blue-500 text-white transition duration-300 ease-in-out hover:bg-blue-600"
>
  Sign up
</Link>
        </div>


        <div className="md:hidden block ">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-black-500 " />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-black-500 " />
            )}
          </button>
        </div>
      </nav>

      
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          <li className="text-white py-1">
            <Link
              to="/login"
              className="hover:underline hover:text-gray-300 cursor-pointer"
            >
              Log in
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
