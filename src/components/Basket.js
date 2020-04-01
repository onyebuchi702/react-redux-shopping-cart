// @flow
import * as React from 'react';
import util from '../util';

class Basket extends React.Component {
  render() {
    const { cartItems } = this.props
    return (
      <div className="alert alert-info">
        {
          cartItems.length===0 ? "Basket is empty"
          : <div>You have {cartItems.length} products in the basket</div>
        }
        {
          cartItems.length > 0 &&
          <div>
            <ul>
              {cartItems.map(item =>
                <li>
                  <b>{item.title}</b>
                  X {item.count} = {item.price* item.count}
                  <button
                    className="btn btn-danger"
                    onClick={(e) => this.props.handleRemoveFromCart(e, item)}>
                    X</button>
                </li>
              )}
            </ul>
            Total: {util.formatCurrency(cartItems.reduce((a, c) => a+ c.price * c.count, 0 ))}
            <br/>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => alert("checkout needs to implement...")}>
              Checkout
            </button>
          </div>
        }
      </div>
    );
  }
}

export default Basket;
