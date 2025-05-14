import { createContext, useContext, useEffect, useState } from "react";
import { useHistoryService } from "../api/History.api";
import { useSearchService } from "../api/Search.api";
import { useNavigate, useLocation } from "react-router-dom";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchHistory } = useHistoryService();
  const { searchAsYouType, search } = useSearchService();

  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("q") || "";

  const [extensionVisible, setExtensionVisible] = useState(false);
  const [inputValue, setInputValue] = useState(initialSearch);
  const [inputOnFocus, setInputOnFocus] = useState(false);

  const [suggestionContent, setSuggestionContent] = useState([]);
  const [historyContent, setHistoryContent] = useState([]);

  const [isProcessingRequest, setIsProcessingRequest] = useState(true);

  const [isProcessingAiAbstract, setIsProcessingAiAbstract] = useState(true);
  const [aiAbstract, setAiAbstract] = useState(true);
  const [currentAiAbstract, setCurrenctAiAbstract] = useState({});

  const [currentRequestId, setCurrentRequestId] = useState();
  const [searchData, setSearchData] = useState({
    search: initialSearch,
    page: 1,
    resultsPerPage: 10,
    orderBy: "SCORE_DESC",
    maxReadTime: null,
    searchFor: "",
    minDateTime: "",
  });

  const [searchResults, setSearchResults] = useState({
    hits: 0,
    pages: 0,
    timeTaken: 0.0,
    results: [],
    requestId: "",
  });

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchHistory();
        if (!data.error) setHistoryContent(data);
      } catch {
        setHistoryContent([]);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    const searchAsYouTypeHandler = async () => {
      const data = await searchAsYouType({ query: inputValue });
      setSuggestionContent(data);
    };

    searchAsYouTypeHandler();
  }, [inputValue]);

  useEffect(() => {
    if (
      inputOnFocus &&
      ((historyContent.length > 0 && inputValue.length == 0) ||
        suggestionContent.length > 0)
    )
      setExtensionVisible(true);
    else setExtensionVisible(false);
  }, [historyContent.length, suggestionContent.length, inputOnFocus]);

  useEffect(() => {
    const es = new EventSource(`/v1/stream`);

    es.addEventListener("AiAbstract", (evt) => {
      try {
        setIsProcessingAiAbstract(true);
        console.log(evt.data);
        const data = JSON.parse(evt.data);
        console.log(data);
        setAiAbstract(data);
        setIsProcessingAiAbstract(false);
      } catch (err) {
        console.error("Erro parseando SSE:", err);
      }
    });

    return () => es.close();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSearchResults({
          hits: 0,
          pages: 0,
          timeTaken: 0.0,
          results: [],
          requestId: "",
        });

        setIsProcessingAiAbstract(true);
        setIsProcessingRequest(true);
        setAiAbstract({});
        const response = await search(searchData);
        setSearchResults(response);
        setCurrenctAiAbstract(response.requestId);
      } catch (error) {
        console.error("Erro ao buscar resultados:", error);
      } finally {
        setIsProcessingRequest(false);
      }
    };
    fetchData();
  }, [searchData]);

  useEffect(() => {
    navigate(
      { location: location.pathname, search: `?q=${searchData.search}` },
      { replace: true }
    );
  }, [searchData.search]);

  return (
    <SearchContext.Provider
      value={{
        extensionVisible,
        setExtensionVisible,

        inputValue,
        setInputValue,

        historyContent,
        setHistoryContent,

        suggestionContent,
        setSuggestionContent,

        inputOnFocus,
        setInputOnFocus,

        searchData,
        setSearchData,

        searchResults,
        isProcessingRequest,
        aiAbstract,
        currentRequestId,

        setIsProcessingAiAbstract,
        isProcessingAiAbstract,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchData = () => useContext(SearchContext);
