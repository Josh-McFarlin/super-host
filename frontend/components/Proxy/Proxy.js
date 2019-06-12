import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    card: {
        // minWidth: 275
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

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography
                    className={classes.title}
                    variant='h5'
                >
                    Service Name
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
                    Service Type
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};
