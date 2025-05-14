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

const SuggestionLink = styled(Link)`
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

export const DidYouMean = () => {
  const { searchResults } = useSearchData();
  const suggestions = searchResults.suggestions;
  const { t, i18n } = useTranslation();

  const hasAnyOption = suggestions.some((s) => s.option);
  if (!hasAnyOption) return null;

  const ordered = [...suggestions].sort((a, b) => a.offset - b.offset);

  const correctedText = ordered
    .map((s) => (s.option ? s.option : s.text))
    .join(" ");

  const nodes = ordered.map((s, idx) => {
    const word = s.option ?? s.text;
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
      <SuggestionLink to={`/search?q=${encodeURIComponent(correctedText)}`}>
        {nodes}
      </SuggestionLink>{" "}
      ?
    </DidYouMeanBox>
  );
};
