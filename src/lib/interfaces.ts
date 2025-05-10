// got this from api.ywc20
export interface Candidate {
    firstName: string;
    lastName: string;
    interviewRefNo: string;
    major: string;
}
export type Major = 'design' | 'programming' | 'marketing' | 'content';
export type CandidatesByMajor = Record<Major, Candidate[]>;