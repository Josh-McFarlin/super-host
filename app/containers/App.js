import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto/index.css';


export default class App extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                { children }
            </React.Fragment>
        );
    }
}

App.propTypes = {
    children: PropTypes.node
};

App.defaultProps = {
    children: null
};
