import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import '../dist/css/login.css'
import { gray900 } from 'material-ui/styles/colors';
import InputCPF from './InputCPF';
import SimpleDialog from './dialogs/SimpleDialog'
import DialogResetPassword from './dialogs/DialogResetPassword';

import axios from 'axios'
import {CPF} from 'cpf_cnpj'
import {cookie} from 'cookie_js'



export default class Login extends React.Component {
  render() {
    return <TabsLogin { ...this.props }/>
  }
}

const styles = {
  floatingLabelStyle: {
    color: gray900,
  },
  underlineStyle: {
    borderColor: gray900,
  }
};

class CardLogin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      senha: '',
      success: false,
      open: false,
      open_reset: false
    }
  }

  validarErroSenha = () => {
    if (!this.state.senha) {
      this.setState({errorSenha: true})
      return true
    }
    return false
  }

  validarErroEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      this.setState({errorEmail: true})
      return true
    }
    return false
  }

  handleSignInSuccess = (response) => {

    cookie.set({
      user: JSON.stringify(response.data)
    });
    
    if (!this.props.location.state) {
      this.props.history.push('/')
    }

    if (this.props.location.state && this.props.location.state.referrer) {
      this.props.history.push(this.props.location.state.referrer)
    }
    this.props.handleLogin()
  }

  handleSignInFailure = (response) => {
    this.setState({
      open: true,
      success: false
    })
  }

  signIn = () => {
    if (this.validarErroSenha()) {
      return;
    }

    //Valida Email
    if (this.validarErroEmail()) {
      return;
    }

    var request = {
      senha: this.state.senha,
      email: this.state.email
    };

    axios.post('http://localhost:8081/login', request).then(this.handleSignInSuccess).catch(this.handleSignInFailure);

  }

  render() {
    return (<div className="cardLogin">

      <div className="tabsInside">
        <TextField
          onBlur={this.validarErroEmail}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          errorText={this.state.errorEmail && "Verifique o email digitado"}
          floatingLabelText="Email"
          onChange={(event, text) =>
            {
              this.setState({email: text, errorEmail: false})
            }}/>
        <TextField
          onBlur={this.validarErroSenha}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          floatingLabelText="Senha"
          type="password"
          onChange={(event, text) =>
            {
              this.setState({senha: text, errorSenha: false})
            }}/>
      </div>
      
      <div className="send-login-container"> 
      <br/>
        <RaisedButtonLogin handleClick={this.signIn}/>
        <br/>
        <button className="forgot-password-btn" onClick={() => this.setState({
          open_reset: true
        })}>Esqueci a Senha</button>
      </div>
      <DialogResetPassword 
        open={this.state.open_reset} 
        message={this.state.success ? 'Vá ao seu email para continuar o reset de senha' : 'Verifique o email digitado'}
        onRequestClose={()=>{
          this.setState({
            open_reset: false,
          })
        }}
      />
      <SimpleDialog 
        open={this.state.open} 
        title= {this.state.success ? undefined : 'Algo deu errado'}
        message={this.state.success ? undefined : 'Usuário ou senha inválidos'}
        onRequestClose={()=>{
          this.setState({
            open: false,
          })
        }}
        />
    </div>)
  }
}

