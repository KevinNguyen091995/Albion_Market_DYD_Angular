import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMemberComponent } from './top-member.component';

describe('TopMemberComponent', () => {
  let component: TopMemberComponent;
  let fixture: ComponentFixture<TopMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
