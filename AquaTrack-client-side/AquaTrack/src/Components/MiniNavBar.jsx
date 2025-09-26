"use client";

import React, { useState } from "react";
import { NavLink, useLocation } from "react-router";

// Logo
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C12 2 5 9.5 5 15C5 19.1421 8.35786 22 12 22C15.6421 22 19 19.1421 19 15C19 9.5 12 2 12 2Z"
      fill="#3B82F6"
    />
  </svg>
);

// Icons
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Reusable NavLink with Active Style
const NavLinks = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 
        ${isActive ? "text-sky-600 dark:text-sky-400 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-sky-500"}
      `}
    >
      {children}
      {/* underline animation when active */}
      {isActive && (
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-sky-500 rounded-full animate-pulse"></span>
      )}
    </NavLink>
  );
};

// Reusable Button
const Button = ({ children, className = "", to }) => {
  const baseClasses =
    "px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105";

  const outline =
    "bg-white dark:bg-black text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 focus:ring-gray-300 dark:focus:ring-gray-600";

  const classes = `${baseClasses} ${outline} ${className}`;

  if (to) {
    return (
      <NavLink to={to} className={classes}>
        {children}
      </NavLink>
    );
  }

  return <button className={classes}>{children}</button>;
};

// Mobile nav
const MobileMenu = ({ isOpen, navItems }) => (
  <div
    className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out ${
      isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
    }`}
  >
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {navItems.map((item) => (
        <NavLinks key={item.path} to={item.path}>
          {item.label}
        </NavLinks>
      ))}
    </div>
    <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
      <div className="px-5">
        <Button to="/auth/login" className="w-full">
          Login
        </Button>
      </div>
    </div>
  </div>
);

// Navbar
const MiniNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Manual Control", path: "/manual-control" },
    { label: "History", path: "/history" },
    { label: "Setting", path: "/setting" },
  ];

  return (
    <header className="relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <LogoIcon />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Aqua Track
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-3 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-full">
            {navItems.map((item) => (
              <NavLinks key={item.path} to={item.path}>
                {item.label}
              </NavLinks>
            ))}
          </nav>

          {/* Login */}
          <div className="hidden md:block">
            <Button to="/auth/login">Login</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} navItems={navItems} />
    </header>
  );
};

export default MiniNavBar;
