import { forwardRef } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import Keyboard from "react-simple-keyboard";
import { useSearchBarData } from "../../context/SearchBarContext";

const KeyboardWrapper = styled.div`
  margin-top: 10px;
  position: absolute;
  z-index: 99999;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    left: 0;
    right: 0;
  }

  @media (max-width: 480px) {
    .hg-button {
      height: 30px;
      font-size: 12px;
    }
  }

  .simple-keyboard .hg-button {
    color: black !important;
    background: white;
  }

  .simple-keyboard .hg-button:active {
    background: #e6e6e6;
  }
`;

export const VirtualKeyboard = ({}) => {
  const isMobile = window.innerWidth <= 768;
  const { setInputValue } = useSearchBarData();
  return (
      <KeyboardWrapper >
        <Keyboard
          onKeyPress={(button) => {
            if (button === "{bksp}") {
              setInputValue((prev) => prev.slice(0, -1));
            } else if (button === "{space}") {
              setInputValue((prev) => prev + " ");
            } else if (button.startsWith("{")) {
            } else {
              setInputValue((prev) => prev + button);
            }
          }}
          layoutName="default"
          display={{
            "{bksp}": isMobile ? "⌫" : "Backspace",
            "{enter}": isMobile ? "↵" : "Enter",
            "{space}": isMobile ? "" : "Space",
            "{tab}": isMobile ? "Tab" : "Tab",
            "{lock}": isMobile ? "Caps" : "Caps Lock",
            "{shift}": isMobile ? "Shift" : "Shift",
          }}
        />
      </KeyboardWrapper>
  );
};
