import { initialDataModal } from '../data/simple.data'

export default (state = initialDataModal, action) => {
    switch (action.type) {
        case 'SET_MODAL_TYPE':
            return {
                ...state,
                modalType: action.payload.modalType
            };
        case 'SET_TASK_ANSWER':
            return {
                ...state,
                taskAnswer: action.payload.taskAnswer
            };
        default:
            return state
    }
}