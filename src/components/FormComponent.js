import React from 'react';
import * as MUI from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import phLocations from '../json/parsedLocations.json';
import ppeList from '../json/ppeList.json';
import { Formik } from 'formik';
import * as Yup from 'yup';

function Form({ styles, handleFormSubmit, handleFormInputChange, handleSubmitChange, handleListChange, changeBrgyList, ...props }) {
  const { 
    values: {
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
    }, 
    errors,
    touched,
    isValid,
    setFieldTouched,
    setFieldValue
  } = props;

  console.log('--------- START ---------');
  console.log('This is initial touched: ', touched);
  console.log('This is errors: ', errors);

  for (let error in errors) {
    console.log(`This is [${error}] error: `, errors[error]);
  }

  function isTouched() {
    console.log('This is the array: ', touched);
    for (let field in touched) {
      console.log('This is current: ', touched[field]);

      if (!touched[field]) {
        return false;
      }
    }

    return true;
  }

  function handleTempSubmit(e) {
    e.preventDefault();
    console.log('Values are: ', props.values);
  }

  function handleActualSubmit(e) {
    e.preventDefault();

    handleSubmitChange(props.handleSubmit(e));

    alert("submit kek");
    alert('look at errors: ', errors);

    if (isValid && isTouched()) {
      // stuff here
    }

    alert(JSON.stringify(props.values, null, 2));
  }

  const handleInputChange = (key, event) => {
    console.log('Handling change for event: ', event);
    event.persist();

    props.handleChange(event);
    setFieldTouched(key, true, false);

    const city = event.target.value;

    if (key === 'locCity') {
      const list = changeBrgyList(city);
      setFieldValue('brgyList', list)

    }

    setTimeout(() => console.log('Value of event: ', eval(key)), 2000);
  }

  console.log('isTouched: ', (isTouched()));
  console.log('!isTouched: ', !(isTouched()));
  console.log('!isValid: ', !isValid);
  console.log('Print this: ', (!isValid || !(isTouched())));

  return (
    <React.Fragment>
      <MUI.Paper style={{padding: '30px 12px'}}>
        <MUI.Container>
          <form onSubmit={handleActualSubmit}>
            <MUI.FormGroup>
              <MUI.FormControl 
                error={Boolean(errors.type)}
              >
                <MUI.RadioGroup
                  className={styles.formGroupMargin}
                  name="type"
                  value={type}
                  onChange={handleInputChange.bind(null, 'type')}
                >
                  <MUI.FormLabel className={styles.formTypographyPadding} component="legend">
                      Are you <b>in need of donations</b> or <b>offering donations</b>?
                  </MUI.FormLabel>
                  <MUI.FormControlLabel
                    value="need"
                    control={<MUI.Radio color="primary" />}
                    label="I am in need of donations." />
                  <MUI.FormControlLabel 
                    value="offer"
                    control={<MUI.Radio color="primary" />}
                    label="I am offering donations." />

                  <MUI.FormHelperText>{Boolean(errors.type) ? errors.type: ""}</MUI.FormHelperText>
                </MUI.RadioGroup>
              </MUI.FormControl>

              <MUI.Card className={[styles.formGroupMargin, styles.formCardPadding]} variant="outlined">
                <MUI.Typography className={styles.formTypographyPadding}>
                  Donation Item Details
                </MUI.Typography>

                <MUI.Grid container spacing={4}>
                  <MUI.Grid item xs={9}>
                    <MUI.FormControl fullWidth error={Boolean(errors.item)}>
                      <MUI.InputLabel shrink> Item </MUI.InputLabel>

                      <MUI.Select
                        name="item"
                        value={item}
                        label="item"
                        onChange={handleInputChange.bind(null, 'item')}
                      >
                        <MUI.MenuItem disabled value='default'>
                          <span style={{ color: '#babfbc' }}>{'--- Select Item ---'}</span>
                        </MUI.MenuItem>

                        {ppeList.ppeList.map((item) => {
                          return(
                            <MUI.MenuItem value={item.name}>{item.name}</MUI.MenuItem>
                          );
                        })}
                      </MUI.Select>

                      <MUI.FormHelperText>{Boolean(errors.item) ? errors.item: ""}</MUI.FormHelperText>
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={3}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        type="number"
                        value={amount}
                        name="amount"
                        helperText={Boolean(errors.amount) ? errors.amount : ""}
                        error={Boolean(errors.amount)}
                        label="Amount"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleInputChange.bind(null, 'amount')} />
                    </MUI.FormControl>
                  </MUI.Grid>
                </MUI.Grid>
              </MUI.Card>

              <MUI.Card className={[styles.formGroupMargin, styles.formCardPadding]} variant="outlined">
                <MUI.Typography className={styles.formTypographyPadding}>
                  Location
                </MUI.Typography>

                <MUI.Grid container spacing={4}>
                  <MUI.Grid item xs={12} md={4}>
                    <MUI.FormControl fullWidth>
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
                          <MUI.TextField
                            {...params}
                            name="locCity"
                            helperText={Boolean(errors.locCity) ? errors.locCity : ""}
                            error={Boolean(errors.locCity)}
                            value={locCity}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ ...params.InputProps }}
                            label="City / Municipality"
                            placeholder="--- Select City ---"
                            onBlur={handleInputChange.bind(null, 'locCity')} />
                        )} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} md={4} alignItems="center">
                    <MUI.FormControl fullWidth>
                      <Autocomplete
                        options={brgyList}
                        autoHighlight
                        renderOption={option => (
                          <React.Fragment>
                            {option}
                          </React.Fragment>
                        )}
                        renderInput={params => (
                          <MUI.TextField
                            {...params}
                            name="locBarangay"
                            helperText={Boolean(errors.locBarangay) ? errors.locBarangay : ""}
                            error={Boolean(errors.locBarangay)}
                            value={locBarangay}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ ...params.InputProps }}
                            label="Barangay"
                            placeholder="--- Select Barangay ---"
                            onChange={handleInputChange.bind(null, 'locBarangay')} />
                        )} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} md={4} alignItems="center">
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        name="locOther"
                        helperText={Boolean(errors.locOther) ? errors.locOther : ""}
                        error={Boolean(errors.locOther)}
                        value={locOther}
                        InputLabelProps={{ shrink: true }}
                        label="Other Location Details"
                        placeholder="Example: street number, block, area"
                        onChange={handleInputChange.bind(null, 'locOther')} />
                    </MUI.FormControl>
                  </MUI.Grid>
                </MUI.Grid>
              </MUI.Card>

              <MUI.Card className={[styles.formGroupMargin, styles.formCardPadding]} variant="outlined">
                <MUI.Typography className={styles.formTypographyPadding}>
                  Contact Details
                </MUI.Typography>

                <MUI.Grid container spacing={4}>
                  <MUI.Grid item xs={12}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        name="contactPerson"
                        helperText={Boolean(errors.contactPerson) ? errors.contactPerson : ""}
                        error={Boolean(errors.contactPerson)}
                        value={contactPerson}
                        InputLabelProps={{ shrink: true }}
                        label="Contact Person"
                        placeholder="Example: Juan dela Cruz"
                        onChange={handleInputChange.bind(null, 'contactPerson')} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} sm={6}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        name="contactNumber"
                        helperText={Boolean(errors.contactNumber) ? errors.contactNumber : ""}
                        error={Boolean(errors.contactNumber)}
                        value={contactNumber}
                        InputLabelProps={{ shrink: true }}
                        label="Contact #"
                        placeholder="Insert mobile or landline number"
                        onChange={handleInputChange.bind(null, 'contactNumber')} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} sm={6}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                      name="contactFacebook"
                      helperText={Boolean(errors.contactFacebook) ? errors.contactFacebook : ""}
                      error={Boolean(errors.contactFacebook)}
                      value={contactFacebook}
                          InputLabelProps={{ shrink: true }}
                          label="Facebook"
                          placeholder="Insert name or link"
                          onChange={handleInputChange.bind(null, 'contactFacebook')} />
                    </MUI.FormControl>
                  </MUI.Grid>
                </MUI.Grid>
              </MUI.Card>
            </MUI.FormGroup>

            <MUI.Button
              className={styles.formGroupMargin}
              type="submit"
              size="large"
              color="primary"
              variant="contained"
            >
              Submit
            </MUI.Button>
          </form>
        </MUI.Container>
      </MUI.Paper>
    </React.Fragment>
  );
}

export default Form;