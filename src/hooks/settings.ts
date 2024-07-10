import { useRecoilState } from "recoil";
import { apiUrlAtom, authProviderAtom, mrScopeAtom } from "../service/Commons";

export function useApiUrl(){
    return useRecoilState(apiUrlAtom);
}

export function useAuthProvider(){
    return useRecoilState(authProviderAtom);
}

export function useMrScope(){
    return useRecoilState(mrScopeAtom);
}