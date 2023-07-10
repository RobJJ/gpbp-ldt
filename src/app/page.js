"use client";
import { exampleNumberAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

export default function Home() {
  const [number, setNumber] = useAtom(exampleNumberAtom);
  return <div>Hi, lets get started boi, number: {number}</div>;
}
