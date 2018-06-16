import { initialDataModal } from '../data/simple.data'

export default (state = initialDataModal, action) => {
    switch (action.type) {
        case 'SET_MODAL_TYPE':
            return {
                modalType: action.payload.modalType
            };
        default:
            return state
    }
}