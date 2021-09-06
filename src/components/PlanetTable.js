import React, { useContext } from 'react';
import { PlanetContext } from '../Context/PlanetProvider';

const PlanetTable = () => {
  const {
    planets,
    filters,
    usedFilter,
    setUsedFilter,
    setNumericFilter,
  } = useContext(PlanetContext);
  const { filterByName: { name }, filterByNumericValues } = filters;
  const topName = planets[0] || [];

  const filtersCombine = (firstValue, secondValue, comparingValue) => {
    if (
      typeof (firstValue) === 'number' || typeof (secondValue) === 'number'
    ) return false;
    firstValue = parseInt(firstValue, 10);
    secondValue = parseInt(secondValue, 10);
    if (
      comparingValue === 'maior que'
    ) return firstValue > secondValue;
    if (
      comparingValue === 'menor que'
    ) return firstValue < secondValue;
    if (
      comparingValue === 'igual a'
    ) return firstValue === secondValue;
    return true;
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {
              Object.keys(topName)
                .map((tName) => <th key={ tName }>{tName}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            filterByNumericValues
              .reduce((accumulator, { dropdown, value, comparison }) => accumulator
                .filter((planet) => (
                  filtersCombine(planet[dropdown], value, comparison))), planets)
              .filter((planet) => (planet.name).includes(name))
              .map((planet, index) => (
                <tr key={ index }>
                  {
                    Object.values(planet)
                      .map((info) => <td key={ info }>{info}</td>)
                  }
                </tr>
              ))
          }
        </tbody>
      </table>
      <div>
        { filterByNumericValues.map(({
          dropdown,
          value,
          comparison,
        }) => (
          <div
            key={ dropdown }
            data-testid="filter"
          >
            <p>{`${dropdown} ${comparison} ${value}`}</p>
            <button
              type="button"
              onClick={ () => {
                setNumericFilter(filterByNumericValues
                  .filter((filter) => filter.dropdown !== dropdown));
                setUsedFilter(usedFilter.filter((filterUsed) => filterUsed !== dropdown));
              } }
            >
              x
            </button>
          </div>
        )) }
      </div>
    </>
  );
};

export default PlanetTable;