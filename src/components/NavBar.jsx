/** @format */

"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Elegant modern icons

const NavBar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  console.log("user", user);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="relative bg-white border-b border-base-200 z-50">
      {/* Desktop & Base Bar Container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 h-16">
        {/* Logo Section */}
        <div>
          <h1 className="btn text-2xl sm:text-3xl btn-soft btn-accent h-auto min-h-0 py-1.5 px-3">
            <Link href={"/"} onClick={closeMenu}>
              PetHeaven
            </Link>
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex">
          <ul className="flex gap-6 text-lg font-medium items-center text-slate-700">
            <li>
              <Link href={"/"} className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/pets"}
                className="hover:text-accent transition-colors">
                All Pets
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Action Authentication Buttons */}
        <div className="hidden md:flex">
          <ul className="flex gap-3 items-center">
            {user ? (
              <>
                {user.image && (
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                      <img src={user.image} alt={user.name || "User profile"} />
                    </div>
                  </div>
                )}
                <li>
                  <Link href={"/profile"}>
                    <button className="btn btn-sm btn-soft btn-accent font-semibold">
                      {user.name}
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard"}>
                    <button className="btn btn-sm btn-soft btn-accent font-semibold">
                      Dashboard
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => authClient.signOut()}
                    className="btn btn-sm btn-soft btn-error font-semibold">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href={"/login"}
                    className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors mr-2">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href={"/sign-up"}>
                    <button className="btn btn-sm btn-soft btn-accent font-semibold">
                      Get Started
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Responsive Hamburger Button Trigger */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="btn btn-ghost btn-sm p-1 text-slate-700 hover:bg-base-200 rounded-lg"
            aria-label="Toggle navigation menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Navigation Menu Drawer Dropdown */}
      <div
        className={`md:hidden absolute left-0 right-0 bg-white border-b border-base-200 transition-all duration-300 ease-in-out shadow-lg overflow-hidden ${isOpen ? "max-h-[400px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}>
        <div className="p-5 flex flex-col gap-5">
          {/* Primary Links */}
          <ul className="flex flex-col gap-4 text-base font-semibold text-slate-700 border-b border-base-100 pb-4">
            <li>
              <Link
                href={"/"}
                onClick={closeMenu}
                className="block py-1 hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/pets"}
                onClick={closeMenu}
                className="block py-1 hover:text-accent">
                All Pets
              </Link>
            </li>
          </ul>

          {/* Authenticated Configuration Actions */}
          <ul className="flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 bg-base-50 p-2.5 rounded-xl border border-base-200">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  )}
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-slate-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-[180px]">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Link
                    href={"/profile"}
                    onClick={closeMenu}
                    className="w-full">
                    <button className="btn btn-sm btn-soft btn-accent w-full font-bold">
                      Profile
                    </button>
                  </Link>
                  <Link
                    href={"/dashboard"}
                    onClick={closeMenu}
                    className="w-full">
                    <button className="btn btn-sm btn-soft btn-accent w-full font-bold">
                      Dashboard
                    </button>
                  </Link>
                </div>
                <button
                  onClick={() => {
                    authClient.signOut();
                    closeMenu();
                  }}
                  className="btn btn-sm btn-soft btn-error w-full mt-1 font-bold">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2.5 w-full pt-1">
                <Link href={"/login"} onClick={closeMenu} className="w-full">
                  <button className="btn btn-sm btn-outline btn-neutral w-full font-bold">
                    Login
                  </button>
                </Link>
                <Link href={"/sign-up"} onClick={closeMenu} className="w-full">
                  <button className="btn btn-sm btn-soft btn-accent w-full font-bold">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
