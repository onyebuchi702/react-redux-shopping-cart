// @flow
import * as React from 'react';
import util from '../util'

import { connect } from 'react-redux'
import {fetchProducts} from '../actions/productActions'

class Products extends React.Component {

  componentWillMount() {
    this.props.fetchProducts()
  }

  render() {
    const { products, isLoading, error } = this.props;
    if (isLoading){
      return (
        <span>Loading...</span>
      )
    }
    if (!products) {
      return (
        <>
          <h1>No Products</h1>
        </>
      )
    }

    const productItems = products.map(product => (
        <div className="col-md-4" key={product.id}>
          <div className="thumbnail text-center">
            <a
              href={`#${product.id}`}
              onClick={(e) => this.props.handleAddToCart(e, product)}>
              {/*}<img src={`/products/${product.sku.image2}`} alt={product.title}/>*/}
              <img src={product.sku.image2} alt={product.title}/>
              <p>{product.title}</p>
            </a>
            <div>
              <b>{util.formatCurrency(product.price)}</b>
              <button
                className="btn btn-primary"
                onClick={(e) => this.props.handleAddToCart(e, product)}>
                Add To Cart</button>
            </div>
          </div>
        </div>
      )
    )

    return (
      <div>
        {productItems}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  isLoading: state.products.isLoading
})

export default connect(mapStateToProps, {fetchProducts})(Products);
