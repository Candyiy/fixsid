import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalonModel } from '../../../models/salon/salon.model';
import { Firebase, PATHFireBase } from '../../../services/firebase';
import { v4 as uuidv4 } from 'uuid';
import { AuthService1 } from '../../../services/auth/auth-service1';
import { Database } from '@angular/fire/database';


@Component({
  selector: 'app-formsalon',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './formsalon.html',
  styleUrl: './formsalon.css',
})
export class Formsalon {

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
  salir=output<boolean>();
  
  ///
  ///
  data = input<SalonModel>();
  ///
  ///

  fb = inject(FormBuilder);

  datosFormGroup=this.fb.group({
    /////////////
        name:[this.data()?this.data()?.name:'',[Validators.required,Validators.minLength(3)]],
        
        cantidad:[this.data()?this.data()?.cantidad:'',[Validators.required,Validators.minLength(3)]],

        ubicacion:[this.data()?this.data()?.ubicacion:'',[Validators.required,Validators.minLength(3)]],
        
        descripcion:[this.data()?this.data()?.descripcion:'',[Validators.required,Validators.minLength(3)]],

        foto:[this.data()?this.data()?.foto:'',[Validators.required,Validators.minLength(3)]],
    ////////////////
      });

  ngOnInit() {
    this.datosFormGroup.setValue({
      ///////////////
      ///////////////
      name: this.data()?.name??'',
      cantidad: this.data()?.cantidad??'',
      ubicacion: this.data()?.ubicacion??'',
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
    /////////////
    /////////////
    const data_ = {
      name:this.datosFormGroup.value.name,
      cantidad:this.datosFormGroup.value.cantidad,
      ubicacion:this.datosFormGroup.value.ubicacion,
      descripcion:this.datosFormGroup.value.descripcion,
      foto:this.datosFormGroup.value.foto,
      idAgente:this.guardadoIdlogin(),
    }
    //////////////
    /////////////

    ////////////////////////////////////
    //PATHFireBase.Usuarios esto cambiar por 
    //PATHFireBase.clientes o el que sea me refieroa clioentes solamente
    ///////////////////////////////////
    if(this.editando()){
      //editando
      this.dbFire.edit(PATHFireBase.Salones,this.data()?.id??'',data_);
      this.onSalir();
    }
    else{
      //nuevo
      const uid=uuidv4();
      this.dbFire.add(PATHFireBase.Salones,uid,data_);
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
