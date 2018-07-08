import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { InstructionsPage } from '../pages/instructions/instructions';
import { DiaryPage } from '../pages/diary/diary';
import { RecordPage } from '../pages/record/record';
import { CapturePage } from '../pages/capture/capture';
import { Data } from '../providers/data';
import { AngularFireModule } from 'angularfire2'
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MenuPage } from '../pages/menu/menu';
import { PopoverPage } from '../pages/popover/popover';
import { IonicStorageModule } from '@ionic/storage';


const config = {
    apiKey: "AIzaSyA-fK-nzF6guvRVJ56yGcZlXWpqu0TiL7s",
    authDomain: "appdatabase-eed84.firebaseapp.com",
    databaseURL: "https://appdatabase-eed84.firebaseio.com",
    storageBucket: "appdatabase-eed84.appspot.com",
    messagingSenderId: "87612090551"
  };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InstructionsPage,
    DiaryPage,
    RecordPage,
    CapturePage,
    LoginPage,
    SignupPage,
    MenuPage,
    PopoverPage
   
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InstructionsPage,
    DiaryPage,
    RecordPage, 
    CapturePage,
    LoginPage,
    SignupPage,
    MenuPage,
    PopoverPage
    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
