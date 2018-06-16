import { initialDataUser } from '../data/simple.data'

export default (state = initialDataUser, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                currentUser: action.payload.currentUser
            };
        default:
            return state
    }
}