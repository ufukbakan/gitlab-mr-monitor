import axios from "axios";
import { MergeRequest, MergeRequestScope } from "./types";

interface FetchMrsRequest extends Omit<FetchMrRequest, "state" | "targetBranch"> {
  setErrors: (eList: Error[]) => void;
  states: string[];
  targetBranches: string[];
}

export function fetchMergeRequests({ apiUrl, token, targetBranches, scope, states, setErrors }: FetchMrsRequest): Promise<MergeRequest[]> {
  return new Promise((resolve) => {
    const state_branch_combinations: { state: string; branch: string }[] = [];
    states.forEach((state) => {
      targetBranches.forEach((branch) => {
        state_branch_combinations.push({ state, branch });
      });
    });

    const promises: Promise<MergeRequest[]>[] = [];
    state_branch_combinations.forEach((comb) => {
      promises.push(fetchMergeRequest({ apiUrl, token, scope, state: comb.state, targetBranch: comb.branch }));
    });

    const results: MergeRequest[] = [];
    const errors: Error[] = [];
    let index = 0;
    Promise.allSettled(promises).then((settledResults) => {
      settledResults.forEach((result) => {
        if (result.status == "fulfilled") {
          results.push(...result.value);
        } else {
          console.error(result.reason);
          const errorCombination = state_branch_combinations[index];
          errors.push(new Error(`Error while trying to fetch ${errorCombination.state} merge requests for ${errorCombination.branch}\n${result.reason}`));
        }
        index++;
      });
      setErrors(errors);
      resolve(results);
    });
  });
}

interface FetchMrRequest {
  apiUrl: string;
  state: string;
  targetBranch: string;
  token: string;
  scope?: MergeRequestScope;
}

function fetchMergeRequest({ apiUrl, state, targetBranch, token, scope }: FetchMrRequest): Promise<MergeRequest[]> {
  scope = scope ?? "assigned_to_me";
  return new Promise((resolve, reject) => {
    axios
      .get<MergeRequest[]>(`${apiUrl}/merge_requests?state=${state}&target_branch=${targetBranch}&scope=${scope}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(err));
  });
}
