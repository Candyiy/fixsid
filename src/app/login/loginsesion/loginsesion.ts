import { Component, inject, signal } from '@angular/core';
import { AuthService1 } from '../../services/auth/auth-service1';
import { Database } from '@angular/fire/database';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginsesion',
  imports: [
    FormsModule
  ],
  templateUrl: './loginsesion.html',
  styleUrl: './loginsesion.css',
})
export class Loginsesion {

  email: string ='';

  password: string ='';

  authService1=inject(AuthService1);
  db=inject(Database);

  user = signal<UsuarioModel | null>(null);
  userData = signal<any | null>(null)

  error=signal('');
  router=inject(Router);

  inicioSesion() {
    console.log('Iniciando sesión con', this.email, this.password);
    this.authService1.login(this.email,this.password).
    subscribe({
      next:(res)=>{
        this.router.navigate(['/principal']);
      },
      error:(error)=>{
        alert('Error al iniciar sesión'+error);
      }
    });

  }

  
}
