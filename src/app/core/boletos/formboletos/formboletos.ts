import { Component, computed, inject, input, output, signal } from '@angular/core';
import { BoletosModel } from '../../../models/boletos/boletos.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firebase, PATHFireBase } from '../../../services/firebase';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-formboletos',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './formboletos.html',
  styleUrl: './formboletos.css',
})
export class Formboletos {

  salir=output<boolean>();
  data = input<BoletosModel>();
  fb = inject(FormBuilder);
  datosFormGroup=this.fb.group({
    /////////////
        name:[this.data()?this.data()?.name:'',[Validators.required,Validators.minLength(3)]],
        descripcion:[this.data()?this.data()?.descripcion:'',[Validators.required,Validators.minLength(3)]],
        precio:[this.data()?this.data()?.precio:'',[Validators.required,Validators.minLength(1)]],
        foto:[this.data()?this.data()?.foto:'',[Validators.required,Validators.minLength(3)]],
    ////////////////
      });

  ngOnInit() {
    this.datosFormGroup.setValue({
      ///////////////
      ///////////////
      name: this.data()?.name??'',
      descripcion: this.data()?.descripcion??'',
      precio: this.data()?.precio??'',
      foto: this.data()?.foto??'',
      ////////////////
      ////////////////
    });
  }
  error = signal<string>('');
  dbFire = inject(Firebase);

  editando = computed(()=>{
    return this.data()?.id?true:false;
  });

  onSalir(){
    this.salir.emit(true);
  }

  enviar(){

  }
  guardar(){
    Object.keys(this.datosFormGroup.controls).forEach(key=>{
      this.datosFormGroup.get(key)?.markAsTouched();
    })
    if(this.datosFormGroup.invalid){
      this.error.set('Corregir los errores');
      return;
    }
    /////////////
    const data_ = {
      name:this.datosFormGroup.value.name,
      descripcion:this.datosFormGroup.value.descripcion,
      precio:this.datosFormGroup.value.precio,
      foto:this.datosFormGroup.value.foto,
      rol:'cliente'
    }
    //////////////
    if(this.editando()){
      //editando
      this.dbFire.edit(PATHFireBase.Boletos,this.data()?.id??'',data_);
      this.onSalir();
    }
    else{
      //nuevo
      const uid=uuidv4();
      this.dbFire.add(PATHFireBase.Boletos,uid,data_);
      this.onSalir();
    }
    ///////////////////////////////////
    //////////////////////////////////
  }
  hasError(field:string){
    const control = this.datosFormGroup.get(field);
    return !!(control && control.invalid && control.touched)
  }
  getErrorMessage(field:string):string{
    const control1 = this.datosFormGroup.get(field);
    if(!control1?.errors)
      return '';
    if(control1?.errors['required'])
      return 'Este campo es obligatorio';
    if(control1?.errors['email'])
      return 'Este campo no es un email valido';
    if(control1?.errors['minlength'])
      return 'Este campo debe tener un minimo de '+control1.errors['minlength'].requiredLength;
    return '';
  }
}
