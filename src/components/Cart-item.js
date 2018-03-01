import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  menuItem: {
    height: 'auto',
  },
  productName: {
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  productInfo: {
    fontSize: '10px',
    paddingTop: 0,
  },
});

const CartItem = ({ info, quantity, classes }) => (
  <MenuItem className={classes.menuItem}>
    <Grid container spacing={8}>
      <Grid container spacing={0} item xs={8}>
        <Grid item xs={12} className={classes.productName}>
          {info.name}
        </Grid>
        <Grid item xs={12} className={classes.productInfo}>
          {info.price} x {quantity}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        ${info.price * quantity}
      </Grid>
    </Grid>
  </MenuItem>
);

CartItem.propTypes = {
  info: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default withStyles(styles)(CartItem);
