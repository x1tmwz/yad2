import React from 'react';
import { connect } from "react-redux";
import { startEditAd } from '../actions/ad'
import AssetsForm from './realEstate/AssetForm';
import language from '../language/hebrew.json'
import errorHanler from '../utils/statusHandler';

const EditAdPage = (props) => {
    const submit = (ad) => {
        props.startEditAd(props.ad._id,ad).then((status) => {
            if(status === 200){
                props.history.push("/RealEstate/sale")
            }else{
                alert(errorHanler(status));
            }
        }).catch((e) => {
            alert(errorHanler());
        })
    }
    return (
        <div>
            <h1>{language.editPage.h1}</h1>
            <AssetsForm submit={submit} {...(props.ad)}/>
        </div>
    );
}
const mapStateToProps = (state, props) => ({
    ad: state.ads.find((ad) => ad._id === props.match.params.id)
})
const mapDispatchToProps = (dispatch) => ({
    startEditAd: (id,ad) => dispatch(startEditAd(id,ad))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditAdPage);