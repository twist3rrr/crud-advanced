import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultStateHandler } from '../utilities';
import url from 'url';
import fetch from 'isomorphic-unfetch';

import JSSProvider from '../components/JSSProvider';

import Header from './../components/pageComponents/Header';
import Main from './../components/pageComponents/Main';
import Sidebar from './../components/pageComponents/Sidebar';
import Spinner from './../components/Spinner';

import { DOMEN } from '../server/constants.js';

import '../styles/main.scss';

const config = {
    itemsOnPage: 4,
};

export default class Index extends Component {
    static propTypes = {
        total: PropTypes.number.isRequired,
        users: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            amountOfUsers: props.total,
            itemsOnPage: config.itemsOnPage,
            isLoading: false,
            currentPage: 1,
            users: props.users,
            userName: '',
        };
    }

    static async getInitialProps() {
        const res = await fetch(`http://localhost:3000/getusers?page=${1}&items=${config.itemsOnPage}`);
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
            amountOfPages,
            amountOfUsers,
            currentPage,
            itemsOnPage,
            loadedPages,
            userName,
            users,
        } = this.state;

        const fetchUrl = url.format({
            pathname: 'users',
            protocol: 'http:',
            host: DOMEN,
            query: {
                page: 1,
                items: config.itemsOnPage,
                filterName: 'Roman Pylyp',
            },
        });

        console.log(fetchUrl);

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
                                amountOfPages,
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
                    { this.state.isLoading && <Spinner /> }
                </div>
            </JSSProvider>
        );
    }
}
