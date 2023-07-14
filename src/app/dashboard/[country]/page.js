// ** note ** this is a dynamic server comp. Can fetch params and data here

import CountryPageListComponent from "@/components/CountryPageListComponent";

export default function CountryPage({ params }) {
  return (
    <div className="w-full h-full bg-purple-300 flex flex-col p-2 gap-2">
      <section className="w-full h-1/2 bg-purple-100">
        Top: Facts cards for country level shit. We need country data from DB
        here.. the data we fetch is just based on what country we are looking
        at.. ezzee
      </section>
      {/* this should be a click component as it needs to do NAV!*/}

      <CountryPageListComponent country={params.country} />
    </div>
  );
}
