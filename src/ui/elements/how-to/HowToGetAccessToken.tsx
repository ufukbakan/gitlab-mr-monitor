export default function HowToGetAccessTokenComponent() {
    return (
        <>
            <h2 className="mb-1 mt-0">How to get an access token</h2>
            <ol>
                <li>Sign in to your GitLab account</li>
                <li>Click on your user <u>profile picture</u></li>
                <li>Go to <u>Preferences</u></li>
                <li>Go to <u>Acces Tokens</u> page via side bar</li>
                <li>Under the section <u>Add a personal access token</u>; give it a name, define expiration date and <u>read_api permission</u></li>
                <li>Scroll down a little bit to click on <u>Create personal access token</u> button</li>
                <li>After creating it, access token is just below heading <u>Your new personal access token</u></li>
                <li>Copy it and save at somewhere safe because you won't be able to reread your access token, you can only delete it.</li>
            </ol>
        </>
    )
}