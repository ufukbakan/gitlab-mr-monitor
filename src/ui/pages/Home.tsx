import FetchErrors from "../components/FetchErrors";
import HowTo from "../components/HowTo";
import MergeRequestTable from "../components/MergeRequestTable";
import TopLeftNav from "../components/TopLeftNav";
import TopRightNav from "../components/TopRightNav";

export default function () {
    return (
        <>
            <div className="flex w-full p-4 justify-content-between">
                <div className="top-left">
                    <TopLeftNav />
                </div>

                <div className="top-right">
                    <TopRightNav />
                </div>

            </div>

            <MergeRequestTable />
            <FetchErrors />
            <HowTo />
        </>
    )
}
