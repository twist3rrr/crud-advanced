import React from 'react';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import InputField from '../InputField';

const styles = {
    card: {
        padding: '15px',
    },
};

function Sidebar(props) {
    const {
        defaultStateHandler,
        lastName,
    } = props;

    return (
        <Card style={styles.card}>
            <InputField
                label="Filter users"
                value={lastName}
                onChange={value => defaultStateHandler({ lastName: value })}
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
    defaultStateHandler: PropTypes.func.isRequired,
    lastName: PropTypes.string.isRequired,
};

export default Sidebar;
