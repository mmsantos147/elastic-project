import { forwardRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { LoggedMenuContent } from "../LoggedMenuContent";

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
        backgroundColor: "rgb(32, 32, 32)",
        zIndex: 9999999,
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 10px 30px rgb(0, 0, 0)",
        width: "300px"
      }}
    >
      <LoggedMenuContent />
    </div>,
    document.body
  );
});
