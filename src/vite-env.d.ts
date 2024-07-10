/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BUILD_DIR: string;
    readonly VITE_API_URL: string;
    readonly VITE_AUTH_PROVIDER: string;
    readonly VITE_MR_SCOPE: string;
    readonly VITE_DEFAULT_BRANCHES: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}