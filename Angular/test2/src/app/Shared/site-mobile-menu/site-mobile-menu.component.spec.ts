import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMobileMenuComponent } from './site-mobile-menu.component';

describe('SiteMobileMenuComponent', () => {
  let component: SiteMobileMenuComponent;
  let fixture: ComponentFixture<SiteMobileMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteMobileMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
