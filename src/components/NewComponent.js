import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as MUI from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';


import { saveHelpItem, getHelpLists } from '../actions/MainAction'

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

const getSuccess = (pos) => {
  console.log(pos)
}

const getFailed = (err) => {
  console.log(err)
  alert('Please allow app to access location for it to function properly')
}

const getOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}


class NewComponent extends Component {
  constructor(props) {
    super(props)
    this.classes = props.classes

    this.state = {
      title: '',
      description: '',
      contactPerson: '',
      contactNumber: '',
      contactFacebook: '',
      type: '',
      fullAddress: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(getSuccess, getFailed, getOptions)

  }
  handleInputChange(key) {
    return (event) => {
      this.setState({ [key]: event.target.value })
    }
  }
  async handleSubmit(e) {
    e.preventDefault()
    await this.props.saveHelpItem(this.state)
    this.setState({
      title: '',
      description: '',
      contactPerson: '',
      contactNumber: '',
      contactFacebook: '',
      type: '',
      fullAddress: ''
    })
    this.props.getHelpLists()
  }
  render() {
    return <div>
      <MUI.Paper style={{padding: '12px'}}>
        <MUI.Container>
          <MUI.FormGroup>
            <MUI.RadioGroup aria-label="gender" name="gender1" value={this.state.type} onChange={this.handleInputChange('type')}>
              <MUI.FormLabel component="legend">Please select one:</MUI.FormLabel>
              <MUI.FormControlLabel value="need" control={<MUI.Radio color="primary" />} label="Need Help" />
              <MUI.FormControlLabel value="offer" control={<MUI.Radio color="primary" />} label="Offer Help" />
            </MUI.RadioGroup>
            <MUI.FormControl className={this.classes.formControl}>
              <MUI.TextField label="Title" value={this.state.title} onChange={this.handleInputChange('title')} />
            </MUI.FormControl>
            <MUI.FormControl className={this.classes.formControl}>
              <MUI.TextField label="Details" value={this.state.description} onChange={this.handleInputChange('description')} />
            </MUI.FormControl>
            <MUI.FormControl className={this.classes.formControl}>
              <MUI.TextField label="Contact Person" value={this.state.contactPerson} onChange={this.handleInputChange('contactPerson')} />
            </MUI.FormControl>
            <MUI.FormControl className={this.classes.formControl}>
              <MUI.TextField label="Contact Number" value={this.state.contactNumber} onChange={this.handleInputChange('contactNumber')} />
            </MUI.FormControl>
            <MUI.FormControl className={this.classes.formControl}>
              <MUI.TextField label="Contact (Facebook)" value={this.state.contactFacebook} onChange={this.handleInputChange('contactFacebook')} />
            </MUI.FormControl>
          </MUI.FormGroup>

          <MUI.Button onClick={this.handleSubmit} size="large" color="primary" variant="contained">
            Save
          </MUI.Button>
        </MUI.Container>

      </MUI.Paper>
    </div>
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
