import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHome2Component } from './customer-home2.component';

describe('CustomerHome2Component', () => {
  let component: CustomerHome2Component;
  let fixture: ComponentFixture<CustomerHome2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerHome2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHome2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
