import { Component,Input } from '@angular/core';
import { Marvel } from './form/marvel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent { 


  marvels: Marvel[]= [];

  onNotified(marvels: Marvel[]){
      this.marvels = marvels;
      for(let i=0;i<6;i++){
      console.log(this.marvels[i].name+" "+this.marvels[i].thumbnail)
    }
  }

  
}
