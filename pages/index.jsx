import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultStateHandler, buildGetUsersUrl } from '../utilities';
import fetch from 'isomorphic-unfetch';

import JSSProvider from '../components/JSSProvider';

import Header from './../components/pageComponents/Header';
import Main from './../components/pageComponents/Main';
import Sidebar from './../components/pageComponents/Sidebar';
import Spinner from './../components/Spinner';

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
        const res = await fetch(buildGetUsersUrl(1, config.itemsOnPage, ''));
        let users;
        let total;

        try {
            const parsed = await res.json();
            ({ users, total } = parsed);
        } catch (err) {
            users = [];
            total = 0;
        }

        return { users, total };
    }

    fetchCurrentPageUsers = async (page) => {
        this.setState({ isLoading: true });
        const res = await fetch(buildGetUsersUrl(page, config.itemsOnPage, this.state.userName));
        console.log(res.status);
        const parsed = await res.json();

        const { users, total } = parsed;

        this.setState({
            amountOfUsers: total,
            currentPage: page,
            isLoading: false,
            users,
        });
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
                                fetchCurrentPageUsers: this.fetchCurrentPageUsers,
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
