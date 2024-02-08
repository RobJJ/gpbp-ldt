import MethodologyNavigation from "@/components/methodology/navigation";

import ContentSchema from "@/components/methodology/content-schema";
import ContentFeedback from "@/components/methodology/content-feedback";
import ContentDisclaimer from "@/components/methodology/content-disclaimer";
import ContentMethods from "@/components/methodology/content-methods";
import ContentAiPolicy from "@/components/methodology/content-ai-policy";
import Content_AI_GED from "@/components/methodology/content-ai-ged";

export const metadata = {
  title: "GED: Methodology",
  description: "Green Economy Diagnostic Tool",
};

export default function MethodologyPage() {
  return (
    <div className="w-full h-full flex overflow-auto">
      {/* Navigation section : Left */}
      <section className="bg-[#F5F8FB] w-1/4 h-full flex flex-col gap-4 pt-14 pl-5 pr-3 overflow-auto">
        <MethodologyNavigation />
      </section>
      {/* Content section : Right */}
      <section className="bg-white w-3/4 h-full px-14 pt-14 overflow-auto scroll-smooth">
        <main
          id="methodology"
          className=" p-1 w-full h-full flex flex-col gap-9 font-inter"
        >
          {/* Content : 1 : DISCLAIMER */}
          <ContentDisclaimer />
          {/* Content : 2 : METHODS */}
          <ContentMethods />
          {/* Content : 3 : SCHEMA */}
          <div id="schema" className=" w-full flex flex-col gap-4">
            <ContentSchema />
          </div>
          {/* Content : 4 : AI POLICY */}
          <ContentAiPolicy />
          {/* Content : 5 : AI in GED */}
          <Content_AI_GED />
          {/* Content : 6 : FEEDBACK */}
          <div className=" w-full flex pb-20 pt-10 ">
            <ContentFeedback />
          </div>
        </main>
      </section>
    </div>
  );
}
