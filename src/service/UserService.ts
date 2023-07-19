import axios from "axios";
import { baseUrl } from "./Commons";

export interface User {
    id: number;
    username: string;
    email: string;
    name: string;
    state: string;
    avatar_url: string;
    web_url: string;
    created_at: string;
    bio: string;
    location?: any;
    public_email: string;
    skype: string;
    linkedin: string;
    twitter: string;
    discord: string;
    website_url: string;
    organization: string;
    job_title: string;
    pronouns: string;
    bot: boolean;
    work_information?: any;
    followers: number;
    following: number;
    local_time: string;
    last_sign_in_at: string;
    confirmed_at: string;
    theme_id: number;
    last_activity_on: string;
    color_scheme_id: number;
    projects_limit: number;
    current_sign_in_at: string;
    identities: Identity[];
    can_create_group: boolean;
    can_create_project: boolean;
    two_factor_enabled: boolean;
    external: boolean;
    private_profile: boolean;
    commit_email: string;
}

interface Identity {
    provider: string;
    extern_uid: string;
}

export function fetchSelfInfo(accessToken: string): Promise<User> {
    return new Promise((resolve, reject) => {
        axios.get<User>(`${baseUrl}/user`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then(resp => resolve(resp.data)).catch(reject)
    });
}