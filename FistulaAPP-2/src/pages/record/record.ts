//last edited by ringo 25th march 2017 00:40
import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { AngularFire,AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';
import { Http, Headers, RequestOptions } from '@angular/http'; // set up a link to MySQL
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginPage } from '../login/login';

class Post {
  key: string      //emial+personal uid+date ,checked
  location: string = '' //checked
  userName: string // checked
  userKey: string  //checked
  myDate1: string =''         //checked  assign empty if it's not defined
  myDate2: string = ''         //checked
  yesno1: string =''           //checked
  yesno2: string =''         //checked
  yesno3: string =''          //checked 
    yesno3Tingling
    yesno3Coldness
    yesno3Numbness 
    yesno3Pain
  yesno4: string =''         //checked 
  comment: string =''        //checked
  yesno6: string =''
  yesno7: string = ''
  yesno8: string =''
  yesno9: string =''
  yesno10: string =''
  yesno11: string =''
  yesno5: string=''
  constructor(){}
}

@Component({
  selector: 'page-record',
  templateUrl: 'record.html'
})

export class RecordPage {
  
  private baseURI : string ="http://fistula-app.000webhostapp.com";
  user : string
  post: Post = new Post()

  recordsForm: FormGroup;
  submitAttempt: boolean = false;

  constructor( public navCtrl: NavController, public formBuilder: FormBuilder, public navParams:NavParams, 
  public af: AngularFire, public http: Http, public alertCtrl: AlertController){
  this.post.userName = this.navParams.get('email1')  
  console.log(this.post.userName + ' is writing record.')
this.recordsForm = formBuilder.group({
       
  date: ['', Validators.required],
  time: ['', Validators.required],
  skin: ['', Validators.required],
  buzz: ['', Validators.required],
  symptons: ['', Validators.required],
  swelling: ['', Validators.required],
  comments: [''],
  locations: ['', Validators.required],
  located: ['', Validators.required],
  hear: ['', Validators.required],
  painful: ['', Validators.required],
  bleed: ['', Validators.required],
  pain: [''],
  dialysis: ['', Validators.required],

  /* additional form validator for symptoms */
  tingling: [false],
  coldness:[false],
  numbness:[false],
  hurting:[false] 
  
    });  
}

submit(){

   this.submitAttempt = true;
 
    if(!this.recordsForm.valid){
       
    } 
   
    else {
/* Correcting status */
  
  if( this.post.yesno3Tingling == true ){
    this.post.yesno3Tingling = 'Tingling'
  }else {this.post.yesno3Tingling=''}

  if( this.post.yesno3Coldness == true ){
    this.post.yesno3Coldness = 'Coldness'
  }else {this.post.yesno3Coldness=''}

  if( this.post.yesno3Numbness == true ){
    this.post.yesno3Numbness = 'Numbness'
  }else {this.post.yesno3Numbness=''}

  if( this.post.yesno3Pain== true ){
    this.post.yesno3Pain = 'Pain'
  }else {this.post.yesno3Pain=''}
 
 /*Finish correcting status */
  this.post.userKey = this.post.userName //+ firebase.auth().currentUser.uid
  this.post.key = this.post.userKey + this.post.myDate1
  console.log(this.post.userKey)
  console.log(this.post.key)
  this.af.database.list('/users').push(this.post)
  
  //now backing php 
  let url : any =this.baseURI +"/manage-data-record.php",
     type 	 : string	 = "application/x-www-form-urlencoded; charset=UTF-8",
     headers : any		 = new Headers({ 'Content-Type': type}),
     options : any 		 = new RequestOptions({ headers: headers }),
     body : string = "key="+ this.post.key +"&location="+ this.post.location+"&myDate1="+this.post.myDate1+"&myDate2="+this.post.myDate2
     +"&userKey="+this.post.userKey+"&userName="+this.post.userName+"&yesno1="+this.post.yesno1+
     "&yesno2="+this.post.yesno2+"&yesno3="+this.post.yesno3+"&yesno4="+this.post.yesno4+"&comment="+this.post.yesno5
     +"&yesno6="+this.post.yesno6+"&yesno7="+this.post.yesno7+"&yesno8="+this.post.yesno8+"&yesno9="+this.post.yesno9
     +"&yesno10="+this.post.yesno10+"&yesno11="+this.post.yesno11;

     //I have combined all information to one string and pass it to php server
     console.log('php information: '+ body);
     this.http.post(url, body, options).subscribe((data) =>{
   if(data.status === 200){
     console.log('user is added to php');
   } else{ console.log("php unsuccessful!!!"); }
  });

 /* now php and firebase are finished , this pages finished and pop off from the stack*/
 this.post = new Post() //reset post
  this.navCtrl.pop();
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
          this.af.auth.logout() }
    }
    ]
    });
       confirm.present();  
     
   } 

}