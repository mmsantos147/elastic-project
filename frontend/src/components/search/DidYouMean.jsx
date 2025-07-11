import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import COLORS from "../../colors";
import { useSearchData } from "../../context/SearchContext";

const DidYouMeanBox = styled.div`
  margin-bottom: 30px;
  font-size: 18px;
`;

const SuggestionLink = styled.a`
  color: ${COLORS.purple};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const WrongWord = styled.strong`
  font-style: italic;
`;

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export const DidYouMean = () => {
  const { searchData, searchResults } = useSearchData();
  const suggestions = searchResults.suggestions;
  const { t, i18n } = useTranslation();

  const hasAnyOption = suggestions.some((s) => s.option);
  if (!hasAnyOption) return null;
  const searchedFor = searchData.search;

  const ordered = [...suggestions].sort((a, b) => a.offset - b.offset);

  const correctedText = ordered
    .map((s) => (s.option ? s.option : s.text))
    .join(" ");

  const nodes = ordered.map((s, idx) => {
    let word = s.option ?? s.text;
    if (idx == 0)
      word = capitalizeFirstLetter(word)
    const element = s.option ? (
      <WrongWord key={idx}>{word}</WrongWord>
    ) : (
      <React.Fragment key={idx}>{word}</React.Fragment>
    );
    return idx < ordered.length - 1 ? [element, " "] : element;
  });

  return (
    <DidYouMeanBox>
      {i18n.language == 'es' && "¿"}
      {t("did_you_mean")}{" "}
      <SuggestionLink href={`/search?q=${encodeURIComponent(correctedText)}`}>
        {nodes}
      </SuggestionLink>{" "}
      ?
    </DidYouMeanBox>
  );
};
