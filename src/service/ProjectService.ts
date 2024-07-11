import axios from "axios";
import { Project } from "./types";

export function fetchProjects({ apiUrl, token }: { apiUrl: string; token: string }): Promise<Project[]> {
  return new Promise((resolve, reject) => {
    axios
      .get<Project[]>(`${apiUrl}/projects?simple=true&min_access_level=20&pagination=keyset&per_page=50000&order_by=id&sort=desc&`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(err));
  });
}
