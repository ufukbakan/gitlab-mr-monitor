import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import TopRightNav from "./ui/components/TopRightNav";
import MergeRequestTable from "./ui/components/MergeRequestTable";
import TopLeftNav from "./ui/components/TopLeftNav";
import HowTo from "./ui/components/HowTo";

function App() {

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
      <HowTo />
    </>
  )
}

export default App
