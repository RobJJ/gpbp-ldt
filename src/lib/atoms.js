import { atom } from "jotai";

// ****** ATOMS FOR UI STATE ******

// choices: "map" or "scatter"
export const visualTypeSelected = atom("scatter");

//  choices:  "districts" or "provinces"
export const scatterViewType = atom("provinces");
