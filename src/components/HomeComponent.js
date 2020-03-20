import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as MUI from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NewComponent from './NewComponent';
import { setDetails, getHelpLists } from '../actions/MainAction';

const styles = theme => ({
  table: {
    minWidth: 200
  },
  customChip: {
    minWidth: 100
  }
});

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      list: [],
      dialogOpen: false,
    };

    this.clickListItem = this.clickListItem.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  async componentDidMount() {
    await this.props.getHelpLists();
    this.setState({ list: this.props.main.list });
  }

  clickListItem(e) {
    this.props.setDetails(e);
    this.toggleDialog();
  }

  toggleDialog() {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  }

  // @method    Renders 'Recent Items' list at the bottom of the page.
  renderList() {
    return (
      <React.Fragment>
        <MUI.List
          aria-labelledby="nested-list-subheader"
          subheader={
            <MUI.ListSubheader component="div" id="nested-list-subheader">Recent Items</MUI.ListSubheader>
          }
          className={this.classes.root}>
          {this.state.list.map(row => (
            <MUI.ListItem key={row.id} onClick={() => {this.clickListItem(row)}} button>
              <MUI.ListItemText
                primary={(row.item).concat(' (x', row.amount, ')')}
                secondary={(row.locCity).concat(', ', (row.locBarangay))} />
              <MUI.Chip l
                className={this.classes.customChip}
                label={(row.type).toUpperCase()}
                color={row.type === 'offer' ? 'primary' : 'secondary'} />
            </MUI.ListItem>))}
        </MUI.List>
      </React.Fragment>
    );
  }

  // @method    Renders modal containing specific donation item info from 'Recent Items' list.
  renderDialog() {
    // check if object from database exists
    // id is a REQUIRED field, so existence of object can be checked via id
    if (this.props.details.id == null) {
      return;
    }

    return (
      <MUI.Dialog open={this.state.dialogOpen} onClose={this.toggleDialog}>
        <MUI.DialogTitle id="simple-dialog-title" style={{ paddingBottom: '0px'}}>
          <MUI.Chip
            className={this.classes.customChip}
            label={(this.props.details.type).toUpperCase()}
            color={this.props.details.type === 'offer' ? 'primary' : 'secondary'} />
          &nbsp; {this.props.details.item} (x{this.props.details.amount})
        </MUI.DialogTitle>

        <MUI.Container style={{ padding: '5px', minWidth: '200px'}}>
          <MUI.TableContainer>
              <MUI.Table className={this.classes.table} aria-label="simple-table">
                <MUI.TableBody>
                  <MUI.TableRow key="details">
                    <MUI.TableCell><strong>LOCATION</strong></MUI.TableCell>
                    <MUI.TableCell>
                      {this.props.details.locCity} <br />
                      {this.props.details.locBarangay} <br />
                      {this.props.details.locOther}
                    </MUI.TableCell>
                  </MUI.TableRow>

                  <MUI.TableRow key="contact_person">
                    <MUI.TableCell><strong>CONTACT</strong></MUI.TableCell>
                    <MUI.TableCell>{this.props.details.contactPerson}</MUI.TableCell>
                  </MUI.TableRow>

                  <MUI.TableRow key="contact_number">
                    <MUI.TableCell><strong>CONTACT NUMBER</strong></MUI.TableCell>
                    <MUI.TableCell>{this.props.details.contactNumber}</MUI.TableCell>
                  </MUI.TableRow>
                  
                  <MUI.TableRow key="contact_facebook">
                    <MUI.TableCell style={{ border: '0px solid' }}><strong>FACEBOOK PROFILE</strong></MUI.TableCell>
                    <MUI.TableCell style={{ border: '0px solid' }}>{this.props.details.contactFacebook}</MUI.TableCell>
                  </MUI.TableRow>
                </MUI.TableBody>
              </MUI.Table>
            </MUI.TableContainer>
        </MUI.Container>

        <MUI.Button style={{ backgroundColor: 'black', color: 'white', borderRadius: '0' }} size='large' onClick={this.toggleDialog} variant="contained">
          <strong>Close</strong>
        </MUI.Button>
      </MUI.Dialog>
    );
  }

  componentWillReceiveProps(props) {
    this.setState({ list: props.main.list });
  }

  render() {
    return (
      <div style={{ padding: '10px 0px' }}>
        <MUI.Container maxWidth="lg">
          {this.renderDialog()}

          <MUI.Paper style={{ padding: '5px 12px 30px' }}>
            <MUI.Container>
              <h1>Medical Equipments (PPE) Donation Platform</h1>
              <p>
                <strong> Data Privacy notice: </strong><br />
                &emsp;The data we collect here will be only used to provide aid to our COVID-19PH frontliners. <br />
                &emsp;Should you wish to remove your personal data, please send us an e-mail at&nbsp;
                  <a href="mailto:mh.neri@gmail.com">mh.neri&#64;gmail.com</a>.
              </p>

              <strong>Please use this app responsibly.</strong>

            </MUI.Container>
          </MUI.Paper>

          <br />

          <MUI.Grid  container spacing={3}>
            <MUI.Grid item xs={12}>
              <NewComponent />
              {this.renderList()}
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Container>
      </div>
    );
    
  }
}

function mapStateToProps(state) {
  return {
    main: state.main,
    details: state.main.details,
  };
}

function matchDispatchToProps(dispatch) {
  return (
    bindActionCreators({
      setDetails,
      getHelpLists,
    }, dispatch)
  );
}

export default
  connect(mapStateToProps, matchDispatchToProps) 
  (withStyles(styles)(withRouter(HomeComponent)));
