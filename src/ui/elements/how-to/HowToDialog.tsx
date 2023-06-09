import { Button } from "primereact/button";
import { Dialog, DialogProps } from "primereact/dialog";
import { ReactNode, useState } from "react";
import HowToGetAccessToken from "./HowToGetAccessToken";
import HowToInstallOnPremise from "./HowToInstallOnPremise";

type HowToPages = "access-token" | "onpremise-installation";
export interface HasBackButton {
    onBack: VoidFunction
}

export default function (props: DialogProps) {
    const [currentPage, setPage] = useState<HowToPages | null>(null);
    const backFunc = () => setPage(null);

    const pages: Record<HowToPages, ReactNode> = {
        "access-token": <HowToGetAccessToken onBack={backFunc} />,
        "onpremise-installation": <HowToInstallOnPremise onBack={backFunc} />
    }

    function render() {
        return !currentPage ? renderButtons() : pages[currentPage];
    }

    function renderButtons() {
        return (
            <div className="flex flex-column gap-2">
                <Button label="How to get access token?" onClick={() => setPage("access-token")} />
                <Button label="How to install monitor on premise?" onClick={() => setPage("onpremise-installation")} />
            </div>
        )
    }

    return (
        <Dialog {...props} style={{ ...props.style, minWidth: "10rem", minHeight: "50svh" }} resizable={false}>
            {render()}
        </Dialog>
    )
}