import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import '../../dist/css/siglaPartido.css'

const items = [];


export default class NiveisDeEscolaridade extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        response: {},
        niveis: ["Médio - Incompleto", "Médio - Completo", "Superior - Incompleto", "Superior - Completo", "Pós-graduação (Lato senso) - Incompleto", "Pós-graduação (Lato senso) - Completo", "Pós-graduação (Stricto sensu, nível mestrado) - Incompleto", "Pós-graduação (Stricto sensu, nível mestrado) - Completo", "Pós-graduação (Stricto sensu, nível doutor) - Incompleto", "Pós-graduação (Stricto sensu, nível doutor) - Completo"],
        value: -1
    };
  }

  componentDidMount() {
    for (let i = 0; i < this.state.niveis.length; i++) {
      items.push(<MenuItem value={this.state.niveis[i]} key={this.state.niveis[i]} primaryText={this.state.niveis[i]} />);
    }
  }

  handleChange = (event, index, value) => {
    this.setState({value})
    this.props.handleEscolaridadeChange(event, value)
  }

  render() {
      
    return (
      <DropDownMenu maxHeight={300} autoWidth={false} value={this.state.value} onChange={this.handleChange} className="dropdown-menu">
            {items}
      </DropDownMenu>
    );
  }
}