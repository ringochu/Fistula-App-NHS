import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Platform } from 'ionic-angular';
import firebase from 'firebase';

import { LoginPage } from '../login/login';


/*
  Generated class for the Popover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover',
  //templateUrl: 'popover.html',
  template: `
    <ion-list>
      <button ion-button full (click)="logout()">Log out</button>
      <button ion-button full (click)="exit()">Exit</button>
        </ion-list>
  `
})
export class PopoverPage {

  nativePath: any;
  firestore = firebase.storage();
  lastImage: string = null;
  loading: Loading;
  key: string;
  user:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public viewCtrl: ViewController, public angfire: AngularFire, 
  public alertCtrl: AlertController, public platform: Platform, 
  public loadingCtrl: LoadingController) {
    this.user=this.navParams.get('email1')
  console.log(this.user + ' has logged in');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  /* close() {
    this.viewCtrl.dismiss();
  } */
isLoggedin(){
    if(window.localStorage.getItem('currentuser')){
      return true;
    }
   }

  logout(){
     let confirm =this.alertCtrl.create({
    title: 'Confirm',
    message: 'Click OK if you want to logout',
    buttons:[
      {
      text: 'cancel',
      handler:() => {}
    },
    {
      text: 'OK',
      handler:() => {
        this.navCtrl.setRoot(LoginPage),
          this.angfire.auth.logout() 
        console.log(this.angfire.auth.logout() );
      }
        
                  
    }
    
    ]
    
    });
       confirm.present();  
     
   }

   exit(){
    let confirm =this.alertCtrl.create({
    title: 'Confirm',
    message: 'Click OK if you want to exit',
    buttons:[
      {
      text: 'cancel',
      handler:() => {}
    },
    {
      text: 'OK',
      handler:() => {this.platform.exitApp()}
    }
    ]
    });
       confirm.present();           
    }

}
