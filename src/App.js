import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import dataService from './helper/dataService';
import ProductList from './components/Product-list';
import Cart from './components/Cart';

const styles = () => ({
  progress: {
    top: '66px',
    position: 'fixed',
    width: '100%',
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: {},
      cart: {},
      request: {
        length: 10,
        offset: 0,
      },
      isLoading: false,
    };
    this.addToCart = this.updateCart.bind(this, true);
    this.removeFromCart = this.updateCart.bind(this, false);
  }
  componentDidMount() {
    this.fetchProducts();
  }
  fetchProducts() {
    const { products, request } = this.state;
    const { offset, length } = request;
    this.setState({ isLoading: true });
    dataService.fetchProducts(offset, length).then((productsResponse) => {
      this.setState({
        products: {
          total: productsResponse.total,
          data: offset === 0 ? productsResponse.data : products.data.concat(productsResponse.data),
        },
        isLoading: false,
      });
    });
  }
  updateCart(shouldAdd, id) {
    const { cart, products } = this.state;
    if (shouldAdd) {
      cart[id] = cart[id] || {
        quantity: 0,
        info: products.data.find(({ id: productId }) => productId === id),
      };
      cart[id].quantity += 1;
    } else if (cart[id] && cart[id].quantity) {
      cart[id].quantity -= 1;
      if (cart[id].quantity === 0) delete cart[id];
    }
    this.setState({
      cart,
    });
  }
  handleProductSizeChange = (event) => {
    if (event && event.target) {
      this.setState({
        request: {
          length: event.target.value,
          offset: 0,
        },
      }, this.fetchProducts);
    }
  }
  handleProductsPageScroll = () => {
    const { products, request } = this.state;
    if (products.data.length < products.total) {
      this.setState({
        request: {
          ...request,
          offset: request.offset + request.length,
        },
      }, this.fetchProducts);
    }
  }
  render() {
    const {
      products, cart, request, isLoading,
    } = this.state;
    return (
      <div className="app">
        <Cart cart={cart} />
        {
         isLoading && <LinearProgress className={this.props.classes.progress} color="secondary" />
        }
        <ProductList
          products={products.data || []}
          cart={cart}
          request={request}
          onSizeChange={this.handleProductSizeChange}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
          onScroll={this.handleProductsPageScroll}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
