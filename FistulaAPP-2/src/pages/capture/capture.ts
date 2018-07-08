import { Component } from '@angular/core';
import {NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, AlertController} from 'ionic-angular';
import {Camera, FileChooser } from 'ionic-native'; //for uploading pictures
import { InstructionsPage } from '../instructions/instructions';
import firebase from 'firebase';
import { AngularFire} from 'angularfire2';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

declare var cordova: any;

class Image{
user: any
fistulaPhoto: any
constructor(){}
}

@Component({
  selector: 'page-capture',
  templateUrl: 'capture.html'
})
export class CapturePage {
  loader: any;
  popup: any;
  nativePath: any;
  firestore = firebase.storage();
  lastImage: string = null;
  loading: Loading;
  private base64Image: string;
  image: Image = new Image()

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, 
  public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,
  public af: AngularFire, public alertCtrl: AlertController, public storage: Storage ) {

   storage.get('user').then((val) => {
         console.log('-> '+val+' <-');
         this.image.user = val;
       })

  console.log( this.image.user + ' is using capture page out of scope')
  }

  

 //Method of taking photos
  takePicture(){
Camera.getPicture({
  quality: 15,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    targetWidth: 1500,
    targetHeight: 1500,
    encodingType:Camera.EncodingType.JPEG,
    correctOrientation: true,
    saveToPhotoAlbum: true
}).then((imageData) =>{ // Image is encoded in base64 format 
   this.base64Image = "data:image/jpeg;base64," + imageData;
   this.image.fistulaPhoto = imageData;
}, (err)  => {
    console.log(err);
});
 }
 // end of method

store(){    //in-use
   FileChooser.open().then((url)=>{
     (<any>window).FilePath.resolveNativePath(url, (result) => {
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
          var imgBlog = new Blob([evt.target.result], {type: 'image/png' });
  
           this.presentLoading(); 
           this.storage.get('user').then((val) => {
      
          var imageStore = this.firestore.ref().child(val+'.jpg');
          imageStore.put(imgBlog).then((res) =>{
            this.popupicon();
            this.loader.dismiss();
          }).catch((err)=>{
            console.log("testing unsuccessful")
            this.loader.dismiss();
          })
              })//end of storage
       //     this.af.database.list('/images').push(this.image); //debug   
        }
         
      })
    })
  } //end of upload image 
 

/* uploadimagefire(){
  this.presentLoading();
  this.af.database.list('/images').push(this.image);

  var imgBlog = new Blob(this.image.fistulaPhoto, {type:'image/jpeg'});
          this.image.fistulaPhoto = imgBlog;
          var imageStore = this.firestore.ref().child(this.image.user);
          imageStore.put(imgBlog).then((res) =>{
           this.popupicon();
          }).catch((err)=>{
            alert('Upload Failed!' + err +' Try again!');
            console.log("testing unsuccessful")
          })
  this.loader.dismiss();
  
} */


  upload(){
   FileChooser.open().then((url)=>{
     (<any>window).FilePath.resolveNativePath(url, (result)=>{
        this.nativePath = result;
        this.uploadimage();
     })
   })
  }
 
readInstruction(){
this.navCtrl.push(InstructionsPage);
 }

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
          this.af.auth.logout() }
    }
    ]
    });
       confirm.present();  
     
   } 
 
}

