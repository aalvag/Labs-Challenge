import React from 'react';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <>
      <Card className='my-3 p-3 rounded'>
        <Card.Img
          src={product.image}
          // variant='top'
          style={{ width: 200, height: 260 }}
        />

        <Card.Body>
          <Card.Title as='div'>
            <strong>{product.title}</strong>
          </Card.Title>
        </Card.Body>

        <Card.Text as='div'>
          <div className='my-3'>
            Condición: {product.condition} <br />
            Disponibles :{product.stock}
          </div>
        </Card.Text>

        <Card.Text as='h3'>
          {product.currency}
          {product.price}
        </Card.Text>
      </Card>
    </>
  );
};

export default Product;
