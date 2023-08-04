"use client";

import Image from "next/image";
import thumbnail from "../../public/GED-Walkthrough-Screenshot.png";
import ReactPlayer from "react-player/youtube";

export default function VideoComponent() {
  return (
    <ReactPlayer
      height={256}
      width={500}
      //   width="70%"
      //   height="auto"
      url="https://youtu.be/cgeh0Reo3tI"
      controls={true}
      // controls={false}
      // light={true}
      light={<Image src={thumbnail} alt="Thumbnail" />}
    />
  );
}

// <div className="h-64 w-[500px] bg-slate-300 flex justify-center items-center"></div>;
