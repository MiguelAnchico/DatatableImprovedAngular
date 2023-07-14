import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltertableComponent } from './filtertable.component';

describe('FiltertableComponent', () => {
  let component: FiltertableComponent;
  let fixture: ComponentFixture<FiltertableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltertableComponent]
    });
    fixture = TestBed.createComponent(FiltertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
