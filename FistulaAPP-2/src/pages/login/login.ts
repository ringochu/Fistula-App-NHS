import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AlertController, LoadingController} from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Storage } from '@ionic/storage';
//import {Storage, LocalStorage} from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  
  email: any;
  password: any;
  loading: any;
  loader:any;
  email1: string;
  
   loginForm: FormGroup;
   
 
    submitAttempt: boolean = false;

  constructor( public navCtrl: NavController, public alertCtrl: AlertController, public angfire: AngularFire, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public storage: Storage /*, public local: Local*/) { 
  window.localStorage.removeItem('currentuser');  //remove AngularFire user
  
   this.loginForm = formBuilder.group({
       
		email: ['', Validators.required],
		pass: ['', Validators.required]
		
	
		
    });

  }
 

loginfire(){
	
	this.submitAttempt = true;
 
    if(!this.loginForm.valid){
       
    } 
   
    else {


   let user ={ email1 : this.email };
   this.presentLoading();

  this.angfire.auth.login({
    email: this.email,
    password: this.password
  },{
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  }).then((response)=>{
    console.log(JSON.stringify(response));
    let currentuser ={
      email: response.auth.email,
    };
    window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
    this.storage.set('user', this.email);
    this.navCtrl.setRoot(HomePage, user);
    console.log(user.email1)
  }).catch((error)=>{
    console.log(error);
    
    let alert = this.alertCtrl.create({
      title: 'Invalid Input',
      subTitle: 'Invalid email or password does not exist!',
      buttons: ['OK']

    });
    alert.present();
  })
  
  this.loader.dismiss();
}
}
  
 presentLoading(){
   this.loader = this.loadingCtrl.create({ //deploy a loading icon 
    content: 'Please wait...',
    spinner: 'crescent'
  });
   this.loader.present();
  } 


  here(){ //method to start a new page
      this.navCtrl.push(SignupPage)
  }

  login(){
  //let nav = this.app.getComponent('nav');
    this.navCtrl.push(TabsPage)
  }

}