import { ModalNotasEstudiantePage } from './../modals/modal-notas-estudiante/modal-notas-estudiante';
import { EstudiantePage } from './../pages/estudiante/estudiante';
import { ModalNotasPage } from './../modals/modal-notas/modal-notas';
import { ModalMateriasPage } from './../modals/modal-materias/modal-materias';
import { CustomLoadingComponent } from './../components/custom-loading/custom-loading';
import { PopoverPage } from './../popovers/popover';
import { DocentePage } from './../pages/docente/docente';
import { RolePage } from './../pages/role/role';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalPage } from './../pages/modal/modal';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AbciProvider } from '../providers/abci/abci';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';




export const FIREBASE_CONFIG = {   
apiKey: "AIzaSyDsEYgQh2-LTHMK38g2BHmD4WMWb6bO3rs",
authDomain: "blocku-1ae91.firebaseapp.com",
databaseURL: "https://blocku-1ae91.firebaseio.com",
projectId: "blocku-1ae91",
storageBucket: "blocku-1ae91.appspot.com",
messagingSenderId: "501644450496"};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalPage,
    PopoverPage,
    RolePage,
    DocentePage,
    EstudiantePage,
    ModalMateriasPage,
    ModalNotasPage,
    ModalNotasEstudiantePage,
    CustomLoadingComponent
  ],
  imports: [
    BrowserModule,   
    HttpClientModule ,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp,{
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      spinner:'dots',
      pageTransition:'wp-transition'
      
    }),
    ElasticHeaderModule 

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalPage ,
    PopoverPage,
    RolePage,
    DocentePage,
    EstudiantePage,
    ModalMateriasPage,
    ModalNotasPage,
    ModalNotasEstudiantePage,
    CustomLoadingComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AbciProvider,
    HttpClient,
    CustomLoadingComponent
  ]
})
export class AppModule {}
