import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useApiUrl, useAuthProvider, useMrScope } from "../../hooks/settings";
import debounce from "debounce";

export default function GlobalSettings() {

    const [apiUrl, _setApiUrl] = useApiUrl();
    const [authProvider, _setAuthProvider] = useAuthProvider();
    const [mrScope, _setMrScope] = useMrScope();

    const setApiUrl = debounce(_setApiUrl, 700);
    const setAuthProvider = debounce(_setAuthProvider, 700);
    const setMrScope = debounce(_setMrScope, 700);

    return (
        <form>
            <span className="p-float-label my-5">
                <InputText
                    id="api-url"
                    defaultValue={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                />
                <label htmlFor="api-url">
                    API URL
                </label>
            </span>
            <span className="p-float-label my-5">
                <InputText
                    id="auth-provider"
                    defaultValue={authProvider}
                    onChange={(e) => setAuthProvider(e.target.value)}
                />
                <label htmlFor="auth-provider">
                    AUTH PROVIDER
                </label>
            </span>

            <span className="p-float-label my-5">
                <Dropdown
                    inputId="mr-scope"
                    options={["created_by_me", "assigned_to_me", "all"]}
                    value={mrScope}
                    onChange={(e) => setMrScope(e.value)}
                />
                <label htmlFor="mr-scope">
                    MR SCOPE
                </label>
            </span>
        </form>
    )

}