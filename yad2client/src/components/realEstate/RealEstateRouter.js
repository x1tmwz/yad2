import React from 'react'
import language from '../../language/hebrew.json';
import CustomRouter from '../utils/CustomRouter';
import SalePage from './SalePage';
import RentPage from './RentPage';

const links = [
    {
        path:"/RealEstate/sale",
        name:language.realEstate.components.realEstateNavBar.sale,
        component:SalePage

    },{
        path:"/RealEstate/rent",
        name:language.realEstate.components.realEstateNavBar.rent,
        component:RentPage
    }
]


const RealEstateRouter = () => {

    return (

        <CustomRouter links={links}/>
        
    );

}
export default RealEstateRouter;