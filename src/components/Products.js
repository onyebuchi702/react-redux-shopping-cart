// @flow
import * as React from 'react';
import util from '../util'

class Products extends React.Component {
  render() {
    console.log(this.props.product);
    const productItems = this.props.product.map(product => (
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

export default Products;