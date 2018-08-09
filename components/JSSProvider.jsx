import React from 'react';
import PropTypes from 'prop-types';

import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
});

function JSSProvider({ children }) {
    return (
        <JssProvider generateClassName={generateClassName}>
            { children }
        </JssProvider>
    );
}

JSSProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
    ]).isRequired,
};

export default JSSProvider;
