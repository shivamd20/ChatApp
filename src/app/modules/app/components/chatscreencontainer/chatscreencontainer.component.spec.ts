import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatscreencontainerComponent } from './chatscreencontainer.component';

describe('ChatscreencontainerComponent', () => {
  let component: ChatscreencontainerComponent;
  let fixture: ComponentFixture<ChatscreencontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatscreencontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatscreencontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
