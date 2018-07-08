import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { AngularFire, FirebaseListObservable} from 'angularfire2'
import firebase from 'firebase';
import "rxjs/add/operator/map";

import { LoginPage } from '../login/login';


@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})

export class DiaryPage {
 posts: FirebaseListObservable<any>
 date: string=''
 user: string
 searchDate: string
 sizeSubject: Subject<any>
 targetDate: String = new Date().toString();

  constructor(public navParams:NavParams, public navCtrl: NavController, public af: AngularFire, public alertCtrl: AlertController) {
    this.sizeSubject= new Subject();
    this.user = this.navParams.get('email1') //+ firebase.auth().currentUser.uid; 
    console.log(this.user + ' is viewing diary log')
    this.readDiary();
  } // end of constructor

//After construction
 readDiary(){
   this.posts = this.af.database.list('/users', {  //display user list as default
      query :{   
        orderByChild: 'userKey',
        equalTo: this.user,
        limitToLast: 12
      }
    }).map((array)=> array.reverse()) as FirebaseListObservable<any>
 }

 filter(){
   let target:string =this.date,
       key: string = this.user+ this.date
      console.log(key); 

  if(target.trim()==''){
  console.log('the bar is empty');
  this.readDiary();
  }
  else{
   console.log('show data according to the key')
   this.posts = this.af.database.list('/users', {  
      query :{   
        orderByChild: 'key',
        equalTo: key
      }
    }).map((array)=> array.reverse()) as FirebaseListObservable<any>
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


}  /* end of class */

