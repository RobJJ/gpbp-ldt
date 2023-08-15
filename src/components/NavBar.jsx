// common navbar at top of screen

import Image from "next/image";
import Link from "next/link";

// import gedIcon from "../../public/GED-logo-nobg.png";
import gedIcon from "../../public/GED-logo.png";

export default function NavBar() {
  return (
    <div className="w-full bg-black p-2 flex gap-5 items-center">
      <Image
        src={gedIcon}
        alt="GED-LOGO"
        width={40}
        height={40}
        className="ml-2"
      />
      <Link className="  text-slate-300 mr-5 font-semibold" href={"/"}>
        Home
      </Link>
      <Link
        className="  text-slate-300 mr-5 font-semibold"
        href={"/releaseNotes"}
        target="_blank"
      >
        Release Notes
      </Link>
      <Link
        className="  text-slate-300 mr-5 font-semibold"
        href={"/methodology"}
        target="_blank"
      >
        Methodology
      </Link>

      <Link
        className="  text-slate-300 font-semibold"
        href={"https://pim-pam.net/"}
        target="_blank"
      >
        Give feedback
      </Link>
    </div>
  );
}
