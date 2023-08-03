import { scatterViewType } from "@/lib/atoms";
import { useAtom } from "jotai";

export default function ScatterTypeToggle() {
  const [scatterType, setScatterType] = useAtom(scatterViewType);

  return (
    <div className="flex gap-3 ">
      <span
        className={`bg-white px-1 rounded cursor-pointer ${
          scatterType === "districts" ? "font-bold" : ""
        }`}
        onClick={() => setScatterType("districts")}
      >
        Districts
      </span>
      <span
        className={`bg-white px-1 rounded cursor-pointer ${
          scatterType === "provinces" ? "font-bold" : ""
        }`}
        onClick={() => setScatterType("provinces")}
      >
        Provinces
      </span>
    </div>
  );
}
