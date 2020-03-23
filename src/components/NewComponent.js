import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as MUI from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import { saveHelpItem, getHelpLists } from '../actions/MainAction';
import phLocations from '../json/parsedLocations.json';
import ppeList from '../json/ppeList.json';
import Form from './FormComponent';

const styles = theme => ({
  formGroupMargin: {
    margin: '10px 0px'
  },
  formCardPadding: {
    padding: '12px'
  },
  formTypographyPadding: {
    padding: '0px 0px 12px 0px'
  }
});

class NewComponent extends Component {
  constructor(props) {
    super(props)
    this.classes = props.classes

    this.state = {
      type: '',
      item: '',
      amount: 1,
      locCity: '',
      locBarangay: '',
      locOther: '',
      barangayList: [],
      contactPerson: '',
      contactNumber: '',
      contactFacebook: '',

    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(key) {
    return (event, value) => {
      if (key === 'locCity') {
        this.setState({
          [key]: value,
          locBarangay: '',
          barangayList: this.getBarangayList(value),
        });
      }
      else if (key === 'locBarangay') {
        this.setState({ [key]: value });
      }
      else this.setState({ [key]: event.target.value })
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    let submitItem = {};
    for (var key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        if (key !== 'barangayList') {
          submitItem = { ...submitItem, [key]: this.state[key] }
        }
      }
    }

    let result = await this.props.saveHelpItem(submitItem);

    if (result === 'OK') {
      this.setState({
        type: '',
        item: '',
        amount: 1,
        locCity: '',
        locBarangay: '',
        locOther: '',
        barangayList: [],
        contactPerson: '',
        contactNumber: '',
        contactFacebook: '',
      });
  
      this.props.getHelpLists()
    }
  }

  getBarangayList(city) {
    let returnList = [];

    for (let i = 0; i < phLocations.citiesWithBarangayList.length; i++) {
      if (phLocations.citiesWithBarangayList[i]['city'] === city) {
        returnList = phLocations.citiesWithBarangayList[i]['barangayList'];
        break;
      }
    }

    return returnList;
  }

  render() {
    return (
      <Form
        styles={this.classes}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        type={this.state.type}
        item={this.state.item}
        amount={this.state.amount}
        locCity={this.state.locCity}
        locBarangay={this.state.locBarangay}
        locOther={this.state.locOther}
        barangayList={this.state.barangayList}
        contactPerson={this.state.contactPerson}
        contactNumber={this.state.contactNumber}
        contactFacebook={this.state.contactFacebook}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    details: state.main.details,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    saveHelpItem,
    getHelpLists,
  }, dispatch);
}

export default
  connect(mapStateToProps, matchDispatchToProps) 
  (withStyles(styles)(withRouter(NewComponent)));
