import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firebase, PATHFireBase } from '../../../../services/firebase';
import { v4 as uuidv4 } from 'uuid';
import { SillaModel } from '../../../../models/salon/silla/silla.model';

@Component({
  selector: 'app-form-sillas',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-sillas.html',
  styleUrl: './form-sillas.css',
})
export class FormSillas {

  idsalonxdxd=input<string>();
  salir=output<boolean>();
  ///
  ///
  data = input<SillaModel>();
  ///
  ///
  fb = inject(FormBuilder);
  datosFormGroup=this.fb.group({
    /////////////
        marca:[this.data()?this.data()?.marca:'',[Validators.required,Validators.minLength(3)]],
        
        material:[this.data()?this.data()?.material:'',[Validators.required,Validators.minLength(1)]],
        
        descripcion:[this.data()?this.data()?.descripcion:'',[Validators.required,Validators.minLength(3)]],
        
        precio:[this.data()?this.data()?.precio:'',[Validators.required,Validators.minLength(3)]],

        foto:[this.data()?this.data()?.foto:'',[Validators.required,Validators.minLength(3)]],
    ////////////////
      });
    
  ngOnInit() {
    this.datosFormGroup.setValue({
      ///////////////
      ///////////////
      marca: this.data()?.marca??'',
      material: this.data()?.material??'',
      descripcion: this.data()?.descripcion??'',
      precio: this.data()?.precio??'',
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
    /////////////
    /////////////

    const data_ = {
      marca:this.datosFormGroup.value.marca,
      material:this.datosFormGroup.value.material,
      descripcion:this.datosFormGroup.value.descripcion,
      precio:this.datosFormGroup.value.precio,
      foto:this.datosFormGroup.value.foto,
      idsalon:this.idsalonxdxd(),
    }
    //////////////
    /////////////

    ////////////////////////////////////
    //PATHFireBase.Usuarios esto cambiar por 
    //PATHFireBase.clientes o el que sea me refieroa clioentes solamente
    ///////////////////////////////////
    if(this.editando()){
      //editando
      this.dbFire.edit(PATHFireBase.Sillas,this.data()?.id??'',data_);
      this.onSalir();
    }
    else{
      //nuevo
      const uid=uuidv4();
      this.dbFire.add(PATHFireBase.Sillas,uid,data_);
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
