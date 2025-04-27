import React, { createContext } from 'react';

export const ApiContext = createContext({
  makeRequest: () => {
    throw new Error('makeRequest não foi inicializado');
  },
});

export const ApiProvider = ({ makeRequest, contextHolder, children }) => (
  <ApiContext.Provider value={{ makeRequest }}>
    {contextHolder}
    {children}
  </ApiContext.Provider>
);
