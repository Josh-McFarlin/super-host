import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

export default () => {
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
                    Title
                </Typography>
                <Typography
                    className={classes.pos}
                    variant='subtitle1'
                >
                    Status
                </Typography>
                <Typography
                    color='textSecondary'
                    variant='subtitle1'
                >
                    Project Type
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' onClick={toggleModal}>
                    Learn More
                </Button>
            </CardActions>
            <Modal
                open={modalOpen}
                onClose={toggleModal}
            />
        </Card>
    );
};