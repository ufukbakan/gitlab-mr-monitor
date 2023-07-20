import { Button } from "primereact/button";
import { Dialog, DialogProps } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { SelectItem } from "primereact/selectitem";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { clone } from "../../utils/ObjectUtils";
import { branchOptionsAtom } from "./BranchesDropdown";

export default function (props: DialogProps) {

    const [branchOptions, setBranchOptions] = useRecoilState(branchOptionsAtom);
    const [editedBranchOptions, setEditedBranchOptions] = useState<SelectItem[]>(clone(branchOptions));

    function renderInputsForBranchOption(option: SelectItem, index: number) {
        function onLabelChange(e: ChangeEvent<HTMLInputElement>) {
            const newOptions = [...editedBranchOptions];
            const target = newOptions[index];
            target.label = e.target.value;
            setEditedBranchOptions(newOptions);
        }

        function onValueChange(e: ChangeEvent<HTMLInputElement>) {
            const newOptions: SelectItem[] = [...editedBranchOptions];
            const target = newOptions[index];
            target.value = e.target.value;
            setEditedBranchOptions(newOptions);
        }

        function remove() {
            const newOptions: SelectItem[] = editedBranchOptions.filter((_, i) => i != index);
            setEditedBranchOptions(newOptions);
        }

        return (
            <div className="grid p-2 gap-4" key={index}>
                <InputText className="col-4" value={option.label} onChange={onLabelChange} />
                <InputText className="col-4" value={option.value} onChange={onValueChange} />
                <Button type="button" onClick={remove} className="col-2" severity="danger" label="Remove" />
            </div>
        )
    }

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        const newBranchOptions = clone(editedBranchOptions);
        setBranchOptions(newBranchOptions);
        localStorage.setItem("branch-options", JSON.stringify(newBranchOptions));
        props.onHide();
    }

    function cancelAndExit() {
        setEditedBranchOptions(clone(branchOptions));
        props.onHide();
    }

    function addBranch() {
        setEditedBranchOptions([...editedBranchOptions, {
            label: "",
            value: ""
        }]);
    }

    function renderInputs() {
        return editedBranchOptions.map(renderInputsForBranchOption);
    }

    function renderAdder() {
        return (
            <div className="grid mt-4 justify-content-center">
                <Button className="col-6" type="button" label="Add" severity="success" onClick={addBranch} />
            </div>
        )
    }

    return (
        <Dialog {...props} onHide={cancelAndExit}>
            <form onSubmit={onSubmit}>
                <div className="grid p-2 gap-4">
                    <div className="col-4 text-center"><b>Branch Label</b></div>
                    <div className="col-4 text-center"><b>Actual Branch Name</b></div>
                    <div className="col-2 text-center"><b>Action</b></div>
                </div>
                {renderInputs()}
                {renderAdder()}

                <div className="grid mt-4 p-2 gap-4">
                    <Button className="col" type="button" label="Cancel" severity="secondary" onClick={cancelAndExit} />
                    <Button className="col" type="submit" label="Save" />
                </div>
            </form>
        </Dialog>
    )
}