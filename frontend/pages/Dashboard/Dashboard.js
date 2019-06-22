import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

import Project from '../../components/Project';


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

const DashboardPage = ({ projects }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant='h6'>
                            Usage Stats
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Line
                            data={{
                                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                datasets: [{
                                    backgroundColor: 'rgba(150,150,150,0.4)',
                                    borderColor: '#27babb',
                                    data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
                                }]
                            }}
                            options={{
                                title: {
                                    display: true,
                                    padding: 5,
                                    text: 'CPU Usage'
                                },
                                legend: {
                                    display: false
                                },
                                tooltips: {
                                    enabled: false
                                }
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Line
                            data={{
                                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                datasets: [{
                                    backgroundColor: 'rgba(150,150,150,0.4)',
                                    borderColor: '#4ac385',
                                    data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
                                }]
                            }}
                            options={{
                                title: {
                                    display: true,
                                    padding: 5,
                                    text: 'Memory Usage'
                                },
                                legend: {
                                    display: false
                                },
                                tooltips: {
                                    enabled: false
                                }
                            }}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant='h6'>
                            Running Projects
                        </Typography>
                    </Paper>
                </Grid>
                {projects
                    .filter((project) => project.status === 'running')
                    .map((info) => (
                        <Grid item xs={4}>
                            <Project {...info} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

DashboardPage.propTypes = {
    projects: PropTypes.array.isRequired
};

export default connect(
    (state) => ({
        projects: Object.values(state.projects)
    }),
    null
)(DashboardPage);
