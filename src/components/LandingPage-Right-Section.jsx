import React from "react";
import Image from "next/image";

import landingImage from "../../public/landing.png";

export default function RightSection() {
  return (
    <section className={`h-full w-5/12 flex`}>
      <Image
        src={landingImage}
        alt="Image showing GED"
        className={`animate-slide-in`}
        priority
      />
    </section>
  );
}
// Shorthand for custom animation: ref the keyframe
// className={`animate-[slideInFromRight_2s_ease-out_normal]`}
