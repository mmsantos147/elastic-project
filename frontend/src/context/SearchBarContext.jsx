import { createContext, useContext, useEffect, useState } from "react";
import { useHistoryService } from "../api/History.api";
import { useSearchService } from "../api/Search.api";

const SearchBarContext = createContext();

export const SearchBarProvider = ({ children }) => {
  const { fetchHistory } = useHistoryService();
  const { searchAsYouType } = useSearchService();
  const [extensionVisible, setExtensionVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputOnFocus, setInputOnFocus] = useState(false);
  
  const [suggestionContent, setSuggestionContent] = useState({suggestions:[]});
  const [historyContent, setHistoryContent] = useState([])

  useEffect(() => {
      const loadHistory = async () => {
        try {
          const data = await fetchHistory();
          if (!data.error)
            setHistoryContent(data);
          
        } catch {
          setHistoryContent([]);
        }
      };
      loadHistory();
    }, []);

  useEffect(() => {
    const searchAsYouTypeHandler = async () => {
      const data = await searchAsYouType({query: inputValue})
      setSuggestionContent(data)
    }

    searchAsYouTypeHandler();
  }, [inputValue])

  useEffect(() => {
    if (inputOnFocus && ((historyContent.length > 0 && inputValue.length == 0) || suggestionContent.suggestions.length > 0))
      setExtensionVisible(true);
    else 
      setExtensionVisible(false);
  }, [historyContent.length, suggestionContent.suggestions.length, inputOnFocus]);

  return (
    <SearchBarContext.Provider
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
        setInputOnFocus
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBarData = () => useContext(SearchBarContext);
