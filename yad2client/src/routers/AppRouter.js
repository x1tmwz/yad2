import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRouter from './PrivateRoute';
import Header from '../components/Header'
import HomePage from '../components/HomePage';
import NotFoundPage from '../components/NotFountPage'
import RealEstateRouter from '../components/realEstate/RealEstateRouter';
import AddNewAdPage from '../components/AddNewAdPage'
import LoginPage from '../components/LoginPage';
import PersonalSpace from '../components/PersonalSpace';
import EditAdPage from '../components/EditAdPage';


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <div className="container">
                <Switch>
                    <Route path='/' component={HomePage} exact={true} />
                    <Route path='/RealEstate/sale' component={RealEstateRouter} />
                    <Route path='/login/:to?' component={LoginPage} />
                    <PrivateRouter path="/mySpace" component={PersonalSpace} />
                    <PrivateRouter path="/newAd" component={AddNewAdPage} />
                    <PrivateRouter path="/editAd/:id" component={EditAdPage} />
                    <Route path='*' component={NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );

}
export default AppRouter;