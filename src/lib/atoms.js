import { atom } from "jotai";

export const exampleNumberAtom = atom(5);

// ****** testing atom ******
// this atom will handle the state of the visual component type, ie: scatter / Map
// values can be "map" or "scatter"
export const visualTypeSelected = atom("map");
// export

// the type of data you want to view at home page.. choices:  "districts" or "provinces"
export const scatterViewType = atom("provinces");
