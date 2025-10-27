import { Component, computed, effect, inject, signal } from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { AuthService1 } from '../../services/auth/auth-service1';
import { Database } from '@angular/fire/database';

@Component({
  selector: 'app-principal',
  imports: [Navbar, RouterOutlet],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {

  authService = inject(AuthService1) ;
  guardadoIdlogin = signal<string | null>(null);
  dbfire=inject(Database);
  usuarioActual = signal<any | null>(null);

  userInfo = computed(() => {
    const dbUser = this.authService.userData();
    if (!dbUser) return null;
    
    console.log('User Data:',JSON.stringify(dbUser.id));
    return {
      id: dbUser.id,
      nombre: dbUser.name,
      email: dbUser.email
    };
  });
/*
  constructor() {
    effect(() => {
      const info = this.userInfo();
      if (info) {
        this.guardadoIdlogin.set(info.id);
        console.log('Guardado ID Login:', this.guardadoIdlogin());
      }
    });

    effect(async () => {
      const id = this.guardadoIdlogin();
      if (id) {
        const user = await this.authService.obtenerUsuarioPorId(id);
        if (user) {
          this.usuarioActual.set(user);
          console.log('Usuario cargado desde DB:', user);
        }
      }
    });
  }*/
}
