// API Key: QBznyDeat32Fh3pyLdDcz3KUEyrxDKjA

 // Variables for Function Use





// Functions for use on Weather Sites


// Calculate the windchill
function buildWC(speed,temp){

const feelTemp = document.getElementById('feelTemp')

// Compute the windchill
let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
console.log(wc);

// Round the answer down to integer
wc = Math.floor(wc);

// If chill is greater than temp, return the temp
 wc = (wc > temp)?temp:wc;

 // Display the windchill
 console.log(wc);
 feelTemp.innerHTML = wc;
}




// Wind Dial Function
function windDial(direction){

    // Get the wind dial container
    const dial = document.getElementById("dial");

    // Determine the dial class
    switch (direction){
        case "North":
        case "N":
        dial.setAttribute("class", "n"); //"n" is the CSS rule selector
        break;
        case "NE":
        case "NNE":
        case "ENE":
        dial.setAttribute("class", "ne");
        break;
        case "NW":
        case "NNW":
        case "WNW":
        dial.setAttribute("class", "nw");
        break;
        case "South":
        case "S":
        dial.setAttribute("class", "s");
        break;
        case "SE":
        case "SSE":
        case "ESE":
        dial.setAttribute("class", "se");
        break;l
        case "SW":
        case "SSW":
        case "WSW":
        dial.setAttribute("class", "sw");
        break;
        case "East":
        case "E":
        dial.setAttribute("class", "e");
        break;
        case "West":
        case "W":
        dial.setAttribute("class", "w");
        break;
    }

}

// Function to determine condition
    function getCondition(PHRASE){
        if (PHRASE.toLowerCase().includes("cloud") || PHRASE.toLowerCase().includes("overcast")) {return "Cloudy";}
        if (PHRASE.toLowerCase().includes("rain") || PHRASE.toLowerCase().includes("showers")) {return "Rain";}
        if (PHRASE.toLowerCase().includes("snow") || PHRASE.toLowerCase().includes("blizzard") || PHRASE.toLowerCase().includes("flurr")) {return "Snow";}
        if (PHRASE.toLowerCase().includes("fog") || PHRASE.toLowerCase().includes("hazy")) {return "Fog";}
        if (PHRASE.toLowerCase().includes("clear") || PHRASE.toLowerCase().includes("sunny")) {return "Clear";}   
    }


// Function to change summary image

    function changeSummaryImage(CONDRESULT){

        const curCondContainer = document.getElementById ("tile-container");
        console.log(curCondContainer);

        switch (getCondition(CONDRESULT)){
            case "Clear":
            curCondContainer.setAttribute("class", "clear"); 
            break;
            case "Rain":
            curCondContainer.setAttribute("class", "rain"); 
            break;
            case "Cloudy":
            curCondContainer.setAttribute("class", "cloudy"); 
            break;
            case "Snow":
            curCondContainer.setAttribute("class", "snow");
            break;
            case "Fog":
            curCondContainer.setAttribute("class", "fog");
            break;
        }
}



 console.log (CONDRESULT)




//  Week 10 Activity Functions //////////////////////////////////////////////

// Get location code from API
function getCode(LOCALE) {
    const API_KEY = 'QBznyDeat32Fh3pyLdDcz3KUEyrxDKjA';
    const URL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey='+API_KEY+'&q='+LOCALE;
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getCode function:');
      console.log(data);
      const locData = {}; // Create an empty object
      locData['key'] = data.Key; // Add the value to the object
      locData['name'] = data.LocalizedName;
      locData['postal'] = data.PrimaryPostalCode;
      locData['state'] = data.AdministrativeArea.LocalizedName;
      locData['stateAbbr'] = data.AdministrativeArea.ID;
      locData['geoposition'] = LOCALE;
      locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
      getWeather(locData);
      })
     .catch(error => console.log('There was a getCode error: ', error))
  } // end getCode function

  // Get Current Weather data from API
