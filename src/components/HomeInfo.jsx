import Link from "next/link";
import React from "react";
import Image from "next/image";

const InfoBox = ({ text, link, btnText }) => {
  return (
    <div className="info-box">
      <p className="font-medium sm:text-xl text-center p-3">{text}</p>
      <Link className="neo-brutalism-white neo-btn" href={link}>
        {btnText}{" "}
        <Image
          src="/icons/arrow.svg"
          width="16"
          height="16"
          className="object-contain"
          alt="arrow icon"
        />
      </Link>
    </div>
  );
};

const renderContent = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hi I am <span className="font-semibold">Raymie</span>👋
      <br />
      Explore the island to find my information
    </h1>
  ),
  2: (
    <InfoBox
      text="My Portfolio"
      link="https://raymiesegars.com/"
      btnText="Click here to visit"
    />
  ),
  3: (
    <InfoBox
      text="My LinkedIn"
      link="https://www.linkedin.com/in/raymie-segars/"
      btnText="Click here to visit"
    />
  ),
  4: (
    <InfoBox
      text="My Github"
      link="https://github.com/raymiesegars"
      btnText="Click here to visit"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
