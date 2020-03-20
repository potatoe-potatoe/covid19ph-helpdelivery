import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as MUI from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import { saveHelpItem, getHelpLists } from '../actions/MainAction';
import phLocations from '../json/parsedLocations.json';

const styles = theme => ({
  formGroupMargin: {
    margin: '10px 0px'
  },
  formCardPadding: {
    padding: '12px'
  },
  formTypographyPadding: {
    padding: '0px 0px 12px 0px'
  },
  formInputLabel: {
    shrink: true
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
    const ppeList = [
      {
        id: 'item1',
        name: 'N95 mask',
        value: 'n95-mask'
      },
      {
        id: 'item2',
        name: 'Surgical mask',
        value: 'surg-mask'
      },
      {
        id: 'item3',
        name: 'Face shield',
        value: 'face-shield'
      },
      {
        id: 'item4',
        name: 'Surgical gown',
        value: 'surg-gown'
      }
    ];

    return (
      <React.Fragment>
        <MUI.Paper style={{padding: '30px 12px'}}>
          <MUI.Container>
            <MUI.FormGroup>
              <MUI.RadioGroup
                className={this.classes.formGroupMargin}
                aria-label="help_type"
                name="help_type"
                value={this.state.type}
                onChange={this.handleInputChange('type')}
              >
                <MUI.FormLabel className={this.classes.formTypographyPadding} component="legend">
                    Are you <b>in need of donations</b> or <b>offering donations</b>? Please select one:
                </MUI.FormLabel>
                <MUI.FormControlLabel
                  value="need"
                  control={<MUI.Radio color="primary" />}
                  label="I am in need of donations." />
                <MUI.FormControlLabel 
                  value="offer"
                  control={<MUI.Radio color="primary" />}
                  label="I am offering donations." />
              </MUI.RadioGroup>

              <MUI.Card className={[this.classes.formGroupMargin, this.classes.formCardPadding]} variant="outlined">
                <MUI.Typography className={this.classes.formTypographyPadding}>
                  Donation Item Details
                </MUI.Typography>

                <MUI.Grid container spacing={4}>
                  <MUI.Grid item xs={10}>
                    {/* todo: retrieve list from database, then map to <MUI.Select> */}
                    <MUI.FormControl fullWidth>
                      <MUI.InputLabel shrink> Item </MUI.InputLabel>

                      <MUI.Select
                        label="item"
                        value={this.state.item === '' ? 'default' : this.state.item}
                        onChange={this.handleInputChange('item')}
                      >
                        <MUI.MenuItem disabled value='default'>
                          <span style={{ color: '#babfbc' }}>{'--- Select Item ---'}</span>
                        </MUI.MenuItem>

                        {ppeList.map((item) => {
                          return(
                            <MUI.MenuItem value={item.name}>{item.name}</MUI.MenuItem>
                          );
                        })}
                      </MUI.Select>
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={2} alignItems="center">
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        label="Amount"
                        type="number"
                        value={this.state.amount}
                        onChange={this.handleInputChange('amount')} />
                    </MUI.FormControl>
                  </MUI.Grid>
                </MUI.Grid>
              </MUI.Card>

              <MUI.Card className={[this.classes.formGroupMargin, this.classes.formCardPadding]} variant="outlined">
                <MUI.Typography className={this.classes.formTypographyPadding}>
                  Location
                </MUI.Typography>

                <MUI.Grid container spacing={4}>
                  <MUI.Grid item xs={4}>
                    <MUI.FormControl fullWidth>
                      <Autocomplete
                        options={phLocations.cityList}
                        autoHighlight
                        renderOption={option => (
                          <React.Fragment>
                            {option}
                          </React.Fragment>
                        )}
                        getOptionLabel={option => option}
                        renderInput={params => (
                          <MUI.TextField
                            {...params}
                            InputLabelProps={this.classes.formInputLabel}
                            InputProps={{ ...params.InputProps }}
                            label="City / Municipality"
                            placeholder="--- Select City ---" />
                        )}
                        value={this.state.locCity} 
                        onChange={this.handleInputChange('locCity')}
                      />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={4} alignItems="center">
                    <MUI.FormControl fullWidth>
                      <Autocomplete
                        options={this.state.barangayList}
                        autoHighlight
                        renderOption={option => (
                          <React.Fragment>
                            {option}
                          </React.Fragment>
                        )}
                        renderInput={params => (
                          <MUI.TextField
                            {...params}
                            InputLabelProps={this.classes.formInputLabel}
                            InputProps={{ ...params.InputProps }}
                            label="Barangay"
                            placeholder="--- Select Barangay ---" />
                        )}
                        value={this.state.locBarangay} 
                        onChange={this.handleInputChange('locBarangay')}
                      />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={4} alignItems="center">
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        type="text"
                        InputLabelProps={this.classes.formInputLabel}
                        label="Other Location Details"
                        placeholder="Example: street number, block, area"
                        value={this.state.locOther}
                        onChange={this.handleInputChange('locOther')} />
                    </MUI.FormControl>
                  </MUI.Grid>
                </MUI.Grid>
              </MUI.Card>

              <MUI.Card className={[this.classes.formGroupMargin, this.classes.formCardPadding]} variant="outlined">
                <MUI.Typography className={this.classes.formTypographyPadding}>
                  Contact Details
                </MUI.Typography>

                <MUI.Grid container spacing={4}>
                  <MUI.Grid item xs={12}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        InputLabelProps={this.classes.formInputLabel}
                        label="Contact Person"
                        placeholder="Example: Juan dela Cruz"
                        value={this.state.contactPerson}
                        onChange={this.handleInputChange('contactPerson')} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={6}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        InputLabelProps={this.classes.formInputLabel}
                        label="Contact Number"
                        placeholder="Insert mobile or landline number"
                        value={this.state.contactNumber}
                        onChange={this.handleInputChange('contactNumber')} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={6}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                          InputLabelProps={this.classes.formInputLabel}
                          label="Facebook"
                          placeholder="Insert Facebook name or link"
                          value={this.state.contactFacebook}
                          onChange={this.handleInputChange('contactFacebook')} />
                    </MUI.FormControl>
                  </MUI.Grid>
                </MUI.Grid>
              </MUI.Card>
            </MUI.FormGroup>

            <MUI.Button
              className={this.classes.formGroupMargin} 
              onClick={this.handleSubmit} 
              size="large"
              color="primary"
              variant="contained"
            >
              Submit
            </MUI.Button>
          </MUI.Container>
        </MUI.Paper>
      </React.Fragment>
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
