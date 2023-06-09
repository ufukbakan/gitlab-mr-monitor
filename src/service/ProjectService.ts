import axios from "axios";
import { baseUrl } from "./Commons";
import { Project } from "./types";

export function fetchProjects(token: string): Promise<Project[]> {
    return new Promise((resolve, reject) => {
        axios.get<Project[]>(`${baseUrl}/projects?simple=true&min_access_level=20&pagination=keyset&per_page=50000&order_by=id&sort=desc&access_token=${token}`)
            .then(resp => resolve(resp.data))
            .catch(err => reject(err));
    });
}