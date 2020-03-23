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
        case  'ERROR':
            return { ...state, error: action.payload };
        break;
        case 'ADD_USER':
            return {...state, message: action.payload};
        break;
        case 'CHANGE_MENU':
            return {...state, sidebarType: action.payload};
        break;
        case 'GET_ACCOUNT_TASKS':
            return {...state, accaunTasks: action.payload}
        break;
        case 'GET_USER_TASKS':
            return {...state, editorTasks: action.payload}
        break;
        default: return state;
    }
}
