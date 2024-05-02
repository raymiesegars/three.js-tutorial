"use client";
import React, { useEffect, useRef, useState } from "react";
import { Suspense } from "react";
import Navbar from "./Navbar";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader";
import Island from "@/models/Island";
import Sky from "@/models/Sky";
import Bird from "@/models/Bird";
import Plane from "@/models/Plane";
import HomeInfo from "./HomeInfo";
import sakura from "@/assets/sakura.mp3";
import Image from "next/image";

const HomePage = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [audioSource, setAudioSource] = useState(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    if (!audioContext) {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ac);
      fetch(sakura)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => ac.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          setAudioBuffer(audioBuffer);
        });
    }
  }, [audioContext]);

  useEffect(() => {
    let source;
    if (isPlayingMusic && audioBuffer && audioContext) {
      source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;
      source.connect(audioContext.destination);
      source.start();
      setHasStarted(true);
    } else if (hasStarted && audioSource) {
      audioSource.stop();
      setHasStarted(false);
    }

    // Clean up function to stop the audio when the component unmounts
    return () => {
      if (source) {
        source.stop();
      }
    };
  }, [isPlayingMusic, audioBuffer, hasStarted, audioContext, audioSource]);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();

  const [planeScale, planePosition, planeRotation] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Navbar />
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent" ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            scale={planeScale}
            position={planePosition}
            isRotating={isRotating}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
      <div>
        <Image
          src={!isPlayingMusic ? "/icons/soundoff.png" : "/icons/soundon.png"}
          className="absolute bottom-2 left-2"
          alt="sound icon"
          width="80"
          height="80"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  );
};

export default HomePage;
