import { Component, computed, effect, inject, signal } from '@angular/core';
import { Formusuario } from "./formusuario/formusuario";
import { Firebase, PATHFireBase } from '../../services/firebase';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { Dialog } from "../../shared/dialog/dialog";
import { Database, getDatabase, ref, update } from '@angular/fire/database';

@Component({
  selector: 'app-usuario',
  imports: [Formusuario, Dialog],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {

  idSelect='';
  modal = signal<boolean>(false);
  formVisible =false;
  dialogVisible =false;
  itemSelect = signal<any>(null);
  private fireDb = inject(Firebase);
  ////////////////////////////
  ///////////////////////////
  private path = PATHFireBase.Usuarios;
  ///////////////////////////
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
      return datos as UsuarioModel[];
    });
    constructor(){
      effect(()=>{
        this.error.set(this.usuariosResource.value()?.error);
      })
    }

  onEditar(user:UsuarioModel){
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

/*
  db=inject(Database);
  dbFire = inject(Firebase);
  private traer=getDatabase();
  volverAgente(datos:any){
    const data_ = {
      name:datos.name,
      email:datos.email,
      ci:datos.ci,
      password:datos.password,
      rol:'agente'
    };
    update(ref(this.traer, '/users/' + datos.id), data_)
    .then(() => {
      console.log(' Datos actualizados correctamente');
    })
    .catch((error) => {
      console.error(' Error al actualizar:', error);
    });
  }
  */
}
