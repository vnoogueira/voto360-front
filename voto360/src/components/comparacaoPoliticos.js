import React from 'react';
import axios from 'axios';

import { AutoComplete, RefreshIndicator } from 'material-ui';
import { gray900 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Proposicoes from './proposicoes'
import echarts from 'echarts';
import { List, ListItem, RaisedButton } from 'material-ui';
import PoliticianInfoDropdown from './dropdown/politicianInfoDropdown'
import SimpleDialog from './dialogs/SimpleDialog'
import TablePolitician from './TablePolitician'


import '../dist/css/comparacaopoliticos.css'

const styles = {
    floatingLabelStyle: {
        color: gray900,
    },
    underlineStyle: {
        borderColor: gray900,
    }
};

export default class ComparacaoPoliticos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            response: {},
            politicians: [],
            politiciansNames: [],
            selectedFirstNomeParlamentar: '',
            selectedPoliticianFirst: {
                CodigoParlamentar: undefined,
                idLegislatura: undefined,
                NomeParlamentar: "",
                NomeCompletoParlamentar: "",
                SexoParlamentar: "",
                FormaTratamento: "",
                UrlFotoParlamentar: "",
                UrlPaginaParlamentar: "",
                EmailParlamentar: "",
                SiglaPartidoParlamentar: "",
                UfParlamentar: "",
                votacoes: 0,
                mandatos: 0,
                autorias: 0
            },
            notFoundFirstPolitician: false,
            openFirstPoliticianModal: false,
            selectedSecondNomeParlamentar: '',
            selectedPoliticianSecond: {
                CodigoParlamentar: undefined,
                idLegislatura: undefined,
                NomeParlamentar: "",
                NomeCompletoParlamentar: "",
                SexoParlamentar: "",
                FormaTratamento: "",
                UrlFotoParlamentar: "",
                UrlPaginaParlamentar: "",
                EmailParlamentar: "",
                SiglaPartidoParlamentar: "",
                UfParlamentar: "",
                votacoes: 0,
                mandatos: 0,
                autorias: 0
            },
            notFoundSecondPolitician: false,
            openSecondPoliticianModal: false,
            done: false,
            errorMessage: ''
        }
    }


    componentWillMount() {
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

    componentDidUpdate(prevProps, prevState) {

        if ((this.state.selectedPoliticianFirst.CodigoParlamentar === undefined || this.state.selectedPoliticianSecond.CodigoParlamentar === undefined)
            || ((this.state.selectedPoliticianFirst.CodigoParlamentar === prevState.selectedPoliticianFirst.CodigoParlamentar && this.state.selectedPoliticianSecond.CodigoParlamentar === prevState.selectedPoliticianSecond.CodigoParlamentar))) {
            return;
        }


        axios({
            method: 'get',
            url: 'http://legis.senado.leg.br/dadosabertos/senador/' + this.state.selectedPoliticianFirst.CodigoParlamentar + '/votacoes',
            "headers": {
                "accept": "application/json"
            }
        }).then((res) => {
            console.log("votacoes")
            const currentState = Object.assign({}, this.state)
            currentState.selectedPoliticianFirst.votacoes = res.data.VotacaoParlamentar.Parlamentar.Votacoes.Votacao.length
            this.setState(currentState)

            var domVotacoes = document.getElementById("graphVotacoes");
            var chartVotacoes = echarts.init(domVotacoes);
            var optionsVotacoes = null;
            optionsVotacoes = {
                title: {
                    text: 'Comparativo de Número de Votações'
                },
                xAxis: {
                    type: 'category',
                    data: [
                        this.state.selectedPoliticianFirst.NomeParlamentar,
                        this.state.selectedPoliticianSecond.NomeParlamentar
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [
                        {
                            value: this.state.selectedPoliticianFirst.votacoes,
                            itemStyle: { color: 'rgb(178, 223, 219)' }
                        },
                        {
                            value: this.state.selectedPoliticianSecond.votacoes,
                            itemStyle: { color: 'rgb(0, 105, 92)' }
                        }],
                    type: 'bar'
                }]
            };
            if (optionsVotacoes && typeof optionsVotacoes === "object") {
                chartVotacoes.setOption(optionsVotacoes, true);
            }
            this.setState({
                firstPoliticianVotacoes: true
            })
        })
            .catch((error) => {
                console.log(error);
                return error;
            });


        axios({
            method: 'get',
            url: 'http://legis.senado.leg.br/dadosabertos/senador/' + this.state.selectedPoliticianSecond.CodigoParlamentar + '/votacoes',
            "headers": {
                "accept": "application/json"
            }
        }).then((res) => {
            const currentState = Object.assign({}, this.state)
            currentState.selectedPoliticianSecond.votacoes = res.data.VotacaoParlamentar.Parlamentar.Votacoes.Votacao.length
            this.setState(currentState)

            var domVotacoes = document.getElementById("graphVotacoes");
            var chartVotacoes = echarts.init(domVotacoes);
            var optionsVotacoes = null;
            optionsVotacoes = {
                title: {
                    text: 'Comparativo de Número de Votações'
                },
                xAxis: {
                    type: 'category',
                    data: [
                        this.state.selectedPoliticianFirst.NomeParlamentar,
                        this.state.selectedPoliticianSecond.NomeParlamentar
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [
                        {
                            value: this.state.selectedPoliticianFirst.votacoes,
                            itemStyle: { color: 'rgb(178, 223, 219)' }
                        },
                        {
                            value: this.state.selectedPoliticianSecond.votacoes,
                            itemStyle: { color: 'rgb(0, 105, 92)' }
                        }],
                    type: 'bar'
                }]
            };
            if (optionsVotacoes && typeof optionsVotacoes === "object") {
                chartVotacoes.setOption(optionsVotacoes, true);
            }
            this.setState({
                secondPoliticianVotacoes: true
            })
        })
            .catch((error) => {
                console.log(error);
                return error;
            });

        axios({
            method: 'get',
            url: 'http://legis.senado.leg.br/dadosabertos/senador/' + this.state.selectedPoliticianFirst.CodigoParlamentar + '/mandatos',
            "headers": {
                "accept": "application/json"
            }
        }).then((res) => {
            console.log("mandatos")
            const currentState = Object.assign({}, this.state)
            currentState.selectedPoliticianFirst.mandatos = res.data.MandatoParlamentar.Parlamentar.Mandatos.Mandato.length
            this.setState(currentState)

            var domMandato = document.getElementById("graphMandato");
            var chartMandato = echarts.init(domMandato);
            var optionsMandatos = null;
            optionsMandatos = {
                title: {
                    text: 'Comparativo de Número de Mandatos'
                },
                xAxis: {
                    type: 'category',
                    data: [this.state.selectedPoliticianFirst.NomeParlamentar,
                    this.state.selectedPoliticianSecond.NomeParlamentar]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [
                        {
                            value: this.state.selectedPoliticianFirst.mandatos,
                            itemStyle: { color: 'rgb(178, 223, 219)' }
                        },
                        {
                            value: this.state.selectedPoliticianSecond.mandatos,
                            itemStyle: { color: 'rgb(0, 105, 92)' }
                        }],
                    type: 'bar'
                }]
            };
            if (optionsMandatos && typeof optionsMandatos === "object") {
                chartMandato.setOption(optionsMandatos, true);
            }
            this.setState({
                firstPoliticianMandato: true
            })
        })
            .catch((error) => {
                console.log(error);
                return error;
            });


        axios({
            method: 'get',
            url: 'http://legis.senado.leg.br/dadosabertos/senador/' + this.state.selectedPoliticianSecond.CodigoParlamentar + '/mandatos',
            "headers": {
                "accept": "application/json"
            }
        }).then((res) => {
            const currentState = Object.assign({}, this.state)
            currentState.selectedPoliticianSecond.mandatos = res.data.MandatoParlamentar.Parlamentar.Mandatos.Mandato.length
            this.setState(currentState)

            var domMandato = document.getElementById("graphMandato");
            var chartMandato = echarts.init(domMandato);
            var optionsMandatos = null;
            optionsMandatos = {
                title: {
                    text: 'Comparativo de Número de Mandatos'
                },
                xAxis: {
                    type: 'category',
                    data: [this.state.selectedPoliticianFirst.NomeParlamentar,
                    this.state.selectedPoliticianSecond.NomeParlamentar]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [
                        {
                            value: this.state.selectedPoliticianFirst.mandatos,
                            itemStyle: { color: 'rgb(178, 223, 219)' }
                        },
                        {
                            value: this.state.selectedPoliticianSecond.mandatos,
                            itemStyle: { color: 'rgb(0, 105, 92)' }
                        }],
                    type: 'bar'
                }]
            };
            if (optionsMandatos && typeof optionsMandatos === "object") {
                chartMandato.setOption(optionsMandatos, true);
            }
            this.setState({
                secondPoliticianMandato: true
            })
        })
            .catch((error) => {
                console.log(error);
                return error;
            });

    }

    render() {
        return (
            <main className="main-container">
                <h2>Comparação de Políticos</h2>
                <div className="content-container">
                    <section className="politician-search-container">
                        <div className="politician-search">
                            <h3 className="heading-center">Selecione o Político</h3>
                            <div className="search-elements-container">
                                <AutoComplete
                                    filter={AutoComplete.fuzzyFilter}
                                    dataSource={this.state.politiciansNames}
                                    maxSearchResults={5}
                                    floatingLabelText="Pesquise o político por nome"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    onNewRequest={(text, index) => {
                                        this.setState({
                                            selectedFirstNomeParlamentar: text,
                                            notFoundFirstPolitician: false,
                                            openFirstPoliticianModal: false
                                        })
                                    }}
                                    onUpdateInput={(text) => {
                                        if (text.length > 3) {
                                            this.setState({
                                                selectedFirstNomeParlamentar: text,
                                                notFoundFirstPolitician: false,
                                                openFirstPoliticianModal: false
                                            })
                                        }
                                    }
                                    }
                                />
                                <i className="material-icons">add_circle</i>
                                <AutoComplete
                                    filter={AutoComplete.fuzzyFilter}
                                    dataSource={this.state.politiciansNames}
                                    maxSearchResults={5}
                                    floatingLabelText="Pesquise o político por nome"
                                    errorText={this.state.samePoliticianError ? this.state.errorMessage : null}
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    onNewRequest={(text, index) => {
                                        if (this.state.selectedFirstNomeParlamentar === text) {
                                            this.setState({
                                                selectedSecondNomeParlamentar: text,
                                                notFoundSecondPolitician: false,
                                                openSecondPoliticianModal: false,
                                                samePoliticianError: true,
                                                errorMessage: 'Por favor, selecione um político diferente.',
                                            })
                                        } else {
                                            this.setState(prevState => ({
                                                selectedSecondNomeParlamentar: text,
                                                notFoundSecondPolitician: false,
                                                openSecondPoliticianModal: false,
                                                samePoliticianError: false,
                                                errorMessage: ''
                                            }))
                                        }

                                    }}
                                    onUpdateInput={(text) => {
                                        if (this.state.selectedFirstNomeParlamentar === text) {
                                            this.setState({
                                                selectedSecondNomeParlamentar: text,
                                                notFoundSecondPolitician: false,
                                                openSecondPoliticianModal: false,
                                                samePoliticianError: true,
                                                errorMessage: 'Por favor, selecione um político diferente.'
                                            })
                                        } else if (text.length >= 3) {
                                            this.setState({
                                                selectedSecondNomeParlamentar: text,
                                                notFoundSecondPolitician: false,
                                                openSecondPoliticianModal: false,
                                                samePoliticianError: false,
                                                errorMessage: ''
                                            })
                                        }
                                    }}
                                />

                            </div>
                            <div className="search-btn-container">
                                <RaisedButton label="Comparar" backgroundColor='#BDBDBD' primary={true} onClick={this.displayComparison} fullWidth={true} />
                            </div>
                        </div>

                    </section>
                    <section className="politician-search-container">
                        <div>{this.state.done ? <TablePolitician firstPolitician={this.state.selectedPoliticianFirst} secondPolitician={this.state.selectedPoliticianSecond} /> : null}</div>
                        <Divider />
                            {this.state.done ? (<div id="graphMandato" className={`graph`}></div>) : null}
                            {this.state.done ? (<div id="graphVotacoes" className={`graph`}></div>) : null}
                        
                    </section>
                </div>

                <SimpleDialog
                    open={!!this.state.openFirstPoliticianModal}
                    title={this.state.notFoundFirstPolitician ? 'Político não encontrado' : null}
                    message={this.state.notFoundFirstPolitician ? 'Algo deu errado, verifique as informações e tente novamente.' : null}
                    onRequestClose={() => {
                        this.setState({
                            openFirstPoliticianModal: false,
                            notFoundFirstPolitician: false
                        })
                    }}
                />
                <SimpleDialog
                    open={!!this.state.openSecondPoliticianModal}
                    title={this.state.notFoundSecondPolitician ? 'Político não encontrado' : null}
                    message={this.state.notFoundSecondPolitician ? 'Algo deu errado, verifique as informações e tente novamente.' : null}
                    onRequestClose={() => {
                        this.setState({
                            openSecondPoliticianModal: false,
                            notFoundSecondPolitician: false
                        })
                    }}
                />
            </main>

        )
    }

    findFirstPolitician = (element) => {
        return element.IdentificacaoParlamentar.NomeParlamentar === this.state.selectedFirstNomeParlamentar
    }

    findSecondPolitician = (element) => {
        return element.IdentificacaoParlamentar.NomeParlamentar === this.state.selectedSecondNomeParlamentar
    }

    displayComparison = () => {
        if (this.state.selectedFirstNomeParlamentar === this.state.selectedSecondNomeParlamentar) {
            this.setState({
                samePoliticianError: true,
                errorMessage: 'Por favor, selecione um político diferente.'
            })
            return
        } else {
            let foundFirstPolitician = this.state.politicians.find((element) => this.findFirstPolitician(element))
            let foundSecondPolitician = this.state.politicians.find((element) => this.findSecondPolitician(element))

            if (foundFirstPolitician && foundSecondPolitician) {
                if (foundFirstPolitician === foundSecondPolitician) {
                    this.setState(({
                        samePoliticianError: true
                    }))
                } else {
                    this.setState(({
                        selectedPoliticianFirst: foundFirstPolitician.IdentificacaoParlamentar,
                        selectedPoliticianSecond: foundSecondPolitician.IdentificacaoParlamentar,
                        done: true
                    }))
                }

            } else {
                this.setState({
                    notFoundFirstPolitician: true,
                    openFirstPoliticianModal: true
                })
            }
            return
        }




    }




}
