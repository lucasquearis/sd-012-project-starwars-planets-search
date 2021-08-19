import React, { useContext } from 'react';
import context from '../../context/PlanetContext';

export default function Body() {
  const { data } = useContext(context);

  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={ index }>
          <td>{item.name}</td>
          <td>{item.rotation_period}</td>
          <td>{item.orbital_period}</td>
          <td>{item.diameter}</td>
          <td>{item.climate}</td>
          <td>{item.gravity}</td>
          <td>{item.terrain}</td>
          <td>{item.surface_water}</td>
          <td>{item.population}</td>
          <td>{item.films}</td>
          <td>{item.created}</td>
          <td>{item.edited}</td>
          <td>{item.url}</td>
        </tr>
      ))}
    </tbody>
  );
}
