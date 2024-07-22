import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneManageComponent } from './phone-manage.component';

describe('PhoneManageComponent', () => {
  let component: PhoneManageComponent;
  let fixture: ComponentFixture<PhoneManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
