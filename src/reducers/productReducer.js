import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESSS,
  FETCH_PRODUCTS_FAILURE
} from '../actions/types'

const initialState = {items: []}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_PRODUCTS:
      return {...state, isLoading: true };
    case FETCH_PRODUCTS_SUCCESSS:
      return {...state, items: action.payload, isLoading: false}
    case FETCH_PRODUCTS_FAILURE:
      return {...state, error: action.payload, isLoading: false}
    default:
      return state;
  }
}
