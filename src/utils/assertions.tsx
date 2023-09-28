import { ALL_ARTISTS } from "../constants";
import { Artist } from "../types";

// Assertion to test if element clicked is a React node (stolen from stack overflow link below)
// https://stackoverflow.com/questions/71193818/react-onclick-argument-of-type-eventtarget-is-not-assignable-to-parameter-of-t
// Also see typescript docs: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
export function assertIsNode(target: EventTarget | null): asserts target is Node {
    if(!target || !("nodeType" in target)) {
        throw new Error("Element clicked is not a react node");
    }
}

// Assertion to test if a string is an artist name with products on this website
export function assertIsArtist(name: string): asserts name is Artist {
    if(!name || !(ALL_ARTISTS.includes(name))) {
        throw new Error("Name used in ArtistPage is not an artist.");
    }
}