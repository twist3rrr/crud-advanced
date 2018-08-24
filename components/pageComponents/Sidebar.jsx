import React from 'react';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import InputField from '../InputField';

const styles = {
    card: {
        padding: '15px',
    },
};

function Sidebar(props) {
    const { classes } = props;

    return (
        <Card className={classes.card}>
            <InputField
                label="Filter users"
            />
            <Button
                color="primary"
                fullWidth
                style={{ marginTop: 20 }}
                variant="contained"
            >
                Ceate new user
                <AddIcon style={{ marginLeft: '10px' }} />
            </Button>
        </Card>
    );
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
