import Image from "next/image";

export default function LandingPageCardComponent({ header, text, link, icon }) {
  return (
    <span className="w-1/3 bg-white border-2 border-slate-300 hover:border-slate-400 flex p-4 rounded-xl shadow-md hover:shadow-2xl">
      <div className="flex w-full  border gap-3 ">
        <div className="h-full w-3/12 ">
          <Image src={icon} alt={header} width={60} height={60} />
        </div>
        <div className="h-full w-9/12 ">
          <h5 className="font-bold">{header}</h5>
          <div className=" text-sm">{text}</div>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-orange-400 hover:text-blue-600 font-semibold"
          >
            More Info
          </a>
        </div>
      </div>
    </span>
  );
}
