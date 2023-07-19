import { useRecoilValue } from "recoil";
import { fetchMrErrorAtom } from "../../service/Commons";

export default function () {
    let key = 0;
    const errors = useRecoilValue(fetchMrErrorAtom);

    function renderError(e: Error) {
        return (
            <div className="text-yellow-500 white-space-pre flex flex-column gap-2 text-center" key={key++}>
                <img src="/warning.svg" alt="warning-icon" height={100} className="opacity-50" />
                <span>{e.message}</span>
            </div>
        )
    }

    return errors.map(renderError)
}