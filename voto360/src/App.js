import React from 'react'

import Content from './components/content'
import * as Colors from 'material-ui/styles/colors';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter as Router } from 'react-router-dom'


import './dist/css/app.css'
import './dist/iconfont/material-icons.css'


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClose = () => this.setState({ open: false });

  handleToggle = () => this.setState({
    open: !this.state.open
  });

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Router>
          <div className={this.state.open ? "mainContainerDivOpen" : "mainContainerDivClosed"}>
            <AppBar onLeftIconButtonClick={this.handleToggle} title="VOTO360" style={{ backgroundColor: Colors.indigo900 }} />
            <Content open={this.state.open} handleToggle={this.handleToggle} handleClose={this.handleClose} className="container-body" />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
