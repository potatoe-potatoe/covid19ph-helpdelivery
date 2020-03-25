import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {List, ListSubheader, ListItem, ListItemText, Chip, Dialog, DialogTitle, Grid, Container, TableContainer, Table,
  TableBody, TableRow, TableCell, Button, Paper, }from '@material-ui/core';
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
        <List
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">Recent Items</ListSubheader>
          }
          className={this.classes.root}>
          {this.state.list.map(row => (
            <ListItem key={row.id} onClick={() => {this.clickListItem(row)}} button>
              <ListItemText
                primary={(row.item).concat(' (x', row.amount, ')')}
                secondary={(row.locCity).concat(', ', (row.locBarangay))} />
              <Chip l
                className={this.classes.customChip}
                label={(row.type).toUpperCase()}
                color={row.type === 'offer' ? 'primary' : 'secondary'} />
            </ListItem>))}
        </List>
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
      <Dialog open={this.state.dialogOpen} onClose={this.toggleDialog}>
        <DialogTitle id="simple-dialog-title" style={{ paddingBottom: '0px'}}>
          <Grid container>
            <Grid item>
              <Chip
                className={this.classes.customChip}
                label={(this.props.details.type).toUpperCase()}
                color={this.props.details.type === 'offer' ? 'primary' : 'secondary'} />
            </Grid>
            <Grid>
              <span>&nbsp; {this.props.details.item} (x{this.props.details.amount})</span>
            </Grid>
          </Grid>
        </DialogTitle>

        <Container style={{ padding: '5px', minWidth: '200px'}}>
          <TableContainer>
              <Table className={this.classes.table} aria-label="simple-table">
                <TableBody>
                  <TableRow key="details">
                    <TableCell><strong>LOCATION</strong></TableCell>
                    <TableCell>
                      {this.props.details.locCity} <br />
                      {this.props.details.locBarangay} <br />
                      {this.props.details.locOther}
                    </TableCell>
                  </TableRow>

                  <TableRow key="contact_person">
                    <TableCell><strong>CONTACT</strong></TableCell>
                    <TableCell>{this.props.details.contactPerson}</TableCell>
                  </TableRow>

                  <TableRow key="contact_number">
                    <TableCell><strong>CONTACT NUMBER</strong></TableCell>
                    <TableCell>{this.props.details.contactNumber}</TableCell>
                  </TableRow>
                  
                  <TableRow key="contact_facebook">
                    <TableCell style={{ border: '0px solid' }}><strong>FACEBOOK PROFILE</strong></TableCell>
                    <TableCell style={{ border: '0px solid' }}>{this.props.details.contactFacebook}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        </Container>

        <Button style={{ backgroundColor: 'black', color: 'white', borderRadius: '0' }} size='large' onClick={this.toggleDialog} variant="contained">
          <strong>Close</strong>
        </Button>
      </Dialog>
    );
  }

  componentWillReceiveProps(props) {
    this.setState({ list: props.main.list });
  }

  render() {
    return (
      <div style={{ padding: '10px 0px' }}>
        <Container maxWidth="lg">
          {this.renderDialog()}

          <Paper style={{ padding: '5px 12px 30px' }}>
            <Container>
              <h1>Medical Equipments (PPE) Donation Platform</h1>
              <p>
                <strong> Data Privacy notice: </strong><br />
                &emsp;The data we collect here will be only used to provide aid to our COVID-19PH frontliners. <br />
                &emsp;Should you wish to remove your personal data, please send us an e-mail at&nbsp;
                  <a href="mailto:mh.neri@gmail.com">mh.neri&#64;gmail.com</a>.
              </p>

              <strong>Please use this app responsibly.</strong>

            </Container>
          </Paper>

          <br />

          <Grid  container spacing={3}>
            <Grid item xs={12}>
              <NewComponent />
              {this.renderList()}
            </Grid>
          </Grid>
        </Container>
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
