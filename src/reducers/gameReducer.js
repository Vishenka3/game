import { initialDataGame } from '../data/simple.data'

export default (state = initialDataGame, action) => {
    switch (action.type) {
        case 'SET_DAMAGE_DEALT':
            return {
                ...state,
                damageDealt: action.payload.damageDealt
            };
        case 'SET_ENEMIES_KILLED':
            return {
                ...state,
                enemiesKilled: action.payload.enemiesKilled
            };
        case 'SET_TIME_SPENT':
            return {
                ...state,
                taskTimeSpent: action.payload.taskTimeSpent
            };
        case 'SET_TASKS_SOLVED':
            return {
                ...state,
                tasksSolved: action.payload.tasksSolved
            };
        default:
            return state
    }
}