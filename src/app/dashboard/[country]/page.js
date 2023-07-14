import React from "react";

export default function CountryPage() {
  return (
    <div className="w-1/2 h-full bg-purple-300 flex flex-col p-2 gap-2">
      <section className="w-full h-1/2 bg-purple-100">
        Top: Facts cards for country level shit. We need country data from DB
        here.. the data we fetch is just based on what country we are looking
        at.. ezzee
      </section>
      <section className="w-full h-1/2 bg-purple-100">
        Bottom: A list of provinces for country level shit. We need the province
        data here. the data we fetch is just based on the country and then we
        pass in [country]-province-data
      </section>
    </div>
  );
}
