import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { useApiUrl } from "../../hooks/settings";
import { useAccessToken } from "../../service/Commons";
import { User, fetchSelfInfo } from "../../service/UserService";
import UserMenu from "./UserMenu";

export default function UserPanel() {
    const { accessToken } = useAccessToken();
    const [userInfo, setUserInfo] = useState<User>();
    const [apiUrl] = useApiUrl();

    useEffect(() => {
        fetchSelfInfo({ accessToken, apiUrl }).then(setUserInfo);
    }, [accessToken, apiUrl])

    function render() {
        if (userInfo) {
            return <UserMenu user={userInfo} />
        } else {
            return <ProgressSpinner style={{ height: "2rem" }} />
        }
    }

    return render();
}