import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import SelectIcon from '@material-ui/icons/FolderOpen';
import VCSIcon from '@material-ui/icons/CloudDownload';
import CreateIcon from '@material-ui/icons/Create';
import clsx from 'clsx';
import _ from 'lodash';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    projectInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    fileDrop: {
        width: '100%',
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        outlineOffset: -theme.spacing(2),
        cursor: 'pointer',
        '&:hover': {
            background: '#dddddd'
        }
    },
    badDrag: {
        outline: '2px dashed red'
    },
    noDrag: {
        outline: '2px dashed black'
    },
    goodDrag: {
        outline: '2px dashed green'
    },
    inputSelector: {
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 50
    },
    hidden: {
        display: 'none'
    }
}));

export default () => {
    const classes = useStyles();
    const [projectName, setProjectName] = React.useState('');
    const [directory, setDirectory] = React.useState(null);
    const [vcsUrl, setVcsUrl] = React.useState('');
    const [dragLevel, setDragLevel] = React.useState(0);
    const folderInputRef = React.createRef();

    const setName = (e) => {
        const newName = e.target.value
            .replace(' ', '-')
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '');

        setProjectName(newName);
    };

    const setUrl = (e) => {
        setVcsUrl(e.target.value);
        setDirectory('');
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            const dragItem = e.dataTransfer.items[e.dataTransfer.items.length - 1];

            if (dragItem.kind === 'file') {
                setDragLevel(1);
            } else {
                setDragLevel(-1);
            }

            e.dataTransfer.clearData();
        }
    };

    const checkIfFolder = (name, items) => {
        let itemsLength = items.length - 1;

        for (itemsLength; itemsLength >= 0; itemsLength--) {
            const item = items[itemsLength].webkitGetAsEntry();

            if (item.name === name) {
                return item.isDirectory;
            }
        }

        return false;
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDragLevel(0);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newDir = e.dataTransfer.files[e.dataTransfer.files.length - 1];

            if (checkIfFolder(newDir.name, e.dataTransfer.items)) {
                setDirectory(newDir.path);
                setVcsUrl('');
            }

            e.dataTransfer.clearData();
        }
    };

    const openFolderSelect = () => {
        folderInputRef.current.click();
    };

    const creatable = (_.isString(projectName) && !_.isEmpty(projectName))
        && ((_.isString(directory) && !_.isEmpty(directory))
        || (_.isString(vcsUrl) && !_.isEmpty(vcsUrl)));

    return (
        <div className={classes.root}>
            <Paper className={clsx(classes.paper, classes.projectInfo)}>
                <TextField
                    fullWidth
                    label='Project Name'
                    value={projectName}
                    onChange={setName}
                    margin='normal'
                    variant='outlined'
                    type='text'
                />
            </Paper>
            <Paper className={clsx(classes.paper, classes.inputSelector)}>
                <Grid
                    container
                    direction='column'
                    spacing={1}
                    alignItems='center'
                >
                    <Grid item xs={12}>
                        <VCSIcon className={classes.icon} />
                        <TextField
                            fullWidth
                            label='VCS Url'
                            value={vcsUrl}
                            onChange={setUrl}
                            margin='normal'
                            variant='outlined'
                            type='url'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div
                            className={clsx(
                                classes.paper,
                                classes.fileDrop,
                                {
                                    [classes.badDrag]: dragLevel === -1,
                                    [classes.noDrag]: dragLevel === 0,
                                    [classes.goodDrag]: dragLevel === 1
                                }
                            )}
                            onClick={openFolderSelect}
                            onDrag={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <SelectIcon className={classes.icon} />
                            <Typography variant='h6'>
                                Choose a directory or drag it here.
                            </Typography>
                            {(_.isString(directory) && !_.isEmpty(directory)) && (
                                <Typography variant='h6'>
                                    ({directory})
                                </Typography>
                            )}
                            <input
                                className={classes.hidden}
                                ref={folderInputRef}
                                type='file'
                                webkitdirectory='true'
                            />
                        </div>
                    </Grid>
                </Grid>
            </Paper>
            <Fab
                color='primary'
                aria-label='Add'
                className={classes.icon}
                disabled={!creatable}
            >
                <CreateIcon />
            </Fab>
        </div>
    );
};
