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
        <form onSubmit={submitHandler} className="border border-dark pr-1 pl-1 pb-1 pt-1 mb-4" >
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-between">
                    <div>
                        <CustomField
                            label={language.form.fields.assetStatus}
                            component={
                                <CustomSelect
                                    name="status"
                                    defaultOption={props.assetStatus || language.form.fields.statusHolder}
                                    options={["new", "renovated", "needRenovated"]}
                                    optionsNames={language.realEstate.assetStatus.options}
                                    getOption={setAssetStatus}
                                />
                            }
                        />
                        <CustomError error={assetStatusError} />
                    </div>
                    <div className="ml-5">
                        {/* chose the kind of asset */}
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
                                />
                            }
                        />
                        <CustomError error={errorNoAssetType} />
                    </div>
                </div>

                <AutoLocationSuggestions
                    placeHolder={"city"}
                    setCity={setCity}
                    required={true}
                    city={city}
                    street={street}
                    setStreet={setStreet}
                    needStreet={true}
                    streetLabel={language.form.fields.street}
                    cityLabel={language.form.fields.city}

                />

                <CustomError error={cityError} />
                <CustomError error={streetError} />

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
                />
                <CustomError error={floorError} />


                <div className="d-flex justify-content-between">
                    <div className="ml-5">
                        <h4>{language.realEstate.apartmentProperties.label}</h4>
                        <CheckBoxList
                            options={data.realEstate.apartmentProperties}
                            optionsNames={language.realEstate.apartmentProperties.properties}
                            getValue={setApartmentProperties}
                            values={apartmentProperties}
                        />

                    </div>
                    <div>
                        <CustomField
                            label={language.form.fields.description}
                            component={<div><textarea onChange={descriptionHandler} value={description} /></div>}
                        />
                    </div>

                </div>
                <div>
                    <div className="d-flex flex-row">
                        <div className="mr-5">
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
                                        />
                                    </div>
                                }
                            />
                            <CustomError error={houseSizeError} />

                        </div>
                        <div>
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
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                        <div className="mr-5">
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
                                        />
                                    </div>

                                }
                            />
                            <CustomError error={priceError} />

                        </div>
                        <div>
                            <CustomField
                                label={language.form.fields.rooms}
                                component={
                                    <CustomSelect
                                        name="rooms"
                                        defaultOption={props.rooms || language.realEstate.rooms.defaultValue}
                                        options={data.realEstate.rooms}
                                        optionsNames={language.realEstate.rooms.roomsNames}
                                        getOption={setRooms}
                                    />
                                }
                            />

                            <CustomError error={roomsError} />
                        </div>
                    </div>

                </div>








                <DatePicker
                    label={language.form.fields.datePicker}
                    placeHolder={language.realEstate.dayOfEnter.placeHolder}
                    todayCheckBoxTitle={language.realEstate.ImmediateEntrance}
                    getDate={setDate}
                    date={date}
                    required={true}
                />
                <div className="row justify-content-between">
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
                <div>
                    <h4>{language.form.fields.contact}</h4>
                    <CustomContactDetails
                        number={phoneNumber}
                        contact={contact}
                        setPhoneNumber={setPhoneNumber}
                        setContact={setContact}
                    />

                </div>

                <CustomError error={phoneNumberError} />
                <CustomError error={contactError} />

                <button className="btn btn-primary mb-2">{language.form.submit}</button>

            </div>

        </form>

    )

}
export default AssetsForm;


