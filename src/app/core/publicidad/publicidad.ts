import { Component, computed, effect, inject, signal } from '@angular/core';
import { Firebase, PATHFireBase } from '../../services/firebase';
import { PublicidadModel } from '../../models/publicidad/publicidad.model';
import { Formpublicidad } from "./formpublicidad/formpublicidad";
import { Dialog } from "../../shared/dialog/dialog";
import { AuthService1 } from '../../services/auth/auth-service1';
import { Database } from '@angular/fire/database';

@Component({
  selector: 'app-publicidad',
  imports: [Formpublicidad, Dialog],
  templateUrl: './publicidad.html',
  styleUrl: './publicidad.css',
})
export class Publicidad {

  
  idSelect='';
  modal = signal<boolean>(false);
  formVisible =false;
  dialogVisible =false;
  itemSelect = signal<any>(null);
  private fireDb = inject(Firebase);
  ////////////////////////////
  ///////////////////////////
  private path = PATHFireBase.Publicidad;
  ///////////////////////////

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

  ///////////////////////////  
  error = signal<string|undefined>('');
    usuariosResource = this.fireDb.createResource(this.path);

  onAdd(){
    this.formVisible =true;
    this.dialogVisible =false;
    this.itemSelect.set(null);
    this.modal.set(true);
  }

  onClose(){
    this.modal.set(false);
  }

  usuarios = computed(()=>{
      let  datos = this.usuariosResource.value()?.data;
      //this.error.set(this.usuariosResource.value()?.error);
      //...... filtrado/ordenar
      
      //###########################
      // UsuarioModel cambiar por el modelo que sea
      // como AgenteModel
      // conste tiene su libreria su modelo propio esta en la carpeta models
      return datos as PublicidadModel[];
    });
    /*
    constructor(){
      effect(()=>{
        this.error.set(this.usuariosResource.value()?.error);
      })
    }*/

  onEditar(user:PublicidadModel){
    this.formVisible =true;
    this.dialogVisible =false;
    this.itemSelect.set(user);
    this.modal.set(true);
  }

  onEliminar(event:Event,id:string){
      this.formVisible =false;
      this.dialogVisible =true;
      this.modal.set(true);
      this.idSelect=id;
    }
  
  confirmacion(confirm:boolean){
      if(confirm){
        this.fireDb.delete(this.path, this.idSelect);
      }
      this.onClose();
    }


}
