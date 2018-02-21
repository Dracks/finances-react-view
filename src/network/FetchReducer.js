export default (actionType, lambda=null) => (state=null, action) => {
    if (action.type === actionType){
        var value = action.payload;
        if (lambda){
            value = lambda(value);
        }
        return Object.assign({}, state, value);
    }
    return state;
}