import { Component, computed, EventEmitter, inject, input, Output, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firebase, PATHFireBase } from '../../../../services/firebase';
import { v4 as uuidv4 } from 'uuid';
import { MantelModel } from '../../../../models/salon/matel/matel.model';

@Component({
  selector: 'app-form-mantel',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './form-mantel.html',
  styleUrl: './form-mantel.css',
})
export class FormMantel {

  //salir=output<boolean>();
  
  @Output() salir=new EventEmitter<boolean>();

  ///
  ///
  data = input<MantelModel>();

  idsalonxdxd=input<string>();
  ///
  ///

  fb = inject(FormBuilder);
  datosFormGroup=this.fb.group({
    /////////////
        marca:[this.data()?this.data()?.marca:'',[Validators.required,Validators.minLength(3)]],
        
        color:[this.data()?this.data()?.color:'',[Validators.required,Validators.minLength(1)]],
        
        descripcion:[this.data()?this.data()?.descripcion:'',[Validators.required,Validators.minLength(3)]],
        
        foto:[this.data()?this.data()?.foto:'',[Validators.required,Validators.minLength(3)]],
    ////////////////
      });

  ngOnInit() {
    this.datosFormGroup.setValue({
      ///////////////
      ///////////////
      marca: this.data()?.marca??'',
      color: this.data()?.color??'',
      descripcion: this.data()?.descripcion??'',
      foto: this.data()?.foto??'',
      ////////////////
      ////////////////
    });
  }
  error = signal<string>('');
  //editando=signal<boolean>(false);
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
    const data_ = {
      marca:this.datosFormGroup.value.marca,
      color:this.datosFormGroup.value.color,
      descripcion:this.datosFormGroup.value.descripcion,
      foto:this.datosFormGroup.value.foto,
      idsalon:this.idsalonxdxd(),
    }
    if(this.editando()){
      //editando
      this.dbFire.edit(PATHFireBase.Manteleria,this.data()?.id??'',data_);
      this.onSalir();
    }
    else{
      //nuevo
      const uid=uuidv4();
      this.dbFire.add(PATHFireBase.Manteleria,uid,data_);
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
