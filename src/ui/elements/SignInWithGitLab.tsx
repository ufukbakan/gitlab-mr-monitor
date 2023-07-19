import { Button } from "primereact/button";
import { client_id, redirect_uri } from "../../service/Commons";

export default function () {
    const oauthLink = `https://gitlab.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=read_api`;
    return (
        <a href={oauthLink}>
            <Button className="surface-700 border-none lighten">
                <div className="flex flex-row gap-2 align-items-center">
                    <img style={{ height: "1rem" }} src="/gitlab.svg" />
                    <span>Sign In</span>
                </div>
            </Button>
        </a>
    )
}