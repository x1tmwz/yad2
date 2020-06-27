import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import AssetItem from './realEstate/AssetItem';
import { startSetMyAds, startRemoveAd } from '../actions/ad';
import language from '../language/hebrew.json'
import errorHandler from '../utils/statusHandler';

const PersonalSpace = (props) => {
    const [ads, setAds] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const status = await props.startSetMyAds();
                setLoading(false)
                if (status !== 200) {
                    console.log(status)
                    alert(errorHandler(status))
                }
            } catch (e) {
                setError(errorHandler());
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        setAds(props.ads);
    }, [props.ads])

    const editHandler = (e) => {
        props.history.push(`/editAd/${e.target.value}`)
    }
    const deletAdHandler = (e) => {
        props.startRemoveAd(e.target.value);
        props.history.push(`/mySpace`);
    }

    return (
            <div className="ml-5">
                <h1>{language.personalSpace.h1}</h1>
                {loading ? <p>Loading..</p> : ads.map((asset) =>
                    (<div key={asset._id}>
                        <AssetItem {...asset} />
                        <button onClick={editHandler} value={asset._id} className="btn btn-primary">{language.personalSpace.edit}</button>
                        <button onClick={deletAdHandler} value={asset._id} className="btn btn-danger">{language.personalSpace.delet}</button>
                    </div>))}
                {!!error && <p>{error}</p>}
            </div>

     

    );
}
const mapStateToProps = (state) => ({
    ads: state.ads
})
const mapDispatchToProps = (dispatch) => ({
    startSetMyAds: () => dispatch(startSetMyAds()),
    startRemoveAd: (_id) => dispatch(startRemoveAd(_id))
})
export default connect(mapStateToProps, mapDispatchToProps)(PersonalSpace);