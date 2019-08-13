import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


/**
 * `SelectField` is implemented as a controlled component,
 * with the current selection set through the `value` property.
 * The `SelectField` can be disabled with the `disabled` property.
 */
export default class SelectCargo extends Component {
  state = {
    value: '',
  };

  handleChange = (event, index, value) => {
    console.log(value);
    this.setState({value})
  };

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Permissões"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={"eleitor"} primaryText="Eleitor" />
          <MenuItem value={"politico"} primaryText="Político" />
          <MenuItem value={"admin"} primaryText="Admin" />
        </SelectField>
      </div>
    );
  }
}
