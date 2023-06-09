import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { mergeRequestStatesAtom } from "../../service/Commons";

export type MergeRequestState = "opened" | "closed" | "merged" | "locked";
type StateOption = {
    label: string,
    value: MergeRequestState
}

const stateOptions: StateOption[] = [
    { label: "Open", value: "opened" },
    { label: "Closed", value: "closed" },
    { label: "Merged", value: "merged" },
    { label: "Locked", value: "locked" }
];

export default function () {
    const [selectedStateOptions, setSelectedStateOptions] = useState([stateOptions[0].value]);
    const setSelectedState = useSetRecoilState(mergeRequestStatesAtom);

    useEffect(() => {
        setSelectedState(selectedStateOptions);
    }, [selectedStateOptions])

    return <MultiSelect style={{width: "10rem"}} options={stateOptions} value={selectedStateOptions} onChange={e => setSelectedStateOptions(e.value)} />
}