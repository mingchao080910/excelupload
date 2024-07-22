import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDTableComponent } from './crudtable.component';

describe('CRUDTableComponent', () => {
  let component: CRUDTableComponent;
  let fixture: ComponentFixture<CRUDTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRUDTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CRUDTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
