import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import '../../dist/css/siglaPartido.css'

const items = []


export default class Estados extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      states: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', "'PB'", 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
      value: ''
    }
  }

  componentDidMount() {
    for (let i = 0; i < this.state.states.length; i += 1) {
      items.push(<MenuItem value={this.state.states[i]} key={this.state.states[i]} primaryText={this.state.states[i]} />)
    }
  }

  handleChange = (event, index, value) => {
    this.setState({ value })
    this.props.handleEstadoChange(event, value)
  }

  render() {
    return (
      <DropDownMenu maxHeight={300} autoWidth={false} value={this.state.value} onChange={this.handleChange} className="dropdown-menu" >
        {items}
      </DropDownMenu>
    )
  }
}
