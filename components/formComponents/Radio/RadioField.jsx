import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import Radio from './Radio';

/* Complete Field with label */

function ReadioField(props) {
    const {
        color,
        disabled,
        label,
        value,
        id,
    } = props;

    return (
        <FormControlLabel
            {...{ disabled }}
            {...{ label }}
            control={
                <Radio
                    {...{
                        color,
                        value,
                        id,
                    }}
                />
            }
        />
    );
}

ReadioField.propTypes = {
    color: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    id: PropTypes.string,
};

ReadioField.defaultProps = {
    disabled: false,
    id: '',
    label: '',
};

export default ReadioField;
