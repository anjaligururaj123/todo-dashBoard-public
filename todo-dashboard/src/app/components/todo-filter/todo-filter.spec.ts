import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFilterComponent } from './todo-filter';

describe('TodoFilter', () => {
  let component: TodoFilterComponent;
  let fixture: ComponentFixture<TodoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
