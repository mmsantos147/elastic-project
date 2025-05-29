import React from "react";

const formatBold = (text, onHighlight) => {
    const parts = text.split(/(\*\*.+?\*\*)/g);
  
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        if (typeof onHighlight == 'function') {
          onHighlight(part.slice(2, -2))  
        }
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

export const ApplyHighlighter = ({text, onHighlight}) => {
    return <>{formatBold(text, onHighlight)}</>;
}