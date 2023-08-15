// common navbar at top of screen

import Image from "next/image";
import Link from "next/link";

// import gedIcon from "../../public/GED-logo-nobg.png";
import gedIcon from "../../public/GED-logo.png";

export default function NavBar() {
  return (
    <div className="w-full bg-black p-2 flex gap-7 items-center">
      <Image src={gedIcon} alt="GED-LOGO" width={40} height={40} />
      <Link className="  text-slate-300 mr-3" href={"/"}>
        Home
      </Link>
      <Link
        className="  text-slate-300 mr-3"
        href={"/releaseNotes"}
        target="_blank"
      >
        Release Notes
      </Link>
      <Link className="  text-slate-300" href={"/methodology"} target="_blank">
        Methodology
      </Link>

      <Link
        className="  text-slate-300"
        href={"https://pim-pam.net/"}
        target="_blank"
      >
        Give feedback
      </Link>
    </div>
  );
}
