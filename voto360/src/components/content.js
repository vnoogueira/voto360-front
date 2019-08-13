import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { cookie } from 'cookie_js'
import { Admin } from './admin'
import Login from './login'
import Home from './home'
import NotLoggedReset from './NotLoggedReset'
import VerifyChangePasswordToken from './VerifyChangePasswordToken'
import SelectedPoliticianProfile from './selectedPoliticianProfile'
import PoliticsRequests from './politicsRequests'
import CadastroPolitico from './cadastro/cadastroPolitico'
import AlteraCadastroPolitico from './cadastro/alteraCadastroPolitico'
import MeusDados from './meusdados'
import ComparacaoPoliticos from './comparacaoPoliticos'
import CriarPesquisa from './criarPesquisa'
import FormPesquisa from './formPesquisa'
import ListaPesquisas from './listaPesquisas'
import Pesquisa from './pesquisaVotos'
import ControlePermissoes from './controlePermissoes'

class Content extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: cookie.get('user')
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.renderLink = this.renderLink.bind(this)
  }

  handleLogged(isLoggedIn) {
    this.setState({ isLoggedIn })
  }

  handleLogout() {
    const user = cookie.get('user')

    if (user) {
      cookie.remove('user')
    }
    this.handleLogged(false)
    
  }

  renderLink(user = {}) {
    if ((this.state.isLoggedIn && user.cargo === 'politico')) {
      return (
        <Link
          style={{
            textDecoration: 'none'
          }}
          to="/alteraCadastroPolitico"
        >
          <MenuItem onClick={this.props.handleClose}>
            Alterar Cadastro Politico
          </MenuItem>
        </Link>)
    } else if (this.state.isLoggedIn && user.cargo !== 'admin' && user.cargo !== 'editor') {
      return (
        <Link
          style={{
            textDecoration: 'none'
          }}
          to="/meusDados"
        >
          <MenuItem onClick={this.props.handleClose}>
            Alterar Cadastro
          </MenuItem>
        </Link>)
    }
    return null
  }

  render() {
    const cookieUser = cookie.get('user')
    let user
    if (cookieUser) {
      user = JSON.parse(cookieUser)
    }
    return (
      <div>
        <Drawer width={200} open={this.props.open} onRequestChange={this.props.handleToggle}>
          <Subheader>VOTO360</Subheader>
          {
            user && (user.cargo === 'admin' || user.cargo === 'editor')
              ? null
              : (
                <Link
                  style={{
                    textDecoration: 'none'
                  }}
                  to="/"
                >

                  <MenuItem onClick={this.props.handleClose}>
                    Home
                  </MenuItem>
                </Link>
              )
          }

          {
            user && (user.cargo === 'eleitor' || user.cargo === 'politico') && (<div>
              <Divider /> 
              <Subheader>Votação</Subheader>
              <Link
                style={{
                  textDecoration: 'none'
                }}
                to="/votar"
              >
                <MenuItem onClick={this.props.handleClose}>
                  Pesquisas de Voto
                </MenuItem>
              </Link>
              </div>
            )
          }

          <Divider />
          <Subheader>Sobre Políticos</Subheader>
          {
            user && (user.cargo === 'admin' || user.cargo === 'editor')
              ? null
              : (
                <Link
                  style={{
                    textDecoration: 'none'
                  }}
                  to="/comparacaoPoliticos"
                >
                  <MenuItem onClick={this.props.handleClose}>
                    Comparação Politicos
                  </MenuItem>
                </Link>
              )
          }

          {
            user && user.cargo === 'admin' && (
              <Link
                style={{
                  textDecoration: 'none'
                }}
                to="/admin"
              >
                <MenuItem onClick={this.props.handleClose}>
                  Admin
                </MenuItem>
              </Link>)
          }

          <Divider /> {
            user && user.cargo === 'editor' && (
              <Link
                style={{
                  textDecoration: 'none'
                }}
                to="/PoliticsRequests"
              >
                <MenuItem onClick={this.props.handleClose}>
                  Aprovar Perfil Politico
                </MenuItem>
              </Link>
            )
          }

          <Divider /> {
            user && user.cargo === 'editor' && (
              <Link
                style={{
                  textDecoration: 'none'
                }}
                to="/listaPesquisas"
              >
                <MenuItem onClick={this.props.handleClose}>
                  Pesquisas de Voto
                </MenuItem>
              </Link>
            )
          }

          <Divider />
          <Subheader>Meu perfil</Subheader>
          {this.renderLink(user)}

          {
            this.state.isLoggedIn
              ? null
              : (
                <Link
                  style={{
                    textDecoration: 'none'
                  }}
                  to="/login"
                >
                  <MenuItem onClick={this.props.handleClose}>
                    Login/Cadastro
                  </MenuItem>
                </Link>
              )
          }
          {
            this.state.isLoggedIn
              ? (
                <FlatButton fullWidth onClick={this.handleLogout}>
                  <MenuItem onClick={this.props.handleClose}>
                    Logout
                  </MenuItem>
                </FlatButton >
              )
              : null
          }
        </Drawer>

        <Route exact path="/" component={Home} />
        <Route
          path="/admin"
          render={(props) => ((user && user.cargo === 'admin')
            ? <ControlePermissoes {...props} />
            : null)}
        />
        <Route
          path="/votar"
          render={(props) => ((user && user.cargo === 'eleitor' || user.cargo === 'politico')
            ? <Pesquisa {...props} />
            : null)}
        />
        <Route
          path="/PoliticsRequests"
          render={(props) => ((user && user.cargo === 'editor')
            ? <PoliticsRequests {...props} />
            : null)}
        />
        <Route path="/forgotpassword/" component={NotLoggedReset} />
        <Route
          path="/login"
          render={(props) => (<Login
            handleLogin={() => {
              this.handleLogged(true)
            }}
            {...props}
          />)}
        />
        <Route path="/verify-change-password-token/:token" component={VerifyChangePasswordToken} />
        <Route
          path="/meusDados"
          render={(props) => ((user && user.cargo !== 'admin')
            ? <MeusDados {...props} />
            : null)}
        />
        <Route
          path="/cadastroPolitico"
          render={(props) => ((user && user.cargo !== 'admin')
            ? <CadastroPolitico {...props} />
            : null)}
        />
        <Route
          path="/listaPesquisas"
          render={(props) => ((user && user.cargo === 'editor')
            ? <ListaPesquisas {...props} />
            : null)}
        />
        <Route
          path="/formPesquisa/:id"
          render={(props) => ((user && user.cargo === 'editor')
            ? <FormPesquisa {...props} />
            : null)}
        />
        <Route
          path="/perfilPolitico/:id" component={SelectedPoliticianProfile} />
        <Route
          path="/alteraCadastroPolitico"
          render={(props) => ((user && (user.cargo === 'politico'))
            ? <AlteraCadastroPolitico {...props} />
            : null)}
        />
        <Route path="/comparacaoPoliticos" component={ComparacaoPoliticos} />
        <Route path="/criarPesquisa" component={CriarPesquisa} />
      </div>)
  }
}

export default Content
