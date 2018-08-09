import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";
import {st} from "@angular/core/src/render3";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable()
export class RequestService {

  authSubject = new Subject<boolean>();

  accessToken: string;

  constructor(private router: Router,
              private httpClient: HttpClient) {}

  signInRequest(userData: {name: string, password: string}) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');
      const body = new URLSearchParams();
      body.append('username', userData.name);
      body.append('password', userData.password);
      return this.httpClient.post<RouterRedirect>('http://localhost:8081/auth/signin', body.toString(), { observe: 'body', headers: headers, withCredentials: true })
        .pipe(map((redirect) => {
            this.router.navigate([redirect.endpoint], { queryParams: { code: redirect.code } });
        }));
  }

  signOutRequest() {
    return this.httpClient.post('http://localhost:8081/auth/signout', null, { observe: 'body', withCredentials: true, responseType: "text" })
      .pipe(map((redirect) => {
          this.router.navigate(['../home']);
          this.authSubject.next(false)
      }));
  }

  getAccessToken(code: string) {
    console.log(code);
    let headers = new HttpHeaders()
      .set('Authorization', 'Basic Zm9vQ2xpZW50SWQ6c2VjcmV0')
      .set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
      body.append('grant_type', 'authorization_code');
      body.append('code', code);
      body.append('redirect_uri', 'http://localhost:8081/auth/code');
      body.append('client_id', 'fooClientId');
    return this.httpClient.post<AuthResponse>('http://localhost:8081/auth/oauth/token', body.toString(), { observe: 'body', headers: headers })
      .subscribe(
        (response) => {
          this.accessToken = response.access_token;
          this.authSubject.next(true);
          console.log('success');
        }
      );
  }

  getData() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken);
    return this.httpClient.get('http://localhost:8081/auth/protected/me', { observe: 'body', headers: headers, responseType: "text" })
  }

}

export interface RouterRedirect {
  endpoint: string; code: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}
