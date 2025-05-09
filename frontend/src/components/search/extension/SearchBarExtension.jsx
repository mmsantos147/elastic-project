import { Divider } from "antd";
import COLORS from "../../../colors";
import SearchButtonExtension from "./SearchButtonExtension";
import { useTranslation } from "react-i18next";
import { useSearchBarData } from "../../../context/SearchBarContext";
import { SearchBarExtensionElement } from "./SearchBarExtensionElement";
import { CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";


const SearchBarExtensionWrapper = styled.div`
  width: 100%;
  display: block;
  background-color: rgb(48, 49, 52);
  z-index: 9999;
  position: absolute;
  text-align: left;
  border-radius: 0 0 20px 20px;
`

export const SearchBarExtension = () => {
  const { inputValue, inputOnFocus, historyContent, suggestionContent } = useSearchBarData();
  const { t } = useTranslation();

  if (!inputOnFocus) return null;

  if (inputValue.length === 0)
    return (
      <SearchBarExtensionWrapper>
        <Divider
          orientation="left"
          style={{
            marginTop: 0,
            borderColor: COLORS.gray,
            color: COLORS.gray,
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          {t("recent_searches")}
        </Divider>
        {historyContent.map((query) => (
          <SearchBarExtensionElement key={query.id} query={query.content}>
            <CloseOutlined />
          </SearchBarExtensionElement>
        ))}
        <SearchButtonExtension />
      </SearchBarExtensionWrapper>
    );
  
  if (suggestionContent.suggestions.length > 0)
    return (
      <SearchBarExtensionWrapper>
        <Divider
          orientation="left"
          style={{
            marginTop: 0,
            borderColor: COLORS.gray,
            color: COLORS.gray,
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          {t("search_suggested")}
        </Divider>
        {suggestionContent.suggestions.map((query) => (
          <SearchBarExtensionElement key={query} query={query} />

        ))}
        <SearchButtonExtension />
      </SearchBarExtensionWrapper>
    );
};
