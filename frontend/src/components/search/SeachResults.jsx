import { Divider, Row } from "antd";
import IAVision from "../results/IAVision";
import IAVisionAbstractSkeleton from "../results/IAVisionSkeleton";
import SearchIndexSkeleton from "../results/SearchIndexSkeleton";
import SearchIndex from "../results/SearchIndex";
import COLORS from "../../colors";
import { useSearchData } from "../../context/SearchContext";

const SearchResults = () => {
  const { isProcessingAiAbstract, isProcessingRequest, searchResults, currentRequestId } = useSearchData()


  return (
    <>
      {!isProcessingAiAbstract ? (
        <IAVision style={{ marginBottom: "50px" }} />
      ) : (
        <IAVisionAbstractSkeleton style={{ marginBottom: "50px" }} />
      )}
      
      <Divider style={{ borderColor: COLORS.gray }} />
      
      {isProcessingRequest ? (
        <>
          <SearchIndexSkeleton />
          <SearchIndexSkeleton />
          <SearchIndexSkeleton />
        </>
      ) : (
        <Row>
          {searchResults.results.map((result) => (
            <SearchIndex
              key={result.id}
              content={result}
            />
          ))}
        </Row>
      )}
    </>
  );
};

export default SearchResults;