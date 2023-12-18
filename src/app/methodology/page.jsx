import MethodologyNavigation from "@/components/methodology/navigation";

import ContentEconomic from "@/components/methodology/content-econ";

import ContentEnvironment from "@/components/methodology/content-envr";
import ContentSchema from "@/components/methodology/content-schema";
import ContentFeedback from "@/components/methodology/content-feedback";

export const metadata = {
  title: "GED: Methodology",
  description: "Green Economy Diagnostic Tool",
};

export default function MethodologyPage() {
  return (
    <div className="w-full h-full flex overflow-auto">
      {/* Navigation section : Right */}
      <section className="bg-[#F5F8FB] w-1/4 h-full flex flex-col gap-4 pt-14 pl-5 pr-3">
        <MethodologyNavigation />
      </section>
      {/* Content section : Left */}
      <section className="bg-white w-3/4 h-full px-14 pt-14 overflow-auto scroll-smooth">
        <main className=" p-1 w-full h-full flex flex-col gap-16 font-inter">
          {/* Content section : 1 : ECON */}
          <div id="econ" className=" w-full flex flex-col gap-4">
            <ContentEconomic />
          </div>
          {/* Content section : 2 : ENVR */}
          <div id="envr" className=" w-full flex flex-col gap-4">
            <ContentEnvironment />
          </div>
          {/* Content section : 3 : SCHEMA */}
          <div id="schema" className=" w-full flex flex-col gap-4">
            <ContentSchema />
          </div>
          {/* Feedback section */}
          <div className=" w-full flex pb-20 ">
            <ContentFeedback />
          </div>
        </main>
      </section>
    </div>
  );
}
