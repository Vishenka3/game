export const setCurrentUser = (currentUser) => dispatch => {
    dispatch({
        type: 'SET_CURRENT_USER',
        payload: {currentUser}
    })
};