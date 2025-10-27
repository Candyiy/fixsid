import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService1 } from '../../services/auth/auth-service1';
import { Database } from '@angular/fire/database';
import { Firebase, PATHFireBase } from '../../services/firebase';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  authService = inject(AuthService1);

  navegacion=[
    {nombre:'Inicio',url:'inicio'},
    {nombre:'Admin',url:'admin'},
    {nombre:'Evento',url:'evento'},
    {nombre:'Agente',url:'agente'},
    {nombre:'Usuario',url:'usuario'},
    {nombre:'Boletos',url:'boletos'},
    {nombre:'Salon',url:'salon'},
    {nombre:'Mesas y Sillas',url:'decorado'},
    {nombre:'Publicidad',url:'publicidad'},
  ];
  
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

  db=inject(Firebase);
  
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
  }

  navegacionFiltrada = computed(() => {
  const user = this.usuarioActual();
  if (!user) return [];

  if (user.rol === 'admin') {
    // Admin ve todo
    return this.navegacion;
  } 
  else if (user.rol === 'cliente') {
    // Cliente solo ve ciertas secciones
    return this.navegacion.filter(item =>
      ['Inicio', 'Evento', 'Boletos', 'Publicidad'].includes(item.nombre)
    );
  } 
  else if (user.rol === 'agente') {
    // Agente no ve Admin ni lista de Agentes
    return this.navegacion.filter(item =>
      !['Admin', 'Agente'].includes(item.nombre)
    );
  } 
  else {
    // Fallback: solo Inicio
    return this.navegacion.filter(item => item.nombre === 'Inicio');
  }
});
  
}
