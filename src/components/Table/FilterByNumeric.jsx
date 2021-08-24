import React from 'react';
import Context from '../../context/Context';
import { SELECT_OPTIONS, SELECT_RANGES } from '../../services/dados';

// ajuda fundamental de André Hammel - Turma 12
function FilterByNumeric() {
  const { fNumeric } = React.useContext(Context);
  const [column, setColumn] = React.useState('');
  const [comparison, setComparison] = React.useState('');
  const [value, setValue] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    fNumeric(
      {
        column,
        comparison,
        value,
      },
    );
  }
  return (
    <form>
      <select
        data-testid="column-filter"
        onChange={ (e) => setColumn(e.target.value) }
      >
        {SELECT_OPTIONS.map((opt, index) => (
          <option
            key={ index }
            value={ opt }
          >
            {opt}
          </option>))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        {SELECT_RANGES.map((item, index) => (
          <option
            key={ index }
            value={ item }
          >
            {item}
          </option>))}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        onChange={ (e) => setValue(e.target.value) }
      />
      <button
        data-testid="button-filter"
        type="submit"
        onClick={ (e) => handleSubmit(e) }
      >
        FILTRO
      </button>
    </form>
  );
}

export default FilterByNumeric;
