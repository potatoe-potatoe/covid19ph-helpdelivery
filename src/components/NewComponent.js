import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as MUI from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { saveHelpItem, getHelpLists } from '../actions/MainAction';
import phCities from '../json/ph.json';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

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
      fullAddress: '',
      item: '',
      amount: 1,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

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

  renderAmountSelect() {
    let renderList = Array();
  
    for(let i = 1; i < 1000; i++) {
      renderList.push(i);
    }
  
    return(
      <MUI.FormControl fullWidth>
        <MUI.Select
          value={this.state.amount}
          onChange={this.handleInputChange('amount')}
        >
          { renderList.map((num) => {
            return(
              <MUI.MenuItem value={num}>{num}</MUI.MenuItem>
            );
          }) }
        </MUI.Select>
      </MUI.FormControl>
    );
  }

  render() {
    const ppeList = [
      {
        id: 'default',
        name: '--- Select Item ---',
        value: "default",
      },
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

    return <div>
      <MUI.Paper style={{padding: '12px'}}>
        <MUI.Container>
          <MUI.FormGroup>
            <MUI.RadioGroup aria-label="help_type" name="help_type" value={this.state.type} onChange={this.handleInputChange('type')}>
              <MUI.FormLabel component="legend">
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

            <MUI.Grid container spacing={4}>
              <MUI.Grid item xs={9}>
                {/* todo: retrieve list from database, then map to <MUI.Select> */}
                <MUI.FormControl fullWidth>
                  <MUI.InputLabel shrink> Item </MUI.InputLabel>

                  <MUI.Select
                    label="item"
                    value={this.state.title === '' ? ppeList[0].value : this.state.title}
                    onChange={this.handleInputChange('title')}
                  >
                    {ppeList.map((item) => {
                      return(
                        <MUI.MenuItem value={item.value}>{item.name}</MUI.MenuItem>
                      );
                    })}
                  </MUI.Select>
                </MUI.FormControl>
              </MUI.Grid>

              <MUI.Grid item xs={3} alignItems="center">
                <MUI.FormControl fullWidth>
                  {/* <MUI.TextField label="*Title" value={this.state.title} onChange={this.handleInputChange('title')} /> */}
                  <MUI.TextField
                    label="Amount"
                    type="number"
                    value={this.state.amount}
                    onChange={this.handleInputChange('amount')} />
                </MUI.FormControl>
              </MUI.Grid>
            </MUI.Grid>

            <MUI.FormControl className={this.classes.formControl}>
              {/* <MUI.TextField label="*Details (Include Location)" value={this.state.description} onChange={this.handleInputChange('description')} /> */}
              <MUI.TextField label="Location" value={this.state.description} onChange={this.handleInputChange('description')} />
            </MUI.FormControl>

            <MUI.FormControl className={this.classes.formControl}>
              {/* <MUI.TextField label="*Contact Number" value={this.state.contactNumber} onChange={this.handleInputChange('contactNumber')} /> */}
              <MUI.TextField label="Mobile Number" value={this.state.contactNumber} onChange={this.handleInputChange('contactNumber')} />
            </MUI.FormControl>

            <MUI.FormControl className={this.classes.formControl}>
              <MUI.TextField label="Facebook" value={this.state.contactFacebook} onChange={this.handleInputChange('contactFacebook')} />
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
