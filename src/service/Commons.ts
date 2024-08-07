import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { MergeRequestState } from "../ui/elements/StatesDropdown";
import { MergeRequest, Project } from "./types";

export const baseUrl = import.meta.env.VITE_API_URL;
export const authProvider = import.meta.env.VITE_AUTH_PROVIDER;

export const client_id = "bc7072f9dd9baeea3490d3d1b82c3dde271e443d3bdbebe89efe0d39118b48d1";
export const client_secret = "46734d0c3f55dd12925e57f22a07efad38ac2c534885cdfee3e03ebbb4200a93";
export const redirect_uri = location.origin.concat("/oauth");

export const refreshJobAtom = atom<number>({
  key: "refreshJob",
  default: undefined,
});

export const fetchMrErrorAtom = atom<Error[]>({
  key: "fetchMrError",
  default: [],
});

export const mergeRequestStatesAtom = atom<MergeRequestState[]>({
  key: "selectedStates",
  default: [],
});

export const branchesAtom = atom<string[]>({
  key: "selectedBranches",
  default: [],
});

const accessTokenAtom = atom<string>({
  key: "accessToken",
  default: localStorage.getItem("access-token") || "",
});

const refreshTokenAtom = atom<string>({
  key: "refreshToken",
  default: localStorage.getItem("refresh-token") || "",
});

export const mergeRequestsAtom = atom<MergeRequest[]>({
  key: "mergeRequests",
  default: [],
});

export const projectsAtom = atom<Project[]>({
  key: "projects",
  default: [],
});

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  useEffect(() => {
    localStorage.setItem("access-token", accessToken);
  }, [accessToken]);
  return { accessToken, setAccessToken };
};

export const useRefreshToken = () => {
  const [token, setToken] = useRecoilState(refreshTokenAtom);
  useEffect(() => {
    localStorage.setItem("refresh-token", token);
  }, [token]);
  return { refreshToken: token, setRefreshToken: setToken };
};
