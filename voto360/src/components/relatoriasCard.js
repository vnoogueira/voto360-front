import React, { Component } from 'react'
import { BrowserRouter as Link } from 'react-router-dom'

import { FlatButton, Card, CardActions, CardHeader, CardTitle, CardText, Divider } from 'material-ui';

import '../dist/css/materiasCard.css'

import { cookie } from 'cookie_js'

const style = {
    boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.75)',
    margin: '3px'
}

class RelatoriasCards extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }


    render() {
        return (
            <Card style={style} >
                <div className="card-materia">
                    <h2 className="title">{this.props.item.Materia.IdentificacaoMateria.DescricaoSubtipoMateria}</h2>
                </div>
                <Divider />
                <div className="card-content">
                    <p className="subtitle">Numero da Matéria: {this.props.item.Materia.IdentificacaoMateria.NumeroMateria}</p>
                    <p className="subtitle">Ano da Matéria: {this.props.item.Materia.IdentificacaoMateria.AnoMateria}</p>
                    <Divider />
                    <p className="card-text">{this.props.item.Materia.EmentaMateria}</p>
                </div>
            </Card>
        )
    }
}

export default RelatoriasCards;
