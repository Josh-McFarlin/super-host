import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes/Definitions';


export default class SettingsPage extends React.PureComponent {
    render() {
        return (
            <div>
                <h2>Settings</h2>
                <Link to={routes.dashboard.path}>to Dashboard</Link>
            </div>
        );
    }
}
