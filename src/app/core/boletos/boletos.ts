import { Component, computed, effect, inject, signal } from '@angular/core';
import { Firebase, PATHFireBase } from '../../services/firebase';
import { BoletosModel } from '../../models/boletos/boletos.model';
import { Formboletos } from "./formboletos/formboletos";
import { Dialog } from "../../shared/dialog/dialog";
import { AuthService1 } from '../../services/auth/auth-service1';
import { Database } from '@angular/fire/database';

@Component({
  selector: 'app-boletos',
  imports: [Formboletos, Dialog],
  templateUrl: './boletos.html',
  styleUrl: './boletos.css',
})
export class Boletos {

  idSelect='';
  modal = signal<boolean>(false);
  formVisible =false;
  dialogVisible =false;
  itemSelect = signal<any>(null);
  private fireDb = inject(Firebase);
  ////////////////////////////
  ///////////////////////////
  private path = PATHFireBase.Boletos;
  ///////////////////////////
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
  

  //############
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
      return datos as BoletosModel[];
    });
    /*
    constructor(){
      effect(()=>{
        this.error.set(this.usuariosResource.value()?.error);
      })
    }*/

  onEditar(user:BoletosModel){
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


  compradoBoleto(dato:any){}
}
