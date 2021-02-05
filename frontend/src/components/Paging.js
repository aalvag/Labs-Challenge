import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paging = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Pagination className='pagination'>
        {pageNumbers.map((number) => (
          <Pagination key={number} className='page-item'>
            <Pagination.Item
              href='/#'
              onClick={() => paginate(number)}
              className='page-link'
            >
              {number}
            </Pagination.Item>
          </Pagination>
        ))}
      </Pagination>
    </div>
  );
};

export default Paging;
