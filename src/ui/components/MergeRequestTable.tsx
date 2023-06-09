import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRecoilValue } from "recoil";
import { mergeRequestsAtom, projectsAtom } from "../../service/Commons";
import { MergeRequest } from "../../service/types";
import StatusCircle from "../elements/StatusCircle";

export default function () {
    const mergeRequests = useRecoilValue(mergeRequestsAtom);
    const projects = useRecoilValue(projectsAtom);

    return (
        <DataTable value={mergeRequests}>
            <Column
                field="state"
                header="State"
                sortable
                style={{ width: "2rem" }}
                body={(mr: MergeRequest) => <StatusCircle status={mr.draft && mr.state != "closed" ? "draft" : mr.state} />}
            />
            <Column
                field="project_id"
                header="Project"
                sortable
                filter
                body={(mr: MergeRequest) => projects.find(p => p.id == mr.project_id)?.name || mr.project_id}
            />
            <Column field="title" header="Title" sortable filter />
            <Column field="author.name" header="Author" sortable filter />
            <Column
                field="target_brach"
                header="Branch"
                sortable
                body={(mr: MergeRequest) => (
                    <div className="flex align-items-center justify-content-start gap-2">
                        <div>{mr.source_branch}</div> <i className="pi pi-arrow-right" /><div>{mr.target_branch}</div>
                    </div>
                )}
            />
            <Column
                field="url"
                header="Link"
                body={(mr: MergeRequest) => <Button link icon="pi pi-external-link text-xl" onClick={() => open(mr.web_url, "_blank")} />}
            />
        </DataTable>
    )
}