import { useLightMode } from "color-scheme-hook";
import { InputSwitch } from "primereact/inputswitch";
import { useEffect } from "react";
import ClassReceivingProps from "./commons/ClassReceivingProps";

export default function (props: ClassReceivingProps) {
    const [isLight, toggle, reset] = useLightMode();
    useEffect(() => {
        const theme = isLight ? "viva-light" : "viva-dark";
        const href = `/themes/${theme}/theme.css`;
        const link = document.querySelector("#theme-css") as HTMLLinkElement;
        if(link){
            link.href = href;
        }
    }, [isLight]);

    return <InputSwitch checked={isLight} onChange={toggle} className={props.className} />
}