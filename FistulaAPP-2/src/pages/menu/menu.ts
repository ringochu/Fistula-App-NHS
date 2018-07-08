import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecordPage } from '../record/record';
import { InstructionsPage } from '../instructions/instructions';
import { DiaryPage } from '../diary/diary';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  private rootPage;
  private recordPage;
  private instructionsPage;
  private diaryPage;
  private homePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootPage = HomePage;
    this.homePage = HomePage;
    this.recordPage = RecordPage;
    this.diaryPage = DiaryPage;
    this.instructionsPage = InstructionsPage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


 openPage(p) {
    this.rootPage = p;
  }

}
