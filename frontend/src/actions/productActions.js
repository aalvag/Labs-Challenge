import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  FILTER_PRODUCTS_BY_CONDITION,
  SORT_BY_PRICE,
} from '../constants/productContants';

export const listProducts = (searchWord) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/search/?q=${searchWord}`);

    dispatch({
      type: PRODUCT_LIST_REQUEST,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.res && error.res.data.message
          ? error.res.data.message
          : error.message,
    });
  }
};
export const filterProducts = (condition, products) => (dispatch) => {
  console.log(condition);
  return dispatch({
    type: FILTER_PRODUCTS_BY_CONDITION,
    payload: {
      products:
        condition === ''
          ? products
          : products.filter((product) => {
              return product.condition.toLowerCase().includes(condition);
            }),
    },
  });
};

export const sortByPrice = (sort, products) => (dispatch) => {
  if (sort !== '') {
    products.sort((a, b) =>
      sort === 'low' ? (a.price > b.price ? 1 : -1) : a.price < b.price ? 1 : -1
    );
  }
  dispatch({
    type: SORT_BY_PRICE,
    payload: {
      sort: sort,
      products: products,
    },
  });
};
