import React from "react";
import gedIcon from "../../../public/GED-logo.png";
import Image from "next/image";

export default function Mobile() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Image
        src={gedIcon}
        alt="GED-LOGO"
        width={60}
        height={60}
        className="ml-2"
      />
      <span className="font-bold underline">Desktop Application</span>
    </div>
  );
}
