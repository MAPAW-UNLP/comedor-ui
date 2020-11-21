import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReviewEditorComponent } from './menu-review-editor.component';

describe('MenuReviewEditorComponent', () => {
  let component: MenuReviewEditorComponent;
  let fixture: ComponentFixture<MenuReviewEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuReviewEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReviewEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
