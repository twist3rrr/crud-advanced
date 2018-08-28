import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultStateHandler } from '../utilities';
import fetch from 'isomorphic-unfetch';

import JSSProvider from '../components/JSSProvider';

import Header from './../components/pageComponents/Header';
import Main from './../components/pageComponents/Main';
import Sidebar from './../components/pageComponents/Sidebar';

import '../styles/main.scss';

export default class Index extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired,
    };

    state = {
        lastName: '',
    };

    static async getInitialProps() {
        const res = await fetch('http://localhost:3000/getusers');
        let users;

        try {
            users = await res.json();
        } catch (err) {
            users = [];
        }

        return { users };
    }

    render() {
        const { users } = this.props;
        const { lastName } = this.state;
        return (
            <JSSProvider>
                <div className="layout">
                    <div className="layout__header">
                        <Header />
                    </div>
                    <div className="layout__menu">
                        <Sidebar
                            {...{
                                defaultStateHandler: defaultStateHandler(this),
                                lastName,
                            }}
                        />
                    </div>
                    <div className="layout__main">
                        <Main
                            {...{
                                lastName,
                                users,
                            }}
                        />
                    </div>
                    <div className="layout__footer">FOOTER</div>
                </div>
            </JSSProvider>
        );
    }
}
