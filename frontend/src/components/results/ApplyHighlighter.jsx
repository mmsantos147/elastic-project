import React from "react";

const formatBold = (text) => {
    const parts = text.split(/(\*\*.+?\*\*)/g);
  
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

export const ApplyHighlighter = ({text}) => {
    return <>{formatBold(text)}</>;
}