export const setTaskAnswer = (taskAnswer) => dispatch => {
    dispatch({
        type: 'SET_TASK_ANSWER',
        payload: {taskAnswer}
    })
};

export const setTaskState = (taskState) => dispatch => {
    dispatch({
        type: 'SET_ANSWER_STATE',
        payload: {taskState}
    })
};

export const setTaskTimer = (task, value) => dispatch => {
    dispatch({
        type: 'SET_TASK_TIMERS',
        payload: {task, value}
    })
};