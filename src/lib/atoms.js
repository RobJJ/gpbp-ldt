import { atom } from "jotai";

export const exampleNumberAtom = atom(5);

// ****** testing atom ******
// this atom will handle the state of the visual component type, ie: scatter / Map
// values can be "map" or "scatter"
export const visualTypeSelected = atom("map");
// export
