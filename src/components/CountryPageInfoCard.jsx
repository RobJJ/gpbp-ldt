export default function CountryPageInfoCard({ label, fact }) {
  return (
    <div className="bg-[#F3F5FF] flex flex-col h-auto px-4 py-2 rounded-lg shadow-md hover:shadow-lg cursor-pointer font-inter">
      <span className="font-bold">{fact}</span>
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  );
}
