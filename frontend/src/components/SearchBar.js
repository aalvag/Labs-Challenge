import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

const SearchBar = () => {
  const dispatch = useDispatch();

  const [searchWord, setSearchWord] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(searchWord));
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setSearchWord(e.target.value)}
        placeholder='Buscar en ML'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p2'>
        Buscar
      </Button>
    </Form>
  );
};

export default SearchBar;
