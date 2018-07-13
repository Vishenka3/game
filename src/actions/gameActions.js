export const setDamageDealt = (damageDealt) => dispatch => {
    dispatch({
        type: 'SET_DAMAGE_DEALT',
        payload: {damageDealt}
    })
};

export const setEnemiesKilled = (enemiesKilled) => dispatch => {
    dispatch({
        type: 'SET_ENEMIES_KILLED',
        payload: {enemiesKilled}
    })
};

export const setTimeSpent = (taskTimeSpent) => dispatch => {
    dispatch({
        type: 'SET_TIME_SPENT',
        payload: {taskTimeSpent}
    })
};

export const setTasksSolved = (tasksSolved) => dispatch => {
    dispatch({
        type: 'SET_TASKS_SOLVED',
        payload: {tasksSolved}
    })
};