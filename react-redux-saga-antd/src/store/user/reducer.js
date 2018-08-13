import {userActions} from './actions';

export const UsersState = () => ({
    user: {},
    error: '',
});

export function UserReducer (state = new UsersState(), {payload, type}){
    switch(type){
        case userActions.SIGN_IN_FULFILED:
            if (payload.resp.token) localStorage.setItem('token', payload.resp.token);
            return {
                ...state,
                user: payload.resp.user
            }       
        case userActions.SIGN_IN_ERROR:
            return {
                ...state,
                error: payload.error.data.error
            }       
        case userActions.CLEAR_ERROR:
            return {
                ...state,
                error: '',
            }
        default:
            return {
                ...state
            }
        }
}