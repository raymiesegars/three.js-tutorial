"use client";
import React from "react";
import Navbar from "./Navbar";
import { Canvas } from "@react-three/fiber";

{/* <Navbar />
<div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center"></div> */}

const HomePage = () => {
  return (
    <section className="w-full h-screen relative">
      <Canvas className="w-full h-screen bg-transparent">

      </Canvas>
    </section>
  );
};

export default HomePage;
