import React from 'react';
import { Switch, Route } from 'react-router';

import App from '../containers/App';
import definitions from './Definitions';


export default () => (
    <App>
        <Switch>
            {Object.values(definitions).map((route) => (
                <Route
                    exact
                    path={route.path}
                    component={route.component}
                />
            ))}
        </Switch>
    </App>
);
