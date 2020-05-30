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
        <form onSubmit={submitHandler} className="d-flex flex-column border border-dark pr-1 pl-1 pb-1 pt-1 mb-4">
            <div className="d-flex justify-content-between">
                <CustomField
                    label={language.location.city}
                    component={
                        <AutoLocationSuggestions
                            placeHolder={language.location.city}
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
                        />
                    }
                />

            </div>
            <button type="submit" className="btn btn-info btn-lg mb-3">{language.search}</button>


            <DropDown
                buttonPlaceHolder={language.advanceSearch}
                component={
                    <div >
                        <DropDown
                            buttonPlaceHolder={language.realEstate.priceRange}
                            component={
                                <div>
                                    <input
                                        type="number"
                                        name={"price"}
                                        placeholder={language.from}
                                        min={0}
                                        onChange={priceFromHandler}
                                        value={priceFrom === 0 ? "" : priceFrom}
                                    />
                                    <input
                                        type="number"
                                        name={"price"}
                                        placeholder={language.to}
                                        min={priceFrom}
                                        onChange={priceToHandler}
                                        value={priceTo === 0 ? "" : priceTo}
                                    />
                                </div>}
                        />
                        <div>
                            <DropDown
                                buttonPlaceHolder={language.realEstate.apartmentProperties.label}
                                component={
                                    <CheckBoxList
                                        options={data.realEstate.apartmentProperties}
                                        optionsNames={language.realEstate.apartmentProperties.properties}
                                        getValue={setApartmentProperties}
                                        values={apartmentProperties}
                                    />
                                }
                            />
                        </div>
                        <div >

                            <DropDown
                                buttonPlaceHolder={language.realEstate.houseSize}
                                component={
                                    <div>
                                        <input
                                            type="number"
                                            name="houseSize"
                                            placeholder={language.from}
                                            min={0}
                                            onChange={houseSizeFromHandler}
                                            value={houseSizeFrom === 0 ? "" : houseSizeFrom}
                                        />
                                        <input
                                            type="number"
                                            name="houseSize"
                                            placeholder={language.to}
                                            min={houseSizeFrom}
                                            onChange={houseSizeToHandler}
                                            value={houseSizeTo === 0 ? "" : houseSizeTo}
                                        />
                                    </div>
                                }
                            />


                            <DropDown
                                buttonPlaceHolder={language.realEstate.floor.label}
                                component={
                                    <SelectFromTo
                                        name="floors"
                                        defaultOption={language.realEstate.floor.defaultValue}
                                        options={data.realEstate.floors}
                                        optionsNames={language.realEstate.floor.floors}
                                        getOptionFrom={setFloorFrom}
                                        getOptionTo={setFloorTo}
                                        from={floorFrom}
                                        to={floorTo}
                                        fromLabel={language.from}
                                        toLabel={language.to}
                                    />}
                            />
                            <DropDown
                                buttonPlaceHolder={language.realEstate.rooms.label}
                                component={
                                    <SelectFromTo
                                        name="rooms"
                                        defaultOption={language.realEstate.rooms.defaultValue}
                                        options={data.realEstate.rooms}
                                        optionsNames={language.realEstate.rooms.roomsNames}
                                        getOptionFrom={setRoomFrom}
                                        getOptionTo={setRoomTo}
                                        from={roomFrom}
                                        to={roomTo}
                                        fromLabel={language.from}
                                        toLabel={language.to}
                                    />}

                            />
                        </div>
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
                }
            />

        </form>

    )

}
const mapDispatchToProps = (dispatch) => ({
    startSetAllMatchAds: (filterOptions, limit) => dispatch(startSetAllMatchAds(filterOptions, { limit })),
    startSetAdvanceFilters: (advanceFilters) => dispatch(setAdvanceFilters(advanceFilters))
})
export default connect(undefined, mapDispatchToProps)(SearchBar);


