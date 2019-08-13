import React from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import '../../dist/css/NotLoggedReset.css'


import { cookie } from 'cookie_js'

export class RequestPoliticsProfileDialog extends React.Component {
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

  callPoliticsSignUpPage = () => {
    this.setState({ redirect: true })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Continuar"
        primary={true}
        onClick={this.callPoliticsSignUpPage}
      />,
    ];
    if (this.state.redirect) {
      return <Redirect to='/cadastroPolitico' />;
    }
    return (
      <div>
        <Dialog
          title="Abrir solicitação para perfil político"
          modal={false}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
          message="Tem certeza? Apenas um políticos podem solicitar esse tipo de perfil. Ao continuar você irá fornecer as informações necessárias para obter um perfil de político."
        >
          {this.props.message}

        </Dialog>
      </div>
    );
  }
}

export default withRouter(RequestPoliticsProfileDialog)