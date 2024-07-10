import { MultiSelect } from "primereact/multiselect";
import { SelectItem } from "primereact/selectitem";
import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { branchesAtom } from "../../service/Commons";
import ClassReceivingProps from "./commons/ClassReceivingProps";
import EditBranchesDialog from "./EditBranchesDialog";
import { Button } from "primereact/button";

const defaultBranchOptions: SelectItem[] = JSON.parse(import.meta.env.VITE_DEFAULT_BRANCHES)

function getStoredBranchOptions() {
    const storedJson = localStorage.getItem("branch-options");
    if (storedJson) {
        return JSON.parse(storedJson) as SelectItem[];
    } else {
        return undefined;
    }
}

export const branchOptionsAtom = atom<SelectItem[]>({
    key: "branchOptions",
    default: getStoredBranchOptions() || defaultBranchOptions
});

export default function BranchesDropdown(props: ClassReceivingProps) {
    const branchOptions = useRecoilValue(branchOptionsAtom);
    const [selectedBranches, setSelectedBranches] = useState([branchOptions[0].value]);
    const setBranchesAtom = useSetRecoilState(branchesAtom);
    const [showEditDialog, setShowEditDialog] = useState(false);

    useEffect(() => {
        setBranchesAtom(selectedBranches);
    }, [selectedBranches])

    useEffect(() => {
        setSelectedBranches(previous => branchOptions.filter(opt => previous.includes(opt.value)).map(opt => opt.value));
    }, [branchOptions])

    return (
        <div id="branches-dropdown">
            <div className="flex flex-row justify-content-end gap-0 align-items-strech">
                <MultiSelect
                    style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderRightWidth: 0
                    }}
                    className={props.className}
                    options={branchOptions}
                    value={selectedBranches}
                    onChange={e => setSelectedBranches(e.value)}
                />
                <Button style={{
                    width: "2rem",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                }} className="border-none" size="small" icon="pi pi-pencil" onClick={() => setShowEditDialog(true)} />
            </div>
            <EditBranchesDialog onHide={() => { setShowEditDialog(false) }} visible={showEditDialog} />
        </div>
    )
}