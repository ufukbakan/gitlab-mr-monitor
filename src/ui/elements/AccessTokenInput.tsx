import { InputText } from "primereact/inputtext"
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { accessTokenAtom } from "../../service/Commons"
import ClassReceivingProps from "./commons/ClassReceivingProps";

export default function (props: ClassReceivingProps) {
    const [token, setToken] = useRecoilState(accessTokenAtom);
    
    useEffect(() => {
        localStorage.setItem("access-token", token);
    }, [token]);
    
    return <InputText type="password" className={props.className} placeholder="Access Token" value={token} onChange={e => setToken(e.target.value)} />
}