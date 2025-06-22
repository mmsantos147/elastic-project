import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";

export const useAiService = () => {
  const { makeRequest } = useContext(ApiContext);

  const makeResume = async (content) => makeRequest("post", "/ai", content);

    return { makeResume };
};
