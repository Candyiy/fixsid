import { Component, computed, effect, inject, signal } from '@angular/core';
import { AuthService1 } from '../../services/auth/auth-service1';
import { Database } from '@angular/fire/database';
import { Firebase, PATHFireBase } from '../../services/firebase';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

  authService = inject(AuthService1) ;
  guardadoIdlogin = signal<string | null>(null);
  dbfire=inject(Database);
  public usuarioActual = signal<any | null>(null);

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
/*
  constructor() {
  // Efecto para obtener el usuario logueado
  effect(() => {
    const info = this.userInfo();
    if (info) {
      this.guardadoIdlogin.set(info.id);
      console.log('Guardado ID Login:', this.guardadoIdlogin());
    }
  });

  // Efecto para verificar en users, admin y agente
  effect(async () => {
    const id = this.guardadoIdlogin();
    if (!id) return;

    // Buscar en users
    const user = await this.authService.obtenerUsuarioPorId(id);
    if (user) {
      this.usuarioActual.set({ ...user, rol: 'user' });
      console.log('Usuario encontrado en users:', user);
      return;
    }

    // Buscar en admin
    const adminsObj = await this.db.getAll(PATHFireBase.Admin);
    const admins = Object.keys(adminsObj || {}).map(k => ({ id: k, ...adminsObj[k] }));

    const adminMatch = admins.find(
      (a: any) => a.id === id || a.email === this.userInfo()?.email
    );

    if (adminMatch) {
      this.usuarioActual.set({ ...adminMatch, rol: 'admin' });
      console.log('Usuario encontrado en admin:', adminMatch);
      return;
    }

    // Buscar en agente
    const agentesObj = await this.db.getAll(PATHFireBase.Agente);
    const agentes = Object.keys(agentesObj || {}).map(k => ({ id: k, ...agentesObj[k] }));

    const agenteMatch = agentes.find(
      (a: any) => a.id === id || a.email === this.userInfo()?.email
    );

    if (agenteMatch) {
      this.usuarioActual.set({ ...agenteMatch, rol: 'agente' });
      console.log('Usuario encontrado en agente:', agenteMatch);
      return;
    }

    // Si no se encuentra en ninguna tabla
    console.warn('⚠️ Usuario no encontrado en users, admin o agente');
    this.usuarioActual.set(null);
  });
}*/


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
}
