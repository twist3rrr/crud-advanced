import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { buildGetUsersUrl } from '../utilities';

import Cookies from 'js-cookie';
import fetch from 'isomorphic-unfetch';

import JSSProvider from '../components/JSSProvider';

import Header from './../components/pageComponents/Header';
import Main from './../components/pageComponents/Main';
import Sidebar from './../components/pageComponents/Sidebar';
import Snackbar from '../components/Snackbar';
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
            isLoggedIn: !!Cookies.get('x-access-token'),
            isLoading: false,
            currentPage: 1,
            users: props.users,
            userName: '',
            snackbar: {
                autohideDuration: 5000,
                open: false,
                message: 'Message',
                variant: 'success',
            },
        };
    }

    componentWillMount() {
        this.timer = null;
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

    fetchCurrentPageUsers = async (page = 1) => {
        this.setState({ isLoading: true });

        fetch(buildGetUsersUrl(page, config.itemsOnPage, this.state.userName))
            .then(async (res) => {
                let users;
                let total;

                try {
                    const parsed = await res.json();
                    ({ users, total } = parsed);
                } catch (err) {
                    return this.setState({
                        isLoading: false,
                        users: [],
                        snackbar: {
                            autohideDuration: 2000,
                            open: true,
                            message: 'Backend error',
                            variant: 'error',
                        },
                    });
                }

                return this.setState({
                    amountOfUsers: total,
                    currentPage: page,
                    isLoading: false,
                    users,
                });
            })
            .catch(() => {
                this.setState({
                    isLoading: false,
                    users: [],
                    snackbar: {
                        autohideDuration: 2000,
                        open: true,
                        message: 'Backend error',
                        variant: 'error',
                    },
                });
            });
    }

    handleInputChange = (value) => {
        clearTimeout(this.timer);

        this.setState({ userName: value });

        this.timer = setTimeout(() => {
            this.fetchCurrentPageUsers();
        }, 800);
    };

    closeSnackbar = () => {
        this.setState((prevState) => {
            return {
                snackbar: {
                    ...prevState.snackbar,
                    open: false,
                },
            };
        });
    }

    render() {
        const {
            amountOfPages,
            amountOfUsers,
            currentPage,
            itemsOnPage,
            isLoggedIn,
            loadedPages,
            userName,
            users,
        } = this.state;

        return (
            <JSSProvider>
                <div className="layout">
                    <div className="layout__header">
                        <Header {...{ isLoggedIn }} />
                    </div>
                    <div className="layout__menu">
                        <Sidebar
                            {...{
                                handleInputChange: this.handleInputChange,
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
                    <Snackbar
                        {...this.state.snackbar}
                        onClose={this.closeSnackbar}
                    />
                    { this.state.isLoading && <Spinner /> }
                </div>
            </JSSProvider>
        );
    }
}
