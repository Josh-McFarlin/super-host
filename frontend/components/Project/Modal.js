import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles((theme) => ({
    dialog: {
        position: 'relative'
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
        background: '#049b00',
        color: '#ffffff',
        '&:hover': {
            background: '#049b00',
            color: '#ffffff'
        }
    },
    offColor: {
        background: '#b41c00',
        color: '#ffffff',
        '&:hover': {
            background: '#b41c00',
            color: '#ffffff'
        }
    },
    content: {
        width: 600,
        padding: theme.spacing(2)
    },
    buttonRow: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const Modal = ({ open, onClose, projectName, localPort, remotePort, source, status }) => {
    const classes = useStyles();
    const [confDelete, setConfDelete] = React.useState(false);

    function toggleConfDialog() {
        setConfDelete(!confDelete);
    }

    function deleteProject() {
        setConfDelete(!confDelete);
    }

    return (
        <React.Fragment>
            <Dialog
                className={classes.dialog}
                open={open}
                onClose={onClose}
                maxWidth='lg'
            >
                <Typography
                    variant='h5'
                >
                    {projectName}
                </Typography>
                <Typography
                    variant='subtitle1'
                >
                    {status}
                </Typography>
                <div
                    className={clsx(
                        classes.statusSign,
                        {
                            onColor: status === 'running',
                            offColor: status === 'stopped'
                        }
                    )}
                />
                <div className={classes.content}>
                    <List>
                        {emails.map((email) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email} />
                            </ListItem>
                        ))}

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='add account' />

                        </ListItem>
                    </List>

                    <div className={classes.buttonRow}>
                        <Button
                            variant='contained'
                            className={classes.offColor}
                            onClick={toggleConfDialog}
                        >
                            Delete
                        </Button>
                        <Button
                            variant='contained'
                            className={classes.button}
                        >
                            {status === 'stopped' || status === 'created' ? 'Start' : 'Stop'}
                        </Button>
                    </div>
                </div>
            </Dialog>
            <Dialog
                open={confDelete}
                onClose={toggleConfDialog}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you would like to delete this project?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        onClick={toggleConfDialog}
                        color='primary'
                        autoFocus
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={deleteProject}
                        className={classes.offColor}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    projectName: PropTypes.string.isRequired,
    localPort: PropTypes.number.isRequired,
    remotePort: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};

export default Modal;
