import React from 'react'

import { Card, CardActions, CardTitle } from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { gray900 } from 'material-ui/styles/colors';
import RequestPoliticsProfileDialog from './dialogs/requestPoliticsProfileDialog'
import SimpleDialog from './dialogs/SimpleDialog'

import { cookie } from 'cookie_js'
import axios from 'axios'
import { CPF } from 'cpf_cnpj'

import '../dist/css/meusdados.css'


const styles = {
  errorStyle: {
    color: gray900,
  },
  underlineStyle: {
    borderColor: gray900,
  },
  floatingLabelStyle: {
    color: gray900,
  },
  floatingLabelFocusStyle: {
    color: gray900,
  },
};

export default class MeusDados extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      newemail: '',
      email: '',
      nome: '',
      senhaatual: '',
      novasenha: '',
      confirmarsenha: '',
      cpf: '',

      errorSenha: false,
      errorSenhaAtual: false,
      errorEmail: false,
      errorCPF: false,
      errorNome: false,
      open_request_politic: false, 
      success_request_politic: false,
      open_change_info_modal: false, 
      success_change_info_modal: false
    }

  }

  componentWillMount() {
    const cookieUser = cookie.get('user');
    let user;
    if (cookieUser) {
      user = JSON.parse(cookieUser);
      console.log(user)
      this.setState({
        nome: user.nome,
        email: user.email,
        newemail: user.email,
        cpf: user.cpf
      })
    }
  }

  validarErroSenha = () => {
    if (!this.state.novasenha || this.state.novasenha !== this.state.confirmarsenha || this.state.senhaatual === this.state.novasenha) {
      this.setState({ errorSenha: true })
      return true
    }
    return false
  }

  validarErroSenhaAtual = () => {
    console.log("valida senha atual")
    if (this.state.senhaatual === '') {
      this.setState({ errorSenhaAtual: true })
      return true
    }
    return false
  }

  validarErroEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.newemail)) {
      this.setState({ errorEmail: true })
      return true
    }
    return false
  }

  validarCPF = () => {
    if (!CPF.isValid(this.state.cpf)) {
      this.setState({ errorCPF: true })
      return true
    }
    return false
  }

  validarErroNome = () => {
    if (this.state.nome === '') {
      this.setState({ errorNome: true })
      return true
    }
    return false
  }

  handleChangeSuccess = () => {
    axios.get(`http://localhost:8081/pessoa?q={"email":"${this.state.newemail}"}`)
      .then((response) => {
        console.log(response);
        cookie.set({
          user: JSON.stringify(response.data[0])
        });
        this.setState({
          open_change_info_modal: true,
          success_change_info_modal: true
        })
      })
      .catch((error) => {
        console.log("error", error)
        this.setState({
          open_change_info_modal: true,
          success_change_info_modal: false
        })
      })



  }

  handleSignUpFailure = (response) => {
    const cookieUser = cookie.get('user');
    let user;
    if (cookieUser) {
      user = JSON.parse(cookieUser);
      console.log(user)
      this.setState({
        nome: user.nome,
        email: user.email,
        newemail: user.email,
        cpf: user.cpf,
      })
    }
  }

  validaSenhaAlterada = () => {

    if (this.state.novasenha) {
      this.setState({ senha: this.state.novasenha })
    }
    return;
  }

  validaEmailAlterado = () => {

    if (this.state.newemail && (this.state.newemail !== this.state.email)) {
      this.setState({ email: this.state.newemail })
    } else {
      this.setState({ email: this.state.email })
    }
    return;
  }

  changeInfo = () => {
    //Valida senha
    if (this.validarErroSenha()) {
      return;
    }

    if(this.validarErroSenhaAtual()) {
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


    var request = {};

    // email: this.state.email,
    // newemail: this.state.newemail,
    // cpf: this.state.cpf,
    // senha: this.state.senha,
    // nome: this.state.nome

    if (this.state.email) {
      request.email = this.state.email
    }

    if (this.state.newemail) {
      request.newemail = this.state.newemail
    }

    if (this.state.cpf) {
      request.cpf = this.state.cpf
    }

    if (this.state.senhaatual) {
      request.senhaatual = this.state.senhaatual
    }

    if (this.state.novasenha) {
      request.senha = this.state.novasenha
    }

    if (this.state.nome) {
      request.nome = this.state.nome
    }

    axios.put('http://localhost:8081/change-info', request)
      .then(this.handleChangeSuccess)
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      })
  }

  requestPoliticsProfile = () => {
    this.setState({
      open_request_politic: true
    })
  }

  render() {
    return (<div className="card-div">
      <Card className="user-card-container">
        <CardTitle title="Meus dados" className="card-title" />
        <div className="user-card-info">
          <TextField
            value={this.state.nome}
            onBlur={this.validarErroNome}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
            errorText={this.state.errorNome && "Campo obrigatório"}
            floatingLabelText="Nome Completo*"
            onChange={(event, text) => {
              this.setState({ nome: text, errorNome: false })
            }}
          />
          <TextField
            value={this.state.newemail}
            onBlur={this.validarErroEmail}
            hintText="Email*"
            floatingLabelText="Email*"
            underlineStyle={styles.underlineStyle}
            errorText={this.state.errorEmail && "Campo obrigatório"}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onChange={(event, text) => {
              this.setState({ newemail: text, errorEmail: false })
            }}
          />
          <TextField
            value={this.state.cpf}
            onBlur={this.validarCPF}
            hintText="CPF*"
            floatingLabelText="CPF*"
            underlineStyle={styles.underlineStyle}
            errorText={this.state.errorCPF && "Campo obrigatório"}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onChange={(event, text) => {
              this.setState({ cpf: text, errorCPF: false })
            }}
          />
          <TextField
            value={this.state.senhaatual}
            onBlur={this.validarErroSenhaAtual}
            hintText="Senha atual*"
            floatingLabelText="Senha atual*"
            underlineStyle={styles.underlineStyle}
            errorText={this.state.errorSenhaAtual && "Campo obrigatório"}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            type="password"
            onChange={(event, text) => {
              this.setState({ senhaatual: text, errorSenhaAtual: false })
            }}
          />
          <TextField
            value={this.state.novasenha}
            onBlur={this.validarErroSenha}
            hintText="Nova senha"
            floatingLabelText="Nova senha"
            underlineStyle={styles.underlineStyle}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            type="password"
            onChange={(event, text) => {
              this.setState({ novasenha: text, errorNome: false })
            }}
          />
          <TextField
            value={this.state.confirmarsenha}
            onBlur={this.validarErroSenha}
            hintText="Confirmar nova senha"
            floatingLabelText="Confirmar Nova senha"
            underlineStyle={styles.underlineStyle}
            floatingLabelStyle={styles.floatingLabelStyle}
            type="password"
            onChange={(event, text) => {
              this.setState({ confirmarsenha: text, errorNome: false })
            }}
          />
        </div>
        <div className="buttons">
          <CardActions className="card-actions">
            <RaisedButton label="Solicitar Perfil Politico" primary={true} fullWidth={false} onClick={this.requestPoliticsProfile} />
            <RaisedButton label="Salvar" primary={true} fullWidth={false} onClick={this.changeInfo} />
          </CardActions>
        </div>
      </Card>
      <RequestPoliticsProfileDialog
        open={this.state.open_request_politic}
        title="Solicitação de Perfil de Político"
        message="Tem certeza? Apenas um políticos podem solicitar esse tipo de perfil. Ao continuar você irá fornecer as informações necessárias para que possamos garantir que você realmente é um político."
        onRequestClose={() => {
          this.setState({
            open_request_politic: false,
          })
        }}
      />
      <SimpleDialog 
        open={this.state.open_change_info_modal} 
        title= {this.state.success_change_info_modal ? 'Informações alteradas' : 'Algo deu errado'}
        message={this.state.success_change_info_modal ? 'Suas informações foram alteradas com sucesso' : 'Algo deu errado, tente novamente'}
        onRequestClose={()=>{
          this.setState({
            open_change_info_modal: false,
          })
        }}
        />
    </div>
    )
  }
}
