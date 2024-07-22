import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksIconsComponent } from './links-icons.component';

describe('LinksIconsComponent', () => {
  let component: LinksIconsComponent;
  let fixture: ComponentFixture<LinksIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksIconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinksIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
