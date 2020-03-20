const changeSdb = (type) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CHANGE_MENU',
            payload: type
        })
    }
}

export default changeSdb;
