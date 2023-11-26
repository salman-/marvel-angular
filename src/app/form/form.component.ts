import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Marvel} from './marvel.model';
import {CustomFunctions} from './custom.functions'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  @Output() outputEvent: EventEmitter<Marvel[]> = new EventEmitter<Marvel[]>();

  constructor(private http: HttpClient) {

  }

  onSubmit(form: NgForm) {

    this.http.get('https://gateway.marvel.com/v1/public/characters?ts=1700990816517&hash=9b43e45a42515bc356934b4706aad8e0&limit=100&apikey=1098114a1b4e71641fb1e0a0184afbcf')
      .pipe(map(responseData => {

        let marvelWithThumbnail = this.filterMarvelsWithoutThumbnail(responseData);
        return this.randomlySelectMarvels(marvelWithThumbnail);
      }))
      .subscribe(marvels => {
        this.outputEvent.emit(marvels);
      });
  }

  private randomlySelectMarvels(marvelWithThumbnail: Marvel[]) {
    let randomlySelectedMarvel: Marvel[] = [];
    for (let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * marvelWithThumbnail.length);
      randomlySelectedMarvel.push(marvelWithThumbnail[index]);
    }
    return randomlySelectedMarvel;
  }

  private filterMarvelsWithoutThumbnail(responseData: Object) {
    let marvelWithThumbnail:Marvel[] = [];
    for (let i = 0; i < 100; i++) {
      let name = responseData['data']['results'][i]['name'];
      let thumbnailOfMarvel = responseData['data']['results'][i]['thumbnail']['path'];
      let validMarvel = new CustomFunctions().doesNotContainSubstring(thumbnailOfMarvel, "image_not_available");
      if (validMarvel) {
        marvelWithThumbnail.push(new Marvel(name, thumbnailOfMarvel + "/portrait_xlarge.jpg"));
      }
    }
    return marvelWithThumbnail;
  }
}
