import { Divider } from "antd";
import COLORS from "../../../colors";
import SearchButtonExtension from "./SearchButtonExtension";
import { useTranslation } from "react-i18next";
import { SearchBarExtensionElement } from "./SearchBarExtensionElement";
import { CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useSearchData } from "../../../context/SearchContext";
import { useHistoryService } from "../../../api/History.api";


const SearchBarExtensionWrapper = styled.div`
  width: 100%;
  display: block;
  background-color: rgb(48, 49, 52);
  z-index: 9999;
  position: absolute;
  text-align: left;
  border-radius: 0 0 20px 20px;
`

const DividerStyled = styled(Divider)`
  margin-top: 0 !important;
  border-color: ${COLORS.gray};
  color: ${COLORS.gray};
  padding-left: 20px;
  padding-right: 20px;
`

export const SearchBarExtension = () => {
  const { inputValue, inputOnFocus, historyContent, suggestionContent, deleteFromHistoryComponent } = useSearchData();
  const { deleteItemFromHistory } = useHistoryService();
  const { t } = useTranslation();

  if (!inputOnFocus) return null;

  if (inputValue.length === 0 && historyContent.length > 0)
    return (
      <SearchBarExtensionWrapper>
        <DividerStyled
          orientation="left"
        >
          {t("recent_searches")}
        </DividerStyled>
        {historyContent.map((query) => (
          <SearchBarExtensionElement key={query.id} query={query.content}>
            <CloseOutlined onClick={(e) => {deleteItemFromHistory(query.id); deleteFromHistoryComponent(query.id); e.stopPropagation();}} />
          </SearchBarExtensionElement>
        ))}
        <SearchButtonExtension />
      </SearchBarExtensionWrapper>
    );
  
  if (suggestionContent.length > 0)
    return (
      <SearchBarExtensionWrapper>
        <DividerStyled
          orientation="left"
        >
          {t("search_suggested")}
        </DividerStyled>
        {suggestionContent.map((query) => (
          <SearchBarExtensionElement key={query} query={query} />

        ))}
        <SearchButtonExtension />
      </SearchBarExtensionWrapper>
    );
};
