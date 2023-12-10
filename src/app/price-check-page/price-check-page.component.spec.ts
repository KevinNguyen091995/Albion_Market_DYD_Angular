import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCheckPageComponent } from './price-check-page.component';

describe('PriceCheckPageComponent', () => {
  let component: PriceCheckPageComponent;
  let fixture: ComponentFixture<PriceCheckPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceCheckPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceCheckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
