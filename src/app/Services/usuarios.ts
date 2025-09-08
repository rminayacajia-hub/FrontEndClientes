import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse } from '../Interfaces/ilogin';
import { Observable } from 'rxjs';
import { ILogin } from '../login/login';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServices {
    private readonly rutaAPI = '"https://localhost:7020/api/Usuarios"';
  constructor(private http: HttpClient) {}

  login(credentials: ILoginResponse): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.rutaAPI + '/login', credentials);
  }

  /*login(email: string, password: string) {
    return this.http.post(this.rutaAPI + '/login', { email, password });
  }*/
  
}
