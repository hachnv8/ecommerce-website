import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

class AuthBackend {
  constructor(private http: HttpClient) {
  }

  private registerUrl = `${environment.apiUrl}` + "/auth/register";
  private loginUrl = `${environment.apiUrl}` + "/auth/authenticate";
  private forgetPasswordUrl = `${environment.apiUrl}` + "/forgot-password";
  private logoutUrl = `${environment.apiUrl}` + "/logout";
  private isLoginUrl = `${environment.apiUrl}` + "/me";

  registerUser(email: string, password: string) {
    return this.http.post<any>(this.registerUrl, { email, password });
  }

  loginUser(email: string, password: string) {
    return this.http.post<any>(this.loginUrl, { email, password });
  }

  forgetPassword(email: string) {
    return this.http.post<any>(this.forgetPasswordUrl, { email });
  }

  //   logout() {
  //     return this.http.post<any>(this.logoutUrl);
  //   }

  //   isLoggedIn(): boolean {
  //     // Check if the user has a token
  //     return this.http.get<any>(this.isLoginUrl).toPromise().then((response) => response.body !== undefined);
  //   }

  getAuthenticatedUser = () => {
    if (!sessionStorage.getItem("user")) {
      return null;
    }
    return JSON.parse(sessionStorage.getItem("user"));
  };

  getToken = () => {
    if (!sessionStorage.getItem("token")) {
      return null;
    }
    return JSON.parse(sessionStorage.getItem("token"));
  };
}

let _authBackend = null;

const initAuthBackend = (config) => {
    if (!_authBackend) {
        _authBackend = new AuthBackend(config);
    }
    return _authBackend;
};

const getAuthBackend = () => {
    return _authBackend;
};

export { initAuthBackend, getAuthBackend };