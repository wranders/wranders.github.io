import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { info } from '.';

class EmailMenu extends React.Component {
  constructor(props) {
    super(props);
    this.copyEmailToClipboard = this.copyEmailToClipboard.bind(this);
  }

  copyEmailToClipboard() {
    navigator.clipboard.writeText(info.email.addr);
    this.props.snackbarFunc('Email Address Copied to Clipboard');
    this.props.onClose();
  }

  render() {
    return (
      <Menu
        anchorEl={this.props.anchorEl}
        keepMounted
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <MenuItem onClick={this.copyEmailToClipboard}>
          Copy Address
        </MenuItem>
        <MenuItem component='a' href={'mailto:' + info.email.addr} onClick={this.props.onClose}>
          Mail To
        </MenuItem>
      </Menu>
    );
  }
}

EmailMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  snackbarFunc: PropTypes.func
}

export default EmailMenu;