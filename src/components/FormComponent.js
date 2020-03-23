import React from 'react';
import * as MUI from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import phLocations from '../json/parsedLocations.json';
import ppeList from '../json/ppeList.json';

function Form({ styles, handleSubmit, handleInputChange, ...props }) {
  return (
    <React.Fragment>
      <MUI.Paper style={{padding: '30px 12px'}}>
        <MUI.Container>
          <form onSubmit={handleSubmit}>
            <MUI.FormGroup>
              <MUI.RadioGroup
                className={styles.formGroupMargin}
                aria-label="help_type"
                name="help_type"
                value={props.type}
                onChange={handleInputChange('type')}
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

              <MUI.Card className={[styles.formGroupMargin, styles.formCardPadding]} variant="outlined">
                <MUI.Typography className={styles.formTypographyPadding}>
                  Donation Item Details
                </MUI.Typography>

                <MUI.Grid container spacing={4}>
                  <MUI.Grid item xs={9} md={10}>
                    <MUI.FormControl fullWidth>
                      <MUI.InputLabel shrink> Item </MUI.InputLabel>

                      <MUI.Select
                        label="item"
                        value={props.item === '' ? 'default' : props.item}
                        onChange={handleInputChange('item')}
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
                        label="Amount"
                        type="number"
                        value={props.amount}
                        onChange={handleInputChange('amount')} />
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
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ ...params.InputProps }}
                            label="City / Municipality"
                            placeholder="--- Select City ---" />
                        )}
                        value={props.locCity} 
                        onChange={handleInputChange('locCity')}
                      />
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
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ ...params.InputProps }}
                            label="Barangay"
                            placeholder="--- Select Barangay ---" />
                        )}
                        value={props.locBarangay} 
                        onChange={handleInputChange('locBarangay')}
                      />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} md={4} alignItems="center">
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        label="Other Location Details"
                        placeholder="Example: street number, block, area"
                        value={props.locOther}
                        onChange={handleInputChange('locOther')} />
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
                        InputLabelProps={{ shrink: true }}
                        label="Contact Person"
                        placeholder="Example: Juan dela Cruz"
                        value={props.contactPerson}
                        onChange={handleInputChange('contactPerson')} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} sm={6}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                        InputLabelProps={{ shrink: true }}
                        label="Contact #"
                        placeholder="Insert mobile or landline number"
                        value={props.contactNumber}
                        onChange={handleInputChange('contactNumber')} />
                    </MUI.FormControl>
                  </MUI.Grid>

                  <MUI.Grid item xs={12} sm={6}>
                    <MUI.FormControl fullWidth>
                      <MUI.TextField
                          InputLabelProps={{ shrink: true }}
                          label="Facebook"
                          placeholder="Insert name or link"
                          value={props.contactFacebook}
                          onChange={handleInputChange('contactFacebook')} />
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