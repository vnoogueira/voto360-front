import React from 'react'

import { Card, CardActions, CardTitle } from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { gray900 } from 'material-ui/styles/colors';
import '../../dist/css/cadastroPolitico.css';
import SiglaPartido from '../dropdown/siglaPartidos';
import Estados from '../dropdown/estados';
import NiveisDeEscolaridade from '../dropdown/nivelDeEscolaridade';
import InputCNPJ from '../inputs/InputCNPJ';
import SimpleDialog from '../dialogs/SimpleDialog'

import { cookie } from 'cookie_js';
import axios from 'axios';
import { CNPJ } from 'cpf_cnpj';

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

export default class AlteraCadastroPolitico extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            biografia: '',
            oldbiografia: '',

            success: false,
            open: false

        }

    }

    componentWillMount() {
        const cookieUser = cookie.get('user');
        let user;
        if (cookieUser) {
            user = JSON.parse(cookieUser);
            console.log(user)
            this.setState({
                user: user,
                email: user.email,
            })
        }
        
        var id = user._id;
        axios.get(`http://localhost:8081/api/pessoa/${id}/politico`)
            .then((res) => {
                console.log(res.data.biografia)
                this.setState({
                    biografia: res.data.biografia,
                    oldbiografia: res.data.biografia
                })
            })
            .catch((error) => {
                alert(error);
            });

    }

    changeInfo = () => {

        var request = {};

        if (this.state.biografia && this.state.biografia !== this.state.oldbiografia) {
            request.biografia = this.state.biografia
        }
        var id = this.state.user._id;
        axios.put(`http://localhost:8081/api/pessoa/${id}/politico`, request)
          .then((response) => {
            this.handleSuccess()
          })
          .catch((error) => {
            this.handleFailure()
          })

    }

    handleSuccess = (response) => {
        this.setState({ success: true, open: true })
    }

    handleFailure = (err) => {
        this.setState({ success: false, open: true })
        console.log(err)
    }

    handleChange = (event, index, value) => {
        this.setState({ partido: value })
    }

    handleEstadoChange = (event, index, value) => {
        this.setState({ estado: value })
    }

    handleEscolaridadeChange = (event, index, value) => {
        this.setState({ nivelescolaridade: value })
    }

    render() {
        return (<div className="card-div">
            <Card className="user-card-container">
                <CardTitle title="Alterar Cadastro Político" className="card-title" />
                <div className="user-card-info">

                    <TextField
                        value={this.state.biografia}
                        hintText="Biografia"
                        floatingLabelText="Biografia"
                        multiLine={true}
                        rows={2}
                        rowsMax={50}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onChange={(event, text) => {
                            this.setState({ biografia: text })
                        }}
                    />
                </div>
                <div className="buttons">
                    <CardActions className="card-actions">
                        <RaisedButton label="Alterar Informações" primary={true} fullWidth={true} onClick={this.changeInfo} />
                    </CardActions>
                </div>
            </Card>
            <SimpleDialog
                open={this.state.open}
                title={this.state.success ? 'Alteração feita' : 'Algo deu errado'}
                message={this.state.success ? 'Sua alteração foi feita com sucesso' : 'Algo deu errado, verifique as informações e tente novamente.'}
                onRequestClose={() => {
                    this.setState({
                        open: false,
                    })
                }}
            />
        </div>)
    }
}