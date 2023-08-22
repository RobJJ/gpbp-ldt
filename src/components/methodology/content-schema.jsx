import SchemaTable from "./content-schema-table";

export default function ContentSchema() {
  return (
    <>
      <span className="text-2xl flex justify-center items-center w-[33px] h-[33px] bg-[#4345AA] text-white font-bold">
        3
      </span>
      <h2 className="text-3xl text-[#4345AA] font-bold ">Schema</h2>
      <div className="w-full mt-4">
        <SchemaTable />
      </div>
    </>
  );
}
