import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';

function Input({ name, testId, type }) {
  const { handleChange } = useContext(MyContext);
  return (
    <input
      data-testid={ testId }
      type={ type }
      name={ name }
      onChange={ handleChange }
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  testId: PropTypes.string,
}.isRequired;

export default Input;
