import { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { User } from "../../service/UserService";

type UserMenuProps = {
    user: User
}

export default function ({ user }: UserMenuProps) {
    const [showMenu, setShowMenu] = useState(false);
    const menuItems: MenuItem[] = [
        { label: "Logout", command: () => { alert("hello world") } }
    ];
    const menuRef = useRef<Menu>(null);

    return (
        <>
            <div className="flex flex-row p-2 gap-2 cursor-pointer align-items-center surface-200" style={{
                borderRadius: "20px"
            }} onClick={e => {
                const newState = !showMenu;
                setShowMenu(newState);
                newState == true ? menuRef.current?.show(e) : menuRef.current?.hide(e);
            }}>
                <span className="fullname">{user.name}</span>
                <img style={{ height: "2rem", borderRadius: "50%" }} src={user.avatar_url} />
            </div>
            <Menu style={{ transform: "translateY(1rem)" }} ref={menuRef} model={menuItems} popup />
        </>
    )

}