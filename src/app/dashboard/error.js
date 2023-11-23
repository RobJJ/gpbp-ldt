"use client"; // Error components must be Client Components

import React from "react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col">
        <span>There has been an unexpected error</span>
        <Link href={"/"} className="font-bold text-center bg-slate-200 rounded">
          Return home
        </Link>
      </div>
    </div>
  );
}
