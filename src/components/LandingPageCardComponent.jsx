import Image from "next/image";

export default function LandingPageCardComponent({ header, text, link, icon }) {
  return (
    <span className="w-1/3 bg-slate-100 border border-black flex gap-2">
      <div className="flex justify-center items-center">
        <Image src={icon} alt={header} width={70} height={70} />
      </div>
      <div>
        <h5>{header}</h5>
        <div>{text}</div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-orange-400 hover:text-blue-600"
        >
          More Info
        </a>
      </div>
    </span>
  );
}
