// common navbar at top of screen

import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full bg-slate-700 p-2 flex gap-5">
      <Link className="underline font-bold text-lg text-white" href={"/"}>
        Home
      </Link>
      <Link
        className="underline font-bold text-lg text-white"
        href={"/releaseNotes"}
        target="_blank"
      >
        Release Notes
      </Link>
      <Link
        className="underline font-bold text-lg text-white"
        href={"/methodology"}
        target="_blank"
      >
        Methodology
      </Link>
    </div>
  );
}
