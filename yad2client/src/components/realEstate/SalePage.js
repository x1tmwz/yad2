import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import AssetItem from './AssetItem';
import { startSetAllAds, startSetAllMatchAds } from '../../actions/ad';
import Filter from '../Filter';
import filterSelector from '../../selectors/filter';
import SearchBar from './SearchBar';
import Pagination from '../utils/Pagination';
import isEmptyObj from '../../utils/isObjectEmpty';
import language from '../../language/hebrew.json';
import errorHandler from '../../utils/statusHandler';


const SalePage = ({ filterAds, startSetAllAds, advanceFilters, startSetAllMatchAds }) => {
    const [ads, setAds] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const adsPerPage = 2;
    const [limit, setLimit] = useState(4);

    useEffect(() => {
        async function fetchData() {
            try {
                const status = !isEmptyObj(advanceFilters) ? await startSetAllMatchAds(advanceFilters, limit) : await startSetAllAds({ limit });
                setLoading(false);
                const errorValue = errorHandler(status)
                if (errorValue) {
                    alert(errorValue)
                }
            } catch (e) {
                alert(errorHandler());
            }
        }
        fetchData();

    }, [limit,startSetAllAds,startSetAllMatchAds,advanceFilters])

    useEffect(() => {
        if (parseInt(currentPage) === (Math.ceil(ads.length / adsPerPage))) {
            setLimit(limit + 2);
        }
    }, [currentPage])

    useEffect(() => {
        setAds(filterAds);
    }, [filterAds])

    const indexOfLastAd = currentPage * adsPerPage
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <div className="d-flex flex-column align-items-center">
            {/* <h1>{language.salePage}</h1> */}
            <SearchBar limit={limit} />
            <Filter />
            {loading ? <p>Loading...</p> : currentAds.map((asset) => <AssetItem {...asset} key={asset._id} />)}
            <Pagination adsPerPage={adsPerPage} totalAds={ads.length} paginate={paginate} />
        </div>
    );

}
const mapStateToProps = (state) => ({
    filterAds: filterSelector(state.ads, state.filter),
    advanceFilters: state.advanceFilters
})
const mapDispatchToProps = (dispatch) => ({
    startSetAllMatchAds: (filterOptions, limit) => dispatch(startSetAllMatchAds(filterOptions, { limit })),
    startSetAllAds: (params) => dispatch(startSetAllAds(params))

})

export default connect(mapStateToProps, mapDispatchToProps)(SalePage);