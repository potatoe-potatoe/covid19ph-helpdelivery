import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { object, string, number } from 'yup';
import { saveHelpItem, getHelpLists } from '../actions/MainAction';
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

const validationSchema = object({
  type: string()
    .required("Please select one."),
  item: string()
    .required(requiredMsg)
    .notOneOf(['default'], 'Please select a PPE item.'),
  amount: number()
    .required(requiredMsg)
    .integer('Amount must be an integer.')
    .positive('Amount must be greater than 1.'),
  locCity: string()
    .required(requiredMsg),
  locBarangay: string()
    .required(requiredMsg),
  contactPerson: string()
    .required(requiredMsg),
  contactNumber: string()
    .required(requiredMsg)
    .matches(/^[\d ()+-]+$/, 'This field can only contain: numbers, -, +, (, ).')
});

class NewComponent extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      isSubmitted: false
    };
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitChange = this.handleSubmitChange.bind(this);
  }

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
      this.setState({ isSubmitted: false });
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
            handleFormSubmit={this.handleSubmit}
            handleFormSubmitChange={this.handleSubmitChange}
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
