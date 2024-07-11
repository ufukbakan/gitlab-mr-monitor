export default function HelpComponent() {
    return (
        <>
            <h2 className="mb-1 mt-0">How to install on-premise</h2>
            <ol>
                <li>Clone project from <a href="https://github.com/ufukbakan/gitlab-mr-monitor" target="_blank">https://github.com/ufukbakan/gitlab-mr-monitor</a></li>
                <li>You can edit source code to change base url, branches and scope
                    <br />
                    If you want to do so open project via any text editor.
                    Look for the <u>.env</u> file, it will help you to find api configs.
                </li>
                <li>Install dependencies via your package manager. (e.g. npm install)</li>
                <li>You can then run 'dev' script or build and serve it as a standard React project.</li>
            </ol>
        </>
    )
}