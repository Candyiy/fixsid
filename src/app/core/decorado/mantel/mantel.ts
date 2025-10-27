import { Component, computed, effect, inject, signal } from '@angular/core';
import { Firebase, PATHFireBase } from '../../../services/firebase';
import { FormMantel } from "./form-mantel/form-mantel";
import { Dialog } from "../../../shared/dialog/dialog";
import { MantelModel } from '../../../models/salon/matel/matel.model';

@Component({
  selector: 'app-mantel',
  imports: [FormMantel, Dialog],
  templateUrl: './mantel.html',
  styleUrl: './mantel.css',
})
export class Mantel {

  idSelect='';
  modal = signal<boolean>(false);
  formVisible =false;
  dialogVisible =false;
  itemSelect = signal<any>(null);
  private fireDb = inject(Firebase);
  ////////////////////////////
  ///////////////////////////
  private path = PATHFireBase.Manteleria;
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
      return datos as MantelModel[];
    });
    constructor(){
      effect(()=>{
        this.error.set(this.usuariosResource.value()?.error);
      })
    }

  onEditar(user:MantelModel){
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
