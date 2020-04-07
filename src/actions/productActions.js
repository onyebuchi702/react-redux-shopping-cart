import { FETCH_PRODUCTS } from './types'
import ProductList from '../data/products.js'

export const fetchProducts = () => (dispatch) => {

  const data = ProductList

  fetch(data).then(res => res.json())
    .then(data => {
      console.log(data, 'second data');
      return dispatch({ type: FETCH_PRODUCTS, payload: data})
    })
  // this.setState({
  //   products: data,
  //   filteredProducts: data,
  // })
}
