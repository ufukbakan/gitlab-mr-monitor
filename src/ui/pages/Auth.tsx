import axios, { AxiosResponse } from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { ReactNode, useEffect, useState } from "react";
import { client_id, client_secret, redirect_uri, refreshJobAtom, useAccessToken, useRefreshToken } from "../../service/Commons";
import ThemeSwitcher from "../elements/ThemeSwitcher";
import { useRecoilState } from "recoil";
import { requestAccesTokenRefresh } from "../../service/AuthService";
import { useAuthProvider } from "../../hooks/settings";

export interface AuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    created_at: number;
}

export default function AuthPage() {
    const searchParams = new URLSearchParams(globalThis.location.search);
    const defaultMessage = "You will be redirected";
    const [message, setMessage] = useState<ReactNode>(defaultMessage);
    const { setRefreshToken } = useRefreshToken();
    const { setAccessToken } = useAccessToken();
    const [lastRefreshJob, setLastRefreshJob] = useRecoilState(refreshJobAtom);
    const [authProvider] = useAuthProvider();

    function handleTokenResponse(resp: AxiosResponse<AuthResponse>) {
        setAccessToken(resp.data.access_token);
        setRefreshToken(resp.data.refresh_token);
        lastRefreshJob && clearTimeout(lastRefreshJob);
        setLastRefreshJob(window.setTimeout(() => refreshAccessToken(resp.data.refresh_token), resp.data.expires_in * 1000));
    }

    function handleTokenError(err: any) {
        console.error(err);
        console.warn(err.message);
        console.error("Couldn't refresh access token");
    }

    function refreshAccessToken(refresh_token: string) {
        requestAccesTokenRefresh({ refresh_token, authProvider })
            .then(handleTokenResponse)
            .catch(handleTokenError);
    }

    function retrieveAccessToken() {
        const body = {
            client_id,
            client_secret,
            code: searchParams.get("code"),
            grant_type: "authorization_code",
            redirect_uri
        }
        const postUrl = `${authProvider}/oauth/token`;
        axios.post<AuthResponse>(postUrl, body)
            .then(resp => {
                handleTokenResponse(resp);
                globalThis.history.pushState(null, "", "/");
            })
            .catch(err => {
                setMessage(
                    <>
                        <div>{err.message}</div>
                        <div><a href="/">Return home</a></div>
                    </>
                );
            });
    }

    useEffect(() => {
        retrieveAccessToken();
    }, [authProvider]);

    return (
        <div className="h-fulls flex flex-column">
            <div className="p-2">
                <ThemeSwitcher className="" />
            </div>
            <div className="w-full h-full flex flex-grow-1 flex-column gap-4 justify-content-center align-items-center">
                <ProgressSpinner aria-label="Loading" className={message != defaultMessage ? "hidden" : ""} />
                <span>{message}</span>
            </div>
        </div>
    )
}