import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesShelfComponent } from './tiles-shelf.component';

describe('TilesShelfComponent', () => {
  let component: TilesShelfComponent;
  let fixture: ComponentFixture<TilesShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilesShelfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilesShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
