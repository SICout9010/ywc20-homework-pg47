import { atom } from "jotai";

// got this from api.ywc20
export interface Candidate {
    firstName: string;
    lastName: string;
    interviewRefNo: string;
    major: string;
}

export type Major = 'design' | 'programming' | 'marketing' | 'content';
export type CandidatesByMajor = Record<Major, Candidate[]>;

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
    })[0]
})

export const selectedCandidateAtom = atom<Candidate | null>(null);