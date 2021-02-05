import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, sortByPrice } from '../actions/productActions';

const Filter = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productList);

  function handleChange(e) {
    e.preventDefault();
    dispatch(filterProducts(e.target.value, products));
  }

  function handlePrice(e) {
    e.preventDefault();
    dispatch(sortByPrice(e.target.value, products));
  }

  return (
    <Row>
      <Col>
        Filtrar por condición :
        <Button value='used' variant='dark' onClick={(e) => handleChange(e)}>
          Usado
        </Button>
        <Button value='new' onClick={(e) => handleChange(e)}>
          Nuevo
        </Button>
      </Col>
      <Col>
        Ordenar por precio :
        <Button value='low' variant='dark' onClick={(e) => handlePrice(e)}>
          barato
        </Button>
        <Button value='high' onClick={(e) => handlePrice(e)}>
          caro
        </Button>
      </Col>
    </Row>
  );
};

export default Filter;
