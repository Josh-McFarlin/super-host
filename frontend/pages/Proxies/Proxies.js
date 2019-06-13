import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Proxy from '../../components/Proxy';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Proxy />
                </Grid>
                <Grid item xs={4}>
                    <Proxy />
                </Grid>
                <Grid item xs={4}>
                    <Proxy />
                </Grid>
            </Grid>
        </div>
    );
};
