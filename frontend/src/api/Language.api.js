import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";


export const useLanguageService = () => {
    const { makeRequest } = useContext(ApiContext);

    const setLanguage = content => makeRequest("post", "/language", content);


    return { setLanguage };
}