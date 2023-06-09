import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import TopRightNav from "./ui/components/TopRightNav";
import MergeRequestTable from "./ui/components/MergeRequestTable";

function App() {

  return (
    <>
      <div className="flex w-full p-4 justify-content-between">
        <div className="top-left">
          <img src="/gitlab.svg" id="logo" />
          <h1 className="text-700">Merge Requests</h1>
        </div>

        <div className="top-right">
          <TopRightNav />
        </div>

      </div>

      <MergeRequestTable />
    </>
  )
}

export default App
