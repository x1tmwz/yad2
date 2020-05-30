import React from 'react';
import { connect } from "react-redux";
import { startAddAd } from '../actions/ad'
import AssetsForm from './realEstate/AssetForm';
import language from '../language/hebrew.json'
import errorHanlder from '../utils/statusHandler';



const AddNewAdPage = (props) => {
    const submit = (ad) => {
        props.startAddNewAd(ad).then((status) => {
            if (status === 201) {
                props.history.push("/RealEstate/sale")
            } else {
                errorHanlder(status.status);
            }
        }).catch((e) => {
            alert(errorHanlder());
        })

    }
    return (
        <div>
            <h1>{language.newAdPage.h1}</h1>
            <AssetsForm submit={submit} />
        </div>
    );
}
const mapDispatchToProps = (dispatch) => ({
    startAddNewAd: (ad) => dispatch(startAddAd(ad))
})
export default connect(undefined, mapDispatchToProps)(AddNewAdPage);