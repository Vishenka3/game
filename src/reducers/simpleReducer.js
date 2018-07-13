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
        case 'RESPAWN_ENEMY':
            return {
                ...state,
                enemyMaxHealthPoints: Math.round(state.enemyMaxHealthPoints*1.2),
                enemyHealthPoints: Math.round(state.enemyMaxHealthPoints*1.2),
                enemyName: action.payload.name
            };
        case 'DEALING_DAMAGEe':
            return {
                ...state,
                enemyHealthPoints: state.enemyHealthPoints - action.payload.damage < 0 ? 0 : state.enemyHealthPoints - action.payload.damage,
            };
        case 'HIT_PLAYER':
            return {
                ...state,
                playerHealthPoints: state.playerHealthPoints - action.payload.damage < 0 ? 0 : state.playerHealthPoints - action.payload.damage,
            };
        default:
            return state
    }
}