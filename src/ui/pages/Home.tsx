import { useRecoilState } from "recoil";
import FetchErrors from "../components/FetchErrors";
import HowTo from "../components/HowTo";
import MergeRequestTable from "../components/MergeRequestTable";
import TopLeftNav from "../components/TopLeftNav";
import TopRightNav from "../components/TopRightNav";
import { refreshJobAtom, useAccessToken, useRefreshToken } from "../../service/Commons";
import { AxiosResponse } from "axios";
import { AuthResponse } from "./Auth";
import { pingGitlab, requestAccesTokenRefresh } from "../../service/AuthService";
import { useEffect } from "react";

export default function () {

    const { accessToken, setAccessToken } = useAccessToken();
    const { refreshToken, setRefreshToken } = useRefreshToken();
    const [lastRefreshJob, setLastRefreshJob] = useRecoilState(refreshJobAtom);
    function handleTokenResponse(resp: AxiosResponse<AuthResponse>) {
        setAccessToken(resp.data.access_token);
        setRefreshToken(resp.data.refresh_token);
        lastRefreshJob && clearTimeout(lastRefreshJob);
        setLastRefreshJob(window.setTimeout(() => {
            requestAccesTokenRefresh(resp.data.refresh_token)
                .then(handleTokenResponse)
                .catch(logout)
        }, resp.data.expires_in * 1000));
    }

    function logout() {
        setAccessToken("");
        setRefreshToken("");
        lastRefreshJob && clearTimeout(lastRefreshJob);
    }

    function checkAccessToken() {
        pingGitlab(accessToken).catch(e => {
            if (e.response.status == 401) {
                requestAccesTokenRefresh(refreshToken).then(handleTokenResponse).catch(() => logout());
            } else {
                logout();
            }
        })
    }

    useEffect(() => {
        checkAccessToken();
    }, [])

    return (
        <>
            <div className="flex w-full p-4 justify-content-between">
                <div className="top-left">
                    <TopLeftNav />
                </div>

                <div className="top-right">
                    <TopRightNav />
                </div>

            </div>

            <MergeRequestTable />
            <FetchErrors />
            <HowTo />
        </>
    )
}