function getWeather(locData) {
    const API_KEY = 'QBznyDeat32Fh3pyLdDcz3KUEyrxDKjA';
    const CITY_CODE = locData['key']; // We're getting data out of the object
    const URL = "https://dataservice.accuweather.com/currentconditions/v1/"+CITY_CODE+"?apikey="+API_KEY+"&details=true";
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getWeather function:');
      console.log(data); // Let's see what we got back
      // Start collecting data and storing it
      locData['currentTemp'] = data[0].Temperature.Imperial.Value;
      locData['summary'] = data[0].WeatherText;
      locData['windSpeed'] = data[0].Wind.Speed.Imperial.Value;
      locData['windUnit'] = data[0].Wind.Speed.Imperial.Unit;
      locData['windDirection'] = data[0].Wind.Direction.Localized;
      locData['windGust'] = data[0].WindGust.Speed.Imperial.Value;
      locData['pastLow'] = data[0].TemperatureSummary.Past12HourRange.Minimum.Imperial.Value;
      locData['pastHigh'] = data[0].TemperatureSummary.Past12HourRange.Maximum.Imperial.Value;
      getHourly(locData); // Send data to getHourly function
      })
     .catch(error => console.log('There was an error: ', error))
  } // end getWeather function


  // Get next 12 hours of forecast data from API
function getHourly(locData) {
    const API_KEY = 'QBznyDeat32Fh3pyLdDcz3KUEyrxDKjA';
    const CITY_CODE = locData['key'];
    const URL = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/"+CITY_CODE+"?apikey="+API_KEY;
    fetch(URL)
      .then(response => response.json())
      .then(function (data) {
      console.log('Json object from getHourly function:');
      console.log(data); // See what we got back
      // Get the first hour in the returned data
      let date_obj = new Date(data[0].DateTime);
      let nextHour = date_obj.getHours(); // returns 0 to 23
      // Store into the object
      locData["nextHour"] = nextHour;
      // Counter for the forecast hourly temps
      var i = 1;
      // Get the temps for the next 12 hours
      data.forEach(function (element) {
        let temp = element.Temperature.Value;
        let hour = 'hourTemp' + i;
        locData[hour] = temp; // Store hour and temp to object
        // New hiTemp variable, assign value from previous 12 hours
        let hiTemp = locData.pastHigh;
        // New lowTemp variable, assign value from previous 12 hours
        let lowTemp = locData.pastLow;
        // Check current forecast temp to see if it is 
        // higher or lower than previous hi or low
        if(temp > hiTemp){
          hiTemp = temp;
        } else if (temp < lowTemp){
          lowTemp = temp;
        }
        // Replace stored low hi and low temps if they changed
        if(hiTemp != locData.pastHigh){
          locData["pastHigh"] = hiTemp; // When done, this is today's high temp
        }
        if(lowTemp != locData.pastLow){
          locData["pastLow"] = lowTemp; // When done, this is today's low temp
        }
        i++; // Increase the counter by 1
      }); // ends the foreach method
      console.log('Finished locData object and data:');
      console.log(locData);
      buildPage(locData); // Send data to buildPage function
      })
      .catch(error => console.log('There was an error: ', error))
  } // end getHourly function


// Populate the current location weather page

function buildPage(locData){
    // Task 1 - Feed data to WC, Dial and Image functions

        // Variables for WC
        const temp = locData.currentTemp;
        const speed = locData.windSpeed;

        // Variables for Dial
        const direction = locData.windDirection;

        // Variables for Image
        const PHRASE = locData.summary;
        const CONDRESULT = getCondition(PHRASE);
        
        // Call Functions for WC, Dial, and Image

        buildWC(temp, speed)
        windDial (direction)
        changeSummaryImage(CONDRESULT);


    
    // Task 2 - Populate location information (zip, elevation, lat/lon)

    document.getElementById('zip').innerHTML=locData.postal;
    document.getElementById('elevation').innerHTML=locData.elevation + "ft.";
    document.getElementById('location').innerHTML=locData.geoposition;
    document.getElementById('loc-name').innerHTML=locData.name +", " +locData.stateAbbr;
    
    // Task 3 - Populate weather information
    document.getElementById('current').innerHTML=locData.currentTemp;
    document.getElementById('hi').innerHTML="H " + locData.pastHigh + " F";
    document.getElementById('lo').innerHTML="L " + locData.pastLow + " F";
    document.getElementById('wind-info').innerHTML=locData.windSpeed + " mph";
    document.getElementById('wd').innerHTML=locData.windDirection;
    document.getElementById('wg').innerHTML=locData.windGust;
    document.getElementById('summary-title')=locData.summary;
    
    
    // Task 4 - Hide status and show main
    
    }

    console.log("This is my Summary: " + locdata.summary);