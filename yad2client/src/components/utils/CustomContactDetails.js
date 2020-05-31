import React from 'react';
import langauge from '../../language/hebrew.json';
import CustomField from './CustomField';



const CustomContactDetails = (props) => {


    const phoneHandler = (e) => {
        const phoneNumber = e.target.value;
        if (props.setPhoneNumber) {
            props.setPhoneNumber(phoneNumber);
        }

    }
    const contactHandler = (e) => {
        const contact = e.target.value;
        if (props.setContact) {
            props.setContact(contact);
        }
    }

    return (
        <div className="flexResponsive">
            <CustomField
                label={langauge.contact.phone}
                component={
                    <div>
                        <input
                            type="tel"
                            name="phone"
                            pattern="05[0-8]{1}-?[0-9]{3}-?[0-9]{4}"
                            className={props.className}
                            placeholder={"058-6677-045"}
                            onChange={phoneHandler}
                            value={props.number}
                            required
                        />
                    </div>
                }
            />
            <CustomField
                label={langauge.contact.contact}
                component={
                    <div>
                        <input
                            type="text"
                            maxLength="20"
                            className={props.className}
                            onChange={contactHandler}
                            value={props.contact}
                            required
                        />
                    </div>
                }
            />
        </div>
    );
}
export default CustomContactDetails;