import React from "react";

import { ApiProvider } from "./context/ApiContext";
import { useMakeRequest } from "./api/MakeRequest";

import AppContent from "./AppContent";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const { makeRequest, contextHolder } = useMakeRequest();



  return (
    <ApiProvider makeRequest={makeRequest} contextHolder={contextHolder}>
      <AuthProvider>
        {contextHolder}
        <AppContent />
      </AuthProvider>
    </ApiProvider>
  );
};

export default App;
