import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import MoreVertIcon from '@material-ui/icons/MoreVert';

class ContactItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  handleMenuClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: true
    });
  }

  handleMenuClose() {
    this.setState({
      anchorEl: null,
      open: false
    });
  }

  render() {
    const ItemMenu = this.props.menu;
    return (
      <ListItem>
        <ListItemAvatar>
          {this.props.avatar}
        </ListItemAvatar>
        <ListItemText
          primary={this.props.primaryText}
          secondary={this.props.secondaryText}
        />
        <ListItemSecondaryAction>
          <IconButton edge='end' onClick={this.handleMenuClick}>
            <MoreVertIcon/>
          </IconButton>
          <ItemMenu
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onClose={this.handleMenuClose}
            snackbarFunc={this.props.snackbarFunc}
            dialogTitleFunc={this.props.dialogTitleFunc}
            dialogContentFunc={this.props.dialogContentFunc}
            dialogActionFunc={this.props.dialogActionFunc}
            dialogCloseFunc={this.props.dialogCloseFunc}
            dialogOpenFunc={this.props.dialogOpenFunc}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

ContactItem.propTypes = {
  avatar: PropTypes.shape({
    type: PropTypes.oneOf([Avatar])
  }).isRequired,
  menu: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  snackbarFunc: PropTypes.func,
  dialogTitleFunc: PropTypes.func,
  dialogContentFunc: PropTypes.func,
  dialogActionFunc: PropTypes.func,
  dialogCloseFunc: PropTypes.func,
  dialogOpenFunc: PropTypes.func
};

export default ContactItem;