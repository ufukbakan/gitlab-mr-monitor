import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { mergeRequestStatesAtom } from "../../service/Commons";
import ClassReceivingProps from "./commons/ClassReceivingProps";

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

export default function (props: ClassReceivingProps) {
    const [selectedStateOptions, setSelectedStateOptions] = useState([stateOptions[0].value]);
    const setSelectedState = useSetRecoilState(mergeRequestStatesAtom);

    useEffect(() => {
        setSelectedState(selectedStateOptions);
    }, [selectedStateOptions])

    return <MultiSelect id="states-dropdown" className={props.className} options={stateOptions} value={selectedStateOptions} onChange={e => setSelectedStateOptions(e.value)} />
}