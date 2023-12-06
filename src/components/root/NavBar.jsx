import Image from "next/image";
import Link from "next/link";

import gedIcon from "../../../public/GED-logo.png";

export default function NavBar() {
  return (
    <div className="w-full bg-black p-2 flex gap-5 items-center font-inter tracking-wide">
      <Image
        src={gedIcon}
        alt="GED-LOGO"
        width={40}
        height={40}
        className="ml-2"
      />
      <Link className="  text-[#D9D9D9] mr-5" href={"/"}>
        Home
      </Link>
      <Link
        className="  text-[#D9D9D9] mr-5"
        href={"/releaseNotes"}
        target="_blank"
      >
        Release Notes
      </Link>
      <Link
        className="  text-[#D9D9D9] mr-5"
        href={"/methodology"}
        target="_blank"
      >
        Methodology
      </Link>
      <Link
        className="  text-[#D9D9D9]"
        href={"https://pim-pam.net/feedback/?feedback=ged"}
        target="_blank"
      >
        Give feedback
      </Link>
    </div>
  );
}
