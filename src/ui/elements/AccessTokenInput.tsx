import { InputText } from "primereact/inputtext";
import { useAccessToken } from "../../service/Commons";
import ClassReceivingProps from "./commons/ClassReceivingProps";

export default function (props: ClassReceivingProps) {
    const { accessToken, setAccessToken } = useAccessToken();
    
    return <InputText type="password" className={props.className} placeholder="Access Token" value={accessToken} onChange={e => setAccessToken(e.target.value)} />
}