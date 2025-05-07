import { Divider, Row } from "antd";
import IAVision from "../results/IAVision";
import IAVisionAbstractSkeleton from "../results/IAVisionSkeleton";
import SearchIndexSkeleton from "../results/SearchIndexSkeleton";
import SearchIndex from "../results/SearchIndex";
import COLORS from "../../colors";

const SearchResults = ({ processingRequest, aiAbstract, searchResult, currentRequestId }) => {
  const isValidAiAbstract = 
    aiAbstract && 
    Object.keys(aiAbstract).length > 0 && 
    aiAbstract.requestId === currentRequestId;

  return (
    <>
      {(!processingRequest && isValidAiAbstract) ? (
        <IAVision aiAbstract={aiAbstract} style={{ marginBottom: "50px" }} />
      ) : (
        <IAVisionAbstractSkeleton style={{ marginBottom: "50px" }} />
      )}
      
      <Divider style={{ borderColor: COLORS.gray }} />
      
      {searchResult.length === 0 && processingRequest ? (
        <>
          <SearchIndexSkeleton />
          <SearchIndexSkeleton />
          <SearchIndexSkeleton />
        </>
      ) : (
        <Row>
          {searchResult.map((result) => (
            <SearchIndex
              key={result.id}
              id={result.id}
              url={result.url}
              title={result.title}
              content={result.content}
              readingTime={result.reading_time}
              date={result.datetime}
            />
          ))}
        </Row>
      )}
    </>
  );
};

export default SearchResults;