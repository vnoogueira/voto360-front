import React from 'react';
import axios from 'axios';

export default class CriarPesquisa extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            response: undefined
        }
    }


    componentWillMount() {
        var id = this.props.id;
        axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?id=${id}`)
            .then((res) => {
                console.log(res);
                this.setState({ response: res.data.dados[0] })
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
                Create New Poll
            </div>

        )
    }
}