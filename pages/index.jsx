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

    constructor(props) {
        super(props);
        this.state = {
            amountOfUsers: props.total,
            currentPage: 1,
            itemsOnPage: 3,
            loadedPages: 1,
            users: props.users,
            userName: '',
        };
    }

    static async getInitialProps() {
        const res = await fetch(`http://localhost:3000/getusers?page=${1}&items=${3}`);
        let users;
        let total;

        try {
            const parsed = await res.json();
            users = parsed.users;
            total = parsed.total;
        } catch (err) {
            users = [];
            total = 0;
        }

        return { users, total };
    }

    render() {
        const {
            amountOfUsers,
            currentPage,
            itemsOnPage,
            loadedPages,
            userName,
            users,
        } = this.state;

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
                                userName,
                            }}
                        />
                    </div>
                    <div className="layout__main">
                        <Main
                            {...{
                                amountOfUsers,
                                currentPage,
                                itemsOnPage,
                                loadedPages,
                                userName,
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
