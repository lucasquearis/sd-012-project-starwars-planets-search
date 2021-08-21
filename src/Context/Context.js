import React, { createContext, useState, useEffect } from 'react';
import { node } from 'prop-types';

export const context = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((response) => response.json());
      setData(results);
    };
    getPlanets();
  }, []);
  const contextValue = { data, setData };
  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
};

ContextProvider.propTypes = {
  children: node.isRequired,
};
