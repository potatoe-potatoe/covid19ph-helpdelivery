import React from 'react';
import * as MUI from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import phLocations from '../json/parsedLocations.json';
import ppeList from '../json/ppeList.json';
import { Formik } from 'formik';
import * as Yup from 'yup';

function Form({ styles, handleFormSubmit, handleFormInputChange, ...props }) {
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
      contactFacebook
    }, 
    errors,
    touched,
    isValid,
    setFieldTouched
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

  const handleInputChange = (key, event) => {
    console.log('Handling change for event: ', event);
    event.persist();
    props.handleChange(event);
    setFieldTouched(key, true, false);

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
          <form onSubmit={handleTempSubmit}>
            <MUI.FormGroup>
              <MUI.RadioGroup
                className={styles.formGroupMargin}
                name="type"
                value={type}
                onChange={handleInputChange.bind(null, 'type')}
              >
                <MUI.FormLabel className={styles.formTypographyPadding} component="legend">
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
              <div>{Boolean(errors.type) ? errors.type : ""}</div>

              <MUI.Card className={[styles.formGroupMargin, styles.formCardPadding]} variant="outlined">
                <MUI.Typography className={styles.formTypographyPadding}>
                  Donation Item Details
                </MUI.Typography>

                <MUI.Grid container spacing={4}>
                  <MUI.Grid item xs={9} md={10}>
                    <MUI.FormControl fullWidth>
                      <MUI.InputLabel shrink> Item </MUI.InputLabel>

                      <MUI.Select
                        name="item"
                        helperText={Boolean(errors.item) ? errors.item : ""}
                        error={Boolean(errors.item)}
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
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={3} md={2}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        name="amount"
                        helperText={Boolean(errors.amount) ? errors.amount : ""}
                        error={Boolean(errors.amount)}
                        value={amount}
                        type="number"
                        label="Amount"
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
                        options={props.barangayList}
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
                        value={props.contactNumber}
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
                          value={props.contactFacebook}
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
              disabled={!isValid || !isTouched()}
            >
              Submit
            </MUI.Button>
          </form>
        </MUI.Container>
      </MUI.Paper>
    </React.Fragment>
  );
}

function FormWithValidation({ styles, handleSubmit, handleInputChange, ...mainProps }) {
  Yup.addMethod(Yup.string, 'isNotAny', function(strList) {
    const message = "This is not a valid value."

    return this.test('test-name', message, function(value) {
      const { path, createError } = this;

      for (let str in strList) {
        if (value == str) return createError(path, message);
      }

      return true;
    })
  });

  const validationSchema = Yup.object({
    type: Yup.string()
      .required("Please select one."),
    item: Yup.string()
      .required("This field is required.")
      .notOneOf(['default'], 'Please select a PPE item.'),
    amount: Yup.number()
      .integer('Amount must be an integer.')
      .positive('Amount can only be a positive integer.'),
    locCity: Yup.string()
      .required("This field is required."),
    locBarangay: Yup.string()
      .required("This field is required."),
    contactPerson: Yup.string()
      .required("This field is required."),
    contactNumber: Yup.string()
      .required("This field is required.")
      .matches(/^[\d ()+-]+$/, 'This field can only contain: numbers, -, +, (, ).')
  });

  const values = {
    type: '',
    item: 'default',
    amount: 1,
    locCity: '',
    locBarangay: '',
    locOther: '',
    contactPerson: '',
    contactNumber: '',
    contactFacebook: ''
  };

  const touched = {
    type: false,
    item: false,
    amount: false,
    locCity: false,
    locBaragay: false,
    // locOther: false,        // not a required field
    contactPerson: false,
    contactNumber: false,
    // contactFacebook: false  // not a required field
  };
  
  return (
    <Formik
      component={(props) =>
        <Form
          styles={styles}
          handleSubmit={handleSubmit}
          handleFormInputChange={handleInputChange}
          { ...mainProps }
          { ...props }
        />
      }
      initialValues={values}
      initialTouched={touched}
      validationSchema={validationSchema}
    />
  );
}

export default FormWithValidation;