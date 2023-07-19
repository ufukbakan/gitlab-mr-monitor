import { useEffect, useState } from "react";
import { useAccessToken } from "../../service/Commons"
import { User, fetchSelfInfo } from "../../service/UserService";
import { ProgressSpinner } from "primereact/progressspinner";
import UserMenu from "./UserMenu";

export default function () {
    const { accessToken } = useAccessToken();
    const [userInfo, setUserInfo] = useState<User>();

    useEffect(() => {
        fetchSelfInfo(accessToken).then(setUserInfo);
    }, [])

    function render() {
        if (userInfo) {
            return <UserMenu user={userInfo} />
        } else {
            return <ProgressSpinner style={{ height: "2rem" }} />
        }
    }

    return render();
}