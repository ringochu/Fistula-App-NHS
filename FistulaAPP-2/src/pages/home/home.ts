import { Component, NgZone } from '@angular/core';
import { NavController,AlertController,NavParams, LoadingController, Loading, ToastController, } from 'ionic-angular';
import { InstructionsPage } from '../instructions/instructions';
import { CapturePage } from '../capture/capture';
import { DiaryPage } from '../diary/diary';
import { LoginPage } from '../login/login';
import { RecordPage } from '../record/record';
import { PopoverPage} from '../popover/popover';
import { Platform } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import {FileChooser, FilePath, File} from 'ionic-native'; //for uploading pictures
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

class Image{
user: any
fistulaPhoto: any
constructor(){}
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  nativePath: any;
  firestore = firebase.storage();
  imgsource: any;
  lastImage: string = null;
  loading: Loading;
  key: string;
  user:string;
  image: Image = new Image()

  popup: any;
  loader: any;

  constructor(public angfire: AngularFire, public navParams:NavParams, public navCtrl: NavController, public toastCtrl: ToastController,
  public platform: Platform,public alertCtrl: AlertController, public af: AngularFire,
  public loadingCtrl: LoadingController, public storage: Storage, public zone: NgZone) {
  this.image.user =this.navParams.get('email1');
  console.log(this.image.user +' has logged in')
}
    
    imageInstructions(){
      let key = this.key
      this.navCtrl.push(InstructionsPage, this.navParams);
    } 
    
    diary(){
      this.navCtrl.push(DiaryPage, this.navParams);
    }
    
     record(){
       let Data = this.navParams;
       console.log(Data.get('email1') + ' the record button is clicked');
       this.navCtrl.push(RecordPage, this.navParams);
     } 
    
    capture(){
      this.navCtrl.push(CapturePage, this.navParams);
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
    } //end of exit 

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
          this.angfire.auth.logout() }
    }
    ]
    });
       confirm.present();  
     
   } 
   

   store(){    //in-use
   FileChooser.open().then((url)=>{
     (<any>window).FilePath.resolveNativePath(url, (result)=>{
        this.nativePath = result;
        this.uploadimage();
     })
   })
  }
 

  uploadimage(){
    (<any>window).resolveLocalFileSystemURL(this.nativePath, (res)=>{
      res.file((resFile)=>{
        var reader = new FileReader();
        reader.readAsArrayBuffer(resFile);
        reader.onloadend = (evt: any) => {
          var imgBlog = new Blob([evt.target.result], { type: 'image/jpeg' });
        
          this.presentLoading(); 
          var imageStore = this.firestore.ref().child(this.image.user+'.jpg');
          imageStore.put(imgBlog).then((res) =>{
            this.popupicon();
            this.loader.dismiss();
          }).catch((err)=>{
            console.log("testing unsuccessful")
            this.loader.dismiss();
          })
         //   this.af.database.list('/images').push(this.image); //debug
            
        }
         
      })
    })
  } //end of upload image 
  
 presentLoading(){
   this.loader = this.loadingCtrl.create({ //deploy a loading icon 
    content: 'Please wait...',
    spinner: 'crescent'
  });
   this.loader.present();
  } 

popupicon(){
  this.popup = this.toastCtrl.create({
    message: 'The image is uploaded',
    duration: 2000,
    position: 'middle'
  });
   this.popup.present();
 }



} 

