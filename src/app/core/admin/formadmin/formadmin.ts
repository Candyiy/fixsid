import { Component, computed, inject, input, output, signal } from '@angular/core';
import { UsuarioModel } from '../../../models/usuario/usuario.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firebase, PATHFireBase } from '../../../services/firebase';
import { v4 as uuidv4 } from 'uuid';
import { AdminModel } from '../../../models/admin/admin.model';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-formadmin',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './formadmin.html',
  styleUrl: './formadmin.css',
})
export class Formadmin {

  salir=output<boolean>();
  data = input<AdminModel>();
  fb = inject(FormBuilder);
  datosFormGroup=this.fb.group({
    /////////////
        name:[this.data()?this.data()?.name:'',[Validators.required,Validators.minLength(3)]],
        email:[this.data()?this.data()?.email:'',[Validators.required,Validators.email]],
        
        password:[this.data()?this.data()?.password:'',[Validators.required,Validators.minLength(3)]],
    ////////////////
      });

  ngOnInit() {
    this.datosFormGroup.setValue({
      ///////////////
      ///////////////
      name: this.data()?.name??'',
      email: this.data()?.email??'',
      password: this.data()?.password??'',
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
  auth = inject(Auth);
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
      email:this.datosFormGroup.value.email,
      password:this.datosFormGroup.value.password,
      rol:'admin'
    }
    //////////////
    if(this.editando()){
      //editando
      this.dbFire.edit(PATHFireBase.Admin,this.data()?.id??'',data_);
      this.onSalir();
    }
    else{
       //nuevo registro
  const email = this.datosFormGroup.value.email!;
const password = this.datosFormGroup.value.password!;

createUserWithEmailAndPassword(this.auth, email, password)
  .then((userCredential) => {
    // Usuario registrado correctamente en Auth
    const user = userCredential.user;
    console.log('Usuario creado en Auth:', user.uid);

    // Datos a guardar
    const uid = uuidv4(); // usar UID de Firebase Auth es mejor que uuidv4
    const data_ = {
      name: this.datosFormGroup.value.name,
      email: email,
      rol: 'admin',
      // password no se recomienda guardar en DB, Auth ya lo maneja
    };

    // Guardar en ambos paths
    this.dbFire.add(PATHFireBase.Admin, uid, data_);
    this.dbFire.add(PATHFireBase.Usuarios, uid, data_);

    this.onSalir();
  })
  .catch((error) => {
    console.error('Error creando usuario:', error);
    this.error.set(error.message);
  });

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
