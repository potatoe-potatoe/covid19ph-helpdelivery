import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { saveHelpItem, getHelpLists } from '../actions/MainAction';
import phLocations from '../json/parsedLocations.json';
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

const requiredMsg = "This field is required.";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("Please select one."),
  item: Yup.string()
    .required(requiredMsg)
    .notOneOf(['default'], 'Please select a PPE item.'),
  amount: Yup.number()
    .required(requiredMsg)
    .integer('Amount must be an integer.')
    .positive('Amount must be greater than 1.'),
  locCity: Yup.string()
    .required(requiredMsg),
  locBarangay: Yup.string()
    .required(requiredMsg),
  contactPerson: Yup.string()
    .required(requiredMsg),
  contactNumber: Yup.string()
    .required(requiredMsg)
    .matches(/^[\d ()+-]+$/, 'This field can only contain: numbers, -, +, (, ).')
});

class NewComponent extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      // type: '',
      // item: '',
      // amount: 1,
      // locCity: '',
      // locBarangay: '',
      // locOther: '',
      // barangayList: [],
      // contactPerson: '',
      // contactNumber: '',
      // contactFacebook: '',
      isSubmitted: false
    };

    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitChange = this.handleSubmitChange.bind(this);
  }

  // handleInputChange(key) {
  //   return (event, value) => {
  //     if (key === 'locCity') {
  //       this.setState({
  //         [key]: value,
  //         locBarangay: '',
  //         barangayList: this.getBarangayList(value),
  //       });
  //     }
  //     else if (key === 'locBarangay') {
  //       this.setState({ [key]: value });
  //     }
  //     else this.setState({ [key]: event.target.value })
  //   }
  // }

  // async handleSubmit(e) {
  //   e.preventDefault();

  //   let submitItem = {};
  //   for (var key in this.state) {
  //     if (this.state.hasOwnProperty(key)) {
  //       if (key !== 'barangayList') {
  //         submitItem = { ...submitItem, [key]: this.state[key] }
  //       }
  //     }
  //   }

  //   let result = await this.props.saveHelpItem(submitItem);

  //   if (result === 'OK') {
  //     this.setState({
  //       type: '',
  //       item: '',
  //       amount: 1,
  //       locCity: '',
  //       locBarangay: '',
  //       locOther: '',
  //       barangayList: [],
  //       contactPerson: '',
  //       contactNumber: '',
  //       contactFacebook: '',
  //     });
  
  //     this.props.getHelpLists()
  //   }
  // }

  // getBarangayList(city) {
  //   let returnList = [];

  //   for (let i = 0; i < phLocations.citiesWithBarangayList.length; i++) {
  //     if (phLocations.citiesWithBarangayList[i]['city'] === city) {
  //       returnList = phLocations.citiesWithBarangayList[i]['barangayList'];
  //       break;
  //     }
  //   }

  //   return returnList;
  // }

  // handleBarangayListChange(value) {
  //   this.setState({ barangayList: this.getBarangayList(value) });
  // }

  async handleSubmit(values, resetCallback) {
    let submitItem = {};

    for (var key in values) {
      if (values.hasOwnProperty(key)) {
        if (key !== 'brgyList') {
          submitItem = { ...submitItem, [key]: values[key] };
        }
      }
    }

    let result = await this.props.saveHelpItem(submitItem);

    if (result === 'OK') {
      resetCallback();
      this.props.getHelpLists();
    }
  }

  handleSubmitChange(callback) {
    this.setState({ isSubmitted: true }, callback);
  }

  renderForm() {
    const values = {
      type: '',
      item: 'default',
      amount: 1,
      locCity: '',
      locBarangay: '',
      locOther: '',
      contactPerson: '',
      contactNumber: '',
      contactFacebook: '',
      brgyList: []
    };

    const touched = {
      type: false,
      item: false,
      amount: false,
      locCity: false,
      locBaragay: false,
      contactPerson: false,
      contactNumber: false,
    };
      
    return (
      <Formik
        component={(props) =>
          <Form
            styles={this.classes}
            handleCustomSubmit={this.handleSubmit}
            // handleFormInputChange={this.handleInputChange}
            handleSubmitChange={this.handleSubmitChange}
            // handleListChange={this.handleBarangayListChange.bind(this)}
            // changeBrgyList={this.getBarangayList.bind(this)}
            { ...props }
          />
        }
        initialValues={values}
        initialTouched={touched}
        validationSchema={validationSchema}
        validateOnBlur={this.state.isSubmitted}
        validateOnChange={this.state.isSubmitted}
      />
    );
  }

  render() {
    return ( this.renderForm() );
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
