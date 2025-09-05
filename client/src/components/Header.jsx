import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/income", label: "Income" },
    { to: "/expenses", label: "Expenses" },
  ];

  return (
    <header className="flex flex-col">
      {/* Top bar */}
      <div className="relative flex items-center bg-background border-b border-primary px-4 py-3 shadow-md">
        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden absolute left-4 text-primary"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <IoClose size={28} /> : <CiMenuBurger size={28} />}
        </button>

        {/* Logo */}
        <div className="flex items-center mx-auto md:mx-0">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <span className="text-lg font-bold tracking-wider text-primary ml-2">
            LARA
          </span>
        </div>

        {/* Desktop: links centered */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-8 text-primary font-medium">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-accent font-semibold"
                  : "hover:text-accent transition-colors"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop: user + logout */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {user && (
            <span className="text-primary font-medium">{user.name}</span>
          )}
          <button
            onClick={logout}
            className="px-3 py-1 bg-primary text-white rounded  hover:text-accent2 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-primary px-4 py-3 flex flex-col gap-4 transition-all duration-300 ease-in-out">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-accent font-semibold"
                  : "text-primary hover:text-accent transition-colors"
              }
            >
              {link.label}
            </NavLink>
          ))}
          {/* Mobile user + logout */}
          {user && (
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-primary font-medium">{user.name}</span>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="px-3 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
