import React from 'react';

import '../dist/css/politicianListItem.css'

export default class PoliticianListItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            response: undefined,
            open: true
        }
    }



    handleChange = () => {
        this.props.handleOptionChange(this.props.value._id)
    }

    render() {
        return (
            <div className="politician-item-div" onClick={this.handleChange}>
                <h3 className="politician-name">{this.props.value.nome_eleitoral}</h3>
                <span className="politician-email">{this.props.value.email_eleitoral}</span>
               
            </div>

        )
    }
}