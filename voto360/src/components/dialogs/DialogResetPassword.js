import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { gray900 } from 'material-ui/styles/colors';
import SimpleDialog from './SimpleDialog';
import '../../dist/css/NotLoggedReset.css'

import axios from 'axios'

import { cookie } from 'cookie_js'

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */

const styles = {
    floatingLabelStyle: {
      color: gray900,
    },
    underlineStyle: {
      borderColor: gray900,
    }
};

export default class DialogResetPassword extends React.Component {
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
    
    componentWillReceiveProps(nextProps){
        this.setState({
            open: nextProps.open
        })
    }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false, success_dialog: true});
  };

  render() {
    return (
      <div>
            <Dialog
                title="Reset de senha"
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
            <div className="inner-div">
            <TextField
                hintText="Informe seu email"
                floatingLabelText="Informe seu email"
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineStyle={styles.underlineStyle}
                onChange={(event, text) =>
                {
                    this.setState({email: text})
                }}
            />
            <RaisedButton label="Resetar senha" primary={true} onClick={this.changePassword} />
        </div>  
        </Dialog>
        <SimpleDialog 
              open={this.state.success_dialog} 
              title= {this.state.success ? 'Email Enviado' : 'Algo deu errado'}
              message={this.state.success ? 'Vá ao seu email para continuar o reset de senha' : 'Verifique o email digitado'}
              onRequestClose={()=>{
                this.setState({
                    open: false,
                    success_dialog: false,
                })
              }}
              />
      </div>
    );
  }

  changePassword = () => {
    this.handleClose()

    axios.post('http://localhost:8081/change-password', {
      email: this.state.email,
    })
    .then(response => {
        
        this.setState({
            success: true,
            open: true,
            success_dialog: true
        })
    })
    .catch(error => {
        this.setState({
          success: false,
          open: true,
          success_dialog: true
        })
    })
    
  }
}