class CardCadastro extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      nome: '',
      senha: '',
      confirmarsenha: '',
      cpf: '',
      cargo: 'eleitor',
      senha_antiga: '',

      errorSenha: false,
      errorEmail: false,
      errorCPF: false,
      errorNome: false
    }
  }

  validarErroSenha = () => {
    if (this.state.senha !== this.state.confirmarsenha) {
      this.setState({errorSenha: true})
      return true
    }
    return false
  }

  validarErroEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      this.setState({errorEmail: true})
      return true
    }
    return false
  }

  validarCPF = () => {
    if (!CPF.isValid(this.state.cpf)) {
      this.setState({errorCPF: true})
      return true
    }
    return false
  }

  validarErroNome = () => {
    if(this.state.nome === '') {
      this.setState({errorNome: true})
      return true
    }
    return false
  }

  handleSignUpSuccess = (response) => {
    this.setState({
      email: '',
      nome: '',
      senha: '',
      confirmarsenha: '',
      cpf: '',

      errorSenha: false,
      errorEmail: false,
      errorCPF: false,
      errorNome: false,
      success: true,
      open: true
    });
  }

  handleSignUpFailure = (response) => {
    this.setState({
      errorSenha: false,
      errorEmail: false,
      errorCPF: false,
      errorNome: false,
      success: false,
      open: true
    });
  }

  signUp = () => {

    //Valida senha
    if (this.validarErroSenha()) {
      return;
    }

    //Valida Email
    if (this.validarErroEmail()) {
      return;
    }
    //Valida cpf
    if (this.validarCPF()) {
      return;
    }

    if (this.validarErroNome()) {
      return;
    }

    var request = {
      nome: this.state.nome,
      cpf: this.state.cpf,
      senha: this.state.senha,
      email: this.state.email,
      cargo: this.state.cargo,
      token_senha: '',
      senha_antiga: this.state.senha
    };

    axios.post('http://localhost:8081/pessoa', request).then(this.handleSignUpSuccess).catch(this.handleSignUpFailure);

  }


  render() {
    return (<div className="cardLogin">
      <div className="tabsInside">

        <TextField
          value={this.state.email}
          onBlur={this.validarErroEmail}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          errorText={this.state.errorEmail && "Confirme o email digitado"}
          floatingLabelText="Email*"
          onChange={(event, text) => {
            this.setState({email: text, errorEmail: false})
          }}/>
        <TextField
          value={this.state.nome}
          onBlur={this.validarErroNome}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          errorText={this.state.errorNome && "Confirme o nome digitado"}
          floatingLabelText="Nome Completo*"
          onChange={(event, text) => {
            this.setState({nome: text, errorNome: false})
          }}/>
        <InputCPF
          value={this.state.cpf}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          errorText={this.state.errorCPF && "Confirme o CPF digitado"}
          floatingLabelText="CPF*"
          onChange={(event, text) => {
            this.setState({cpf: text, errorCPF: false})
          }}
        />
        <TextField
          value={this.state.senha}
          onBlur={this.validarErroSenha}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          floatingLabelText="Senha*"
          type="password"
          onChange={(event, text) => {
            this.setState({senha: text, errorSenha: false})
          }}/>
        <TextField
          value={this.state.confirmarsenha}
          onBlur={this.validarErroSenha}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          errorText={this.state.errorSenha && "Confirme as senhas digitadas"}
          floatingLabelText="Confirmar Senha*"
          type="password"
          onChange={(event, text) => {
            this.setState({confirmarsenha: text, errorSenha: false})
          }}/>

      </div>
      
      <RaisedButtonCadastro handleClick={this.signUp}/>
      <SimpleDialog 
              open={this.state.open} 
              title= {this.state.success ? 'Usuário criado' : 'Algo deu errado'}
              message={this.state.success ? 'Usuário criado com sucesso' : 'Algo deu errado, tente novamente'}
              onRequestClose={()=>{
                this.setState({
                  open: false,
                })
              }}
              />
    </div>)
  }
}

const RaisedButtonLogin = (props) => (<RaisedButton label="Login" primary={true} onClick={props.handleClick}/>);

const RaisedButtonCadastro = (props) => (<RaisedButton label="Cadastro" primary={true} fullWidth={true} className="marginBottom20 marginTop20" onClick={props.handleClick}/>);

const TabsLogin = (props) => (<Tabs className="tabsLogin" tabItemContainerStyle={{backgroundColor:"#0D47A1"}}>
  <Tab label="Login">
    <CardLogin {...props}/>
  </Tab>
  <Tab label="Cadastro">
    <CardCadastro/>
  </Tab>
</Tabs>);
