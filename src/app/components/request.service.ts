import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";

@Injectable()
export class RequestService {

  authSubject = new Subject<boolean>();

  private accessToken: string;

  constructor(
    private httpClient: HttpClient
  ) {}

  signInRequest(userData: {name: string, password: string}) {
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      const body = new URLSearchParams();
      body.append('username', userData.name);
      body.append('password', userData.password);
      return this.httpClient.post('http://localhost:8081/auth/signin', body.toString(), { observe: 'body', headers: headers, withCredentials: true, responseType: "text" })
  }

  getAccessToken(code: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic Zm9vQ2xpZW50SWQ6c2VjcmV0');
    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', 'http://localhost:8081/auth/code');
    body.append('client_id', 'fooClientId');
    return this.httpClient.post<any>('http://localhost:8081/auth/oauth/token', body.toString(), { observe: 'body', headers: headers, withCredentials: true })
      .subscribe(
        (response) => {
          this.accessToken = response.access_token;
          this.authSubject.next(true);
          console.log('success');
        },
        () => this.authSubject.next(false)
      );
  }

  getData() {
    const headers = new HttpHeaders()
      // .set('Authorization', 'Bearer ' + this.accessToken);
    return this.httpClient.get('http://localhost:8081/auth/prot/user', { observe: 'body', headers: headers, responseType: "text" }) //, withCredentials: true
  }

}
