import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Fab from '@material-ui/core/Fab/Fab';
import CreateIcon from '@material-ui/icons/Create';

import Project from '../../components/Project';
import routes from '../../routes/Definitions';


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    createButton: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3)
    }
}));

export default ({ history }) => {
    const classes = useStyles();

    const goToCreate = () => {
        history.push(routes.create.path);
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Project />
                    </Grid>
                    <Grid item xs={4}>
                        <Project />
                    </Grid>
                    <Grid item xs={4}>
                        <Project />
                    </Grid>
                </Grid>
            </div>
            <Fab
                color='primary'
                aria-label='Add'
                className={classes.createButton}
                onClick={goToCreate}
            >
                <CreateIcon />
            </Fab>
        </React.Fragment>
    );
};
