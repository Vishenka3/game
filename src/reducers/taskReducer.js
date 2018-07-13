import { initialDataTask } from '../data/simple.data'

export default (state = initialDataTask, action) => {
    switch (action.type) {
        case 'SET_TASK_ANSWER':
            return {
                ...state,
                taskAnswer: action.payload.taskAnswer
            };
        case 'SET_ANSWER_STATE':
            return {
                ...state,
                taskState: action.payload.taskState
            };
        case 'SET_TASK_TIMERS':
            return {
                ...state,
                timers: state.timers.map((item, i) => {
                    return (i === action.payload.task) ? action.payload.value : item;
                })
            };
        default:
            return state
    }
}