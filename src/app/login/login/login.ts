import { Component,signal } from '@angular/core';
import { Loginsesion } from "../loginsesion/loginsesion";
import { Loginregister } from "../loginregister/loginregister";

@Component({
  selector: 'app-login',
  imports: [Loginsesion, Loginregister],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  sesionActiva= signal<boolean>(true);
  registerActiva=signal<boolean>(false);

  verSesion() {
    this.sesionActiva.set(true);
    this.registerActiva.set(false);
  }
  verRegister() {
    this.sesionActiva.set(false);
    this.registerActiva.set(true);
  }

}
