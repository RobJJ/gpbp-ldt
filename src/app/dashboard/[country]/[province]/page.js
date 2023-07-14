// ** note ** this is a dynamic server comp. Can fetch params and data here

import Link from "next/link";

export default function ProvincePage({ params }) {
  return (
    <div className="w-full h-full bg-orange-200 flex flex-col p-1">
      <span>
        Lets see where this route loads... does it render in the children area::{" "}
        {params.province}
      </span>
      <Link
        href={`/dashboard/${params.country}/${params.province}/poopDistrict`}
        className="bg-white"
      >
        Go to district
      </Link>
    </div>
  );
}
