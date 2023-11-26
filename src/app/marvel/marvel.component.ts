import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-marvel',
  templateUrl: './marvel.component.html',
  styleUrl: './marvel.component.css'
})
export class MarvelComponent {

  @Input() marvelName:string;
  @Input() marvelThumbnail:string;
}
