import axios from "axios";
import { MergeRequest } from "./types";

const baseUrl = "/api/v4" as const;

export function fetchMergeRequests(states: string[], target_branches: string[], token: string) {
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

    return new Promise((resolve, reject) => {
        const results : MergeRequest[] = [];
        Promise.allSettled(promises).then(settledResults => {
            settledResults.forEach(result => {
                if(result.status == "fulfilled"){
                    results.push(...result.value);
                } else {
                    console.error(result.reason);
                }
            })
        });
        resolve(results);
    });
}

function fetchMergeRequest(state: string, targetBranch: string, token: string): Promise<MergeRequest[]> {
    return new Promise((resolve, reject) => {
        // You may consider adding ?scope=all to the end of url if you want to monitor all projects
        axios.get<MergeRequest[]>(`${baseUrl}/merge_requests?state=${state}&target_branch=${targetBranch}&access_token=${token}`)
            .then(resp => resolve(resp.data))
            .catch(err => reject(err));
    });
}