// "use client";

// NOT CURRENTLY BEING USED
// import { scatterViewType, visualTypeSelected } from "@/lib/atoms";
// import { useAtom } from "jotai";
// import { useRouter } from "next/navigation";

// export default function HomeButton() {
//   const router = useRouter();
//   const [visualType, setVisualType] = useAtom(visualTypeSelected);
//   const [layerType, setLayerType] = useAtom(scatterViewType);

//   function handleHomeNavigation() {
//     setVisualType("scatter");
//     setLayerType("provinces");
//     router.push(`/`);
//   }

//   return (
//     <>
//       <button className="text-[#D9D9D9] mr-5" onClick={handleHomeNavigation}>
//         Home
//       </button>
//     </>
//   );
// }
