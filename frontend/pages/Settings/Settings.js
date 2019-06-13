import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography/Typography';


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
            <Paper>
                <Typography variant='h5'>
                    Settings here
                </Typography>
            </Paper>
        </div>
    );
};
