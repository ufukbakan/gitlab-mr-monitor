/// <reference types="vite/client" />

import { MergeRequestScope } from "./service/types";

interface ImportMetaEnv {
    readonly BUILD_DIR: string;
    readonly VITE_API_URL: string;
    readonly VITE_AUTH_PROVIDER: string;
    readonly VITE_MR_SCOPE: MergeRequestScope;
    readonly VITE_DEFAULT_BRANCHES: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}