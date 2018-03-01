import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Manager, Target, Popper } from 'react-popper';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import { MenuList, MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';

import CartItem from './Cart-item';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  dropdown: {
    zIndex: 99,
  },
  menuList: {
    padding: '8px',
    minWidth: '200px',
  },
};

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      shouldOpen: false,
    };
    this.hideMenu = this.showMenu.bind(this, false);
  }
  getTotal() {
    const { cart } = this.props;
    let total = 0;
    Object.keys(cart).forEach((id) => {
      total += cart[id].info.price * cart[id].quantity;
    });
    return total.toFixed(2);
  }
  showMenu = (shouldOpen = true) => {
    this.setState({
      shouldOpen: !!(shouldOpen),
    });
  }
  render() {
    const { classes, cart } = this.props;
    const { shouldOpen } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Shopping Cart
            </Typography>
            <Manager>
              <Target>
                <Button
                  aria-owns={shouldOpen ? 'menu-list' : null}
                  aria-haspopup="true"
                  onClick={this.showMenu}
                  color="inherit"
                >
                  Cart: {Object.keys(cart).length}
                </Button>
              </Target>
              <Popper
                placement="bottom-end"
                eventsEnabled={shouldOpen}
                className={classes.dropdown}
              >
                <ClickAwayListener onClickAway={this.hideMenu}>
                  <Grow in={shouldOpen} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                    <Paper>
                      <MenuList role="menu" className={classes.menuList}>
                        {
                          Object.keys(cart).map(productId => (
                            <CartItem key={productId} {...cart[productId]} />
                          ))
                        }
                        <MenuItem>
                          <Grid container spacing={8}>
                            <Grid container spacing={0} item xs={8}>
                              Total
                            </Grid>
                            <Grid item xs={4}>
                              ${this.getTotal()}
                            </Grid>
                          </Grid>
                        </MenuItem>
                      </MenuList>
                    </Paper>
                  </Grow>
                </ClickAwayListener>
              </Popper>
            </Manager>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

Cart.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Cart);
