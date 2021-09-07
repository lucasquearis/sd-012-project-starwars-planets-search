import React, { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import * as API from '../service/StarWarsAPI';
import Input from './components/Input';
import Select from './components/Select';
import { filterByNumber, filterByName } from './Filter';

function getInputArray(guide) {
  const { value } = guide.filterNumber;
  return [
    {
      handleChange: guide.handleChange,
      name: 'filterName',
      text: 'Nome:',
      type: 'text',
      testId: 'name-filter',
      value: guide.filterName,
      placeholder: 'Planet Name',
    },
    {
      handleChange: guide.handleChange,
      name: 'value',
      text: 'Valor:',
      type: 'number',
      testId: 'value-filter',
      value,
      placeholder: 'Ex: 5000',
    },
  ];
}

function getSelectColumnOptions() {
  return [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
}

function getSelectComparisonOptions() {
  return [
    'maior que',
    'menor que',
    'igual a',
  ];
}

function getInput({
  handleChange = null,
  name = '',
  text = '',
  type = 'text',
  testId = 'none',
  value = null,
  placeholder = '',
}) {
  return (
    <Input
      testId={ testId }
      text={ text }
      name={ name }
      type={ type }
      placeholder={ placeholder }
      value={ value }
      handleChange={ handleChange }
    />
  );
}

function getSelect({
  handleChange = null,
  name = 'select-input',
  text = 'Select:',
  testId = 'none',
  optionList = null,
}) {
  return (
    <Select
      handleChange={ handleChange }
      name={ name }
      text={ text }
      testId={ testId }
      optionList={ optionList }
    />
  );
}

export default function PlanetFilter() {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const [filterName, setFilterName] = useState('');
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterNumber, setfilterNumber] = useState({
    column: '',
    comparison: '',
    value: '',
  });
  const fillPlanets = async () => {
    const myPlanets = await API.getPlanetsFirstPage();
    setPlanets(myPlanets);
    // myPlanets = await API.getAllPlanets();
    setAllPlanets(myPlanets);
  };
  useEffect(() => {
    if (planets.length <= 0
      && (!filterNumber.column
      && !filterNumber.comparison
      && !filterNumber.value)) {
      fillPlanets();
    }
  });
  useEffect(() => {
    if (filterName) {
      filterByName(filterName, planets, setPlanets);
    }
    if (!filterName && allPlanets.length > 0) {
      setPlanets(allPlanets);
    }
  }, [filterName, planets, allPlanets, setPlanets]);
  useEffect(() => {
    if (filterNumber.column !== ''
      && filterNumber.comparison !== ''
      && filterNumber.value !== '') {
      filterByNumber(filterNumber, allPlanets, setPlanets);
    }
    if ((!filterNumber.column || !filterNumber.comparison || !filterNumber.value)
      && (allPlanets.length > 0)) {
      setPlanets(allPlanets);
    }
  }, [filterNumber, allPlanets, setPlanets]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
    case 'filterName':
      setFilterName(value);
      break;
    case 'column':
      setfilterNumber((prevState) => (
        { ...prevState, column: value }
      ));
      break;
    case 'comparison':
      setfilterNumber((prevState) => (
        { ...prevState, comparison: value }
      ));
      break;
    case 'value':
      setfilterNumber((prevState) => (
        { ...prevState, value }
      ));
      break;
    default:
    }
  };

  return (
    <section>
      <header>
        <h1>Header</h1>
        { getInput(getInputArray({ handleChange, filterName, filterNumber })[0]) }
        <section>
          { getSelect({
            handleChange,
            text: 'Column:',
            testId: 'column-filter',
            name: 'column',
            optionList: getSelectColumnOptions(),
          })}
          { getSelect({
            handleChange,
            text: 'Comparison:',
            testId: 'comparison-filter',
            name: 'comparison',
            optionList: getSelectComparisonOptions(),
          })}
          { getInput(getInputArray({ handleChange, filterName, filterNumber })[1]) }
          <button
            data-testid="button-filter"
            type="button"
          >
            Filter
          </button>
        </section>
      </header>
    </section>
  );
}
