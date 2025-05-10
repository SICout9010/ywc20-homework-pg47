import { atom } from "jotai";
import { Candidate, CandidatesByMajor, Major } from "./interfaces";

export const selectedMajorAtom = atom<Major>('design');
export const searchAtom = atom("");
export const candidatesAtom = atom<CandidatesByMajor>({
    design: [],
    programming: [],
    marketing: [],
    content: []
});
export const filteredResultsAtom = atom((get) => {
    const search = get(searchAtom);
    const candidates = get(candidatesAtom);
    const major = get(selectedMajorAtom);

    if (!search.trim()) return null;

    console.log(candidates[major]);

    return candidates[major].filter((candidate: Candidate) => {
        return candidate.lastName.toLowerCase().includes(search.toLowerCase()) ||
        candidate.firstName.toLowerCase().includes(search.toLowerCase()) ||
        candidate.interviewRefNo.toLowerCase().includes(search.toLowerCase())
    }).map((candidate: Candidate) => {
        return {
            ...candidate,
            major: {
                design: "Design",
                programming: "Programming",
                marketing: "Marketing",
                content: "Content"
            }[major]
        }
    })[0]
})

export const selectedCandidateAtom = atom<Candidate | null>(null);