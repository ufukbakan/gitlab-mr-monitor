import { MergeRequestState } from "./StatesDropdown"

export default function(props: { status: MergeRequestState | "draft" }){
    return (
        <div className="p-3 flex justify-content-center">
            <div className={`circle ${props.status}`}></div>
        </div>
    )
}