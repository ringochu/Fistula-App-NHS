import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2'


import { PopoverPage} from '../popover/popover';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-instructions',
  templateUrl: 'instructions.html'
})
export class InstructionsPage {
  uniquekey: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
   public af: AngularFire, public alertCtrl: AlertController) {
    
   console.log(this.navParams.get('email1')+' is viewing instruction');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
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
