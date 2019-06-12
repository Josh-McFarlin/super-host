import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Modal from './Modal';


const useStyles = makeStyles({
    card: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eee'
        }
    },
    title: {
        // fontSize: 14
    },
    pos: {
        marginBottom: 12
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
