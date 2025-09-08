import { Component } from '@angular/core';
import { ILoginResponse } from '../Interfaces/ilogin';
import { UsuariosServices } from '../Services/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class ILogin {
  loginData: ILoginResponse = {
    email: '',
    password: '',
    token: '',
  };
    errorMessage: string = '';

  constructor(
    private usuariosService: UsuariosServices,
    private router: Router
  ) {}
  onLogin() {
    this.usuariosService.login(this.loginData).subscribe({
      next: (response: ILoginResponse) => {
        console.log('✅ Login exitoso', response);
        localStorage.setItem('token', response.token); 
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        console.error('❌ Error en login', err);
        this.errorMessage = 'Credenciales incorrectas o error en el servidor.';
      }
    });
  }

}
