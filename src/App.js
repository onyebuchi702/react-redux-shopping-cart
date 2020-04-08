import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Products from './components/Products'
import Filter from './components/Filter'
import Basket from './components/Basket'

import store from './store'
import ProductList from './data/products.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      filteredProducts: [],
      cartItems: []
    }

    this.handleChangeSort = this.handleChangeSort.bind(this)
    this.handleChangeSize = this.handleChangeSize.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
  }

  componentWillMount (){
    // for api in public/db.json
    // fetch ("http://localhost:3001/products").then(res => res.json())
    // .then(data => this.setState({
    //   products: data,
    //   filteredProducts: data
    // }))
    // const data = ProductList
    //
    // this.setState({
    //   products: data,
    //   filteredProducts: data,
    // })
    if(localStorage.getItem('cartItems')) {
      this.setState({cartItems: JSON.parse(localStorage.getItem('cartItems'))}) //convert to js
    }

  }

  handleChangeSort(e) {
    const sort = e.target.value;
    this.sortByPrice(sort);
  }

  handleChangeSize(e) {
    const size = e.target.value;
    this.filterBySize(size.toUpperCase());
  }

  sortByPrice = (sort) => {
    const { products } = this.state;
    let filteredProducts = products;
    if (sort === 'lowest') {
      filteredProducts = products.sort(this.sortByLowest);
    } else {
      filteredProducts = products.sort(this.sortByHighest);
    }

    this.setState({ sort, filteredProducts });
  }

  filterBySize = (size) => {
    const { products } = this.state;
    const filteredProducts = products.filter((product) => product.availableSizes.indexOf(size) > -1);

    this.setState({ size, filteredProducts });
  }

  sortByLowest(a, b) {
    if (a.price > b.price) {
      return 1;
    } else {
      return -1;
    }
  }

  sortByHighest(a, b) {
    if (a.price < b.price) {
      return 1;
    } else {
      return -1;
    }
  }

  handleAddToCart(e, product) {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach(item => {
        if(item.id === product.id) {
          productAlreadyInCart = true
          item.count++
        }
      })
      if(!productAlreadyInCart) {
        cartItems.push({...product, count:1})
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); //convert to string
      return cartItems;
    })
  }

  handleRemoveFromCart(e, item) {
    this.setState(state => {
    const cartItems = state.cartItems.filter(elm => elm.id !== item.id)
    localStorage.setItem('cartItems', cartItems)
    return{cartItems}
    })
  }

  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <h1>E commerce shopping cart application</h1>
          <hr/>
          <div className="row">
            <div className="col-md-9">
              <Filter
                size={this.state.size}
                sort={this.state.sort}
                handleChangeSize={this.handleChangeSize} handleChangeSort={this.handleChangeSort}
                count={this.state.filteredProducts.length}/>
              <hr/>
              <Products
                product={this.state.filteredProducts}
                handleAddToCart={this.handleAddToCart}/>
            </div>
            <div className="col-md-3">
              <Basket
                cartItems={this.state.cartItems}
                handleRemoveFromCart={this.handleRemoveFromCart}/>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
