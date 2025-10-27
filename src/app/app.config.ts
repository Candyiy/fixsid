import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

///////////////////////////
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { provideAuth,getAuth } from '@angular/fire/auth';
///////////////////////

const firebaseConfig = {
  apiKey: "AIzaSyCAmn-DqyiUemgz4iTaqtM-TdXMfEHfnlQ",
  authDomain: "practica-f8652.firebaseapp.com",
  databaseURL: "https://practica-f8652-default-rtdb.firebaseio.com",
  projectId: "practica-f8652",
  storageBucket: "practica-f8652.firebasestorage.app",
  messagingSenderId: "719279121805",
  appId: "1:719279121805:web:8af8377281f12eabb909c4"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideAuth(()=>getAuth()),
  ]
};
