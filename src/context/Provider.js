import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(URL);
      const { results } = await response.json();
      setData(results);
    }
    getPlanets();
  }, []);
  const contextValue = { data };
  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default Provider;