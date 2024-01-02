import { createReducer, on } from '@ngrx/store';
import { Register, RegisterFailure, RegisterSuccess, login, loginFailure, loginSuccess, logout } from './authentication.actions';
import { UserToken } from './auth.models';

export interface AuthenticationState {
    isLoggedIn: boolean;
    userToken: UserToken | null;
    error: string | null;
}

const initialState: AuthenticationState = {
    isLoggedIn: false,
    userToken: null,
    error: null,
};

export const authenticationReducer = createReducer(
    initialState,
    on(Register, (state) => ({ ...state, error: null })),
    on(RegisterSuccess, (state, { userToken }) => ({ ...state, isLoggedIn: true, userToken, error: null, })),
    on(RegisterFailure, (state, { error }) => ({ ...state, error })),

    on(login, (state) => ({ ...state, error: null })),
    on(loginSuccess, (state, { userToken }) => ({ ...state, isLoggedIn: true, userToken, error: null, })),
    on(loginFailure, (state, { error }) => ({ ...state, error })),
    on(logout, (state) => ({ ...state, user: null })),


);
