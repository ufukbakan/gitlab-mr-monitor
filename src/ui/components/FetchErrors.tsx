import { useRecoilValue } from "recoil";
import { fetchMrErrorAtom, useAccessToken } from "../../service/Commons";

export default function () {
    let key = 0;
    const errors = useRecoilValue(fetchMrErrorAtom);
    const { accessToken } = useAccessToken();

    function renderError(e: Error) {
        return (
            <div className="text-yellow-500 white-space-pre flex flex-column gap-2 text-center" key={key++}>
                <img src="/warning.svg" alt="warning-icon" height={100} className="opacity-50" />
                <span>{e.message}</span>
            </div>
        )
    }

    function renderLoginMessage() {
        return (
            <div className="text-yellow-500 white-space-pre flex flex-column gap-2 text-center">
                <img src="/warning.svg" alt="warning-icon" height={100} className="opacity-50" />
                <span>You should sign in or paste an access token to the input box which is placed at the top right corner</span>
            </div>
        )
    }

    return accessToken ? errors.map(renderError) : renderLoginMessage()
}