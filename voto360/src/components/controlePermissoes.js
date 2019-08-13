import React from 'react'
import axios from 'axios'

import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { gray900 } from 'material-ui/styles/colors';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SimpleDialog from './dialogs/SimpleDialog'



import '../dist/css/controlepermissoes.css'

const style = {
  margin: 12,
};

const styles = {
  floatingLabelStyle: {
    color: gray900,
  },
  underlineStyle: {
    borderColor: gray900,
  }
};

export default class ControlePermissoes extends React.Component {



  constructor(props) {
    super(props)

    this.state = {
      emails: [],
      users: [],
      id: '',
      emailSelecionado: '',
      cargo: '',
      nome: '',
      dialogMessage: '',
      done: false
    }
    this.handleUsers = this.handleUsers.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }



  render() {
    return (<div className="outter-div">

      <div className="control-panel">
        <h2>Controle Permissoes</h2>
        <div className="inner-panel">
          {this.state.done ? (<AutoComplete
            floatingLabelText="Pesquise o usuário por email" 
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
            filter={AutoComplete.fuzzyFilter}
            dataSource={this.state.emails}
            maxSearchResults={10}
            onNewRequest={(text, index) => {
              this.setState({
                emailSelecionado: text
              })
              this.displayUser()
            }}
          />) : null }
          <div>
          <RaisedButton label="Buscar usuários" primary={true} style={style} onClick={this.getUsuarios} />
          </div>
        </div>
        <div className="inner-panel">
          <SelectField
            floatingLabelText="Permissões"
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
            value={this.state.cargo}
            onChange={this.handleCargo}
          >
            <MenuItem value={"eleitor"} primaryText="Eleitor" />
            <MenuItem value={"politico"} primaryText="Político" />
            <MenuItem value={"editor"} primaryText="Editor" />
            <MenuItem value={"admin"} primaryText="Admin" />
          </SelectField>

        </div>
        <div className="inner-panel">

          {/* <RaisedButton label="Excluir usuário" primary={true} style={style} onClick={this.handleSalvarPermissoes}/> */}
          <RaisedButton label="Salvar" primary={true} style={style} onClick={this.handleSalvarPermissoes} />
        </div>
      </div>
      <div className="card">
        {this.state.emailSelecionado ? 
          (<Card>
          <CardHeader
            title="Usuário selecionado"
          />
          <CardText>
            <p>Nome: {this.state.nome}</p>
            <p>Email: {this.state.emailSelecionado}</p>
            <p>Cargo: {this.state.cargo}</p>
          </CardText>
          <CardActions>
            <FlatButton label="Excluir Usuário" onClick={this.handleDeleteUser} />
          </CardActions>

        </Card>
        ) : undefined}
        <SimpleDialog
          open={!!this.state.dialogMessage}
          message={this.state.dialogMessage}
          onRequestClose={() => {
            this.setState({
              dialogMessage: '',
            })
          }}
        />
      </div>
    </div>)
  }

  handleDeleteUser = () => {
    if(this.state.cargo === 'admin') {
      this.setState({
        dialogMessage: 'O Admin não pode ser deletado'
      })
    } else {
      axios.delete(`http://localhost:8081/pessoa/${this.state.id}`).then(() => {
        this.setState({
          dialogMessage: 'Pessoa excluída com sucesso'
        })
        // updating current polls
      }).catch(() => {
        this.setState({
          dialogMessage: 'Problemas ao excluir a pessoa'
        })
      })
    }
  }

  getUsuarios = () => {
    axios.get('http://localhost:8081/pessoa').then(this.handleUsers).catch(function (error) {
      alert(error);
    });
  }

  handleUsers = (response) => {
    this.setState({ emails: response.data.map(d => d.email), users: response.data, done: true })

  }

  displayUser = () => {
    this.state.users.forEach((obj, index) => {

      if (obj.email === this.state.emailSelecionado) {
        this.setState({
          cargo: obj.cargo,
          nome: obj.nome,
          id: obj._id
        })
        return
      }
    })
  }

  handleCargo = (event, index, value) => {
    this.setState({ cargo: value })
  };

  handleSalvarPermissoes = () => {

    axios.put('http://localhost:8081/change-role', {
      email: this.state.emailSelecionado,
      cargo: this.state.cargo
    })
      .then(function (response) {
      })
      .then(function (error) {
        if (error) {
        }
      })

    axios.get('http://localhost:8081/pessoa?q=', {
      email: this.state.emailSelecionado
    })
      .then(function (response) {
      })
      .then(function (error) {
        if (error) {
        }
      })
  }
}