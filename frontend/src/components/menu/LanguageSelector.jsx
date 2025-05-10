import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLanguageService } from "../../api/Language.api";
import mitt from "mitt";
import emitter from "../../eventBus";

const languages = [
  { code: "pt", name: "Português", countryCode: "BR" },
  { code: "en", name: "English", countryCode: "US" },
  { code: "es", name: "Español", countryCode: "ES" },
  { code: "fr", name: "Français", countryCode: "FR" },
  { code: "de", name: "Deutsch", countryCode: "DE" },
  { code: "it", name: "Italiano", countryCode: "IT" },
  { code: "ja", name: "日本語", countryCode: "JP" },
  { code: "zh", name: "中文", countryCode: "CN" },
  { code: "ru", name: "Русский", countryCode: "RU" },
  { code: "ar", name: "العربية", countryCode: "SA" },
  { code: "ko", name: "한국어", countryCode: "KR" },
  { code: "hi", name: "हिन्दी", countryCode: "IN" },
  { code: "tr", name: "Türkçe", countryCode: "TR" },
  { code: "nl", name: "Nederlands", countryCode: "NL" },
  { code: "sv", name: "Svenska", countryCode: "SE" },
  { code: "pl", name: "Polski", countryCode: "PL" },
  { code: "uk", name: "Українська", countryCode: "UA" },
  { code: "he", name: "עברית", countryCode: "IL" },
  { code: "vi", name: "Tiếng Việt", countryCode: "VN" },
  { code: "th", name: "ไทย", countryCode: "TH" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { setLanguage } = useLanguageService();

  const [currentLang, setCurrentLang] = useState(() =>
    languages.find((l) => l.code === i18n.language) || languages[0]
  );

  useEffect(() => {
    const selected = languages.find((l) => l.code === i18n.language);
    if (selected) setCurrentLang(selected);
    Cookies.set("language", i18n.language, { expires: 365 });
    emitter.emit("new-ai-request");
  }, [i18n.language]);

  const handleMenuClick = ({ key }) => {
    i18n.changeLanguage(key);
    setLanguage({"language": key});
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {languages.map((lang) => (
        <Menu.Item key={lang.code}>
          <ReactCountryFlag
            countryCode={lang.countryCode}
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
              marginRight: "10px",
            }}
          />
          {lang.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      dropdownRender={(menu) => (
        <div style={{ maxHeight: "250px", overflowY: "auto" }}>{menu}</div>
      )}
    >
      <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
        <DownOutlined style={{ color: "white", marginRight: "10px" }} />
        <ReactCountryFlag
          countryCode={currentLang.countryCode}
          svg
          style={{
            width: "2em",
            height: "2em",
          }}
        />
      </div>
    </Dropdown>
  );
};

export default LanguageSelector;
