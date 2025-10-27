import { inject, Injectable, signal } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Database, get, ref } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { PATHFireBase } from '../firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService1 {
  currentUser: User | null = null;
  auth=inject(Auth);

  usuario = signal<User | null>(null);

  db=inject(Database);
  
  userData = signal<any | null>(null);

  path=PATHFireBase.Usuarios

  async obtenerUsuarioPorId(id: string) {
  try {
    const userRef = ref(this.db, this.path+'/'+ id);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    } else {
      console.warn('Usuario no encontrado en Realtime Database');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return null;
  }
}

  get user(){

    return this.auth.currentUser;
  }

  constructor() {
    //recuperar el usuario logeado
    
    onAuthStateChanged(this.auth,(use)=>{
      this.currentUser=use;
      this.cargarDatosUsuarioPorEmail(use?.email!);
      console.log('Estado de autenticacion cambiado:',use +'zzzzzzzzzzzzzzzzzzzz');
    });

  }

  login(email:string,password:string):Observable<User>{
    return from(
      signInWithEmailAndPassword(this.auth,email,password).then((res)=>{
        res.user
        this.usuario.set(res.user);
        return res.user;
      })
    )
  }

  logout():Observable<void>{
    return from(signOut(this.auth));
  }

  isLoggedIn(){
    return this.currentUser? true:false;
  }

  // Buscar en Realtime Database por email
  private async cargarDatosUsuarioPorEmail(email: string) {
    /*try {
      const usuariosRef = ref(this.db, 'users');
      const snapshot = await get(usuariosRef);

      if (snapshot.exists()) {
        const usuarios = snapshot.val();
        const userFound = Object.values(usuarios).find(
          (u: any) => u.email === email
        );
        this.userData.set(userFound || null);
      } else {
        this.userData.set(null);
      }
    } catch (error) {
      console.error('Error cargando usuario:', error);
      this.userData.set(null);
    }*/

    try {
      const usuariosRef = ref(this.db, 'users');
      const snapshot = await get(usuariosRef);

      if (snapshot.exists()) {
        const usuarios = snapshot.val();
        const userEntry = Object.entries(usuarios).find(
          ([id, u]: [string, any]) => u.email === email
        );

        if (userEntry) {
          const [id, userData] = userEntry;
          this.userData.set({ id, ...this.userData });
          console.log('Usuario cargado:', this.userData());
        } else {
          this.userData.set(null);
        }
      } else {
        this.userData.set(null);
      }
    } catch (error) {
      console.error('Error cargando usuario:', error);
      this.userData.set(null);
    }
  }

  

}
