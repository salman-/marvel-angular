import { Component,Input } from '@angular/core';
import { Marvel } from '../form/marvel.model';

@Component({
  selector: 'app-marvels',
  templateUrl: './marvels.component.html'
})
export class MarvelsComponent {

  @Input() marvels: Marvel[] = [];

}
