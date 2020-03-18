/*
 *  Created:    2020-04-18
 *  Purpose:    Parse phLocations.json to get location data for web app.
 */

// taken from: https://github.com/flores-jacob/philippine-regions-provinces-cities-municipalities-barangays
//                |--> philippine_provinces_cities_municipalities_and_barangays_2019v2.json
const phLocations = require('../json/phLocations.json');
const fs = require('fs');

var cityList = [];
var citiesWithBarangayList = [];

/* 
 * @desc      Populates lists with data from ph_locations.json.
 * @params    none
 * @return    none
 */
function populateLists() {
  let mainArr = Object.values(phLocations);

  for (let i = 0; i < mainArr.length; i++) {
    for (let province in mainArr[i]['province_list']) {
      if (mainArr[i]['province_list'].hasOwnProperty(province)) {
        for (let city in mainArr[i]['province_list'][province]['municipality_list']) {
          if (mainArr[i]['province_list'][province]['municipality_list'].hasOwnProperty(city)) {
            let tempArr = mainArr[i]['province_list'][province]['municipality_list'][city]['barangay_list'];
            let cityObj = { city: city }
            let cityBarangayList = [];

            cityList.push(city);

            for (let l = 0; l < tempArr.length; l++) {
              cityBarangayList.push(tempArr[l]);
            }

            cityObj = { ...cityObj, barangayList: cityBarangayList };
            citiesWithBarangayList.push(cityObj);
          }
        }
      }
    }
  }
}


/* 
 * @desc      Dumps parsed list data into JSON file. Generated file will have the ff structure:
              {
                "cityList": [...],
                "citiesWithBarangayList": [
                  {
                    "city": ...,
                    "barangayList": [...],
                  }
                ]
              }
 * @params    none
 * @return    none
 */
function dumpToJSONFile() {
  populateLists();

  var jsonObj = {
    cityList: cityList,
    citiesWithBarangayList: citiesWithBarangayList
  };

  console.log(__dirname);
  fs.writeFile(__dirname + '/../json/parsedLocations.json', JSON.stringify(jsonObj, null, 2), (err) => {
    if (err) throw err;
    else console.log('File successfully created!');
  });
}

dumpToJSONFile();