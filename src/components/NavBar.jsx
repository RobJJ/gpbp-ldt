// common navbar at top of screen

import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full bg-blue-200 p-2 flex justify-center">
      <Link className="underline font-bold text-lg" href={"/"}>
        Home
      </Link>
    </div>
  );
}
