import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const AddtoCart = ({
  id, quantity, addToCart, removeFromCart,
}) => (
  <Grid container spacing={8}>
    <Grid item xs={5}>
      <Button size="small" onClick={() => addToCart(id)}>+ Add</Button>
    </Grid>
    <Grid item xs={2}>
      {quantity}
    </Grid>
    <Grid item xs={5}>
      <Button onClick={() => removeFromCart(id)} size="small">- Remove</Button>
    </Grid>
  </Grid>
);


AddtoCart.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

AddtoCart.defaultProps = {
  quantity: 0,
};

export default AddtoCart;

