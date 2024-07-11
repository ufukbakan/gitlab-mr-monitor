import { Button } from "primereact/button";
import { Dialog, DialogProps } from "primereact/dialog";
import { useState } from "react";
import GlobalSettings from "../../components/GlobalSettings";
import HowToGetAccessToken from "./HowToGetAccessToken";
import HowToInstallOnPremise from "./HowToInstallOnPremise";


export default function HowToDialog(props: DialogProps) {
    const backFunc = () => setPage(null);

    const pages = {
        "access-token": <HowToGetAccessToken />,
        "onpremise-installation": <HowToInstallOnPremise />,
        "global-settings": <GlobalSettings />
    } as const;

    const [currentPage, setPage] = useState<keyof typeof pages | null>(null);

    function render() {
        return !currentPage ? renderButtons() : pages[currentPage];
    }

    function renderButtons() {
        return (
            <div className="flex flex-column gap-2">
                <Button label="Global Settings" onClick={() => setPage("global-settings")} />
                <Button label="How to get access token?" onClick={() => setPage("access-token")} />
                <Button label="How to install on-premise?" onClick={() => setPage("onpremise-installation")} />
            </div>
        )
    }

    return (
        <Dialog {...props} style={{ ...props.style, minWidth: "10rem", minHeight: "50svh" }} resizable={false}>
            {currentPage !== null && <Button text icon="pi pi-arrow-left" className="absolute top-0 left-0 mt-4 ml-4" onClick={backFunc} />}
            {render()}
        </Dialog>
    )
}