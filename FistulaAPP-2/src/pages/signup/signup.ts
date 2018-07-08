import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import {AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
//import {FormBuilder, Validators} from '@angular/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavParams} from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage{

slideOneForm: FormGroup;
   
  submitAttempt: boolean = false;

email: any;
password: any;
error: any;
constructor(private toastCtrl: ToastController, public navCtrl: NavController, public alertCtrl: AlertController, public angfire: AngularFire, public loadingCtrl: LoadingController, public FormBuilder: FormBuilder) {

this.slideOneForm = FormBuilder.group({
      
        confirmPassword: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(30), Validators.required])],
        email: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(30),  Validators.required])],
        passwordd: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(30), Validators.required])],
	
    },
    {validator: SignupPage.passwordsMatch});
}
static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    let passwordd = cg.get('passwordd');
    let confirmPassword = cg.get('confirmPassword');
    let rv: {[error: string]: any} = {};
    if ((passwordd.touched || confirmPassword.touched) && passwordd.value !== confirmPassword.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }

  signupfire(){

    this.submitAttempt = true;
 
    if(!this.slideOneForm.valid){
    }
    else {
       
  let loading = this.loadingCtrl.create({ //deploy a loading icon 
    content: 'Please wait...',
    spinner: 'crescent'
  });
 loading.present();

  this.angfire.auth.createUser({
    email: this.email,
    password: this.password,
  }).then(
    (success)=>{
    console.log("successful");
    this.navCtrl.pop();
     loading.dismiss();
     this.presentToast();
    }).catch((err)=>{
      this.error=err;
      console.log("there is an error");
    })
  }
  }
 

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'User was added successfully',
    duration: 2500,
    position: 'middle'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

} //END of class

  



