import React from 'react'

import axios from 'axios';
import { RaisedButton, Divider, Avatar } from 'material-ui';
import PesquisaPoliticoItem from './pesquisaPoliticoItem'

import { cookie } from 'cookie_js'
import { Redirect } from 'react-router-dom'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import SimpleDialog from './dialogs/SimpleDialog';

import '../dist/css/pesquisa.css'

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

export default class Pesquisa extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pesquisas: [],
      done: false,
      open: false
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:8081/api/pesquisa',
      "headers": {
        "accept": "application/json"
      }
    }).then((res) => {
      console.log(res)
      let pesquisas = [];

      if (res.data) {
        res.data.forEach(pesquisa => {
          pesquisas.push(
            {
              "id": pesquisa._id,
              "titulo": pesquisa.titulo,
              "descricao": pesquisa.descricao,
              "opcoes": pesquisa.politicos
            }
          );
        });
      }

      this.setState({ pesquisas: pesquisas });
    }).catch((error) => {
      console.log(error);
      return error;
    });
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOpt: changeEvent.target.value
    })
  }

  onChange = (event, id) => {
    this.setState({ selected: id });
  }



  render() {
    const user = cookie.get('user');
    const pesquisas = this.state.pesquisas;
    const teste = ["0", "1", "2", "3"];

    return (
      <div>
          <h2>Pesquisas de Voto</h2>
        <div className="card-container">
          {
            pesquisas.map((pesquisa, indexPesquisa) => {
              let politico_id = '';
              return (
                <Card className="card" id={indexPesquisa}>
                  <CardTitle title={pesquisa.titulo} subtitle={pesquisa.descricao} className="card-title" />
                  <RadioButtonGroup name="shipSpeed" labelPosition="left" className="radio-buttongroup" key={indexPesquisa + "pesquisa"} onChange={(event, value) => {
                    politico_id = value
                  }}>
                    {
                      pesquisa.opcoes.map((opcao, i) => {
                        return (<RadioButton
                          value={opcao.politico._id}
                          label={opcao.politico.nome_eleitoral}
                          style={styles.radioButton}
                          key={ + "politico"}
                          className="radio-button"
                        />)
                      })
                    }
                  </RadioButtonGroup>
                  <CardActions>
                    <RaisedButton label="Votar" secondary={true} fullWidth={true} onClick={() => {pesquisa.id && politico_id ? this.makeVote(pesquisa.id, politico_id, indexPesquisa) : null }} />
                  </CardActions>
                </Card>);
            })
          }
        </div>
        <SimpleDialog
                open={this.state.open}
                title={this.state.done ? 'Voto computado' : 'Algo deu errado'}
                message={this.state.done ? 'Seu voto foi efetuado com sucesso' : 'Algo deu errado, tente novamente mais tarde.'}
                onRequestClose={() => {
                    this.setState({
                        open: false,
                    })
                }}
            />
      </div>
    );

  };

  makeVote = (pesquisa_id, politico_id, indexPesquisa) => {
    axios.post(`http://localhost:8081/api/pesquisa/${pesquisa_id}/votar/${politico_id}`)
      .then((response) => {
        this.getResults(pesquisa_id)
        this.setState({
          done: true,
          open: true
        })
      })
      .catch(function (error) {
        alert(error);
        this.setState({
          done: false,
          open: true
        })
      });
  }

  getResults = (pesquisa_id) => {
    console.log("get results")
    axios.get(`http://localhost:8081/api/pesquisa/${pesquisa_id}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        alert(error);
      });
  }

};
