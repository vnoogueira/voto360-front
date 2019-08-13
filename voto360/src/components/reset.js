import React from 'react'
import TextField from 'material-ui/TextField';
import axios from 'axios'


export default class Reset extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    }

  }

  getToken = () => (
    axios.get('http://localhost:8081/reset').then(this.handleUsers).catch(function(error) {
      alert(error);
    });
  )

  render() {
    <div>

    </div>
  }
}
