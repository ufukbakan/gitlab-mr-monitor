import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useRef } from "react";
import { refreshJobAtom, useAccessToken, useRefreshToken } from "../../service/Commons";
import { User } from "../../service/UserService";
import { useRecoilValue } from "recoil";

type UserMenuProps = {
    user: User
}

export default function ({ user }: UserMenuProps) {
    const menuItems: MenuItem[] = [
        { label: "Logout", command: logout }
    ];
    const menuRef = useRef<Menu>(null);
    const { setRefreshToken } = useRefreshToken();
    const { setAccessToken } = useAccessToken();
    const lastRefreshJob = useRecoilValue(refreshJobAtom);

    function logout() {
        setAccessToken("");
        setRefreshToken("");
        lastRefreshJob && clearTimeout(lastRefreshJob);
    }

    return (
        <>
            <Button className="panel-button flex flex-row select-none p-2 gap-2 cursor-pointer align-items-center surface-50" style={{
                borderRadius: "20px"
            }} onClick={e => menuRef.current?.toggle(e)}>
                <span className="fullname">{user.name}</span>
                <img style={{ height: "2rem", borderRadius: "50%" }} src={user.avatar_url} />
            </Button>
            <Menu style={{ transform: "translateY(.2rem)" }} ref={menuRef} model={menuItems} popup />
        </>
    )

}