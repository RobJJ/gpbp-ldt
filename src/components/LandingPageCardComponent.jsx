import Image from "next/image";

export default function LandingPageCardComponent({ header, text, link, icon }) {
  return (
    <span className="w-1/3 max-w-[250px] bg-white border-2 border-slate-200 hover:border-slate-300  flex px-4 py-2 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 cursor-pointer">
      <div className="flex w-full gap-3 ">
        <div className="h-full w-3/12">
          <Image src={icon} alt={header} width={50} height="auto" />
        </div>
        <div className="h-full w-9/12 ">
          <h4 className="font-bold">{header}</h4>
          <div className=" text-sm">{text}</div>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-[#FF502D] hover:text-[#4345AA] hover:underline font-bold text-sm"
            alt={`link to ${header} site`}
          >
            More Info
          </a>
        </div>
      </div>
    </span>
  );
}
