import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComplainModalComponent } from './create-complain-modal.component';

describe('CreateComplainModalComponent', () => {
  let component: CreateComplainModalComponent;
  let fixture: ComponentFixture<CreateComplainModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComplainModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComplainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
