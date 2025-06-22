import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useHistoryService } from "../api/History.api";
import { useSearchService } from "../api/Search.api";
import { useNavigate, useLocation } from "react-router-dom";
import { useAiService } from "../api/AI.api";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchHistory } = useHistoryService();
  const { searchAsYouType, search } = useSearchService();
  const { makeResume } = useAiService(); 
  const isInitialMount = useRef(true);

  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("q") || "";

  const [extensionVisible, setExtensionVisible] = useState(false);
  const [inputValue, setInputValue] = useState(initialSearch);
  const [inputOnFocus, setInputOnFocus] = useState(false);

  const [suggestionContent, setSuggestionContent] = useState([]);
  const [historyContent, setHistoryContent] = useState([]);

  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  const [isProcessingAiAbstract, setIsProcessingAiAbstract] = useState(false);
  const [aiAbstract, setAiAbstract] = useState({});

  const [currentRequestId, setCurrentRequestId] = useState();

  const [isIndexMenuOpen, setIsIndexMenuOpen] = useState(false);
  const [indexMenuContent, setIndexMenuContent] = useState({});

  const [whyIndexContent, setWhyIndexContent] = useState([]);
  
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

  const deleteFromHistoryComponent = (id) => {
    setHistoryContent(historyContent.filter(item => item.id !== id))
  }

  const loadHistory = async () => {
    try {
      const data = await fetchHistory();
      if (!data.error) setHistoryContent(data);
    } catch {
      setHistoryContent([]);
    }
  };

  useEffect(() => {
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
  }, [historyContent.length, suggestionContent.length, inputOnFocus, inputValue]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (initialSearch) {
        executeSearch();
      }
      return;
    }

    executeSearch();
  }, [searchData]);

  useEffect(() => {
    if (!isInitialMount.current) {
      navigate(
        { pathname: location.pathname, search: `?q=${searchData.search}` },
        { replace: true }
      );
    }
  }, [searchData.search]);

  useEffect(() => {
    setIsProcessingAiAbstract(true)
    if (searchResults && searchResults.results.length > 3) {
      const result = makeResume({
        content_1: "title: " + searchResults.results[0].title + "| url: " + searchResults.results[0].url + "| content: " + searchResults.results[0].content,
        content_2: "title: " + searchResults.results[1].title + "| url: " + searchResults.results[1].url + "| content: " + searchResults.results[1].content,
        content_3: "title: " + searchResults.results[2].title + "| url: " + searchResults.results[2].url + "| content: " + searchResults.results[2].content
      
      })
      setAiAbstract(JSON.parse(result));
      setIsProcessingAiAbstract(false);
    }
    
  }, [searchResults]);

  const executeSearch = async () => {
    try {
      setIsProcessingRequest(true);
      setIsProcessingAiAbstract(true);
      setAiAbstract({});
      
      const response = await search(searchData);
      
      setSearchResults(response);
      setCurrentRequestId(response.requestId);
      
      await loadHistory();

    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    } finally {
      setIsProcessingRequest(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        extensionVisible,
        setExtensionVisible,

        inputValue,
        setInputValue,

        historyContent,
        setHistoryContent,
        deleteFromHistoryComponent,

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

        isIndexMenuOpen,
        setIsIndexMenuOpen,

        indexMenuContent,
        setIndexMenuContent,
        
        executeSearch, 

        setWhyIndexContent,
        whyIndexContent
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchData = () => useContext(SearchContext);