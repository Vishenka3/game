export const getPlayerHealth = state => state.simpleReducer.playerHealthPoints;

export const getEnemyHealth = state => state.simpleReducer.enemyHealthPoints;

export const getEnemyMaxHealth = state => state.simpleReducer.enemyMaxHealthPoints;

export const getEnemyName = state => state.simpleReducer.enemyName;

export const getPlayerName = state => state.userReducer.currentUser.first_name + ' ' + state.userReducer.currentUser.last_name;