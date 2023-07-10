"use client";

import { exampleNumberAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

export default function AtomPage() {
  const [number, setNumber] = useAtom(exampleNumberAtom);
  return <div>Dis page brah,, numbaah : {number}</div>;
}
