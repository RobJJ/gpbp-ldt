import Image from "next/image";
import Link from "next/link";
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

import gedIcon from "../../../public/GED-logo.png";
// hover:bg-[#2B3441]
export default function NavBar() {
  return (
    <div className="w-full bg-primary-bg p-4 flex gap-14 items-center font-inter tracking-wide">
      <div className="flex gap-2 items-center ">
        <Image
          src={gedIcon}
          alt="GED-LOGO"
          width={40}
          height={40}
          className="ml-2"
        />
        <span className={`text-[#D9D9D9] font-semibold ${open_sans.className}`}>
          LDT
        </span>
      </div>
      <Link className="  text-[#D9D9D9] " href={"/"}>
        Home
      </Link>
      <Link className="  text-[#D9D9D9]" href={"/releaseNotes"} target="_blank">
        Release Notes
      </Link>
      <Link className="  text-[#D9D9D9]" href={"/methodology"} target="_blank">
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
