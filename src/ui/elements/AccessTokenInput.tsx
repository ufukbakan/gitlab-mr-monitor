import { InputText } from "primereact/inputtext"
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { accessTokenAtom } from "../../service/Commons"

export default function () {
    const [token, setToken] = useRecoilState(accessTokenAtom);
    
    useEffect(() => {
        localStorage.setItem("access-token", token);
    }, [token]);
    
    return <InputText style={{width: "10rem"}} placeholder="Access Token" value={token} onChange={e => setToken(e.target.value)} />
}