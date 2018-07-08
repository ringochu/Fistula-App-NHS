import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs' 
import { Http } from '@angular/http' // REST Server

@Injectable()
export class Data {
  posts: ReplaySubject<{}> = new ReplaySubject<{}>()
  constructor() {
  }

  get Posts(){
    return this.posts;
  }
  
  addPost(post){
    this.posts.next(post)
  }

  
}
