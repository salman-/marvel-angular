import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarvelsComponent } from './marvels.component';

describe('FollowersListComponent', () => {
  let component: MarvelsComponent;
  let fixture: ComponentFixture<MarvelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarvelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarvelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
