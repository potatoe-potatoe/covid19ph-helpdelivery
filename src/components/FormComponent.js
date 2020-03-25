import React from 'react';
import { Paper, Container, Card, Grid, FormGroup, FormControl, FormLabel, FormControlLabel, FormHelperText, InputLabel, 
  Button, Select, MenuItem, TextField, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import phLocations from '../json/parsedLocations.json';
import ppeList from '../json/ppeList.json';

function Form({ styles, handleFormSubmit, handleFormSubmitChange, ...props }) {
  const {
    values,
    errors,
    touched,
    isValid,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
    handleChange,
    resetForm
  } = props;

  const {
    type,
    item,
    amount,
    locCity,
    locBarangay,
    locOther,
    contactPerson,
    contactNumber,
    contactFacebook,
    brgyList
  } = values;

  function isTouched() {
    for (let field in touched) {
      if (!touched[field]) {
        return false;
      }
    }

    return true;
  }

  function getBarangayList(city) {
    let returnList = [];

    for (let i = 0; i < phLocations.citiesWithBarangayList.length; i++) {
      if (phLocations.citiesWithBarangayList[i]['city'] === city) {
        returnList = phLocations.citiesWithBarangayList[i]['barangayList'];
        break;
      }
    }

    return returnList;
  }

  function handleCustomSubmit(e) {
    e.preventDefault();
    handleFormSubmitChange(handleSubmit(e));

    // debug logging
    console.log(JSON.stringify(values, null, 2));

    if (isValid && isTouched()) {
      handleFormSubmit(values, resetForm);
    }
  }

  const handleCustomInputChange = (key, event) => {
    event.persist();

    handleChange(event);
    setFieldTouched(key, true, false);

    if (key === 'locCity') {
      const city = event.target.value;
      const list = getBarangayList(city);

      setFieldValue('locBarangay', '');
      setFieldValue('brgyList', list)
    }
  }

  return (
    <React.Fragment>
      <Paper style={{padding: '30px 12px'}}>
        <Container>
          <form onSubmit={handleCustomSubmit}>
            <FormGroup>
              <FormControl error={Boolean(errors.type)}>
                <RadioGroup
                  className={styles.formGroupMargin}
                  name="type"
                  value={type}
                  onChange={handleCustomInputChange.bind(null, 'type')}
                >
                  <FormLabel className={styles.formTypographyPadding} component="legend">
                      Are you <b>in need of donations</b> or <b>offering donations</b>?
                  </FormLabel>

                  <FormControlLabel
                    value="need"
                    control={<Radio color="primary" />}
                    label="I am in need of donations." />

                  <FormControlLabel 
                    value="offer"
                    control={<Radio color="primary" />}
                    label="I am offering donations." />

                  <FormHelperText>{Boolean(errors.type) ? errors.type: ""}</FormHelperText>
                </RadioGroup>
              </FormControl>

              <Card className={[styles.formGroupMargin, styles.formCardPadding]} variant="outlined">
                <Typography className={styles.formTypographyPadding}>
                  Donation Item Details
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={9}>
                    <FormControl fullWidth error={Boolean(errors.item)}>
                      <InputLabel shrink> Item </InputLabel>

                      <Select
                        name="item"
                        value={item}
                        onChange={handleCustomInputChange.bind(null, 'item')}
                      >
                        <MenuItem disabled value='default'>
                          <span style={{ color: '#babfbc' }}>{'--- Select Item ---'}</span>
                        </MenuItem>

                        {ppeList.ppeList.map((item) => {
                          return(
                            <MenuItem value={item.name}>{item.name}</MenuItem>
                          );
                        })}
                      </Select>

                      <FormHelperText>{Boolean(errors.item) ? errors.item: ""}</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        name="amount"
                        type="number"
                        label="Amount"
                        value={amount}
                        error={Boolean(errors.amount)}
                        helperText={Boolean(errors.amount) ? errors.amount : ""}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleCustomInputChange.bind(null, 'amount')} />
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>

              <Card className={[styles.formGroupMargin, styles.formCardPadding]} variant="outlined">
                <Typography className={styles.formTypographyPadding}>
                  Location
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <Autocomplete
                        autoHighlight
                        options={phLocations.cityList}
                        renderOption={option => (
                          <React.Fragment>
                            {option}
                          </React.Fragment>
                        )}
                        getOptionLabel={option => option}
                        renderInput={params => (
                          <TextField
                            {...params}
                            name="locCity"
                            label="City / Municipality"
                            value={locCity}
                            error={Boolean(errors.locCity)}
                            helperText={Boolean(errors.locCity) ? errors.locCity : ""}
                            placeholder="--- Select City ---"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ ...params.InputProps }}
                            onBlur={handleCustomInputChange.bind(null, 'locCity')} />
                        )} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4} alignItems="center">
                    <FormControl fullWidth>
                      <Autocomplete
                        autoHighlight
                        options={brgyList}
                        renderOption={option => (
                          <React.Fragment>
                            {option}
                          </React.Fragment>
                        )}
                        renderInput={params => (
                          <TextField
                            {...params}
                            name="locBarangay"
                            label="Barangay"
                            value={locBarangay}
                            error={Boolean(errors.locBarangay)}
                            helperText={Boolean(errors.locBarangay) ? errors.locBarangay : ""}
                            placeholder="--- Select Barangay ---"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ ...params.InputProps }}
                            onBlur={handleCustomInputChange.bind(null, 'locBarangay')} />
                        )} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4} alignItems="center">
                    <FormControl fullWidth>
                      <TextField
                        name="locOther"
                        label="Other Location Details"
                        value={locOther}
                        placeholder="Example: street number, block, area"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleCustomInputChange.bind(null, 'locOther')} />
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>

              <Card className={[styles.formGroupMargin, styles.formCardPadding]} variant="outlined">
                <Typography className={styles.formTypographyPadding}>
                  Contact Details
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        name="contactPerson"
                        label="Contact Person"
                        value={contactPerson}
                        error={Boolean(errors.contactPerson)}
                        helperText={Boolean(errors.contactPerson) ? errors.contactPerson : ""}
                        placeholder="Example: Juan dela Cruz"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleCustomInputChange.bind(null, 'contactPerson')} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name="contactNumber"
                        label="Contact #"
                        value={contactNumber}
                        error={Boolean(errors.contactNumber)}
                        helperText={Boolean(errors.contactNumber) ? errors.contactNumber : ""}
                        placeholder="Insert mobile or landline number"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleCustomInputChange.bind(null, 'contactNumber')} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name="contactFacebook"
                        label="Facebook"
                        value={contactFacebook}
                        error={Boolean(errors.contactFacebook)}
                        helperText={Boolean(errors.contactFacebook) ? errors.contactFacebook : ""}
                        placeholder="Insert name or link"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleCustomInputChange.bind(null, 'contactFacebook')} />
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>
            </FormGroup>

            <Button
              className={styles.formGroupMargin}
              type="submit"
              size="large"
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </Container>
      </Paper>
    </React.Fragment>
  );
}

export default Form;
