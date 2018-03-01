import React from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const sizes = [10, 20, 50, 100];

const SizeFilter = ({ request, onSizeChange }) => (
  <Select
    value={request.length}
    onChange={onSizeChange}
  >
    {
      sizes.map(size => (
        <MenuItem key={size} value={size}>{size}</MenuItem>
      ))
    }
  </Select>
);

SizeFilter.propTypes = {
  request: PropTypes.object.isRequired,
  onSizeChange: PropTypes.func.isRequired,
};

export default SizeFilter;
