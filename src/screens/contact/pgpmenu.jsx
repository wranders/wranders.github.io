import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { info } from '.';

class PGPMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogContent: undefined
    }
    this.copyFingerprintToClipboard = this.copyFingerprintToClipboard.bind(this);
    this.copyHexFingerprintToClipboard = this.copyHexFingerprintToClipboard.bind(this);
    this.copyKeyContent = this.copyKeyContent.bind(this);
    this.downloadASC = this.downloadASC.bind(this);
    this.viewKeyDialog = this.viewKeyDialog.bind(this);
  }

  copyFingerprintToClipboard() {
    navigator.clipboard.writeText(info.pgp.fingerprint);
    this.props.snackbarFunc('PGP Fingerprint Copied to Clipboard')
    this.props.onClose();
  }

  copyHexFingerprintToClipboard() {
    const fp = info.pgp.fingerprint;
    const hexFingerprint = '0x' + fp.replace(/\s/g,'');
    navigator.clipboard.writeText(hexFingerprint);
    this.props.snackbarFunc('PGP Fingerprint (0x) Copied to Clipboard');
    this.props.onClose();
  }

  copyKeyContent() {
    navigator.clipboard.writeText(this.state.dialogContent);
    this.props.snackbarFunc('PGP Public Key Copied to Clipboard');
    this.props.dialogCloseFunc();
  }

  downloadASC() {
    this.props.snackbarFunc('PGP Public Key Download Started');
    this.props.onClose();
  }

  viewKeyDialog() {
    const { dialogContentFunc } = this.props;
    const self = this;
    this.props.dialogTitleFunc('PGP Key');
    if (typeof this.state.dialogContent === 'undefined') {
      dialogContentFunc('Loading...');
      fetch(info.pgp.file)
        .then(resp => {
          if (!resp.ok) {
            throw new Error(resp.statusText);
          }
          return resp.text();
        })
        .then(text => {
          self.setState({
            dialogContent: text
          }, dialogContentFunc(text));
        })
        .catch(err => {
          const errMsg = 'There was an error fetching the PGP key:\n' + err;
          dialogContentFunc(errMsg)
          console.error(err);
        });
    } else {
      dialogContentFunc(this.state.dialogContent);
    }
    this.props.dialogActionFunc(
      <Button variant='contained' color='primary' onClick={this.copyKeyContent}>
        Copy
      </Button>
    );
    this.props.onClose();
    this.props.dialogOpenFunc();
  }

  render() {
    return(
      <Menu
        anchorEl={this.props.anchorEl}
        keepMounted
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <MenuItem onClick={this.copyFingerprintToClipboard}>
          Copy Fingerprint
        </MenuItem>
        <MenuItem onClick={this.copyHexFingerprintToClipboard}>
          Copy Fingerprint &#40;0x&#41;
        </MenuItem>
        <MenuItem component='a' href={info.pgp.file} onClick={this.downloadASC}>
          Download ASCII Armored Key
        </MenuItem>
        <MenuItem onClick={this.viewKeyDialog}>
          View Key
        </MenuItem>
      </Menu>
    );
  }
}

PGPMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  snackbarFunc: PropTypes.func,
  dialogTitleFunc: PropTypes.func,
  dialogOpenFunc: PropTypes.func,
  dialogActionFunc: PropTypes.func,
  dialogCloseFunc: PropTypes.func,
  dialogContentFunc: PropTypes.func
}

export default PGPMenu;