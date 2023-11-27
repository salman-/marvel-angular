import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Marvel} from './marvel.model';
import {HelpersService} from './helpers.service'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [HelpersService]
})
export class FormComponent {
  @Output() outputEvent: EventEmitter<Marvel[]> = new EventEmitter<Marvel[]>();

  constructor(private http: HttpClient, private helpersService: HelpersService) {
  }

  onSubmit(form: NgForm) {
    const apiEndpoint = this.helpersService.buildApiEndpoint();
    this.http.get(apiEndpoint)
      .pipe(map(responseData => {

        let marvelWithThumbnail = this.helpersService.filterMarvelsWithoutThumbnail(responseData);
        return this.helpersService.randomlySelectMarvels(marvelWithThumbnail);
      }))
      .subscribe(marvels => {
        this.outputEvent.emit(marvels);
      });
  }

}
