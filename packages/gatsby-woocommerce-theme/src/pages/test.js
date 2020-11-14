import React from 'react';

const TestPage = ({  }) => {

    const [country, setCountry] = React.useState(false);
  
    const getIp = () => {
        var req = new XMLHttpRequest();

        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                setCountry(JSON.parse(this.responseText));
                // document.getElementById('country').innerHTML = `country : ${this.responseText.country}`;
                // document.getElementById('city').innerHTML = `city : ${this.responseText.city}`;
                // document.getElementById('timezone').innerHTML = `timezone : ${this.responseText.timezone}`;
                // document.getElementById('currency').innerHTML = `currency : ${this.responseText.currency}`;
            }
        }

        req.open("GET", "http://ip-api.com/json/?fields=country,city,timezone,currency", true);

        req.send();

        return {};
    }

    !country && getIp();

    return (
        <div className="container">
        <div id="country">
            {country.country || `Still no country data fetched from services`}
        </div>
        <div id="city">
            {country.city || `Still no city data fetched from services`}
        </div>
        <div id="timezone">
            {country.timezone || `Still no timezone data fetched from services`}
        </div>
        <div id="currency">
            {country.currency || `Still no currency data fetched from services`}
        </div>
        <div id="price">
            {country && new Intl.NumberFormat(navigator.language, { style: 'currency', currency: country.currency }).format("£11".replace('£', ''))}
        </div>
        </div>
    );
};

export default TestPage;