import { atom } from "recoil";
import { MergeRequestState } from "../ui/elements/StatesDropdown";
import { MergeRequest, Project } from "./types";

export const baseUrl = "https://gitlab.com/api/v4" as const;

export const mergeRequestStatesAtom = atom<MergeRequestState[]>({
    key: "selectedStates",
    default: []
})

export const branchesAtom = atom<string[]>({
    key: "selectedBranches",
    default: []
});

export const accessTokenAtom = atom<string>({
    key: "accessToken",
    default: localStorage.getItem("access-token") || ""
});

export const mergeRequestsAtom = atom<MergeRequest[]>({
    key: "mergeRequests",
    default: []
})

export const projectsAtom = atom<Project[]>({
    key: "projects",
    default: []
})