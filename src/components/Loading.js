import React, { useEffect, useContext } from 'react';
import Context from '../context/context';

const Loading = () => {
  const { setData, setLoading } = useContext(Context);

  useEffect(() => {
    const getData = async () => {
      try {
        const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
        const response = await fetch(endpoint);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  });
  return (
    <p>CARREGANDO!!!</p>
  );
};

export default Loading;
