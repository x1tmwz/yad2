import React, { useState, useEffect, useRef } from 'react';
import data from '../../data/values.json';
import language from '../../language/hebrew.json';
import CustomField from '../utils/CustomField';
import CustomSelect from '../utils/CustomSelect';
import AutoLocationSuggestions from '../utils/AutoLocationSuggestions';
import CustomError from '../utils/CustomError';
import InputFromTo from '../utils/InputFromTo';
import CheckBoxList from '../utils/CheckBoxList';
import DatePicker from '../utils/DatePicker';
import FileHandler from '../utils/FileHandler';
import CustomContactDetails from '../utils/CustomContactDetails';


const customHandler = (setter) => {
    return (e) => {
        const value = e.target.value;
        setter(value);
    }
}


const AssetsForm = (props) => {
    const isInitialMount = useRef(true)
    const [assetType, setAssetType] = useState(props.assetType || "");
    const [errorNoAssetType, setErrorNoAssetType] = useState("");

    const [assetStatus, setAssetStatus] = useState(props.assetStatus || "");
    const [assetStatusError, setAssetStatusError] = useState("");


    const [city, setCity] = useState(props.city || "");
    const [cityError, setCityError] = useState("");

    const [street, setStreet] = useState(props.street || "");
    const [streetError, setStreetError] = useState("");

    const [floor, setFloor] = useState(props.floor || 0);
    const [floorsInBuilding, setFloorsInBuilding] = useState(props.floorsInBuilding || 0);
    const [floorError, setFloorError] = useState("");

    const [rooms, setRooms] = useState(props.rooms || "");
    const [roomsError, setRoomsError] = useState("");

    const [apartmentProperties, setApartmentProperties] = useState(props.apartmentProperties || []);

    const [description, setDescription] = useState(props.description || "");

    const [houseSize, setHouseSize] = useState(props.houseSize || "");
    const [houseSizeError, setHouseSizeError] = useState("");

    const [gardenSize, setGradenSize] = useState(props.gardenSize || 0);

    const [price, setPrice] = useState(props.price || 0);
    const [priceError, setPriceError] = useState("");

    const [date, setDate] = useState(props.date || "");
    const [image1, setImage1] = useState(props.image1 || "");
    const [image2, setImage2] = useState(props.image2 || "");
    const [image3, setImage3] = useState(props.image3 || "");

    const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber || "");
    const [contact, setContact] = useState(props.contact || "");

    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [contactError, setContactError] = useState("");

    const descriptionHandler = customHandler(setDescription);
    const gardenSizeHandler = customHandler(setGradenSize);
    const houseSizeHandler = customHandler(setHouseSize);
    const priceHandler = customHandler(setPrice);


    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            !assetType || setErrorNoAssetType("");
            !assetStatus || setAssetStatusError("");
            !city || setCityError("");
            !street || setStreetError("");
            (parseInt(floor) > parseInt(floorsInBuilding)) || setFloorError("");
            !rooms || setRoomsError("");
            !houseSize || setHouseSizeError("");
            (price < 100000) || setPriceError("")
            !phoneNumber || setPhoneNumberError("");
            !contact || setContactError("");

        }
    }, [assetType, city, street, floor, floorsInBuilding, rooms, houseSize, price, phoneNumber, contact, assetStatus])




    const submitHandler = (e) => {
        e.preventDefault();
        !assetType && setErrorNoAssetType(language.form.error.assetTypeError);
        !assetStatus && setAssetStatusError(language.form.error.assetStatusError);
        !city && setCityError(language.form.error.cityError);
        !street && setStreetError(language.form.error.streetError);
        (parseInt(floor) > parseInt(floorsInBuilding)) && setFloorError(language.form.error.floorError);
        !rooms && setRoomsError(language.form.error.roomsError);
        !houseSize && setHouseSizeError(language.form.error.houseSizeError);
        if (!!price) {
            price < 100000 && setPriceError(language.form.error.priceError)
        }
        !phoneNumber && setPhoneNumberError(language.form.error.phoneNumberError);
        !contact && setContactError(language.form.error.contactError)


        if (!assetType || !city || !street || !rooms || (parseInt(floor) > parseInt(floorsInBuilding)) || !houseSize
            || (!!price && price < 100000) || !data || !phoneNumber || !contact || !assetStatus) {
            return;
        }

        if (props.submit) {
            props.submit({
                assetType,
                assetStatus,
                city,
                street,
                floor,
                floorsInBuilding,
                rooms,
                apartmentProperties,
                description,
                houseSize,
                gardenSize,
                price: !!price ? price : 0,
                date,
                image1,
                image2,
                image3,
                phoneNumber,
                contact
            });
        }

    }

    return (
        <form onSubmit={submitHandler} className="centerContainer shadowBoxContainer">
            <div className="d-flex flex-column">
                <div className="flexResponsive spredContainer">
                    <CustomField
                        label={"מיקום:"}
                        component={
                            <AutoLocationSuggestions
                                placeHolder={"city"}
                                setCity={setCity}
                                required={true}
                                city={city}
                                street={street}
                                setStreet={setStreet}
                                cityPlaceHolder={"לדוגמה:חיפה"}
                                needStreet={true}
                                streetLabel={language.form.fields.street}
                                cityLabel={language.form.fields.city}

                            />

                        }
                    />
                    <CustomError error={cityError} />
                    <CustomError error={streetError} />
                    <CustomField
                        label={language.form.fields.assetStatus}
                        component={
                            <CustomSelect
                                name="status"
                                defaultOption={props.assetStatus || language.form.fields.statusHolder}
                                options={["new", "renovated", "needRenovated"]}
                                optionsNames={language.realEstate.assetStatus.options}
                                getOption={setAssetStatus}
                                className={"customSelect-m mr-5 "}
                            />
                        }
                    />
                    <CustomError error={assetStatusError} />



                    <CustomField
                        label={language.form.fields.assetType}
                        component={
                            <CustomSelect
                                name="asset"
                                defaultOption={props.assetType || language.realEstate.assetType.defaultValue}
                                options={data.realEstate.assetType.assets}
                                optionsNames={language.realEstate.assetType.assets}
                                getOption={setAssetType}
                                disabled={true}
                                className={"customSelect-m mr-5"}
                            />
                        }
                    />
                    <CustomError error={errorNoAssetType} />

                    <CustomField
                        label={language.form.fields.rooms}
                        component={
                            <CustomSelect
                                name="rooms"
                                defaultOption={props.rooms || language.realEstate.rooms.defaultValue}
                                options={data.realEstate.rooms}
                                optionsNames={language.realEstate.rooms.roomsNames}
                                getOption={setRooms}
                                className={"customSelect-m"}
                            />
                        }
                    />

                    <CustomError error={roomsError} />
                </div>
                <div className="flexResponsive">

                    <CustomField
                        label={"קומות*:"}
                        component={
                            <InputFromTo
                                name="floors"
                                fromLabel={language.form.fields.floor}
                                toLabel={language.form.fields.floorsInBulding}
                                fromPlaceHolder={language.form.fields.houseIsntInBulding}
                                toPlaceHolder={language.form.fields.houseIsntInBulding}
                                setFrom={setFloor}
                                setTo={setFloorsInBuilding}
                                fromValue={floor}
                                toValue={floorsInBuilding}
                                className="form-control"
                                classNameFrom={"customInput-m"}
                                classNameTo={"customInput-m mr-3"}

                            />

                        }
                    />

                    <CustomError error={floorError} />

                    <CustomField
                        label={language.form.fields.houseSize}
                        component={
                            <div>
                                <input
                                    type="number"
                                    name="houseSize"
                                    placeholder={language.form.fields.size}
                                    min={0}
                                    onChange={houseSizeHandler}
                                    value={houseSize}
                                    className="customInput-m mr-5"
                                />
                            </div>
                        }
                    />
                    <CustomError error={houseSizeError} />
                    <CustomField
                        label={language.realEstate.gradenSize}
                        component={
                            <div>
                                <input
                                    type="number"
                                    name={"gardenSize"}
                                    placeholder={language.form.fields.size}
                                    min={0}
                                    onChange={gardenSizeHandler}
                                    value={gardenSize === 0 ? "" : gardenSize}
                                    className="customInput-m  mr-5"
                                />
                            </div>
                        }
                    />

                    <CustomField
                        label={language.realEstate.price.label}
                        component={
                            <div>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder={language.form.fields.priceHolder}
                                    min={100000}
                                    onChange={priceHandler}
                                    value={price === 0 ? "" : price}
                                    className="customInput-l"
                                />
                            </div>

                        }
                    />
                    <CustomError error={priceError} />

                </div>

            </div>




            <h4>{language.realEstate.apartmentProperties.label}</h4>
            <CheckBoxList
                options={data.realEstate.apartmentProperties}
                optionsNames={language.realEstate.apartmentProperties.properties}
                getValue={setApartmentProperties}
                values={apartmentProperties}
            />



            <CustomField
                label={language.form.fields.description}
                component={<div><textarea onChange={descriptionHandler} value={description} className="textArea" /></div>}
            />

            <div className="flexResponsive">
                <div>
                    <h4>{language.form.fields.img1}</h4>
                    <FileHandler
                        file={image1}
                        setImage={setImage1}
                    />
                </div>
                <div>
                    <h4>{language.form.fields.img2}</h4>
                    <FileHandler
                        file={image2}
                        setImage={setImage2}
                    />

                </div>
                <div>
                    <h4>{language.form.fields.img3}</h4>
                    <FileHandler
                        file={image3}
                        setImage={setImage3}
                    />
                </div>

            </div>

            <DatePicker
                label={"תאריך כניסה*"}
                placeHolder={language.realEstate.dayOfEnter.placeHolder}
                todayCheckBoxTitle={language.realEstate.ImmediateEntrance}
                getDate={setDate}
                date={date}
                required={true}
            />

            <h4>{language.form.fields.contact}</h4>
            <CustomContactDetails
                number={phoneNumber}
                contact={contact}
                setPhoneNumber={setPhoneNumber}
                setContact={setContact}
            />



            <CustomError error={phoneNumberError} />
            <CustomError error={contactError} />

            <button className="btn btn-primary mb-2">{language.form.submit}</button>



        </form>

    )

}
export default AssetsForm;


