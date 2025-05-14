import React, { useEffect, useState } from "react";
import Layout from "antd/es/layout/layout";
import { Grid } from "antd";
import COLORS from "../colors";
import FilterBar from "../components/FilterBar";
import SearchResults from "../components/search/SeachResults";
import PageSelect from "../components/search/PageSelect";
import EmptyResults from "../components/search/EmptyResults";
import emitter from "../eventBus";
import { useAuthService } from "../api/Authorization.api";
import { DidYouMean } from "../components/search/DidYouMean";
import SearchHeader from "../components/header/SearchHeader";
import { IndexMenu } from "../components/results/IndexMenu/IndexMenu";
import { useSearchData } from "../context/SearchContext";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const Search = () => {
  const { searchResults, isProcessingRequest } = useSearchData();
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const [toolsVisible, setToolsVisible] = useState(false);

  return (<>
      <SearchHeader
        toolsVisible={toolsVisible}
        setToolsVisible={setToolsVisible}
      />

      {toolsVisible && (
        <FilterBar />
      )}
      <Content
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Content
          style={{
            paddingLeft: isMobile ? "15px" : "220px",
            paddingRight: isMobile ? "15px" : "0",
            marginTop: isMobile ? "15px" : "30px",
            color: COLORS.white,
            maxWidth: isMobile ? "100%" : "950px",
          }}
        >

          {searchResults?.suggestions && <DidYouMean />}
          {(
            Array.isArray(searchResults?.results) && searchResults.results.length > 0) || isProcessingRequest ? (
            <>
              <SearchResults/>
              <PageSelect />
            </>
          ) : (
            <EmptyResults />
          )}
        </Content>

        {/* <IndexMenu /> */}
      </Content>
      </>
  );
};

export default Search;
