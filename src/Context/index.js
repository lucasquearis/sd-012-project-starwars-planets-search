import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);

export default function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });

  useEffect(() => {
    const getPlanets = async () => {
      const PLANETS_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const fetching = await fetch(PLANETS_URL);
      const { results } = await fetching.json();
      setData(results);
    };
    getPlanets();
  }, []);

  const handleNameFilter = ({ target: { value } }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterByName: { name: value },
    }));
  };

  const handleFilterByNumeric = ({ column, comparison, value }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterByNumericValues: [
        ...prevFilters.filterByNumericValues,
        { column, comparison, value },
      ],
    }));
  };

  const handleRemoveFilter = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterByNumericValues: prevFilters.filterByNumericValues
        .filter(({ column }) => column !== filterName),
    }));
  };

  const contextValue = {
    data,
    filters,
    handleNameFilter,
    handleFilterByNumeric,
    handleRemoveFilter,
  };
  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
