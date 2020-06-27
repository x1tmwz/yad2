import React, { useState } from 'react'
import DropDown from '../utils/DropDown';
import CustomTitle from '../utils/CustomTitle';
import ImageViewer from '../utils/ImageViewer';
import language from '../../language/hebrew.json';
import transleValues from '../../utils/transleValues';
import data from '../../data/values.json';
import moment from 'moment';


const imageArray = (images = []) => {
    return images.filter(image => !!image);
}

const AssetItem = ({
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
    price,
    date,
    image1,
    image2,
    image3,
    phoneNumber,
    contact,
    updatedAt
}) => {
    const [isOpen, setOpen] = useState(false);
    const openAdHanlder = (e) => {
        e.stopPropagation();
        setOpen(!isOpen);
    }
    return (
        <div className="adContainer">
            <div onClick={openAdHanlder} className="flexResponsive adTitlesContainer greyBorder">
                <ImageViewer
                    images={imageArray([image1, image2, image3])}
                />
                <CustomTitle
                    title={`${city},${street}`}
                    label={transleValues(assetType, data.realEstate.assetType.assets, language.realEstate.assetType.assets)}
                />
                <CustomTitle
                    title={houseSize + gardenSize}
                    label={language.ad.totalSize}
                />
                <CustomTitle
                    title={floor === 0 ? language.form.fields.houseIsntInBulding : floor}
                    label={language.ad.floor}
                />
                <CustomTitle
                    title={rooms}
                    label={language.ad.room}
                />
                <CustomTitle
                    title={!!price ? price + "₪" : language.ad.noPriceTag}
                    label={`${language.ad.update} ${new moment(updatedAt).format("DD-MM-YYYY")}`}
                />

            </div>
            {isOpen && (
                <div className="flexResponsive adInfoContainer">
                    <div className="ad-comrcialAd">
                        Ad
                    </div>
                    <div>
                        <div>
                            <h6>{language.ad.description}</h6>
                            <p style={{ wordBreak: "break-all" }}>{description ? description:"אין תיאור לנכס זה."}</p>
                        </div>
                        <div className="flexResponsive adInfoContainer-description">
                            <div>
                                <p><span>{language.ad.enterDay}</span>{`${new moment(date).format("DD-MM-YYYY")}`}</p>
                                <p><span>{language.ad.houseStatus}</span>{transleValues(assetStatus, data.realEstate.assetStatus, language.realEstate.assetStatus.options)}</p>
                                <p><span>{language.ad.houseSize}</span>{houseSize}</p>
                            </div>
                            <div>
                                {!!gardenSize && <p><span>{language.ad.gardenSize}</span>{gardenSize}</p>}
                                {!!floorsInBuilding && <p><span>{language.ad.floorsInBulding}</span>{floorsInBuilding}</p>}
                            </div>
                        </div>


                        {apartmentProperties.length > 0 && (
                            <div>
                                <h5>{language.ad.apartmentProperties}</h5>
                                <div className="flexResponsive">
                                    {apartmentProperties.map((prop) =>
                                        <span key={prop} className="mr-1 ml-1">{transleValues(prop, data.realEstate.apartmentProperties, language.realEstate.apartmentProperties.properties)}</span>)}
                                </div>
                            </div>

                        )}
                        <DropDown
                            label=""
                            buttonPlaceHolder={language.ad.contact}
                            buttonClassName="btn btn-success adContactButton"
                            component={
                                <div className="adContactInfo">
                                    <h3 className=" adContactInfo-item greyBorder">{contact}</h3>
                                    <h3 className="adContactInfo-item greyBorder ">{phoneNumber}</h3>
                                </div>
                            }

                        />

                    </div>


                </div>
            )}
        </div>


    );

}
export default AssetItem;

