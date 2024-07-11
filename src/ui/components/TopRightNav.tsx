import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useInnerWidth from "../../hooks/useInnerWidth";
import { branchesAtom, fetchMrErrorAtom, mergeRequestStatesAtom, mergeRequestsAtom, projectsAtom, useAccessToken } from "../../service/Commons";
import { fetchMergeRequests } from "../../service/MergeRequestService";
import { fetchProjects } from "../../service/ProjectService";
import { MergeRequest, Project } from "../../service/types";
import AccessTokenInput from "../elements/AccessTokenInput";
import BranchesDropdown from "../elements/BranchesDropdown";
import SignInWithGitLab from "../elements/SignInWithGitLab";
import StatesDropdown from "../elements/StatesDropdown";
import ThemeSwitcher from "../elements/ThemeSwitcher";
import UserPanel from "../elements/UserPanel";
import { useApiUrl, useMrScope } from "../../hooks/settings";

export default function TopRightNav() {
    const [isFetching, setIsFetching] = useState(false);
    const setMergeRequests = useSetRecoilState(mergeRequestsAtom);
    const setProjects = useSetRecoilState(projectsAtom);
    const { accessToken } = useAccessToken();
    const branches = useRecoilValue(branchesAtom);
    const states = useRecoilValue(mergeRequestStatesAtom);
    const setErrors = useSetRecoilState(fetchMrErrorAtom);
    const panel = accessToken ? <UserPanel /> : <SignInWithGitLab />;
    const innerWidth = useInnerWidth();
    const [apiUrl] = useApiUrl();
    const [mrScope] = useMrScope();
    console.log("current access token is ", accessToken)

    async function fetchData() {
        const promises = [fetchProjects({ apiUrl, token: accessToken }), fetchMergeRequests({ apiUrl, states, scope: mrScope, targetBranches: branches, token: accessToken, setErrors })];
        return new Promise((resolve) => Promise.allSettled(promises).then((results) => {
            const projectsResult = results[0];
            const mergeRequestResult = results[1];
            if (projectsResult.status == "fulfilled") {
                setProjects(projectsResult.value as Project[]);
            }
            if (mergeRequestResult.status == "fulfilled") {
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
    }, [accessToken, branches, states, apiUrl, mrScope])

    return (
        <div className="flex flex-column gap-2">
            <div className="top-right-1 flex flex-row flex-wrap justify-content-end gap-2 align-items-center">
                <ThemeSwitcher className="col-fixed" />
                {innerWidth > 520 && <AccessTokenInput className="col" />}
                {panel}
            </div>
            <div className="top-right-2 flex flex-row flex-wrap justify-content-end gap-2 align-items-center">
                <Button id="refresh-button" icon={isFetching ? "pi pi-spin pi-spinner" : "pi pi-replay"} disabled={isFetching} onClick={loadData} />
                <BranchesDropdown className="prime-input" />
                <StatesDropdown className="prime-input" />
            </div>
        </div>
    )
}