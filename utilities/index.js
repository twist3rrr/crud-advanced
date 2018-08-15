export const defaultStateHandler = (_this) => (newState, callback) => {
    console.log(_this);
    _this.setState({
        ...newState,
    }, callback);
};
