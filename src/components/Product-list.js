import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Product from './Product';
import SizeFilter from './Size-filter';

const styles = {
  productList: {
    marginTop: '48px',
    padding: '16px',
    overflow: 'auto',
  },
};

const getHeight = () => ({
  height: window.innerHeight - 84,
});

class ProductList extends Component {
  componentDidMount() {
    if (this.productListRef) {
      this.productListRef.addEventListener('scroll', (event) => {
        this.productListRef = event.target;
        const isScrolledToBottom = this.productListRef.scrollHeight !== 0 &&
        (this.productListRef.scrollHeight > this.productListRef.clientHeight) &&
        (this.productListRef.scrollHeight
        - this.productListRef.scrollTop === this.productListRef.clientHeight);
        if (isScrolledToBottom) this.props.onScroll();
      });
    }
  }
  componentWillReceiveProps({ products }) {
    if (products && products.length !== this.props.products.length) {
      setTimeout(() => {
        const shouldFetchMore = this.productListRef.scrollHeight !== 0 &&
        this.productListRef.scrollHeight === this.productListRef.clientHeight;
        if (shouldFetchMore) this.props.onScroll();
      }, 1000);
    }
  }
  render() {
    const {
      products, cart, request, onSizeChange, addToCart, removeFromCart, classes,
    } = this.props;
    return (
      <div
        className={classes.productList}
        ref={(ref) => { this.productListRef = ref; }}
        style={getHeight()}
      >
        <Grid
          container
          spacing={16}
        >
          <Grid item xs={12}>
            <h3>
            Products: &nbsp;&nbsp;
              <SizeFilter request={request} onSizeChange={onSizeChange} />
            </h3>
          </Grid>
          {
          products.map(product => (
            <Product
              key={product.id}
              {...product}
              quantity={cart[product.id] && cart[product.id].quantity ? cart[product.id].quantity : 0}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))
        }
        </Grid>
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array,
  cart: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
};

ProductList.defaultProps = {
  products: [],
};

export default withStyles(styles)(ProductList);
