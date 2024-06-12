export default function ContentDisclaimer() {
  return (
    <div className="flex flex-col gap-6">
      <div id="disclaimer" className="w-full flex">
        <span className="text-2xl flex justify-center items-center w-[33px] h-[33px] bg-[#4345AA] text-white font-bold">
          1
        </span>
      </div>
      <h2 className="text-3xl text-[#4345AA] font-bold ">
        Livability Score Review
      </h2>
      <p>
        The following provides an overview of the methodology used to compute
        the GED&apos;s indices. The World Bank team is preparing a comprehensive
        document with additional details to the methodology. The team will also
        work with a small cohort of local governments to further refine the
        overall methodology and develop country specific case studies and use
        cases.
      </p>
    </div>
  );
}
