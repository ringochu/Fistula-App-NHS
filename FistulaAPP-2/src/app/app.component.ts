import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoadingController} from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CapturePage } from '../pages/capture/capture';
import { RecordPage } from '../pages/record/record';
import { MenuPage } from '../pages/menu/menu';
import { PopoverPage } from '../pages/popover/popover';
import { InstructionsPage } from '../pages/instructions/instructions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  loader: any;

  constructor(platform: Platform, public loadingCtrl: LoadingController) {
   
    this.presentLoading();
    
    platform.ready().then(() => {
       this.rootPage = LoginPage;
      
       // StatusBar.styleDefault();
       // Splashscreen.hide();
     /* if(window.localStorage.getItem('currentuser')){
        this.rootPage= HomePage;
      } else{
        this.rootPage = LoginPage;
      }   */
    
      this.loader.dismiss(); 

    
    });
  }

  presentLoading(){
   this.loader = this.loadingCtrl.create({ //deploy a loading icon 
    content: 'Please wait...',
    spinner: 'crescent'
  });
   this.loader.present();
  }


}
