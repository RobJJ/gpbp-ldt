import Link from "next/link";

export default function BreadCrumbs({ params }) {
  // console.log("typeof params from breadcrumbs:", typeof params);
  return (
    <div className="w-full bg-red-200 flex gap-5 p-1">
      {params.country && (
        <Link href={`/dashboard/${params.country}`} className="bg-white">
          {params.country}/
        </Link>
      )}
      {params.province && (
        <Link
          href={`/dashboard/${params.country}/${params.province}`}
          className="bg-white"
        >
          {params.province}/
        </Link>
      )}
      {params.district && (
        <Link
          href={`/dashboard/${params.country}/${params.province}/${params.district}`}
          className="bg-white"
        >
          {params.district}
        </Link>
      )}
    </div>
  );
}
