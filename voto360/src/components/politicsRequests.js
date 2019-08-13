import React from 'react'
import axios from 'axios'
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import { List } from 'material-ui/List';
import PoliticianListItem from './politicianListItem'
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CircularProgress from 'material-ui/CircularProgress';
import AutoComplete from 'material-ui/AutoComplete';

import '../dist/css/politicsrequest.css'

const style = {
  margin: 12,
};

export default class PoliticsRequests extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      emails: [],
      users: [],
      emailSelecionado: '',
      cargo: '',
      nome: '',
      politicians_response: [],
      selected_politician: [],
      timer: null,
      isLoading: true,
      approvedPoliticiansList: [],
      selectedApprovedPolitician: ''
    }
    this.handleUsers = this.handleUsers.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  generateRequest() {

    this.timer = setTimeout(() => {
      axios.get('http://localhost:8081/politico')
        .then((res) => {
          this.setState({ politicians_response: res.data, isLoading: false })
          this.generateRequest()
          return res;
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false })
          this.generateRequest()
          return error;

        })
    }, 1000);
  }

  componentDidMount() {
    this.generateRequest()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  // componentWillUpdate() {
  //   const approvedList = this.state.approvedPoliticiansList.slice(0);

  //   this.state.politicians_response.forEach((item, i) => {
  //     approvedList.push(item.nome_eleitoral)
  //     console.log(approvedList)
  //     this.setState({
  //       approvedPoliticiansList: approvedList
  //     })
  //   })
  // }

  handleOptionChange = (i) => {
    console.log(i)
    axios.get(`http://localhost:8081/politico?q={"_id":"${i}"}`)
      .then((res) => {
        this.setState({
          selected_politician: res.data[0]
        })
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  }


  render() {
    return (<div className="container-list">

      <Tabs className="pending-list" tabItemContainerStyle={{ backgroundColor: "#0D47A1" }}>
        <Tab label="Pendentes" >
          <div >
            {this.state.isLoading ? (<div className="refresh-indicator">
              <CircularProgress />
            </div>) :
              (<List>
                {this.state.politicians_response.map((item, i) => {
                  return (item && (item.perfil_aprovado === "pending") ? (<span><PoliticianListItem
                    handleOptionChange={this.handleOptionChange}
                    key={i}
                    value={item}
                  /> <Divider /></span>) :
                    undefined)
                })}
              </List>)}

          </div>
        </ Tab>
        <Tab label="Rejeitados" onActive={this.handleActive}>
          <div >
            <RefreshIndicator
              size={50}
              left={70}
              top={0}
              status={this.state.isLoading ? 'loading' : 'hide'}
              style={style.refresh}
            />
            <List>
              {this.state.politicians_response.map((item, i) => {
                return (item && (item.perfil_aprovado === 'rejected') ? (<span><PoliticianListItem
                  handleOptionChange={this.handleOptionChange}
                  key={i}
                  value={item}
                /><Divider /></span>) : undefined
                )
              })}
            </List>

          </div>
        </ Tab>
        <Tab label="Aprovados" onActive={this.handleActive}>
          <div>
            <RefreshIndicator
              size={50}
              left={70}
              top={0}
              status={this.state.isLoading ? 'loading' : 'hide'}
              style={style.refresh}
            />
            <div className="filter">
              <AutoComplete
                floatingLabelText="Digite o Politico"
                filter={AutoComplete.fuzzyFilter}
                dataSource={this.state.politicians_response.map((politician) => politician.nome_eleitoral)}
                maxSearchResults={5}
                onNewRequest={(text, index) => {
                  this.state.politicians_response.map((politician) => {
                    if (politician.perfil_aprovado === 'approved') {
                      if (politician.nome_eleitoral === text) {
                        this.handleOptionChange(politician._id)
                      }
                    }
                  })
                  this.setState(prevState => ({
                    selectedApprovedPolitician: text
                  }))
                }}
                onUpdateInput={(text, dataSource, params) => {
                  console.log(text)
                  this.setState({
                    selectedApprovedPolitician: text
                  })
                }}
              />
            </div>
            <List>
              {this.state.politicians_response.map((item, i) => {
                return (item && (item.perfil_aprovado === 'approved') ? (<span><PoliticianListItem
                  handleOptionChange={this.handleOptionChange}
                  key={i}
                  value={item}
                /><Divider /></span>) : undefined
                )
              })}
            </List>

          </div>
        </ Tab>
      </Tabs>
      <div className="pending-info">
        {this.state.selected_politician && this.state.selected_politician.nome_eleitoral ?
          (<Card>
            <CardTitle title={this.state.selected_politician && this.state.selected_politician.nome_eleitoral} subtitle={this.state.selected_politician && this.state.selected_politician.emaileleitoral} />
            <CardText>
              {/* "1999-04-16T21:49:10.378Z"
            emaileleitoral:"jose.banana@gov.br"
            escolaridade:"Superior - Completo"
            estado:"SP"
            nome_eleitoral:"José Da Banana"
            partido:"DEM"
            perfil_aprovado:false
            __v:0
            _id:"5ad51a5e634001e0909138d1" */}
              {this.state.selected_politician && this.state.selected_politician.perfil_aprovado ? (<p>Situação: {this.state.selected_politician.perfil_aprovado}</p>) : undefined}
              {this.state.selected_politician && this.state.selected_politician.nome_eleitoral ? (<p>Nome Eleitoral: {this.state.selected_politician.nome_eleitoral}</p>) : undefined}
              {this.state.selected_politician && this.state.selected_politician.email_eleitoral ? (<p>Email Eleitoral: {this.state.selected_politician.email_eleitoral}</p>) : undefined}
              {this.state.selected_politician && this.state.selected_politician.escolaridade ? (<p>Escolaridade: {this.state.selected_politician.escolaridade}</p>) : undefined}
              {this.state.selected_politician && this.state.selected_politician.estado ? (<p>Estado: {this.state.selected_politician.estado}</p>) : undefined}
              {this.state.selected_politician && this.state.selected_politician.partido ? (<p>Partido: {this.state.selected_politician.partido}</p>) : undefined}

            </CardText>
            <CardActions>

              {this.state.selected_politician && (this.state.selected_politician.perfil_aprovado === "approved") ? null : <FlatButton label="Aprovar" onClick={this.handleApprovePolitician} />}
              {this.state.selected_politician && (this.state.selected_politician.perfil_aprovado === "pending") ? <FlatButton label="Reprovar" onClick={this.handleRejectPolitician} /> : null}
              {this.state.selected_politician && (this.state.selected_politician.perfil_aprovado === "approved") ? <FlatButton label="Desativar" onClick={this.handleDeactivatePolitician} /> : null}
            </CardActions>
          </Card>)
          : undefined}

      </div>
    </div>)
  }

  handleActive = () => {
    this.setState({
      selected_politician: undefined
    })
  }

  handleApprovePolitician = () => {
    this.setState({
      selected_politician: { undefined }
    })
    axios.put(`http://localhost:8081/api/politico/${this.state.selected_politician._id}/ativar`)
      .then(function (response) {
        console.log(response);
      })
      .then(function (error) {
        if (error) {
          console.log(error);
        }
      })
  }

  handleRejectPolitician = () => {
    this.setState({
      selected_politician: { perfil_aprovado: "rejected" }
    })
    axios.put(`http://localhost:8081/api/politico/${this.state.selected_politician._id}/rejeitar`)
      .then(function (response) {
        console.log(response);
      })
      .then(function (error) {
        if (error) {
          console.log(error);
        }
      })
  }

  handleDeactivatePolitician = () => {
    this.setState({
      selected_politician: { perfil_aprovado: "deactivated" }
    })
    console.log(this.state.selected_politician)
    axios.put(`http://localhost:8081/api/politico/${this.state.selected_politician._id}/desativar`)
      .then(function (response) {
        console.log(response);
        axios.put('http://localhost:8081/change-role', {
          email: this.state.selected_politician.email,
          cargo: "eleitor"
        })
          .then(function (response) {
          })
          .then(function (error) {
            if (error) {
            }
          })
      })
      .then(function (error) {
        if (error) {
          console.log(error);
        }
      })
  }

  getUsuarios = () => {
    axios.get('http://localhost:8081/pessoa').then(this.handleUsers).catch(function (error) {
      alert(error);
    });
  }

  handleUsers = (response) => {

    this.setState({ emails: response.data.map(d => d.email), users: response.data })
    console.log(this.state.emailSelecionado, "email selecionad")

  }

  displayUser = () => {
    this.state.users.forEach((obj, index) => {
      console.log(obj)
      if (obj.email === this.state.emailSelecionado) {
        console.log(obj.nome, "obj nome")
        this.setState({
          cargo: obj.cargo,
          nome: obj.nome
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
        console.log(response);
      })
      .then(function (error) {
        if (error) {
          console.log(error);
        }
      })

    axios.get('http://localhost:8081/pessoa?q=', {
      email: this.state.emailSelecionado
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

}
