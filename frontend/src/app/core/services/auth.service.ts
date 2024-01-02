import { Injectable } from '@angular/core';

import { User, UserCredentials } from 'src/app/store/Authentication/auth.models';
import { from, map } from 'rxjs';
import { getAuthBackend } from 'src/app/authUtils';


@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: User;

    constructor() {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getAuthBackend().getAuthenticatedUser();
    }

    /**
     * Returns the current token
     */
    public currentToken(): String {
        return getAuthBackend().getAuthenticatedToken();
    }


    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return from(getAuthBackend().loginUser(email, password).pipe(map(user => {
            return user;
        }
        )));
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(user: UserCredentials) {

        return from(getAuthBackend().registerUser(user).then((response: any) => {
            const user = response;
            return user;
        }));
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getAuthBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        getAuthBackend().logout();
    }
}

