import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Modal from './Modal';


const useStyles = makeStyles({
    card: {
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
            backgroundColor: '#eee'
        }
    },
    statusSign: {
        width: 10,
        height: 10,
        position: 'absolute',
        top: 5,
        right: 5,
        borderRadius: '50%',
        background: '#b4b4b4'
    },
    onColor: {
        background: '#04cc00'
    },
    offColor: {
        background: '#cc1d00'
    }
});

const Project = (props) => {
    const { projectName, status } = props;

    const classes = useStyles();
    const [modalOpen, setModalOpen] = React.useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <Card
            className={classes.card}
            onClick={toggleModal}
        >
            <div
                className={clsx(
                    classes.statusSign,
                    {
                        onColor: status === 'running',
                        offColor: status === 'stopped'
                    }
                )}
            />
            <CardContent>
                <Typography
                    className={classes.title}
                    variant='h5'
                >
                    {projectName}
                </Typography>
                <Typography
                    className={classes.pos}
                    variant='subtitle1'
                >
                    {status}
                </Typography>
            </CardContent>
            <Modal
                open={modalOpen}
                onClose={toggleModal}
                {...props}
            />
        </Card>
    );
};

Project.propTypes = {
    projectName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};

export default Project;
