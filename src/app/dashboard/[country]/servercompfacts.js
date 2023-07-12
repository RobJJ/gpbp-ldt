export default function ServerCompFacts({ searchParams }) {
  return (
    <div>Does URL have layer? : {searchParams.layer ? "yes!" : "nah fam"}</div>
  );
}
