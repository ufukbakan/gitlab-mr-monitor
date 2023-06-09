import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenAtom, branchesAtom, mergeRequestsAtom, mergeRequestStatesAtom, projectsAtom } from "../../service/Commons";
import { fetchMergeRequests } from "../../service/MergeRequestService";
import { fetchProjects } from "../../service/ProjectService";
import AccessTokenInput from "../elements/AccessTokenInput";
import BranchesDropdown from "../elements/BranchesDropdown";
import StatesDropdown from "../elements/StatesDropdown";
import { Button } from "primereact/button"
import { MergeRequest, Project } from "../../service/types";
import ThemeSwitcher from "../elements/ThemeSwitcher";

export default function () {
    const [isFetching, setIsFetching] = useState(false);
    const setMergeRequests = useSetRecoilState(mergeRequestsAtom);
    const setProjects = useSetRecoilState(projectsAtom);
    const token = useRecoilValue(accessTokenAtom);
    const branches = useRecoilValue(branchesAtom);
    const states = useRecoilValue(mergeRequestStatesAtom);

    async function fetchData() {
        const promises = [fetchProjects(token), fetchMergeRequests(states, branches, token)];
        return new Promise((resolve) => Promise.allSettled(promises).then((results) => {
            const projectsResult = results[0];
            const mergeRequestResult = results[1];
            if(projectsResult.status == "fulfilled"){
                setProjects(projectsResult.value as Project[]);
            }
            if(mergeRequestResult.status == "fulfilled"){
                setMergeRequests(mergeRequestResult.value as MergeRequest[]);
            }
            resolve(null);
        }));
    }

    async function loadData() {
        setIsFetching(true);
        await fetchData();
        setIsFetching(false);
    }

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 60000);
        return () => {
            clearInterval(interval);
        }
    }, [token, branches, states])

    return (
        <div className="flex gap-2 align-items-center">
            <ThemeSwitcher />
            <Button icon={isFetching ? "pi pi-spin pi-spinner" : "pi pi-replay"} disabled={isFetching} onClick={loadData} />
            <AccessTokenInput />
            <BranchesDropdown />
            <StatesDropdown />
        </div>
    )
}