// would like to know what type of server component this is because its still has to know what the param is right?
// so it cant be just rendered and stored on server.. lets build and see

export default function CountryPage({ params }) {
  //   console.log("[CountryPage] : params : ", params);
  // **note** fetch data based off this param,, can be accessed at any server component that is dynamic or a child
  return (
    <div className="w-full h-full bg-pink-200 flex justify-center items-center">
      <section className="w-5/6 h-5/6 flex flex-col items-center bg-white rounded-lg p-2">
        <h2 className="font-bold text-2xl">{params.country}</h2>
      </section>
    </div>
  );
}
