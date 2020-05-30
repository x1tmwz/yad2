import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MiniNav from './MiniNav';

const CustomRouter = (props) => {

    return (
        <BrowserRouter>
            <MiniNav links={props.links} />
            <Switch>
                {props.links.map(link => {
                    return <Route key={link.path} path={link.path} component={link.component} />
                })}
            </Switch>

        </BrowserRouter>
    );

}
export default CustomRouter;