import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { APP_NAME_CAMMEL_CASE } from "../../constants";
import { FaKeyboard, FaMicrophone } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import SearchHistory from "./SearchHistory";

const SearchBar = () => {
  const [historyVisibile, setHistoryVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setHistoryVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={inputRef}
      style={{
        width: "40%",
        maxWidth: "600px",
        minWidth: "300px",
        marginBottom: "30px",
        
      }}
    >
      <Input
        size="large"
        placeholder={`Pesquise no ${APP_NAME_CAMMEL_CASE} ou digite uma URL`}
        prefix={
          <SearchOutlined style={{ color: "#9aa0a6", paddingLeft: "7px", marginRight: '10px' }} />
        }
        suffix={
          <>
            <FaKeyboard
              style={{
                color: "#9aa0a6",
                paddingRight: "7px",
                fontSize: "25px",
              }}
            />
            <FaMicrophone
              style={{
                color: "#9aa0a6",
                paddingRight: "10px",
                fontSize: "22px",
              }}
            />
          </>
        }
        style={{
          borderRadius: historyVisibile ? "30px 30px 0 0px" : "999px",
          backgroundColor: "#303134",
          color: "#e8eaed",
          border: "0px",
          padding: "10px",
        }}
        onClick={() => {setHistoryVisible(true)}}
      />
      <SearchHistory visible={historyVisibile}/>
    </div>
  );
};

export default SearchBar;
