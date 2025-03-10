import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesDbComponent } from './messages-db.component';

describe('MessagesDbComponent', () => {
  let component: MessagesDbComponent;
  let fixture: ComponentFixture<MessagesDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesDbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
