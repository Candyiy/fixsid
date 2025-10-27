import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormSillas } from "./form-sillas/form-sillas";
import { Dialog } from "../../../shared/dialog/dialog";
import { Firebase, PATHFireBase } from '../../../services/firebase';
import { SillaModel } from '../../../models/salon/silla/silla.model';

@Component({
  selector: 'app-sillas',
  imports: [FormSillas, Dialog],
  templateUrl: './sillas.html',
  styleUrl: './sillas.css',
})
export class Sillas {

  idSelect='';
  modal = signal<boolean>(false);
  formVisible =false;
  dialogVisible =false;
  itemSelect = signal<any>(null);
  private fireDb = inject(Firebase);
  ////////////////////////////
  ///////////////////////////
  private path = PATHFireBase.Sillas;
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
      return datos as SillaModel[];
    });
    constructor(){
      effect(()=>{
        this.error.set(this.usuariosResource.value()?.error);
      })
    }

  onEditar(user:SillaModel){
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
