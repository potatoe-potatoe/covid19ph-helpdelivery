import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MUI from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
// import axios from 'axios';


import HomeComponent from './components/HomeComponent'

const styles = theme => ({
  appBar: {
    position: 'relative',
    marginLeft: 240
  },
  icon: {
    // marginRight: theme.spacing.unit(2),
  },
  browserRouter: {
    // marginLeft: 240
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.classes = props.classes
  }

  render() {
    return <React.Fragment>
      <CssBaseline />
      <BrowserRouter className={this.classes.browserRouter}>
        <Route path="/" exact component={HomeComponent} />
      </BrowserRouter>
    </React.Fragment>
  }

}

function mapStateToProps(state) {
  return {
    // sample: state.sample
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default
  connect(mapStateToProps, matchDispatchToProps)
  (withStyles(styles)(App));
