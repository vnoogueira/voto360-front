import React from 'react'
import TextField from 'material-ui/TextField';


export default class InputCNPJ extends React.Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.cnpjMascarado = ''
  }

  componentWillReceiveProps(nextProps) {
    this.cnpjMascarado = this.formatCPF(nextProps.value)
  }

  formatCPF (cnpj = '') {
        cnpj=cnpj.replace(/\D/g,"")
				cnpj=cnpj.replace(/^(\d{2})(\d)/,"$1.$2")
				cnpj=cnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
				cnpj=cnpj.replace(/\.(\d{3})(\d)/,".$1/$2")
				cnpj=cnpj.replace(/(\d{4})(\d)/,"$1-$2")
				return cnpj
  }

  handleChange(e) {
    this.props.onChange(e, e.target.value.replace(/ˆ[0-9]/, ''))
  }

  render() {
    return (
      <TextField
        {...this.props}
        value={this.cnpjMascarado}
        onChange={this.handleChange}
        maxLength="18"
      />
    )
  }

}
