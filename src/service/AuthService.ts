import axios from "axios";
import { AuthResponse } from "../ui/pages/Auth";
import { client_id, redirect_uri } from "./Commons";

export function requestAccesTokenRefresh({ refresh_token, authProvider } : {refresh_token: string, authProvider: string}) {
  const body = {
    client_id,
    refresh_token,
    grant_type: "refresh_token",
    redirect_uri,
  };
  const postUrl = `${authProvider}/oauth/token`;
  return axios.post<AuthResponse>(postUrl, body);
}

interface VersionResponse {
  version: string;
  revision: string;
  kas: Kas;
  enterprise: boolean;
}

interface Kas {
  enabled: boolean;
  externalUrl: string;
  version: string;
}

export function pingGitlab({ access_token, apiUrl }: {access_token: string, apiUrl: string}) {
  const getUrl = `${apiUrl}/version`;
  return axios.get<VersionResponse>(getUrl, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
