import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandManageComponent } from './band-manage.component';

describe('BandManageComponent', () => {
  let component: BandManageComponent;
  let fixture: ComponentFixture<BandManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
