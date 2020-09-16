import React, { createContext, useContext, useReducer } from "react";

/* 1- Create the context*/
const DataLayerContext = createContext();

/* 2- Create the data layer component */

export const DataLayer = ({ initialState, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

/* 3- Make it accecible  for other componenet */

export const useDataLayer = () => useContext(DataLayerContext);
