export let initialData = {
    playerHealthPoints: 100,
    spells: {
        lightning: {
            bottomDamage: 35,
            topDamage: 40,
        },
        hadouken: {
            bottomDamage: 25,
            topDamage: 50,
        }
    },
    enemyHealthPoints: 100,
    enemyMaxHealthPoints: 100,
    enemyName: 'Criminal Scum'
};

export let initialDataModal = { modalType: 'authorization' };

export let initialDataUser = { currentUser: {first_name: 'Unknown', last_name: 'Tramp'} };

export let initialDataTask = {
    taskState: 'none',
    taskAnswer: '',
    timers: [15, 10],
};

export let initialDataGame = {
    enemiesKilled: 0,
    damageDealt: 0,
    taskTimeSpent: 0,
    tasksSolved: 0,
};