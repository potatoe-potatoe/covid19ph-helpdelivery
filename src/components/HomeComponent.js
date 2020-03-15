import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as MUI from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import NewComponent from './NewComponent'
import { setDetails, getHelpLists } from '../actions/MainAction'

const styles = theme => ({
});

class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.classes = props.classes

    this.state = {
      list: [],
      dialogOpen: false,
    }

    this.clickListItem = this.clickListItem.bind(this)
    this.onDialogClose = this.onDialogClose.bind(this)
  }

  async componentDidMount() {
    await this.props.getHelpLists()
    this.setState({ list: this.props.main.list })
  }

  clickListItem(e) {
    console.log('hello', e)
    this.props.setDetails(e)
    this.setState({ dialogOpen: true })
  }

  onDialogClose() {
    this.setState({ dialogOpen: false })
  }

  renderList() {
    return <div>
      <MUI.List
      aria-labelledby="nested-list-subheader"
      subheader={
        <MUI.ListSubheader component="div" id="nested-list-subheader">Recent Items</MUI.ListSubheader>
      }
      className={this.classes.root}>
      {this.state.list.map(row => (
        <MUI.ListItem key={row.id} onClick={() => {this.clickListItem(row)}} button>
          <MUI.ListItemText primary={row.title} secondary={row.description || null} />
          <MUI.Chip label={row.type} color={row.type === 'offer' ? 'primary' : 'secondary'} />
       </MUI.ListItem>))}
      </MUI.List>
    </div>
  }


  renderDialog() {
    return <MUI.Dialog open={this.state.dialogOpen} onClose={this.onDialogClose}>
      <MUI.DialogTitle id="simple-dialog-title">
        <MUI.Chip label={this.props.details.type} color={this.props.details.type === 'offer' ? 'primary' : 'secondary'}/>
        &nbsp;{this.props.details.title}
      </MUI.DialogTitle>
      <MUI.Container style={{ padding: '5px', minWidth: '200px'}}>
        <p>{this.props.details.description}</p>
        <br />
        <h3>Contact details</h3>
        <p>{this.props.details.contactPerson}</p>
        <p>M#: {this.props.details.contactNumber}</p>
        <p>FB: {this.props.details.contactFacebook}</p>
      </MUI.Container>
    </MUI.Dialog>
  }

  componentWillReceiveProps(props) {
    this.setState({ list: props.main.list })
  }



  render() {
    return <div className={this.classes.main}>
      <MUI.Container maxWidth="lg">
        {this.renderDialog()}
        <h1>Help Center</h1>
        <MUI.Grid  container spacing={3}>
          <MUI.Grid item xs={12}>
            <NewComponent />
            {this.renderList()}
          </MUI.Grid>
      </MUI.Grid>
      </MUI.Container>
    </div>
  }
}
function mapStateToProps(state) {
  return {
    main: state.main,
    details: state.main.details,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setDetails,
    getHelpLists,
  }, dispatch);
}

export default
  connect(mapStateToProps, matchDispatchToProps) 
  (withStyles(styles)(withRouter(HomeComponent)));
