import { Routes } from '@angular/router';
import { Login } from './login/login/login';
import { Principal } from './core/principal/principal';
import { Usuario } from './core/usuario/usuario';
import { Agente } from './core/agente/agente';
import { Salon } from './core/salon/salon';
import { Decorado } from './core/decorado/decorado';
import { Boletos } from './core/boletos/boletos';
import { Evento } from './core/evento/evento';
import { Admin } from './core/admin/admin';
import { Publicidad } from './core/publicidad/publicidad';
import { Inicio } from './core/inicio/inicio';
import { authGuard } from './login/guards/auth.guard';

export const routes: Routes = [
  {
    component:Login,
    path:'',
  },
  {
  component:Principal,path:'principal',canActivate:[authGuard],
    children:[
      { path: 'inicio', component: Inicio },
      { path: 'usuario', component: Usuario },
      { path: 'agente', component: Agente },
      { path: 'salon', component: Salon },
      { path: 'decorado', component: Decorado },
      { path: 'boletos', component: Boletos },
      { path: 'evento', component: Evento },
      { path: 'admin', component: Admin },
      { path: 'publicidad', component: Publicidad },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' } 
    ]
  },
];
