import React, { useContext, useEffect } from 'react';
import MyContext from '../Context/MyContext';
import FetchApi from '../Service/FetchApi';

const Table = () => {
  const {
    planets,
    setPlanets,
    filterText,
  } = useContext(MyContext);

  useEffect(() => {
    FetchApi(setPlanets);
  }, [setPlanets]);

  const { filterByName } = filterText.filters;
  const { name } = filterByName;
  const filtered = planets.filter((planet) => planet.name.toLowerCase().includes(name));
  const renderList = (name) ? filtered : planets;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface_water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {renderList.map((planet, index) => (
          <tr key={ index }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
