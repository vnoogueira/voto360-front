import React from 'react';
import axios from 'axios';

import '../dist/css/pesquisaPoliticoItem.css'

export default class PesquisaPoliticoItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            response: undefined
        }
    }


    componentWillMount() {
        var id = this.props.id;
        axios({
            method: 'get',
            url: 'http://legis.senado.leg.br/dadosabertos/senador/lista/atual',
            "headers": {
                "accept": "application/json"
            }
        })
            .then((res) => {
                this.setState({ 
                                response: res.data.ListaParlamentarEmExercicio,
                                politicians: res.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar 
                            })
                var names = []
                res.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.forEach((politicianInfo, index) => {

                    names.push(politicianInfo.IdentificacaoParlamentar.NomeParlamentar)
                })
                this.setState({ politiciansNames: names })
                return res;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    }


    render() {
        return (
            <div>
                <img src={this.state.response && this.state.response.urlFoto} alt="foto do politico" className="img" />
                <label htmlFor="radioButton">{this.state.response && this.state.response.nome}</label>
                <input name="politicos" type="radio" id="politico" />
            </div>
            
        )
    }
}