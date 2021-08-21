import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';
import getPlanets from '../services/PlanetsFetch';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planetList, setPlanetList] = useState([]);
  const [headerArray, setHeaderArray] = useState([]);
  const [name, setName] = useState('');
  const [filterByNumericValues, setNumericFilter] = useState([]);
  const filteredArray = useRef([...data]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const planets = await getPlanets();
      setData(planets);
      filteredArray.current = [...planets];
      setPlanetList(planets);
      setHeaderArray(Object.keys(planets[0]));
    };
    fetchPlanets();
  }, []);

  // Filtros feitos com a ajuda do David Gonzaga - turma 12
  useEffect(() => {
    const handleFilter = () => {
      filteredArray.current = data.filter(({ name: nameValue }) => (
        nameValue.toLowerCase().includes(name.toLowerCase())));
      setPlanetList(filteredArray.current);
    };
    handleFilter();
  }, [name, data]);

  useEffect(() => {
    if (!filterByNumericValues.length) return;
    const handleFilter = () => {
      const [latestFilter] = filterByNumericValues;
      const { column, comparison, value } = latestFilter;

      if (comparison === 'maior que') {
        filteredArray.current = filteredArray.current
          .filter((item) => Number(item[column]) > Number(value));
        return setPlanetList(filteredArray.current);
      }
      if (comparison === 'menor que') {
        filteredArray.current = filteredArray.current
          .filter((item) => Number(item[column]) < Number(value));
        return setPlanetList(filteredArray.current);
      }
      filteredArray.current = filteredArray.current
        .filter((item) => Number(item[column]) === Number(value));
      return setPlanetList(filteredArray.current);
    };
    handleFilter();
  }, [filterByNumericValues]);

  const contextValue = {
    planetList,
    headerArray,
    filters: {
      filterByName: { name },
      filterByNumericValues,
    },
    setName,
    setNumericFilter,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
