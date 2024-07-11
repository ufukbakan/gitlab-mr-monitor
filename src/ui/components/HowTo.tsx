import { useState } from "react";
import HowToDialog from "../elements/how-to/HowToDialog";

export default function HowToComponent() {
    const [dialogVisible, setDialogVisible] = useState(false);

    return (
        <>
            <HowToDialog visible={dialogVisible} onHide={setDialogVisible.bind(null, false)} />
            <div className="fixed right-0 bottom-0 pr-4 pb-4" onClick={setDialogVisible.bind(null, true)}>
                <div className="border-circle bg-primary p-2 cursor-pointer lighten">
                    <i className="pi pi-question w-2rem h-2rem flex align-items-center justify-content-center font-bold"></i>
                </div>
            </div>
        </>
    )
}