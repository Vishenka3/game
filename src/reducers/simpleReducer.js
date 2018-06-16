import { initialData } from '../data/simple.data'

export default (state = initialData, action) => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            return {
                playerHealthPoints: action.payload.pointsPlayer,
                enemyHealthPoints: action.payload.pointsEnemy,
                enemyMaxHealthPoints: action.payload.pointsMaxPlayer,
                enemyName: action.payload.enemyName,
            };
        case 'DEALING_DAMAGEe':
            return {
                ...state,
                enemyHealthPoints: state.enemyHealthPoints - action.payload.damage < 0 ? 0 : state.enemyHealthPoints - action.payload.damage,
            };
        default:
            return state
    }
}