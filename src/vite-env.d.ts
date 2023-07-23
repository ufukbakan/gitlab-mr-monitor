/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BUILD_DIR: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}