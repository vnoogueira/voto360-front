import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import SimpleDialog from './dialogs/SimpleDialog';
import { gray900 } from 'material-ui/styles/colors';
import '../dist/css/NotLoggedReset.css'

import { cookie } from 'cookie_js'

const styles = {
  floatingLabelStyle: {
    color: gray900,
  },
  underlineStyle: {
    borderColor: gray900,
  }
};

export default class NotLoggedReset extends React.Component {

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
    }

  }

  render() {
    return (<div className="outter-div">
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
        
        
        <SimpleDialog 
              open={this.state.open} 
              title= {this.state.success ? 'Email Enviado' : 'Algo deu errado'}
              message={this.state.success ? 'Vá ao seu email para continuar o reset de senha' : 'Verifique o email digitado'}
              onRequestClose={()=>{
                this.setState({
                  open: false,
                })
              }}
              />
      </div>
    )
  }
  changePassword = () => {

    axios.get('http://localhost:8081/pessoa?q=', {
      email: this.state.email
    })
    .then(function (response) {
      console.log(response);
    })
    .then(function (error) {
      if (error) {
        console.log(error);
      }
    })
  }

  startPasswordReset = () => {
    this.saveToken()
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 25; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    this.setState({
      token: text
    })
    return text;
  }

  saveToken = () => {

    axios.put('http://localhost:8081/change-token', {
      email: this.state.email,
    })
    .then(response => {
      this.setState({
        success: true,
      })
    })
    .catch(error => {
        this.setState({
          success: false,
          open:true,
        })
    })
    
  }

  sendEmail = (token) => {
    var request = {
      to: this.state.email,
      from: this.state.cpf,
      subject: 'reset de senha',
      url: 'http://localhost:8081/sendMail'+ token,
    };

    axios.post('http://localhost:8081/sendMail', request).then(this.handleSignUpSuccess).catch(function(error) {
      alert(error);
    });
  }


}
