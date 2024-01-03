import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

class AuthBackend {
    constructor(private http: HttpClient) {
    }

    private registerUrl = `${environment.apiUrl}` + "/auth/register";
    private loginUrl = `${environment.apiUrl}` + "/auth/authenticate";
    private forgetPasswordUrl = `${environment.apiUrl}` + "/forgot-password";
    private logoutUrl = `${environment.apiUrl}` + "/logout";
    private isLoginUrl = `${environment.apiUrl}` + "/me";

    /**
     * Registers the user with given details
     */
    registerUser = (email: string, password: string) => {
        return this.http.post<any>(this.registerUrl, { email, password });
    }

    /**
     * Login user with given details
     */
    loginUser = (email: string, password: string) => {
        return this.http.post<any>(this.loginUrl, { email, password });
    }

    /**
     * forget Password user with given details
     */
    forgetPassword = (email: string) => {
        return this.http.post<any>(this.forgetPasswordUrl, { email });
    }

    /**
     * Logout the user
     */
    logout = (email: string) => {
        return this.http.post<any>(this.logoutUrl, { email });
    }

    setLoggeedInUser = (user) => {
        sessionStorage.setItem('authUser', JSON.stringify(user));
    }

    /**
     * Returns the authenticated user
     */
    getAuthenticatedUser = () => {
        if (!sessionStorage.getItem('authUser')) {
            return null;
        }
        return JSON.parse(sessionStorage.getItem('authUser'));
    }

    getAuthenticatedToken = () => {
        if (!localStorage.getItem("token")) {
          return null;
        }
        return localStorage.getItem("token");
      };

    /**
     * Handle the error
     * @param {*} error
     */
    _handleError(error: any) {
        // tslint:disable-next-line: prefer-const
        var errorMessage = error.message;
        return errorMessage;
    }
}

let _authBackend = null;

/**
 * Initilize the backend
 * @param {*} config
 */
const initAuthBackend = (config: any) => {
    if (!_authBackend) {
        _authBackend = new AuthBackend(config);
    }
    return _authBackend;
};

/**
 * Returns the firebase backend
 */
const getAuthBackend = () => {
    return _authBackend;
};

export { initAuthBackend, getAuthBackend };
