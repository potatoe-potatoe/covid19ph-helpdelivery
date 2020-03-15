import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as MUI from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';


import SendIcon from '@material-ui/icons/Send';

import { setDetails } from '../actions/MainAction'

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
  },

  root: {
    flexGrow: 1
    // paddingLeft: '100px',
    // paddingRight: '100px'
  }
});


const mockHelpData = [
  {
    type: 'need',
    title: 'This is a tile',
    description: 'This is a long description. This is a long description. This is a long description. This is a long description',
    contactPerson: 'Mark Hugh Neri',
    contacttNumber: '09098024221',
    contactFacebook: 'markhughneri',
    geoLat: 'GEO_LAT',
    geoLong: 'GEO_LONG'
  },
  {
    type: 'need',
    title: 'This is a tile',
    description: 'This is a long description. This is a long description. This is a long description. This is a long description',
    contactPerson: 'Mark Hugh Neri',
    contacttNumber: '09098024221',
    contactFacebook: 'markhughneri',
    geoLat: 'GEO_LAT',
    geoLong: 'GEO_LONG'
  },
  {
    type: 'offer',
    title: 'This is a tile',
    description: 'This is a long description. This is a long description. This is a long description. This is a long description',
    contactPerson: 'Mark Hugh Neri',
    contacttNumber: '09098024221',
    contactFacebook: 'markhughneri',
    geoLat: 'GEO_LAT',
    geoLong: 'GEO_LONG'
  },
  {
    type: 'need',
    title: 'This is a tile',
    description: 'This is a long description. This is a long description. This is a long description. This is a long description',
    contactPerson: 'Mark Hugh Neri',
    contacttNumber: '09098024221',
    contactFacebook: 'markhughneri',
    geoLat: 'GEO_LAT',
    geoLong: 'GEO_LONG'
  }
]


class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.classes = props.classes

    this.state = {
      list: []
    }

    this.clickListItem = this.clickListItem.bind(this)
  }

  async componentDidMount() {

    this.setState({ list: mockHelpData })
  }

  clickListItem(e) {
    console.log('hello', e)
    this.props.setDetails(e)
  }

  renderList() {
    return <div>
      <MUI.List
      aria-labelledby="nested-list-subheader"
      subheader={
        <MUI.ListSubheader component="div" id="nested-list-subheader">
          Recent Items
        </MUI.ListSubheader>
      }
      className={this.classes.root}>
      {this.state.list.map(row => (
      <MUI.ListItem onClick={() => {this.clickListItem(row)}} button>
        <MUI.ListItemText
          primary={row.title}
          secondary={row.description || null}
        />
        <MUI.Chip
          label={row.type}
          clickable
          color={row.type === 'offer' ? 'primary' : 'secondary'}
        />
        <MUI.ListItemIcon>
          <SendIcon />
        </MUI.ListItemIcon>

    </MUI.ListItem>))}

      </MUI.List>
    </div>
  }


  renderDetails() {
    return <MUI.Paper>
      <MUI.Container>
        <h3>Details</h3>
        <h4>{this.props.details.title}</h4>
        <p>{this.props.details.description}</p>
        <h4>{this.props.details.type}</h4>

      </MUI.Container>
    </MUI.Paper>
  }

  renderMap() {
    return <MUI.Paper>
    <div style={{backgroundColor: 'black', height: '250px', width: '250px'}}>
    </div>
  </MUI.Paper>

  }

  render() {
    return <div className={this.classes.main}>
      <MUI.Container maxWidth="lg">
        <h1>Help Center</h1>
        <MUI.Grid  container spacing={3}>
      
        <MUI.Grid item xs={8}>
          <MUI.Button variant="contained" color="primary">
            Offer Help
          </MUI.Button>
          <MUI.Button variant="contained" color="secondary">
            Help Needed
          </MUI.Button>
          {this.renderList()}
        </MUI.Grid>

      <MUI.Grid item xs={4}>
        <MUI.Grid item xs={12}>
          {this.renderDetails()}
        </MUI.Grid>
        <MUI.Grid item xs={12}>
          {this.renderMap()}
        </MUI.Grid>
      </MUI.Grid>
    </MUI.Grid>

      </MUI.Container>
    </div>
  }
}
function mapStateToProps(state) {
  return {
    details: state.main.details,
    // supervisor: state.current.supervisor
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setDetails,
  }, dispatch);
}

export default
  connect(mapStateToProps, matchDispatchToProps) 
  (withStyles(styles)(withRouter(HomeComponent)));
