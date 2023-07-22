// "use client";

// ** note :: make this component a server component that receives the needed props and fetches data that is then passed down to the client component to use

// get params and searchparams as props
// fetch data based on [country], [year] --  this will set up the default pos of the map

export default function ScatterComponentParent() {
  return (
    <section className="w-full h-full bg-yellow-200">
      I AM SCATTER COMPONENT
    </section>
  );
}
