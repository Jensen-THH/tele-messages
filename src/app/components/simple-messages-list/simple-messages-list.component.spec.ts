import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMessagesListComponent } from './simple-messages-list.component';

describe('SimpleMessagesListComponent', () => {
  let component: SimpleMessagesListComponent;
  let fixture: ComponentFixture<SimpleMessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleMessagesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
