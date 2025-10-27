import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firebase, PATHFireBase } from '../../services/firebase';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService1 } from '../../services/auth/auth-service1';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-loginregister',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './loginregister.html',
  styleUrl: './loginregister.css',
})
export class Loginregister {

  
  dbFire=inject(Firebase);

  auth=inject(Auth);
  
  authService1=inject(AuthService1);
  
  data = input<UsuarioModel>();
  fb = inject(FormBuilder);

  router=inject(Router);

  datosFormGroup=this.fb.group({
    /////////////
        name:[this.data()?this.data()?.name:'',[Validators.required,Validators.minLength(3)]],
        email:[this.data()?this.data()?.email:'',[Validators.required,Validators.email]],
        ci:[this.data()?this.data()?.ci:'',[Validators.required,Validators.minLength(3)]],
        password:[this.data()?this.data()?.password:'',[Validators.required,Validators.minLength(3)]],
    ////////////////
      });

  registrar() {
  if (this.datosFormGroup.invalid) {
    console.warn('Formulario inválido');
    return;
  }

  const { name, ci, email, password } = this.datosFormGroup.value;

  createUserWithEmailAndPassword(this.auth, email!, password!)
    .then(userCredential => {
      const uid = uuidv4();
      const data_ = { name, ci, email, password, rol: 'cliente' };
      return this.dbFire.add(PATHFireBase.Usuarios, uid, data_);
    })
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.error('Error al registrar usuario:', error);
    });

  }
}
