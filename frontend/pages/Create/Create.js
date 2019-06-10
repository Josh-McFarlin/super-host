import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import SelectIcon from '@material-ui/icons/AttachFile';
import VCSIcon from '@material-ui/icons/CloudDownload';

import ProxyContainer from '../../components/ProxyContainer';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    fileDrop: {
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
            background: 'red'
        }
    },
    vcsSelector: {
        width: '100%',
        height: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: theme.spacing(3)
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Paper className={classes.vcsSelector}>
                <VCSIcon />
            </Paper>
            <Paper className={classes.fileDrop}>
                <SelectIcon />
            </Paper>
        </React.Fragment>
    );
};
