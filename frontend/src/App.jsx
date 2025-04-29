import React from "react";

import { ApiProvider } from "./context/ApiContext";
import { useMakeRequest } from "./api/MakeRequest";

import AppContent from "./AppContent";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n";


const App = () => {
  const { makeRequest, contextHolder } = useMakeRequest();

  return (
      <ApiProvider makeRequest={makeRequest} contextHolder={contextHolder}>
        {contextHolder}
        <AppContent />
      </ApiProvider>
  );
};

export default App;
