import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Filter from '../components/Filter';
import Paging from '../components/Paging';
import Product from '../components/Product';

const HomeScreen = () => {
  const productsList = useSelector((state) => state.productList);

  const { filteredProducts } = productsList;

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = filteredProducts
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : undefined;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1>Resultado de la busqueda</h1>
      <Filter />
      <Row>
        {!!currentProduct &&
          currentProduct.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={6} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
      <Paging
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts && filteredProducts.length}
        paginate={paginate}
      />
    </>
  );
};

export default HomeScreen;
