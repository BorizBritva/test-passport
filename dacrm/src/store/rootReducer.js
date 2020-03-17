import initialState from './initialState';

export default function rootReducers ( state = initialState, action ) {
    switch(action.type) {
        case 'INPUT_LOGIN':
            return { ...state, login: action.payload };
        break;
        case  'INPUT_PASSWORD':
            return { ...state, password: action.payload };
        break;
        case  'INPUT_NAME':
            return { ...state, name: action.payload };
        break;
        case  'INPUT_PHONE':
            return { ...state, phone: action.payload };
        break;
        default: return state;
    }
}
