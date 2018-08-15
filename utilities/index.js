export const defaultStateHandler = (_this) => (newState, callback) => {
    _this.setState({
        ...newState,
    }, callback);
};
