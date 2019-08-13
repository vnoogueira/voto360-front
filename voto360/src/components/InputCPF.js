import React from 'react'
import TextField from 'material-ui/TextField';


export default class InputCPF extends React.Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.cpfMascarado = ''
  }

  componentWillReceiveProps(nextProps) {
    this.cpfMascarado = this.formatCPF(nextProps.value)
  }

  formatCPF (cpf = '') {
		cpf = cpf.replace(/\D/g,"")
		cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2")
		cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2")
		cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
		return cpf
  }

  handleChange(e) {
    this.props.onChange(e, e.target.value.replace(/ˆ[0-9]/, ''))
  }

  render() {
    return (
      <TextField
        {...this.props}
        value={this.cpfMascarado}
        onChange={this.handleChange}
        maxLength="14"
      />
    )
  }

}
