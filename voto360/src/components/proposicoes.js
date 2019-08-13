import React from 'react';
import axios from 'axios';

import DropDownMenu from 'material-ui/DropDownMenu';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import '../dist/css/siglaPartido.css'

const items = [];


export default class Proposicoes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: [],
            politician: {},
            value: "",
            id: undefined,
            MateriasDeAutoriaTramitando: {}
        };
    }

    componentWillMount(nextProps) {
        console.log(nextProps)
        if (this.props.idpolitico) {
            var candidato = this.props.idpolitico;
            axios({
                method: 'get',
                url: `http://legis.senado.leg.br/dadosabertos/senador/${candidato}`,
                "headers": {
                    "accept": "application/json"
                }
            })
                .then((res) => {
                    console.log(res)
                    this.setState({
                        response: res.data.DetalheParlamentar.Parlamentar.MateriasDeAutoriaTramitando.Materia
                    })
                    return res;
                })
                .catch((error) => {
                    return error;
                })
        }
    }


    render() {
        var materias = this.state.response;
        return (
            this.state.response ? (materias.map((item, i) => {
                console.log("renderrrr")
                return (<Card>
                    <CardHeader
                        title={item.IdentificacaoMateria.DescricaoSubtipoMateria}
                        subtitle={item.IdentificacaoMateria.NomeCasaIdentificacaoMateria}
                    />
                    <CardText>
                        {item.EmentaMateria}
                    </CardText>
                </Card>)
            })) : undefined
        )
    }
}