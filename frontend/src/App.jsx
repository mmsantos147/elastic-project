import React from "react";

import { ApiProvider } from "./context/ApiContext";
import { useMakeRequest } from "./api/MakeRequest";

import AppContent from "./AppContent";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n";


const App = () => {
  const { makeRequest, contextHolder } = useMakeRequest();

  return (
    <I18nextProvider i18n={i18n}>
      <ApiProvider makeRequest={makeRequest} contextHolder={contextHolder}>
        {contextHolder}
        <AppContent />
      </ApiProvider>
    </I18nextProvider>
  );
};

export default App;
