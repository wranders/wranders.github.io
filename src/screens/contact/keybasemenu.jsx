import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { info } from '.';

class KeybaseMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Menu
        anchorEl={this.props.anchorEl}
        keepMounted
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <MenuItem
          component='a'
          href={'https://' + info.keybase.handle}
          target='_blank'
          rel='noopener noreferrer'
          onClick={this.props.onClose}
        >
          View on Keybase
        </MenuItem>
        <MenuItem
          component='a'
          href={'https://' + info.keybase.handle + '/chat'}
          target='_blank'
          rel='noopener noreferrer'
          onClick={this.props.onClose}
        >
          Open Chat
        </MenuItem>
      </Menu>
    );
  }
}

KeybaseMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
}

export default KeybaseMenu;