import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  FILTER_PRODUCTS_BY_CONDITION,
  SORT_BY_PRICE,
} from '../constants/productContants';

export const productListReducer = (
  state = { products: [], filteredProducts: [], condition: '' },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case FILTER_PRODUCTS_BY_CONDITION:
      return {
        ...state,
        filteredProducts: action.payload.products,
        condition: action.payload.condition,
      };

    case SORT_BY_PRICE:
      return {
        ...state,
        filteredProducts: action.payload.products,
        sort: action.payload.sort,
      };

    case PRODUCT_LIST_FAIL:
      alert(action.message);
      return { ...state };
    default:
      return state;
  }
};
