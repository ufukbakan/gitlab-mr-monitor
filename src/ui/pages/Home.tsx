import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useApiUrl, useAuthProvider } from "../../hooks/settings";
import { pingGitlab, requestAccesTokenRefresh } from "../../service/AuthService";
import { refreshJobAtom, useAccessToken, useRefreshToken } from "../../service/Commons";
import FetchErrors from "../components/FetchErrors";
import HowTo from "../components/HowTo";
import MergeRequestTable from "../components/MergeRequestTable";
import TopLeftNav from "../components/TopLeftNav";
import TopRightNav from "../components/TopRightNav";
import { AuthResponse } from "./Auth";

export default function HomePage() {

    const { accessToken, setAccessToken } = useAccessToken();
    const { refreshToken, setRefreshToken } = useRefreshToken();
    const [lastRefreshJob, setLastRefreshJob] = useRecoilState(refreshJobAtom);
    const [authProvider] = useAuthProvider();
    const [apiUrl] = useApiUrl();
    function handleTokenResponse(resp: AxiosResponse<AuthResponse>) {
        setAccessToken(resp.data.access_token);
        setRefreshToken(resp.data.refresh_token);
        lastRefreshJob && clearTimeout(lastRefreshJob);
        setLastRefreshJob(window.setTimeout(() => {
            requestAccesTokenRefresh({ authProvider, refresh_token: resp.data.refresh_token })
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
        pingGitlab({ apiUrl, access_token: accessToken }).catch(e => {
            if (e.response.status == 401) {
                requestAccesTokenRefresh({ authProvider, refresh_token: refreshToken }).then(handleTokenResponse).catch(() => logout());
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
