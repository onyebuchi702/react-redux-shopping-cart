import { FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESSS, FETCH_PRODUCTS_FAILURE } from './types'
import ProductList from '../data/products'

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS})
    setTimeout(() => {
      dispatch({ type: FETCH_PRODUCTS_SUCCESSS, payload: ProductList})
    }, 2000);
  } catch (error) {
    console.error(error);
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error})
  }
  // fetch(data).then(res => res.json())
  //   .then(data => {
  //     console.log(data, 'second data');
  //     return dispatch({ type: FETCH_PRODUCTS, payload: data})
  //   })
  // this.setState({
  //   products: data,
  //   filteredProducts: data,
  // })
}
