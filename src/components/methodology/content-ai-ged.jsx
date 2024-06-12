import AI_COST_TABLE from "./content-ai-ged-table";

export default function Content_AI_GED() {
  return (
    <div className="flex flex-col gap-6 ">
      <div id="ai_ged" className="w-full flex">
        <span className="text-2xl flex justify-center items-center w-[33px] h-[33px] bg-[#4345AA] text-white font-bold">
          5
        </span>
      </div>
      <h2 className="text-3xl text-[#4345AA] font-bold ">
        Generative AI within the LDT
      </h2>
      <p>
        We decided to leverage the LDT capabilities and the capabilities of
        Generative AI to produce accurate, relevant, and useful insights and
        recommendations for a policy maker.
      </p>
      <h4 className="text-xl font-semibold">
        This would allow policy makers to:
      </h4>
      <ul className="ml-2">
        <li>
          <span className="mr-2 text-lg">&#x2022;</span>Quickly make sense of
          the large amounts of data found in the LDT
        </li>
        <li>
          <span className="mr-2 text-lg">&#x2022;</span>Focus on the most
          important indicators and their significance
        </li>
        <li>
          <span className="mr-2 text-lg">&#x2022;</span>Highlighting how the
          practical effectiveness of the LDT indicators
        </li>
        <li>
          <span className="mr-2 text-lg">&#x2022;</span>Most importantly, derive
          accurate, relevant and specific policy recommendations based on these
          recommendations
        </li>
      </ul>
      <h4 className="text-md font-semibold">
        So far, we have successfully produced a prototype (focusing on Serbia)
        that works on the municipality/district level and is capable of:
      </h4>

      <ul className=" list-inside list-decimal">
        <li>
          Summarizing the current economic and the environmental score of the
          municipality
        </li>

        <li>
          Briefly describes the trends in the environmental score based on its
          three components
        </li>
        <li>
          Describing the provincial and the national ranking of each
          municipality based on its economic and environmental scores (i.e. How
          the economic and the environmental scores of the municipality rank
          compared to other municipalities in the same district and other
          municipalities all over the country.)
        </li>
        <li>
          Provide economic and environmental recommendation’s based on simple
          background information extracted about the municipality and based on
          the indicators described above.
        </li>
      </ul>
      <h4 className="text-xl font-semibold">
        What Technology do we currently use?
      </h4>
      <ul className="ml-2">
        <li>
          <span className="mr-2 text-lg">&#x2022;</span>Open AI API (paid)
        </li>
        <li>
          <span className="mr-2 text-lg">&#x2022;</span>GooglePALM API (free
          trial for now, but not available across the EU)
        </li>
        <li>
          <span className="mr-2 text-lg">&#x2022;</span>Langchain
        </li>
      </ul>
      <h4 className="text-xl font-semibold">Projected Current Costs:</h4>
      <AI_COST_TABLE />
      {/* Potentially add in - Future Plans - here */}
      {/* <h4 className="text-xl font-semibold">Future Plans</h4> */}
    </div>
  );
}
