import React from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import '../../dist/css/NotLoggedReset.css'


import { cookie } from 'cookie_js'

export class ConfirmationDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: cookie.get('user'),
      users: [],
      email: '',
      novaSenha: '',
      token: '',
      success: false,
      open: false,
      success_dialog: false
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    })
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    // this.setState({ open: false, 
    // success_dialog: true });
    this.props.onRequestClose()
  };

  handleConfirm = () => {
    this.setState({ redirect: true })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Continuar"
        primary={true}
        onClick={this.props.handleConfirm}
      />,
    ];
    
    return (
      <div>
        <Dialog
          title={this.props.title}
          modal={false}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
          message={this.props.message}
        >
        </Dialog>
      </div>
    );
  }
}

export default withRouter(ConfirmationDialog)