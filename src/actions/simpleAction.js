export const simpleAction = (/*target,*/ pointsPlayer, pointsEnemy, pointsMaxPlayer, enemyName) => dispatch => {   //setting HP
    dispatch({
        type: 'SIMPLE_ACTION',
        payload: {/*target,*/ pointsPlayer, pointsEnemy, pointsMaxPlayer, enemyName}
    })
};

export const dealDamage = (/*target,*/ damage) => dispatch => {
    dispatch({
        type: 'DEALING_DAMAGEe',
        payload: {/*target,*/ damage}
    })
};

export const hitPlayer = (/*target,*/ damage) => dispatch => {
    dispatch({
        type: 'HIT_PLAYER',
        payload: {/*target,*/ damage}
    })
};

export const setNewEnemyName = (name) => dispatch => {
    dispatch({
        type: 'RESPAWN_ENEMY',
        payload: {name}
    })
};