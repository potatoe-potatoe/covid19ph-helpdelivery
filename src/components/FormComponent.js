import React from 'react';
import * as MUI from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import phLocations from '../json/parsedLocations.json';
import ppeList from '../json/ppeList.json';

function Form({ styles, handleCustomSubmit, handleSubmitChange, ...props }) {
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
    setFieldValue,
    resetForm
  } = props;

  // console.log('--------- START ---------');
  // console.log('This is initial touched: ', touched);
  // console.log('This is errors: ', errors);

  // for (let error in errors) {
  //   console.log(`This is [${error}] error: `, errors[error]);
  // }

  function isTouched() {
    // console.log('This is the array: ', touched);
    for (let field in touched) {
      // console.log('This is current: ', touched[field]);

      if (!touched[field]) {
        return false;
      }
    }

    return true;
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    handleSubmitChange(props.handleSubmit(e));

    // alert("submit kek");
    alert('look at errors: ', JSON.stringify(errors, null, 2));
    alert(JSON.stringify(props.values, null, 2));

    if (isValid && isTouched()) {
      handleCustomSubmit(props.values, resetForm);
    }
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

  const handleInputChange = (key, event) => {
    event.persist();

    props.handleChange(event);
    setFieldTouched(key, true, false);

    const city = event.target.value;

    if (key === 'locCity') {
      // const list = changeBrgyList(city);
      const list = getBarangayList(city);
      setFieldValue('locBarangay', '');
      setFieldValue('brgyList', list)
    }

    setTimeout(() => console.log('Value of event: ', eval(key)), 2000);
  }

  // console.log('isTouched: ', (isTouched()));
  // console.log('!isTouched: ', !(isTouched()));
  // console.log('!isValid: ', !isValid);
  // console.log('Print this: ', (!isValid || !(isTouched())));

  return (
    <React.Fragment>
      <MUI.Paper style={{padding: '30px 12px'}}>
        <MUI.Container>
          <form onSubmit={handleFormSubmit}>
            <MUI.FormGroup>
              <MUI.FormControl error={Boolean(errors.type)}>
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
                        name="amount"
                        type="number"
                        label="Amount"
                        value={amount}
                        error={Boolean(errors.amount)}
                        helperText={Boolean(errors.amount) ? errors.amount : ""}
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
                            label="City / Municipality"
                            value={locCity}
                            error={Boolean(errors.locCity)}
                            helperText={Boolean(errors.locCity) ? errors.locCity : ""}
                            placeholder="--- Select City ---"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ ...params.InputProps }}
                            onBlur={handleInputChange.bind(null, 'locCity')} />
                        )} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} md={4} alignItems="center">
                    <MUI.FormControl fullWidth>
                      <Autocomplete
                        autoHighlight
                        options={brgyList}
                        renderOption={option => (
                          <React.Fragment>
                            {option}
                          </React.Fragment>
                        )}
                        renderInput={params => (
                          <MUI.TextField
                            {...params}
                            name="locBarangay"
                            label="Barangay"
                            value={locBarangay}
                            error={Boolean(errors.locBarangay)}
                            helperText={Boolean(errors.locBarangay) ? errors.locBarangay : ""}
                            placeholder="--- Select Barangay ---"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ ...params.InputProps }}
                            onBlur={handleInputChange.bind(null, 'locBarangay')} />
                        )} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} md={4} alignItems="center">
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        name="locOther"
                        label="Other Location Details"
                        value={locOther}
                        placeholder="Example: street number, block, area"
                        InputLabelProps={{ shrink: true }}
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
                        label="Contact Person"
                        value={contactPerson}
                        error={Boolean(errors.contactPerson)}
                        helperText={Boolean(errors.contactPerson) ? errors.contactPerson : ""}
                        placeholder="Example: Juan dela Cruz"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleInputChange.bind(null, 'contactPerson')} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} sm={6}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        name="contactNumber"
                        label="Contact #"
                        value={contactNumber}
                        error={Boolean(errors.contactNumber)}
                        helperText={Boolean(errors.contactNumber) ? errors.contactNumber : ""}
                        placeholder="Insert mobile or landline number"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleInputChange.bind(null, 'contactNumber')} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} sm={6}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        name="contactFacebook"
                        label="Facebook"
                        value={contactFacebook}
                        error={Boolean(errors.contactFacebook)}
                        helperText={Boolean(errors.contactFacebook) ? errors.contactFacebook : ""}
                        placeholder="Insert name or link"
                        InputLabelProps={{ shrink: true }}
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