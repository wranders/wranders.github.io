import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { info } from '.';

class DiscordMenu extends React.Component {
  constructor(props) {
    super(props);
    this.copyHandleToClipboard = this.copyHandleToClipboard.bind(this);
  }

  copyHandleToClipboard() {
    navigator.clipboard.writeText(info.discord.handle);
    this.props.snackbarFunc('Discord Username Copied to Clipboard');
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
        <MenuItem onClick={this.copyHandleToClipboard}>
          Copy Username
        </MenuItem>
      </Menu>
    );
  }
}

DiscordMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  snackbarFunc: PropTypes.func
}

export default DiscordMenu;