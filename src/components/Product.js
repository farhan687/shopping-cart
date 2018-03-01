import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import AddtoCart from './AddtoCart';

const styles = () => ({
  description: {
    height: '58px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineClamp: 3,
    boxOrient: 'vertical',
  },
});

const Product = props => (
  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
    <Card>
      <CardContent>
        <Typography variant="headline">{props.name}</Typography>
        <Typography>Price: ${props.price}</Typography>
        <Typography className={props.classes.description}>{props.description}</Typography>
      </CardContent>
      <CardActions>
        <AddtoCart {...props} />
      </CardActions>
    </Card>
  </Grid>
);

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  picture: PropTypes.string,
  description: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

Product.defaultProps = {
  picture: null,
};

export default withStyles(styles)(Product);
