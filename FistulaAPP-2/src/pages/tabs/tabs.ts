import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { CapturePage } from '../capture/capture';
import { RecordPage } from '../record/record'
import { DiaryPage } from '../diary/diary'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = DiaryPage;
  tab3Root: any = RecordPage;
  tab4Root: any = CapturePage;

  constructor() {

  }
}
