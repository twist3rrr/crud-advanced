import React, { Component } from 'react';

import fetch from 'isomorphic-unfetch';

import JSSProvider from '../components/JSSProvider';

import Header from './../components/pageComponents/Header';
import Main from './../components/pageComponents/Main';
import Sidebar from './../components/pageComponents/Sidebar';

import '../styles/main.scss';

export default class Index extends Component {
    static async getInitialProps() {
        const res = await fetch('http://localhost:3000/getusers');
        let users;
        try {
            users = res.json();
        } catch (err) {
            users = [];
        }

        return { users };
    }

    render() {
        const { users } = this.props;
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
                        <Main {...{ users }} />
                    </div>
                    <div className="layout__footer">FOOTER</div>
                </div>
            </JSSProvider>
        );
    }
}
