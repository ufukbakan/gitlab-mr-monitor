import axios from "axios";
import { baseUrl } from "./Commons";
import { MergeRequest } from "./types";

export function fetchMergeRequests(states: string[], target_branches: string[], token: string, setErrors: ((eList: Error[]) => void)): Promise<MergeRequest[]> {
    return new Promise((resolve, reject) => {
        const state_branch_combinations: { state: string, branch: string }[] = [];
        states.forEach(state => {
            target_branches.forEach(branch => {
                state_branch_combinations.push({ state, branch });
            })
        })

        const promises: Promise<MergeRequest[]>[] = [];
        state_branch_combinations.forEach(comb => {
            promises.push(fetchMergeRequest(comb.state, comb.branch, token));
        });

        const results: MergeRequest[] = [];
        const errors: Error[] = [];
        let index = 0;
        Promise.allSettled(promises).then(settledResults => {
            settledResults.forEach(result => {
                if (result.status == "fulfilled") {
                    results.push(...result.value);
                } else {
                    console.error(result.reason);
                    const errorCombination = state_branch_combinations[index];
                    errors.push(new Error(`Error while trying to fetch ${errorCombination.state} merge requests for ${errorCombination.branch}\n${result.reason}`));
                }
                index++;
            })
            setErrors(errors);
            resolve(results);
        });
    });
}

function fetchMergeRequest(state: string, targetBranch: string, token: string): Promise<MergeRequest[]> {
    return new Promise((resolve, reject) => {
        // You may consider adding ?scope=all to the end of url if you want to monitor all projects
        axios.get<MergeRequest[]>(
            `${baseUrl}/merge_requests?state=${state}&target_branch=${targetBranch}&scope=${import.meta.env.VITE_MR_SCOPE}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(resp => resolve(resp.data))
            .catch(err => reject(err));
    });
}