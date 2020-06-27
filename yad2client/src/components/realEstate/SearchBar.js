import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startSetAllMatchAds } from '../../actions/ad';
import { setAdvanceFilters } from '../../actions/advanceFilter';
import data from '../../data/values.json';
import language from '../../language/hebrew.json';
import CustomField from '../utils/CustomField';
import CustomSelect from '../utils/CustomSelect';
import AutoLocationSuggestions from '../utils/AutoLocationSuggestions';
import SelectFromTo from '../utils/SelectFromTo';
import DropDown from '../utils/DropDown';
import DropDownSelect from '../utils/DropDownSelect';
import CheckBoxList from '../utils/CheckBoxList';
import DatePicker from '../utils/DatePicker';
import errorHandler from '../../utils/statusHandler';


const customHandler = (setter) => {
    return (e) => {
        const value = e.target.value;
        setter(value);
    }
}

const SearchBar = ({ startSetAllMatchAds, limit, startSetAdvanceFilters }) => {
    const [isOpen, setOpen] = useState(false);

    const [assetType, setAssetType] = useState("");

    const [city, setCity] = useState("");

    const [street, setStreet] = useState("");

    const [floorFrom, setFloorFrom] = useState(0);
    const [floorTo, setFloorTo] = useState(0);

    const [roomFrom, setRoomFrom] = useState(0);
    const [roomTo, setRoomTo] = useState(0);

    const [apartmentProperties, setApartmentProperties] = useState([]);

    const [houseSizeFrom, setHouseSizeFrom] = useState(0);
    const [houseSizeTo, setHouseSizeTo] = useState(0);

    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);



    const [date, setDate] = useState("");

    const houseSizeFromHandler = customHandler(setHouseSizeFrom);
    const houseSizeToHandler = customHandler(setHouseSizeTo);
    const priceFromHandler = customHandler(setPriceFrom);
    const priceToHandler = customHandler(setPriceTo);

    const dropDownHandler = () => {
        setOpen(!isOpen);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const rangeFixer = (range) => {
            const rangeValues = Object.keys(range);
            const fixRange = {};
            if (range[rangeValues[0]] > range[rangeValues[1]]) {
                fixRange[rangeValues[0]] = range[rangeValues[1]];
                fixRange[rangeValues[1]] = range[rangeValues[0]];
                return fixRange
            }
            return range;
        }
        startSetAdvanceFilters({
            assetType,
            city,
            street,
            floorFrom,
            floorTo,
            roomFrom,
            roomTo,
            apartmentProperties,
            ...rangeFixer({ priceFrom, priceTo }),
            ...rangeFixer({ houseSizeFrom, houseSizeTo }),
            date
        }
        )
        const status = await startSetAllMatchAds({
            assetType,
            city,
            street,
            floorFrom,
            floorTo,
            roomFrom,
            roomTo,
            apartmentProperties,
            ...rangeFixer({ priceFrom, priceTo }),
            ...rangeFixer({ houseSizeFrom, houseSizeTo }),
            date,
        }, limit);
        if (status !== 200) {
            alert(errorHandler(status));
        }



    }

    return (
        <div className="searchBarContainer-box shadowBoxContainer">
            <form onSubmit={submitHandler} className="d-flex flex-column mb-5 ">
                <div className="flexResponsive searchBarContainer">
                    <CustomField
                        label={language.location.city}
                        component={
                            <AutoLocationSuggestions
                                placeHolder={language.location.city}
                                cityPlaceHolder={"לדוגמה:חיפה"}
                                setCity={setCity}
                                required={false}
                                city={city}
                                street={street}
                                setStreet={setStreet}
                                streetLabel={language.location.street}
                                needStreet={false}
                            />
                        }
                    />
                    <CustomField
                        label={language.realEstate.assetType.label}
                        component={
                            <CustomSelect
                                name="asset"
                                defaultOption={language.realEstate.assetType.defaultValue}
                                options={data.realEstate.assetType.assets}
                                optionsNames={language.realEstate.assetType.assets}
                                getOption={setAssetType}
                                all={"הכל"}
                                className={"customSelect-m"}
                            />
                        }
                    />
                    <DropDownSelect
                        label={language.realEstate.rooms.label}
                        defaultOption={language.realEstate.rooms.label}
                        inputClassName={"customInput-m mr-0"}
                        buttonClassName={"lightButton buttonSize-s greyBorder"}

                        component={
                            <SelectFromTo
                                name="rooms"
                                defaultOption={language.realEstate.rooms.defaultValue}
                                fromOption={roomFrom}
                                toOption={roomTo}
                                options={data.realEstate.rooms}
                                optionsNames={language.realEstate.rooms.roomsNames}
                                getOptionFrom={setRoomFrom}
                                getOptionTo={setRoomTo}
                                from={roomFrom}
                                to={roomTo}
                                fromLabel={language.from}
                                toLabel={language.to}
                                classNameFrom={"customSelect-s"}
                                classNameTo={"customSelect-s"}

                            />}

                    />
                    <CustomField
                        label={language.realEstate.priceRange}
                        component={
                            <div>
                                <input
                                    type="number"
                                    name={"price"}
                                    placeholder={language.from}
                                    min={0}
                                    onChange={priceFromHandler}
                                    value={priceFrom === 0 ? "" : priceFrom}
                                    className={"customInput-s mr-0"}
                                />
                                <input
                                    type="number"
                                    name={"price"}
                                    placeholder={language.to}
                                    min={priceFrom}
                                    onChange={priceToHandler}
                                    value={priceTo === 0 ? "" : priceTo}
                                    className={"customInput-s"}
                                />
                            </div>}
                    />
                    <div className="d-flex flex-column">
                        <label className="mb-2"></label>
                        <button
                            className={"hidenButton boldText buttonSize-xl mr-3"}
                            type="button"
                            onClick={dropDownHandler}
                        >
                            {language.advanceSearch}
                        </button>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="mb-0"></label>
                        <button type="submit" className="yad2Button buttonSize-l boldButton">{language.search}</button>
                    </div>
                </div>


                {isOpen && (
                    <div className="searchBarAdvanceSearchContainer">
                        <CustomField
                            label={language.realEstate.apartmentProperties.label}
                            labelClassName={"boldText"}
                            component={
                                <CheckBoxList
                                    options={data.realEstate.apartmentProperties}
                                    optionsNames={language.realEstate.apartmentProperties.properties}
                                    getValue={setApartmentProperties}
                                    values={apartmentProperties}
                                />
                            }
                        />
                        <div className="flexResponsive">
                            <CustomField
                                label={language.realEstate.houseSize}
                                component={
                                    <div className="mr-5">
                                        <input
                                            type="number"
                                            name="houseSize"
                                            placeholder={language.from}
                                            min={0}
                                            onChange={houseSizeFromHandler}
                                            value={houseSizeFrom === 0 ? "" : houseSizeFrom}
                                            className={"customInput-s"}
                                        />
                                        <input
                                            type="number"
                                            name="houseSize"
                                            placeholder={language.to}
                                            min={houseSizeFrom}
                                            onChange={houseSizeToHandler}
                                            value={houseSizeTo === 0 ? "" : houseSizeTo}
                                            className={"customInput-s"}
                                        />
                                    </div>
                                }
                            />
                            <SelectFromTo
                                name="floors"
                                defaultOption={language.realEstate.floor.defaultValue}
                                fromOption={floorFrom}
                                toOption={floorTo}
                                options={data.realEstate.floors}
                                optionsNames={language.realEstate.floor.floors}
                                getOptionFrom={setFloorFrom}
                                getOptionTo={setFloorTo}
                                from={floorFrom}
                                to={floorTo}
                                fromLabel={language.realEstate.floor.label + " " + language.from}
                                toLabel={language.realEstate.floor.label + " " + language.to}
                                classNameFrom={"customSelect-s"}
                                classNameTo={"customSelect-s"}
                            />
                            <DatePicker
                                label={language.realEstate.dayOfEnter.label}
                                placeHolder={language.realEstate.dayOfEnter.placeHolder}
                                todayCheckBoxTitle={language.realEstate.ImmediateEntrance}
                                getDate={setDate}
                                date={date}
                                required={false}
                                clearDateButton={true}
                            />
                        </div>

                    </div>
                )}
            </form>
        </div>


    )

}
const mapDispatchToProps = (dispatch) => ({
    startSetAllMatchAds: (filterOptions, limit) => dispatch(startSetAllMatchAds(filterOptions, { limit })),
    startSetAdvanceFilters: (advanceFilters) => dispatch(setAdvanceFilters(advanceFilters))
})
export default connect(undefined, mapDispatchToProps)(SearchBar);


