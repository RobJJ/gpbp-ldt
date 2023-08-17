import Image from "next/image";
import econ from "../../public/econ-scale.png";

export default function MapColorLegend() {
  return (
    <div className="absolute bottom-2 right-2">
      <Image src={econ} alt="econ-scale" width={180} />
    </div>
  );
}
