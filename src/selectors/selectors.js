export const getPlayerHealth = state => state.simpleReducer.playerHealthPoints;

export const getEnemyHealth = state => state.simpleReducer.enemyHealthPoints;

export const getEnemyMaxHealth = state => state.simpleReducer.enemyMaxHealthPoints;

export const getEnemyName = state => state.simpleReducer.enemyName;

export const getSpells = state => state.simpleReducer.spells;

export const getPlayerName = state => state.userReducer.currentUser.first_name + ' ' + state.userReducer.currentUser.last_name;

export const getPlayerLogin = state => state.userReducer.currentUser.login;

export const getTaskAnswer = state => state.taskReducer.taskAnswer;

export const getTaskState = state => state.taskReducer.taskState;

export const getTaskTimers = state => state.taskReducer.timers;

export const getResults = state => state.gameReducer;