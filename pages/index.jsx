import React from 'react';

import JSSProvider from '../components/JSSProvider';

import Header from './../components/pageComponents/header';

import '../styles/main.scss';

export default () => {
    return (
        <JSSProvider>
            <div className="layout">
                <div className="layout__header">
                    <Header />
                </div>
                <div className="layout__menu">MENU</div>
                <div className="layout__main">MAIN</div>
                <div className="layout__footer">FOOTER</div>
            </div>
        </JSSProvider>
    );
};
