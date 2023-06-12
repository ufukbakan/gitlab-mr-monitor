import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { branchesAtom } from "../../service/Commons";
import ClassReceivingProps from "./commons/ClassReceivingProps";

// You may consider editing branch options regard to your organisation

const branchOptions = [
    { label: "Main", value: "main" },
    { label: "Master", value: "master" },
    { label: "Test", value: "test" },
    { label: "Dev", value: "dev" },
]

export default function (props: ClassReceivingProps) {
    const [selectedBranches, setSelectedBranches] = useState([branchOptions[0].value]);
    const setBranchesAtom = useSetRecoilState(branchesAtom);
    
    useEffect(() => {
        setBranchesAtom(selectedBranches);
    }, [selectedBranches])

    return <MultiSelect className={props.className} options={branchOptions} value={selectedBranches} onChange={e => setSelectedBranches(e.value)} />
}