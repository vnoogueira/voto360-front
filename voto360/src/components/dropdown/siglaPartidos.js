import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import '../../dist/css/siglaPartido.css'
import axios from 'axios'

const items = [];
const styles = {
  customWidth: {
    width: 300,
  },
};

export default class SiglaPartido extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        response: {},
        value: -1
    };

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.siglaDoPartido = nextProps.value;
  }

  componentDidMount() {
      axios.get(`https://dadosabertos.camara.leg.br/api/v2/partidos?ordenarPor=sigla`)
          .then((res) => {
              this.setState({ response: res.data.dados })
              for (let i = 0; i < this.state.response.length; i++) {
                items.push(<MenuItem key={i} value={this.state.response[i].sigla} primaryText={this.state.response[i].sigla + " - " + this.state.response[i].nome} className="dropdown-menu-item" />);
                }
              return res;
          })
          .catch((error) => {
              console.log(error);
              return error;
          })
        
        
  }

  handleChange = (event, index, value) => {
    this.setState({value: value})
    this.props.handleChange(event, value)
  } 

  render() {
      
    return (
        <DropDownMenu 
          maxHeight={300} 
          style={styles.customWidth}
          autoWidth={false} 
          value={this.state.value} 
          onChange={this.handleChange} 
          className="dropdown-menu">
        {items}
      </DropDownMenu>
    );
  }
}