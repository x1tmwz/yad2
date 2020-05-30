import React from 'react';
import { connect } from 'react-redux';
import { sortByDate, sortByPicture, sortByPriceHighToLow, sortByPriceLowToHigh, sortByPriceTag } from '../actions/filter';
import language from '../language/hebrew.json'

const Filter = ({
    sortByDate,
    sortByPriceHighToLow,
    sortByPriceLowToHigh,
    sortByPicture,
    sortByPriceTag,
    filter
}) => {

    const sortByHandler = (e) => {
        if (e.target.value === 'lowToHigh') {
            sortByPriceLowToHigh();
        } else if (e.target.value === 'highToLow') {
            sortByPriceHighToLow();
        } else if (e.target.value === "date") {
            sortByDate();
        }
    }
    const pictureFilterHandler = (e) => {
        sortByPicture();
    }
    const priceTagFilterHandler = (e) => {
        sortByPriceTag();
    }
    return (
        // <div className="container">
        <div>
            <div className="d-flex flex-row mb-4">
                <span className="mr-2">{language.filter.sortBy}</span>
                <select onChange={sortByHandler} className="mr-2">
                    <option value="date">{language.filter.sortOptions.date}</option>
                    <option value="lowToHigh">{language.filter.sortOptions.lowToHigh}</option>
                    <option value="highToLow">{language.filter.sortOptions.hightToLow}</option>
                </select>
                <button className={filter.picture ? "btn btn-primary mr-3" : "btn btn-secondary mr-3"} onClick={pictureFilterHandler} >{language.filter.withPicture}</button>
                <button className={filter.price ? "btn btn-primary mr-3" : "btn btn-secondary mr-3"} onClick={priceTagFilterHandler}>{language.filter.withTagPrice}</button>



            </div>
        </div>

        // </div>
    );
}
const mapStateToProps = (state) => ({
    filter: state.filter
})
const mapDispatchToProps = (dispatch) => ({
    sortByDate: () => dispatch(sortByDate()),
    sortByPriceHighToLow: () => dispatch(sortByPriceHighToLow()),
    sortByPriceLowToHigh: () => dispatch(sortByPriceLowToHigh()),
    sortByPicture: () => dispatch(sortByPicture()),
    sortByPriceTag: () => dispatch(sortByPriceTag())

})
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
