import { Row } from "antd";
import styled from "styled-components";
import COLORS from "../../../colors";
import { forwardRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { LoggedMenuContent } from "../LoggedMenuContent";

const MenuItem = styled(Row)`
  padding: 15px;
  background-color: rgb(31, 31, 31);
  margin-top: 4px;
  color: ${COLORS.white};
  text-decoration: none;

  &:hover {
    background-color: rgba(31, 31, 31, 0.47);
    cursor: pointer;
  }
`;

export const DesktopMenuContent = forwardRef(({ visible, onClose, topDistanceAdd }, ref) => {
  
    useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: topDistanceAdd || "55px",
        right: "10px",
        backgroundColor: "rgb(23, 23, 23)",
        zIndex: 9999999,
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "300px",
        height: "400px",
      }}
    >
      <LoggedMenuContent />
    </div>,
    document.body
  );
});
