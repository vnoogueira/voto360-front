import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import '../dist/css/tablePolitician.css'

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

export default class TablePolitician extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: false,
            stripedRows: true,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px',
        };
    }


    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({ height: event.target.value });
    };

    render() {
        console.log(this.props)
        return (
            <div>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        {/* <TableRow>
                            <TableHeaderColumn tooltip="The ID" className="td-1">Informação</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name" className="td-2"> {this.props.firstPolitician && this.props.firstPolitician.NomeParlamentar ? this.props.firstPolitician.NomeParlamentar : null}</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status" className="td-3">{this.props.secondPolitician && this.props.secondPolitician.NomeParlamentar ? this.props.secondPolitician.NomeParlamentar : null} </TableHeaderColumn>
                        </TableRow> */}
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        <TableRow >
                            <TableRowColumn className="td-1">Nome completo</TableRowColumn>
                            <TableRowColumn className="td-2">{this.props.firstPolitician && this.props.firstPolitician.NomeCompletoParlamentar ? this.props.firstPolitician.NomeCompletoParlamentar : null}</TableRowColumn>
                            <TableRowColumn className="td-3">{this.props.secondPolitician && this.props.secondPolitician.NomeCompletoParlamentar ? this.props.secondPolitician.NomeCompletoParlamentar : null}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="td-1">Email parlamentar</TableRowColumn>
                            <TableRowColumn className="td-2">{this.props.firstPolitician && this.props.firstPolitician.EmailParlamentar ? this.props.firstPolitician.EmailParlamentar : null}</TableRowColumn>
                            <TableRowColumn className="td-3">{this.props.secondPolitician && this.props.secondPolitician.EmailParlamentar ? this.props.secondPolitician.EmailParlamentar : null}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="td-1">Cargo</TableRowColumn>
                            <TableRowColumn className="td-2">{this.props.firstPolitician && this.props.firstPolitician.FormaTratamento ? this.props.firstPolitician.FormaTratamento : null}</TableRowColumn>
                            <TableRowColumn className="td-3">{this.props.secondPolitician && this.props.secondPolitician.FormaTratamento ? this.props.secondPolitician.FormaTratamento : null}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="td-1">Sexo</TableRowColumn>
                            <TableRowColumn className="td-2">{this.props.firstPolitician && this.props.firstPolitician.SexoParlamentar ? this.props.firstPolitician.SexoParlamentar : null}</TableRowColumn>
                            <TableRowColumn className="td-3">{this.props.secondPolitician && this.props.secondPolitician.SexoParlamentar ? this.props.secondPolitician.SexoParlamentar : null}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="td-1">Partido</TableRowColumn>
                            <TableRowColumn className="td-2">{this.props.firstPolitician && this.props.firstPolitician.SiglaPartidoParlamentar ? this.props.firstPolitician.SiglaPartidoParlamentar : null}</TableRowColumn>
                            <TableRowColumn className="td-3">{this.props.secondPolitician && this.props.secondPolitician.SiglaPartidoParlamentar ? this.props.secondPolitician.SiglaPartidoParlamentar : null}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="td-1">Mandatos</TableRowColumn>
                            <TableRowColumn className="td-2">{this.props.firstPolitician && this.props.firstPolitician.mandatos ? this.props.firstPolitician.mandatos : null}</TableRowColumn>
                            <TableRowColumn className="td-3">{this.props.secondPolitician && this.props.secondPolitician.mandatos ? this.props.secondPolitician.mandatos : null}</TableRowColumn>
                        </TableRow>
                    </TableBody>

                </Table>


            </div>
        );
    }
}