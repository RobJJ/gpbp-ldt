const schemaHeaders = [
  "",
  "Per Municipality",
  "Data For the whole of Serbia (160 Municipalities)",
];

const schemaRows = [
  ["Economic Trend Description", "$0.02", "$3.20"],
  ["Economic Trend Description", "$0.031", "$4.96"],
  ["Rankings", "$0.04", "$6.40"],
  ["Recommendations", "$0.002", "$0.32"],
  ["Total", "$0.093", "$14.88"],
];

export default function AI_COST_TABLE() {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      {/* head */}
      <div className="flex bg-gray-100 items-center border border-[#B9B9B9] ">
        {schemaHeaders.map((header, index) => (
          <div
            key={index}
            className="w-1/3 p-2 border-r border-[#B9B9B9] last:border-r-0  font-bold  h-full flex items-center"
          >
            {header}
          </div>
        ))}
      </div>
      {/* body */}
      <div className="flex flex-col border-x border-b border-[#B9B9B9]">
        {schemaRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex ">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="w-1/3 p-3 border-r border-b last:border-r-0 border-[#B9B9B9] text-sm  break-words"
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
