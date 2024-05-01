"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const router = useRouter();

  // Function to determine the className based on the current route
  const getLinkClassName = (path) => {
    const isActive = router.pathname === path ? "text-blue-500" : "text-black";
    return ` ${isActive}`;
  };

  return (
    <header className="header">
      <Link
        href="/"
        className='w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md'    >
        <p className="blue-gradient_text">RVS</p>
      </Link>
      <nav className="flex text-lg gap-7 font-medium">
        <Link
          href="/about"
          className={getLinkClassName("/about")}
        >
          About
        </Link>
        <Link
          href="/projects"
          className={getLinkClassName("/projects")}
        >
          Projects
        </Link>
        <Link
          href="/contact"
          className={getLinkClassName("/contact")}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
