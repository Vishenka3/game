export const setModalType = (modalType) => dispatch => {
    dispatch({
        type: 'SET_MODAL_TYPE',
        payload: {modalType}
    })
};