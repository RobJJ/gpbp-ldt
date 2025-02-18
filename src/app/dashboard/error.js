"use client";

import React from "react";
import Link from "next/link";

export default function ErrorPage({ error }) {
  if (error) console.error("*** Log Error *** :: ", error);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-2  p-5 justify-center items-center">
        <span className="">There has been an unexpected error</span>
        <Link
          href={"/"}
          className="font-bold text-center bg-slate-200 rounded py-1 px-4"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
