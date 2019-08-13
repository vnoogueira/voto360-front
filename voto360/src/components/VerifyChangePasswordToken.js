import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {gray900} from 'material-ui/styles/colors';
import SimpleDialog from './dialogs/SimpleDialog'

import axios from 'axios'

const styles = {
  floatingLabelStyle: {
    color: gray900
  },
  underlineStyle: {
    borderColor: gray900
  }
};

export default class VerifyChangePasswordToken extends React.Component {

  constructor(props) {

    super(props)
    console.log(props);
    this.state = {
      token: props.match.params.token,
      senha: '',
      done: false,
      success: false,
      open: false,
    }

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  validarErroEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      this.setState({errorEmail: true})
      return true
    }
    return false
  }

  render() {
    return (this.state.done ? (<SuccessPasswordReser />) : (<div>
      <TextField 
        type="password" 
        floatingLabelStyle={styles.floatingLabelStyle} 
        underlineStyle={styles.underlineStyle} 
        floatingLabelText="Nova senha" 
        onChange={(event, text) => {
          this.setState({senha: text})
        }}/>
      <br />
      <TextField 
        type="password" 
        floatingLabelStyle={styles.floatingLabelStyle} 
        underlineStyle={styles.underlineStyle} 
        floatingLabelText="Confirme a nova senha" 
        onChange={(event, text) => {
          this.setState({senha: text})
        }}/>
      <div>
        <RaisedButton label="Trocar senha" primary={true} onClick={this.changePassword} />
      </div>
      <SimpleDialog 
        open={this.state.open} 
        title= {this.state.success ? 'Senha alterada' : 'Algo deu errado'}
        message={this.state.success ? 'Sua senha foi alterada com sucesso' : 'Algo deu errado, você precisa de um novo link'}
        onRequestClose={()=>{
          this.setState({
            open: false,
          })
          this.state.success ? this.props.history.push('/login') : this.props.history.push('/forgotpassword')
        }}
        />
    </div>))
  }

  changePassword = () => {
    (this.state.senha === '') ? this.setState({ sucess: false, open: true }) :
    axios.post('http://localhost:8081/verify-change-password-token', {
      password: this.state.senha,
      token: this.state.token
    })
    .then(response => {
      this.setState({
        success: true,
        open: true
      })
      
    })
    .catch(error => {
      this.setState({
        success: false,
        open: true
      })
    })
  }

  handleSuccess = () => {
    this.setState({
      done: true
    })
  }
}

const SuccessPasswordReser = () => (
  <div></div>
)
