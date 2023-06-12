import { useEffect, useState } from "react";

export default function(){
    const [innerWidth, setInnerWidth] = useState(globalThis.window.innerWidth);

    function updateInnerWidth(){
        setInnerWidth(globalThis.window.innerWidth);
    }

    useEffect(() => {
        globalThis.window.addEventListener("resize", updateInnerWidth);
        return () => globalThis.window.removeEventListener("resize", updateInnerWidth);
    }, [])

    return innerWidth;
}