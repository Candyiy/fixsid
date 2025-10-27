import { Component, computed, effect, inject, signal } from '@angular/core';
import { Firebase, PATHFireBase } from '../../services/firebase';
import { SalonModel } from '../../models/salon/salon.model';
import { Formsalon } from "./formsalon/formsalon";
import { Dialog } from '../../shared/dialog/dialog';
import { FormMantel } from "../decorado/mantel/form-mantel/form-mantel";
import { FormSillas } from "../decorado/sillas/form-sillas/form-sillas";
import { FormMesas } from "../decorado/mesas/form-mesas/form-mesas";

@Component({
  selector: 'app-salon',
  imports: [
    Formsalon,
    Dialog,
    FormMantel,
    FormSillas,
    FormMesas
],
  templateUrl: './salon.html',
  styleUrl: './salon.css',
})
export class Salon {

  formMantel =false;
  formSilla =false;
  formMesa =false;
  idSelect='';
  modal = signal<boolean>(false);
  formVisible =false;
  dialogVisible =false;
  itemSelect = signal<any>(null);
  private fireDb = inject(Firebase);
  ////////////////////////////
  ///////////////////////////
  private path = PATHFireBase.Salones;
  ///////////////////////////
  ///////////////////////////  
  error = signal<string|undefined>('');
    usuariosResource = this.fireDb.createResource(this.path);

  onAdd(){
    this.formMantel=false;
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
      return datos as SalonModel[];
    });
    constructor(){
      effect(()=>{
        this.error.set(this.usuariosResource.value()?.error);
      })
    }

  onEditar(user:SalonModel){
    this.formMantel=false;
    this.formSilla=false;
    this.formMesa=false;
    this.formVisible =true;
    this.dialogVisible =false;
    this.itemSelect.set(user);
    this.modal.set(true);
  }

  onEliminar(event:Event,id:string){
      this.formVisible =false;
      this.formMantel=false;
      this.formSilla=false;
      this.formMesa=false;
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

  idselect=signal<string>('');
  nuevoMantel(id:string){
    console.log('es el id del salon: '+id);
    this.formMantel =true;
    this.formSilla=false;
    this.formMesa=false; 
    this.formVisible =false;
    this.dialogVisible =false;
    this.idselect.set(id);
    this.modal.set(true);
  }

  nuevoMesa(id:string){
    console.log('es el id del salon: '+id);
    this.formMantel =false;
    this.formSilla=false;
    this.formMesa=true; 
    this.formVisible =false;
    this.dialogVisible =false;
    this.idselect.set(id);
    this.modal.set(true);
  }

  nuevoSilla(id:string){
    console.log('es el id del salon: '+id);
    this.formMantel =false;
    this.formSilla=true;
    this.formMesa=false; 
    this.formVisible =false;
    this.dialogVisible =false;
    this.idselect.set(id);
    this.modal.set(true);
  }
}
