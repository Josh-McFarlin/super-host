import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link, withRouter } from 'react-router-dom';
import 'typeface-roboto/index.css';

import routes from '../routes/definitions';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        position: 'absolute',
        height: '100%'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9)
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        overflow: 'auto',
        padding: theme.spacing(3),
        width: '100%',
        height: '100%',
        paddingLeft: theme.spacing(7) + theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(9) + theme.spacing(3)
        }
    },
    belowBar: {
        display: 'flex',
        flex: 1
    },
    paper: {
        position: 'relative'
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const App = ({ children, location }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function toggleDrawerOpen() {
        setOpen(!open);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position='relative'
                className={classes.appBar}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='Open drawer'
                        onClick={toggleDrawerOpen}
                        edge='start'
                        className={classes.menuButton}
                    >
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography variant='h6' noWrap>
                        {Object.values(routes).find((route) => route.path === location.pathname).title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.belowBar}>
                <Drawer
                    variant='permanent'
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })}
                    classes={{
                        paper: clsx(
                            classes.paper,
                            {
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open
                            }
                        )
                    }}
                    open={open}
                >
                    <List>
                        {Object.values(routes)
                            .filter((route) => route.sidebar)
                            .map((route) => (
                                <ListItem
                                    key={route.title}
                                    component={Link}
                                    to={route.path}
                                    selected={location.pathname === route.path}
                                    button
                                >
                                    <ListItemIcon>
                                        {React.createElement(route.icon)}
                                    </ListItemIcon>
                                    <ListItemText primary={route.title} />
                                </ListItem>
                            ))
                        }
                    </List>
                </Drawer>
                <div className={classes.content}>
                    { children }
                </div>
            </div>
        </React.Fragment>
    );
};

App.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired
};

export default withRouter(App);
