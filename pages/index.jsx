import React from 'react';

import JSSProvider from '../components/JSSProvider';

import Header from './../components/pageComponents/Header';
import Main from './../components/pageComponents/Main';
import Sidebar from './../components/pageComponents/Sidebar';

import '../styles/main.scss';

export default () => {
    return (
        <JSSProvider>
            <div className="layout">
                <div className="layout__header">
                    <Header />
                </div>
                <div className="layout__menu">
                    <Sidebar />
                </div>
                <div className="layout__main">
                    <Main />
                </div>
                <div className="layout__footer">FOOTER</div>
            </div>
        </JSSProvider>
    );
};
