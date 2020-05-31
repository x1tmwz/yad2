import React, { useState, useEffect } from 'react';
import israel from '../../cities/israel.json';
import israelCities from '../../cities/israelCities.json';



const AutoLocationSuggestions = (props) => {

    const [city, setCity] = useState(props.city || '');
    const [street, setStreet] = useState(props.street || '');

    const cityHandler = (e) => {
        const value = e.target.value;
        setCity(value);
    }

    const getCitySuggestions = city => {
        return city.length < 3 ? [] : israelCities.cities.filter(c =>
            c.includes(city)
        );
    };

    const blurHandler = (e) => {
        const options = document.getElementById("city");
        if (options.hasChildNodes()) {
            if (options.firstChild.value !== city) {
                setCity("");
            } else if (props.setCity) {
                props.setCity(options.firstChild.value);
            }
        } else {
            setCity("");
        }
    }
    const streetHandler = (e) => {
        const value = e.target.value;
        setStreet(value);

    }

    const getStreetSuggestions = (city, street) => {
        if (street.length < 3) {
            return [];
        } else if (israel[city]) {
            return israel[city].filter((str) => {
                let amount = 0;
                if (str.includes(street)) {
                    amount++;
                }
                if (amount === 10) {
                    return false;
                }
                return str.includes(street);
            })
        }
        return [];

    };

    const streetBlurHandler = (e) => {
        const options = document.getElementById("street");
        if (options.hasChildNodes()) {
            if (options.firstChild.value !== street) {
                setStreet("");
            } else if (props.setStreet) {
                props.setStreet(options.firstChild.value);
            }
        } else {
            setStreet("");
        }
    }
    useEffect(() => {
        if (city.length === 0) {
            props.setCity("");
            props.setStreet("");
            setStreet("");
        }
        if (street.length === 0) {
            props.setStreet("")
        }
    }, [street, city, props])

    return (
        <div className="flexResponsive">
            <div onBlur={blurHandler}>
                <label>{props.cityLabel}</label>
                <input
                    list="city"
                    placeholder={props.cityLabel}
                    onChange={cityHandler}
                    value={city}
                    name="city"
                    required={props.required}
                    className="mr-1 ml-1"
                />
                <datalist id="city">
                    {getCitySuggestions(city).map((city) =>
                        <option value={city} key={city}>
                            {city}
                        </option>)}

                </datalist>

            </div>
            {props.needStreet && (
                <div onBlur={streetBlurHandler}>
                    <label>{props.streetLabel}</label>
                    <input
                        list="street"
                        placeholder={props.streetLabel}
                        onChange={streetHandler}
                        value={street}
                        name="street"
                        required={props.required}
                        disabled={!!!props.city}
                    />
                    <datalist id="street">
                        {getStreetSuggestions(city, street).map((str) =>
                            <option value={str} key={str}>
                                {str}
                            </option>)}

                    </datalist>

                </div>
            )}

        </div>
    );
}
export default AutoLocationSuggestions;