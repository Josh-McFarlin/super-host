import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab/Fab';
import CreateIcon from '@material-ui/icons/Create';
import { connect } from 'react-redux';

import Project from '../../components/Project';
import routes from '../../routes/definitions';


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

const ProjectsPage = ({ history, projects }) => {
    const classes = useStyles();

    const goToCreate = () => {
        history.push(routes.create.path);
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    {projects.map((info) => (
                        <Grid item xs={4}>
                            <Project {...info} />
                        </Grid>
                    ))}
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

ProjectsPage.propTypes = {
    history: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired
};

export default connect(
    (state) => ({
        projects: Object.values(state.projects)
    }),
    null
)(ProjectsPage);
