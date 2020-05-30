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



        <div
            className="d-flex flex-column border border-dark pr-1 pl-1 pb-1 pt-1 mb-4 w-100"
            style={{ background: 'linear-gradient(0deg, rgba(239,250,255,1) 0%, rgba(255,71,71,1) 100%)' }}
        >
            <div onClick={openAdHanlder} className="d-flex justify-content-between">
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
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                        <div>
                            <p><span>{language.ad.enterDay}</span>{`${new moment(date).format("DD-MM-YYYY")}`}</p>
                            <p><span>{language.ad.houseStatus}</span>{transleValues(assetStatus, data.realEstate.assetStatus, language.realEstate.assetStatus.options)}</p>
                            {!!gardenSize && <p><span>{language.ad.gardenSize}</span>{gardenSize}</p>}
                            <p><span>{language.ad.houseSize}</span>{houseSize}</p>
                            {!!floorsInBuilding && <p><span>{language.ad.floorsInBulding}</span>{floorsInBuilding}</p>}
                        </div>
                        <div className="d-flex flex-column w-75 h-25" >
                            <h6>{language.ad.description}</h6>
                            <p style={{ wordBreak: "break-all" }}>{description}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        {apartmentProperties.length > 0 && (
                            <div>
                                <h5>{language.ad.apartmentProperties}</h5>
                                <div>
                                    {apartmentProperties.map((prop) =>
                                        <span key={prop} className="mr-1 ml-1">{transleValues(prop, data.realEstate.apartmentProperties, language.realEstate.apartmentProperties.properties)}</span>)}
                                </div>
                            </div>

                        )}
                        <DropDown
                            label=""
                            buttonPlaceHolder={language.ad.contact}
                            component={
                                <div>
                                    <h3>{contact}</h3>
                                    <h3>{phoneNumber}</h3>
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

