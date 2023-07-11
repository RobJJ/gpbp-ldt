// common navbar at top of screen

import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full bg-slate-700 p-2 flex ">
      <Link className="underline font-bold text-lg text-white" href={"/"}>
        Home
      </Link>
    </div>
  );
}
