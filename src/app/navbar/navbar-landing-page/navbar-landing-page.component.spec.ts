import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLandingPageComponent } from './navbar-landing-page.component';

describe('NavbarLandingPageComponent', () => {
  let component: NavbarLandingPageComponent;
  let fixture: ComponentFixture<NavbarLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarLandingPageComponent]
    });
    fixture = TestBed.createComponent(NavbarLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
