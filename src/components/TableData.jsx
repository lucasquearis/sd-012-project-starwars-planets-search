import React from 'react';
import PropTypes from 'prop-types';

function TableData({ data }) {
  return (
    <tbody>
      { data.map((item) => (
        <tr key={ item.name }>
          <td>{ item.name }</td>
          <td>{ item.climate }</td>
          <td>{ item.created }</td>
          <td>{ item.diameter }</td>
          <td>{ item.edited }</td>
          <td>{ item.films }</td>
          <td>{ item.gravity }</td>
          <td>{ item.orbital_period }</td>
          <td>{ item.population }</td>
          <td>{ item.rotation_period }</td>
          <td>{ item.surface_water }</td>
          <td>{ item.terrain }</td>
          <td>{ item.url }</td>
        </tr>
      ))}
    </tbody>
  );
}

TableData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TableData;
